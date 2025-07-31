const fs = require('fs');
const path = require('path');

// 定义固定的参数
const className = 'User';
const packageName = 'com.example.demo';

console.log('正在生成 Java 类...');
console.log(`类名: ${className}`);
console.log(`包名: ${packageName}`);

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
