// 使用真正的 Plop API - ES 模块版本
import nodePlop from 'node-plop';

// 定义固定的参数
const answers = {
  className: 'User',
  packageName: 'com.example.demo',
  templateType: 'basic',
  templateFile: 'plop-templates/java-class.hbs',
  outputPath: '' // 使用默认路径
};

async function generateJavaClass () {
  try {
    console.log('正在使用真正的 Plop API 生成 Java 类...');
    console.log(`类名: ${answers.className}`);
    console.log(`包名: ${answers.packageName}`);

    // 使用 node-plop 加载配置 - 需要 await
    const plop = await nodePlop('./plopfile.js');
    console.log('Plop 配置加载成功');

    // 调试：查看 plop 对象的方法
    console.log('plop type:', typeof plop);
    console.log('plop methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(plop)).filter(name => typeof plop[name] === 'function'));

    // 获取 java-class 生成器
    const generator = plop.getGenerator('java-class');
    console.log('Java 类生成器获取成功:', typeof generator);

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
