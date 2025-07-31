// 演示不同输出路径的示例脚本
import nodePlop from 'node-plop';

// 示例1: 使用绝对路径输出
const example1 = {
  className: 'AbsolutePathExample',
  packageName: 'com.example.absolute',
  templateType: 'service',
  templateFile: 'plop-templates/java-service.hbs',
  outputPath: 'D:\\temp\\java-classes' // 绝对路径
};

// 示例2: 使用相对路径输出
const example2 = {
  className: 'RelativePathExample',
  packageName: 'com.example.relative',
  templateType: 'controller',
  templateFile: 'plop-templates/java-controller.hbs',
  outputPath: 'custom-output/controllers' // 相对路径
};

// 示例3: 使用默认路径
const example3 = {
  className: 'DefaultPathExample',
  packageName: 'com.example.default',
  templateType: 'entity',
  templateFile: 'plop-templates/java-entity.hbs',
  outputPath: '' // 空字符串，使用默认路径
};

async function generateExamples () {
  try {
    const plop = await nodePlop('./plopfile.js');
    const generator = plop.getGenerator('java-class');

    console.log('🎯 开始生成输出路径示例...\n');

    // 生成示例1: 绝对路径
    console.log('📁 示例1: 绝对路径输出');
    console.log(`   类名: ${example1.className}`);
    console.log(`   包名: ${example1.packageName}`);
    console.log(`   输出路径: ${example1.outputPath}`);
    const results1 = await generator.runActions(example1);
    console.log('   ✅ 生成完成\n');

    // 生成示例2: 相对路径
    console.log('📁 示例2: 相对路径输出');
    console.log(`   类名: ${example2.className}`);
    console.log(`   包名: ${example2.packageName}`);
    console.log(`   输出路径: ${example2.outputPath}`);
    const results2 = await generator.runActions(example2);
    console.log('   ✅ 生成完成\n');

    // 生成示例3: 默认路径
    console.log('📁 示例3: 默认路径输出');
    console.log(`   类名: ${example3.className}`);
    console.log(`   包名: ${example3.packageName}`);
    console.log(`   输出路径: 默认 (src/main/java)`);
    const results3 = await generator.runActions(example3);
    console.log('   ✅ 生成完成\n');

    console.log('🎉 所有示例生成完成！');

  } catch (error) {
    console.error('❌ 生成失败:', error.message);
    process.exit(1);
  }
}

generateExamples();
