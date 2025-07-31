const fs = require('fs');
const path = require('path');

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

console.log('正在生成 Java 类...');
console.log(`类名: ${className}`);
console.log(`包名: ${packageName}`);

try {
  // 读取模板文件
  const templatePath = path.join(__dirname, 'plop-templates', 'java-class.hbs');
  let template = fs.readFileSync(templatePath, 'utf8');

  // 替换模板变量
  template = template.replace(/\{\{className\}\}/g, className);
  template = template.replace(/\{\{packageName\}\}/g, packageName);

  // 创建目标目录
  const packagePath = packageName.replace(/\./g, '/');
  const targetDir = path.join(__dirname, 'src', 'main', 'java', packagePath);
  const targetFile = path.join(targetDir, `${className}.java`);

  // 确保目录存在
  fs.mkdirSync(targetDir, { recursive: true });

  // 写入文件
  fs.writeFileSync(targetFile, template);

  console.log('\n✅ Java 类生成成功！');
  console.log(`文件位置: ${path.relative(__dirname, targetFile)}`);
  console.log(`包名: ${packageName}`);
  console.log(`类名: ${className}`);

} catch (error) {
  console.error('❌ 生成失败:', error.message);
  process.exit(1);
}
