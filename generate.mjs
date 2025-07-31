// 使用真正的 Plop API - 命令行参数版本
import nodePlop from 'node-plop';
import path from 'path';
import { fileURLToPath } from 'url';

// 从命令行参数获取类名、包名、模板路径和输出路径
const args = process.argv.slice(2);
const className = args[0] || 'User';
const packageName = args[1] || 'com.example.demo';
const templateTypeOrPath = args[2] || 'basic';
const outputPath = args[3] || ''; // 新增输出路径参数

// 预定义的模板映射
const templateMap = {
  'basic': 'plop-templates/java-class.hbs',
  'service': 'plop-templates/java-service.hbs',
  'controller': 'plop-templates/java-controller.hbs',
  'entity': 'plop-templates/java-entity.hbs'
};

// 确定模板文件路径
let templateFile;
let templateType;

// 检查是否为绝对路径
const isAbsolutePath = /^([a-zA-Z]:\\|\\\\|\/)/.test(templateTypeOrPath);

if (isAbsolutePath) {
  // 如果是绝对路径，直接使用
  templateFile = templateTypeOrPath;
  templateType = 'custom';
  console.log(`✓ 使用绝对路径模板: ${templateFile}`);
} else if (templateMap[templateTypeOrPath]) {
  // 如果是预定义类型，使用映射
  templateType = templateTypeOrPath;
  templateFile = templateMap[templateType];
  console.log(`✓ 使用预定义模板类型: ${templateType}`);
} else {
  // 假设是相对路径
  templateFile = templateTypeOrPath;
  templateType = 'custom';
  console.log(`✓ 使用相对路径模板: ${templateFile}`);
}

// 验证类名格式
if (!/^[A-Z][a-zA-Z0-9]*$/.test(className)) {
  console.error('❌ 错误：类名应该以大写字母开头，只包含字母和数字');
  process.exit(1);
}

// 验证包名格式
if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/.test(packageName)) {
  console.error('❌ 错误：包名格式不正确，应该类似：com.example.demo');
  process.exit(1);
}

const answers = {
  className,
  packageName,
  templateType,
  templateFile,
  outputPath
};

async function generateJavaClass () {
  try {
    console.log('正在使用真正的 Plop API 生成 Java 类...');
    console.log(`类名: ${answers.className}`);
    console.log(`包名: ${answers.packageName}`);
    console.log(`模板类型: ${answers.templateType}`);
    console.log(`模板文件: ${answers.templateFile}`);
    console.log(`输出路径: ${answers.outputPath || '默认路径'}`);

    // 使用 node-plop 加载配置 - 需要 await
    const plop = await nodePlop('./plopfile.js');
    console.log('Plop 配置加载成功');

    // 获取 java-class 生成器
    const generator = plop.getGenerator('java-class');
    console.log('Java 类生成器获取成功');

    // 运行生成器
    const results = await generator.runActions(answers);

    console.log('\n✅ Java 类生成成功！');

    // 显示生成的文件
    if (results.changes && results.changes.length > 0) {
      results.changes.forEach(change => {
        console.log(`📄 ${change.type}: ${change.path}`);
      });
    }

    // 显示失败的操作（如果有）
    if (results.failures && results.failures.length > 0) {
      console.log('\n❌ 失败的操作：');
      results.failures.forEach(failure => {
        console.log(`- ${failure.type}: ${failure.path} - ${failure.error}`);
      });
    }

    console.log('\n🎉 成功使用了真正的 Plop API!');

  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 运行生成器
generateJavaClass();
