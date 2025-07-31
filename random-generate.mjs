// 使用 Faker.js 生成随机的 Java 类
import nodePlop from 'node-plop';
import { faker } from '@faker-js/faker';

// 生成随机的 Java 类名
function generateRandomClassName () {
  // 使用 faker 生成随机单词，首字母大写
  const adjective = faker.word.adjective();
  const noun = faker.word.noun();

  // 转换为 PascalCase
  const className = toPascalCase(adjective) + toPascalCase(noun);

  return className;
}

// 生成随机的包名
function generateRandomPackageName () {
  const company = faker.company.name().toLowerCase().replace(/[^a-z0-9]/g, '');
  const domain = faker.internet.domainWord();
  const module = faker.word.noun().toLowerCase().replace(/[^a-z0-9]/g, '');
  const subModule = faker.word.noun().toLowerCase().replace(/[^a-z0-9]/g, '');

  return `com.${company}.${domain}.${module}.${subModule}`;
}

// 转换为 PascalCase
function toPascalCase (str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// 随机选择模板类型
function getRandomTemplateType () {
  const templateTypes = ['basic', 'service', 'controller', 'entity'];
  return faker.helpers.arrayElement(templateTypes);
}

// 生成随机参数
const randomClassName = generateRandomClassName();
const randomPackageName = generateRandomPackageName();
const randomTemplateType = getRandomTemplateType();

// 模板映射
const templateMap = {
  'basic': 'plop-templates/java-class.hbs',
  'service': 'plop-templates/java-service.hbs',
  'controller': 'plop-templates/java-controller.hbs',
  'entity': 'plop-templates/java-entity.hbs'
};

const answers = {
  className: randomClassName,
  packageName: randomPackageName,
  templateType: randomTemplateType,
  templateFile: templateMap[randomTemplateType]
};

async function generateRandomJavaClass () {
  try {
    console.log('🎲 正在使用随机参数生成 Java 类...');
    console.log('🎯 随机生成的参数：');
    console.log(`   类名: ${answers.className}`);
    console.log(`   包名: ${answers.packageName}`);
    console.log(`   模板类型: ${answers.templateType}`);
    console.log(`   模板文件: ${answers.templateFile}`);

    // 使用 node-plop 加载配置
    const plop = await nodePlop('./plopfile.js');
    console.log('✅ Plop 配置加载成功');

    // 获取 java-class 生成器
    const generator = plop.getGenerator('java-class');
    console.log('✅ Java 类生成器获取成功');

    // 运行生成器
    const results = await generator.runActions(answers);

    console.log('\n🎉 随机 Java 类生成成功！');

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

    console.log('\n📊 随机参数总结：');
    console.log(`📝 生成的类: ${answers.className}`);
    console.log(`📦 包名: ${answers.packageName}`);
    console.log(`🎨 模板类型: ${answers.templateType}`);
    console.log('🚀 成功使用了随机参数和真正的 Plop API!');

  } catch (error) {
    console.error('❌ 随机生成失败:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 运行随机生成器
generateRandomJavaClass();
