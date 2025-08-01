// 使用随机生成器的示例脚本
const { generateClass, generateRandomJavaClass } = require('./random.gen.js');

console.log('🎯 演示随机 Java 类生成器的三个返回值\n');

// 生成多个随机类
for (let i = 1; i <= 3; i++) {
  console.log(`\n🎲 第 ${i} 个随机生成的类:`);
  console.log('='.repeat(100));

  const result = generateClass();

  console.log(`📦 包名: ${result.packageName}`);
  console.log(`📝 类名: ${result.className}`);
  console.log(`📊 类内容长度: ${result.classContent.length} 字符`);
  console.log(`📈 包深度: ${result.packageName.split('.').length} 层`);

  // 分析类内容的一些统计信息
  const lines = result.classContent.split('\n');
  const methods = result.classContent.match(/public|private|protected.*?\{/g) || [];
  const fields = result.classContent.match(/^\s*(?:public|private|protected|static|final).*?=.*?;/gm) || [];

  console.log(`📄 总行数: ${lines.length}`);
  console.log(`🔧 方法数量: ${methods.length}`);
  console.log(`📋 字段数量: ${fields.length}`);

  if (i < 3) {
    console.log('\n' + '─'.repeat(100));
  }
}

console.log('\n🎉 演示完成！');
console.log('\n💡 使用方法：');
console.log('const result = generateClass();');
console.log('console.log(result.packageName);  // 获取包名');
console.log('console.log(result.className);    // 获取类名');
console.log('console.log(result.classContent); // 获取完整类内容');
