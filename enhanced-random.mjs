// 增强的随机 Java 类生成器 - 集成 Plop API
import nodePlop from 'node-plop';
import casual from 'casual';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

// 生成随机的 Java 类名（更真实）
function generateEnhancedClassName () {
  const prefixes = ['Smart', 'Advanced', 'Enhanced', 'Dynamic', 'Automated', 'Intelligent', 'Optimized', 'Efficient', 'Robust', 'Secure'];
  const suffixes = ['Service', 'Controller', 'Repository', 'Manager', 'Handler', 'Processor', 'Validator', 'Converter', 'Helper', 'Component'];

  const prefix = casual.random_element(prefixes);
  const word = casual.word.charAt(0).toUpperCase() + casual.word.slice(1);
  const suffix = casual.random_element(suffixes);

  return `${prefix}${word}${suffix}`;
}

// 生成更真实的包名
function generateEnhancedPackageName () {
  const domains = ['tech', 'digital', 'cloud', 'enterprise', 'business', 'platform', 'solutions'];
  const companyWords = ['systems', 'solutions', 'tech', 'digital', 'corp', 'group', 'labs', 'works'];
  const modules = ['service', 'controller', 'repository', 'util', 'config', 'model', 'dto', 'entity', 'api', 'core'];
  const submodules = ['impl', 'common', 'base', 'admin', 'client', 'server', 'web', 'data', 'security'];

  const domain = casual.random_element(domains);
  const company = casual.random_element(companyWords);
  const module = casual.random_element(modules);
  const submodule = casual.random_element(submodules);

  return `com.${company}.${domain}.${module}.${submodule}`;
}

// 随机选择模板类型（带权重）
function getEnhancedRandomTemplateType () {
  const weightedTemplates = [
    { type: 'service', weight: 30 },
    { type: 'controller', weight: 25 },
    { type: 'entity', weight: 20 },
    { type: 'basic', weight: 25 }
  ];

  const totalWeight = weightedTemplates.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (const template of weightedTemplates) {
    random -= template.weight;
    if (random <= 0) {
      return template.type;
    }
  }

  return 'basic';
}

// 生成随机的输出路径
function generateRandomOutputPath () {
  const outputOptions = [
    '', // 默认路径
    'generated/java',
    'src/generated/java',
    'target/generated-sources',
    'build/generated/java',
    `temp/java-${casual.word}`,
    `output/${casual.word}/classes`
  ];

  return casual.random_element(outputOptions);
}

// 生成随机参数
const randomClassName = generateEnhancedClassName();
const randomPackageName = generateEnhancedPackageName();
const randomTemplateType = getEnhancedRandomTemplateType();
const randomOutputPath = generateRandomOutputPath();

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
  templateFile: templateMap[randomTemplateType],
  outputPath: randomOutputPath
};

async function generateEnhancedRandomJavaClass () {
  try {
    console.log('🎨 正在使用增强随机参数生成 Java 类...');
    console.log('🎯 随机生成的参数：');
    console.log(`   📝 类名: ${answers.className}`);
    console.log(`   📦 包名: ${answers.packageName}`);
    console.log(`   🎨 模板类型: ${answers.templateType}`);
    console.log(`   📁 模板文件: ${answers.templateFile}`);
    console.log(`   📂 输出路径: ${answers.outputPath || '默认路径 (src/main/java)'}`);

    // 添加一些有趣的信息
    console.log('\n🎲 随机生成的额外信息：');
    console.log(`   👤 虚拟作者: ${casual.first_name} ${casual.last_name}`);
    console.log(`   🏢 虚拟公司: ${casual.random_element(['Tech Corp', 'Digital Solutions', 'Cloud Systems', 'Enterprise Labs'])}`);
    console.log(`   📧 虚拟邮箱: ${casual.email}`);
    console.log(`   🌐 虚拟域名: ${casual.domain}`);
    console.log(`   📝 虚拟描述: ${lorem.generateSentences(1)}`);

    // 使用 node-plop 加载配置
    const plop = await nodePlop('./plopfile.js');
    console.log('\n✅ Plop 配置加载成功');

    // 获取 java-class 生成器
    const generator = plop.getGenerator('java-class');
    console.log('✅ Java 类生成器获取成功');

    // 运行生成器
    const results = await generator.runActions(answers);

    console.log('\n🎉 增强随机 Java 类生成成功！');

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

    console.log('\n📊 增强随机参数总结：');
    console.log(`📝 生成的类: ${answers.className}`);
    console.log(`📦 包名: ${answers.packageName}`);
    console.log(`🎨 模板类型: ${answers.templateType}`);
    console.log(`📂 输出路径: ${answers.outputPath || '默认路径'}`);
    console.log('🚀 成功使用了增强随机参数和真正的 Plop API!');

    // 生成一些有趣的统计信息
    console.log('\n📈 生成统计：');
    console.log(`🔤 类名长度: ${answers.className.length} 字符`);
    console.log(`🌐 包名深度: ${answers.packageName.split('.').length} 层`);
    console.log(`🎯 模板复杂度: ${answers.templateType === 'entity' ? '高' : answers.templateType === 'service' ? '中' : '低'}`);

  } catch (error) {
    console.error('❌ 增强随机生成失败:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 运行增强随机生成器
generateEnhancedRandomJavaClass();
