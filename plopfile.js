module.exports = function (plop) {
  // 添加自定义 helper 将包名转换为路径
  plop.setHelper('packageToPath', function (packageName) {
    return packageName.replace(/\./g, '/');
  });

  // 添加 lowerCase helper
  plop.setHelper('lowerCase', function (str) {
    return str.toLowerCase();
  });

  // 添加路径规范化 helper
  plop.setHelper('normalizePath', function (templatePath) {
    const path = require('path');
    // 如果是绝对路径，直接返回
    if (path.isAbsolute(templatePath)) {
      return templatePath;
    }
    // 如果是相对路径，相对于项目根目录解析
    return path.resolve(process.cwd(), templatePath);
  });

  // 定义生成器：创建 Java 类
  plop.setGenerator('java-class', {
    description: '创建一个新的 Java 类',
    prompts: [
      {
        type: 'input',
        name: 'className',
        message: 'Java 类名是什么？',
        validate: function (value) {
          if (!value) {
            return 'Java 类名是必需的';
          }
          // 验证类名格式（首字母大写）
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return '类名应该以大写字母开头，只包含字母和数字';
          }
          return true;
        }
      },
      {
        type: 'input',
        name: 'packageName',
        message: '包名是什么？（例如：com.example.demo）',
        validate: function (value) {
          if (!value) {
            return '包名是必需的';
          }
          // 验证包名格式
          if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/.test(value)) {
            return '包名格式不正确，应该类似：com.example.demo';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'templateType',
        message: '选择 Java 类模板类型：',
        choices: [
          {
            name: '基础类 - 包含构造函数和基本方法',
            value: 'basic'
          },
          {
            name: 'Service 类 - 服务层类模板',
            value: 'service'
          },
          {
            name: 'Controller 类 - web 控制器模板',
            value: 'controller'
          },
          {
            name: 'Entity 类 - 实体类模板',
            value: 'entity'
          }
        ],
        default: 'basic'
      },
      {
        type: 'input',
        name: 'templateFile',
        message: '模板文件路径（相对路径或绝对路径）：',
        default: function (answers) {
          const templateMap = {
            'basic': 'plop-templates/java-class.hbs',
            'service': 'plop-templates/java-service.hbs',
            'controller': 'plop-templates/java-controller.hbs',
            'entity': 'plop-templates/java-entity.hbs'
          };
          return templateMap[answers.templateType] || 'plop-templates/java-class.hbs';
        },
        validate: function (value) {
          if (!value) {
            return '模板文件路径是必需的';
          }
          // 检查是否为绝对路径（Windows 或 Unix 风格）
          const isAbsolute = /^([a-zA-Z]:\\|\\\\|\/)/.test(value);
          const isRelative = !isAbsolute;

          if (isAbsolute) {
            console.log(`\n✓ 使用绝对路径模板: ${value}`);
          } else {
            console.log(`\n✓ 使用相对路径模板: ${value}`);
          }

          return true;
        }
      },
      {
        type: 'input',
        name: 'outputPath',
        message: '输出 Java 类的路径（绝对路径或相对路径，留空则使用默认 src/main/java）：',
        default: '',
        validate: function (value) {
          // 允许为空
          if (!value) return true;
          // 路径合法性简单校验
          if (typeof value !== 'string') return '路径必须为字符串';
          return true;
        }
      }
    ],
    actions: function (data) {
      const path = require('path');
      let templateFile = data.templateFile;
      let outputPath = data.outputPath;

      // 模板文件绝对路径处理
      if (!path.isAbsolute(templateFile)) {
        templateFile = path.resolve(process.cwd(), templateFile);
      }
      console.log(`\n📁 使用模板文件: ${templateFile}`);

      // 输出路径处理
      let targetPath;
      if (outputPath && typeof outputPath === 'string' && outputPath.trim() !== '') {
        // 如果是绝对路径，直接用；否则相对项目根目录
        if (path.isAbsolute(outputPath)) {
          targetPath = path.join(outputPath, `${data.className}.java`);
        } else {
          targetPath = path.join(process.cwd(), outputPath, `${data.className}.java`);
        }
      } else {
        // 默认路径
        targetPath = path.join('src', 'main', 'java', data.packageName.replace(/\./g, '/'), `${data.className}.java`);
      }
      console.log(`\n📦 输出路径: ${targetPath}`);

      return [
        {
          type: 'add',
          path: targetPath,
          templateFile: templateFile
        }
      ];
    }
  });
};
