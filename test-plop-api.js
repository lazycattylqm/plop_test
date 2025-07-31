// 测试 Plop API 的正确用法
console.log('=== 测试 Plop 4.x API ===\n');

async function testPlopAPI () {
  // 测试1: 使用正确的 plop 路径
  try {
    const plopMain = require('plop/src/plop');
    console.log('1. plop/src/plop type:', typeof plopMain);

    if (typeof plopMain === 'function') {
      const plop = plopMain('./plopfile.js');
      console.log('   plop instance created:', typeof plop);

      if (plop && typeof plop.getGenerator === 'function') {
        const generator = plop.getGenerator('java-class');
        console.log('   generator found:', typeof generator);

        if (generator && typeof generator.runActions === 'function') {
          const answers = {
            className: 'TestClass',
            packageName: 'com.test.example'
          };

          console.log('   准备运行生成器...');
          const results = await generator.runActions(answers);
          console.log('   ✅ 成功使用 Plop API!');
          console.log('   Results:', results);
        }
      }
    }
  } catch (error) {
    console.log('1. plop/src/plop 失败:', error.message);
  }

  // 测试2: 尝试不同的导入方式
  try {
    // 检查是否有 node-plop 的正确导入
    const path = require('path');
    const nodePlopPath = path.join(__dirname, 'node_modules', 'plop', 'src', 'plop.js');
    const fs = require('fs');

    if (fs.existsSync(nodePlopPath)) {
      console.log('2. 找到 plop 源文件:', nodePlopPath);
      const nodePlop = require(nodePlopPath);
      console.log('   nodePlop type:', typeof nodePlop);

      if (typeof nodePlop === 'function') {
        const plop = nodePlop('./plopfile.js', {
          destBasePath: __dirname
        });
        console.log('   plop instance type:', typeof plop);

        if (plop && typeof plop.getGenerator === 'function') {
          const generator = plop.getGenerator('java-class');
          console.log('   generator type:', typeof generator);

          const answers = {
            className: 'APITestClass',
            packageName: 'com.api.test'
          };

          const results = await generator.runActions(answers);
          console.log('   ✅ 成功运行生成器!');
          console.log('   Results:', results);
        }
      }
    }
  } catch (error) {
    console.log('2. 直接路径导入失败:', error.message);
  }

  // 测试3: 查看 plop 的结构
  try {
    const path = require('path');
    const fs = require('fs');

    const plopSrcDir = path.join(__dirname, 'node_modules', 'plop', 'src');
    if (fs.existsSync(plopSrcDir)) {
      const files = fs.readdirSync(plopSrcDir);
      console.log('3. plop/src files:', files);

      // 查看 plop.js 的内容开头
      const plopFile = path.join(plopSrcDir, 'plop.js');
      if (fs.existsSync(plopFile)) {
        const content = fs.readFileSync(plopFile, 'utf8');
        const firstLines = content.split('\n').slice(0, 10).join('\n');
        console.log('   plop.js 开头内容:');
        console.log(firstLines);
      }
    }
  } catch (error) {
    console.log('3. 文件检查失败:', error.message);
  }
}

// 运行测试
testPlopAPI().catch(console.error);
