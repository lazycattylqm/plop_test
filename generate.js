const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// 从命令行参数获取类名和包名，如果没有提供则使用默认值
const args = process.argv.slice(2);
const className = args[0] || 'User';
const packageName = args[1] || 'com.example.demo';

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
  packageName
};

// 注册 Handlebars helper（模拟 Plop 的 helper）
handlebars.registerHelper('packageToPath', function (packageName) {
  return packageName.replace(/\./g, '/');
});

async function generateJavaClass () {
  try {
    console.log('正在使用 Plop 模板生成 Java 类...');
    console.log(`类名: ${answers.className}`);
    console.log(`包名: ${answers.packageName}`);

    // 读取 Plop 模板文件
    const templatePath = path.join(__dirname, 'plop-templates', 'java-class.hbs');
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // 编译 Handlebars 模板
    const template = handlebars.compile(templateContent);

    // 渲染模板
    const renderedContent = template(answers);

    // 创建目标目录
    const packagePath = answers.packageName.replace(/\./g, '/');
    const targetDir = path.join(__dirname, 'src', 'main', 'java', packagePath);
    const targetFile = path.join(targetDir, `${answers.className}.java`);

    // 确保目录存在
    fs.mkdirSync(targetDir, { recursive: true });

    // 写入文件
    fs.writeFileSync(targetFile, renderedContent);

    console.log('\n✅ Java 类生成成功！');
    console.log(`📄 add: ${path.relative(__dirname, targetFile)}`);
    console.log(`使用了 Plop 模板: ${path.relative(__dirname, templatePath)}`);

  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    if (error.code === 'ENOENT' && error.path && error.path.includes('handlebars')) {
      console.error('请安装 handlebars: npm install handlebars');
    }
    process.exit(1);
  }
}

// 运行生成器
generateJavaClass();
