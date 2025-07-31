// 使用真正的 Plop API - 命令行参数版本
import nodePlop from 'node-plop';

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

async function generateJavaClass () {
  try {
    console.log('正在使用真正的 Plop API 生成 Java 类...');
    console.log(`类名: ${answers.className}`);
    console.log(`包名: ${answers.packageName}`);

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
