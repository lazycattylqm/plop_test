const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// 定义固定的参数
const answers = {
  className: 'User',
  packageName: 'com.example.demo'
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
