# Plop.js Java 类生成器

这是一个使用 Plop.js 生成 Java 类的项目，支持多种模板类型和本地绝对路径模板。

## 功能特性

- ✅ 使用真正的 Plop API (`node-plop`)
- ✅ 支持多种 Java 类模板类型
- ✅ 支持本地绝对路径和相对路径模板
- ✅ 自动包名到路径转换
- ✅ 输入验证（类名和包名格式）
- ✅ 命令行参数支持

## 模板类型

### 预定义模板
1. **basic** - 基础类模板 (`plop-templates/java-class.hbs`)
2. **service** - Spring Service 类模板 (`plop-templates/java-service.hbs`)
3. **controller** - Spring Controller 类模板 (`plop-templates/java-controller.hbs`)
4. **entity** - JPA Entity 类模板 (`plop-templates/java-entity.hbs`)

### 自定义模板
- 支持本地绝对路径：`d:\path\to\your\template.hbs`
- 支持相对路径：`custom-templates\my-template.hbs`

## 使用方法

### 1. 交互式模式
```bash
npm run plop
```
会提示你输入类名、包名、选择模板类型，并可以自定义模板文件路径。

### 2. 命令行参数模式

#### 使用预定义模板类型
```bash
# 基础类
npm run plop-gen -- MyClass com.example.demo basic

# Service 类
npm run plop-gen -- UserService com.example.service service

# Controller 类
npm run plop-gen -- UserController com.example.controller controller

# Entity 类
npm run plop-gen -- User com.example.entity entity
```

#### 使用绝对路径模板
```bash
npm run plop-gen -- CustomUser com.example.custom "d:\project\test_project\ts_test\with-plop\custom-templates\java-custom.hbs"
```

#### 使用相对路径模板
```bash
npm run plop-gen -- RelativeUser com.example.relative "custom-templates\java-custom.hbs"
```

### 3. 编程方式
```bash
npm run plop-simple
```
使用固定参数生成示例类。

## 项目结构
```
with-plop/
├── package.json              # 项目配置和脚本
├── plopfile.js              # Plop 配置文件
├── index.mjs                # 编程方式调用脚本
├── generate.mjs             # 命令行参数脚本
├── plop-templates/          # 预定义模板目录
│   ├── java-class.hbs       # 基础类模板
│   ├── java-service.hbs     # Service 类模板
│   ├── java-controller.hbs  # Controller 类模板
│   └── java-entity.hbs      # Entity 类模板
├── custom-templates/        # 自定义模板目录
│   └── java-custom.hbs      # 自定义模板示例
└── src/main/java/           # 生成的 Java 文件输出目录
```

## 生成的文件结构
Java 类会根据包名自动创建目录结构：
```
src/main/java/
└── com/
    └── example/
        ├── demo/
        │   └── MyClass.java
        ├── service/
        │   └── UserService.java
        ├── controller/
        │   └── UserController.java
        └── entity/
            └── User.java
```

## 模板变量
所有模板都支持以下变量：
- `{{className}}` - Java 类名
- `{{packageName}}` - 完整包名
- `{{packageToPath packageName}}` - 包名转换为路径格式

## 自定义模板开发
你可以创建自己的 Handlebars 模板文件：

1. 在任意位置创建 `.hbs` 文件
2. 使用 `{{className}}` 和 `{{packageName}}` 变量
3. 通过绝对路径或相对路径引用模板

### 示例自定义模板
```handlebars
package {{packageName}};

/**
 * {{className}} 自定义类
 */
public class {{className}} {
    // 你的自定义内容
}
```

## 输入验证
- **类名**：必须以大写字母开头，只包含字母和数字
- **包名**：必须符合 Java 包名规范（如：`com.example.demo`）
- **模板路径**：支持绝对路径和相对路径

## 技术栈
- Plop.js v4.0.1
- node-plop v0.32.0 (ES Modules)
- Handlebars v4.7.8
