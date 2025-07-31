# 简单的 Java 类生成器

这是一个使用 Plop.js 的简单 Java 类生成器。

## 安装

确保已安装依赖：

```bash
npm install
```

## 使用方法

### 1. 交互式生成（使用 Plop）

```bash
npm run generate
# 或者
npm run g
```

系统会询问你类名和包名。

### 2. 自动生成（固定参数）

```bash
npm run auto-generate
```

使用固定参数：类名 `User`，包名 `com.example.demo`

### 3. 命令行参数生成（推荐）

```bash
# 使用默认参数（User, com.example.demo）
npm run gen

# 使用自定义参数
npm run gen -- 类名 包名

# 示例
npm run gen -- UserService com.example.service
npm run gen -- ProductController com.example.controller
```

## 生成的文件结构

```
src/
└── main/
    └── java/
        └── com/
            └── example/
                ├── demo/
                │   └── User.java
                └── service/
                    └── UserService.java
```

## 文件说明

- `plopfile.js` - Plop 配置文件（交互式生成器）
- `index.js` - 固定参数自动生成脚本
- `generate.js` - 命令行参数生成脚本（推荐使用）
- `plop-templates/java-class.hbs` - Java 类模板文件

## 生成的 Java 类包含

- 包声明
- 类注释（包含作者和版本信息）
- 默认构造函数
- getName() 示例方法
- toString() 方法

## 参数验证

- 类名：必须以大写字母开头，只包含字母和数字
- 包名：必须符合 Java 包名规范（小写字母，用点分隔）

## 示例

```bash
# 生成 UserService 类在 com.example.service 包中
npm run gen -- UserService com.example.service

# 生成 ProductController 类在 com.example.controller 包中
npm run gen -- ProductController com.example.controller
```
