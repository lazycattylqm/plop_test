module.exports = function (plop) {
  // 添加自定义 helper 将包名转换为路径
  plop.setHelper('packageToPath', function (packageName) {
    return packageName.replace(/\./g, '/');
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
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/main/java/{{packageToPath packageName}}/{{className}}.java',
        templateFile: 'plop-templates/java-class.hbs'
      }
    ]
  });
};
