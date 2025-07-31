# 简单的 Java 类生成器

这是一个使用 Plop.js 的简单 Java 类生成器，提供了多种使用方法。

## 安装

确保已安装依赖：

```bash
npm install
```

## 使用方法

### 1. 交互式生成（使用 Plop CLI）

```bash
npm run generate
# 或者
npm run g
```

系统会询问你类名和包名。

### 2. 使用真正的 Plop API（推荐）

#### 固定参数生成

```bash
npm run plop-api
```

使用固定参数：类名 `User`，包名 `com.example.demo`

#### 命令行参数生成

```bash
# 使用默认参数（User, com.example.demo）
npm run plop-gen

# 使用自定义参数
npm run plop-gen -- 类名 包名

# 示例
npm run plop-gen -- UserService com.example.service
npm run plop-gen -- ProductController com.example.controller
```

### 3. 使用 Handlebars 模板引擎

#### 固定参数生成

```bash
npm run auto-generate
```

#### 命令行参数生成

```bash
npm run gen -- 类名 包名
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
                ├── service/
                │   └── UserService.java
                └── order/
                    └── OrderService.java
```

## 文件说明

### Plop 相关文件

- `plopfile.js` - Plop 配置文件（所有方法共用）
- `plop-templates/java-class.hbs` - Java 类模板文件

### 不同的生成脚本

- `index.mjs` - 使用真正 Plop API 的固定参数脚本（**推荐**）
- `generate.mjs` - 使用真正 Plop API 的命令行参数脚本（**推荐**）
- `index.js` - 使用 Handlebars 的固定参数脚本
- `generate.js` - 使用 Handlebars 的命令行参数脚本

## 推荐使用方法

**最佳选择**：使用真正的 Plop API 版本（`.mjs` 文件）

```bash
# 固定参数
npm run plop-api

# 自定义参数
npm run plop-gen -- OrderService com.example.order
```

这些版本：

- ✅ 使用真正的 Plop API
- ✅ 支持所有 Plop 功能和 helpers
- ✅ 与 Plop 生态系统完全兼容
- ✅ 更好的错误处理和调试信息

## 生成的 Java 类包含

- 包声明
- 类注释（包含作者和版本信息）
- 默认构造函数
- getName() 示例方法
- toString() 方法

## 参数验证

- 类名：必须以大写字母开头，只包含字母和数字
- 包名：必须符合 Java 包名规范（小写字母，用点分隔）

## 技术说明

- **Plop API 版本** (`.mjs`)：使用 ES 模块和真正的 `node-plop` API
- **Handlebars 版本** (`.js`)：直接使用 Handlebars 模板引擎，兼容性更好
- **交互式版本**：使用标准的 Plop CLI 界面

所有版本都使用相同的模板文件 (`plop-templates/java-class.hbs`)，确保生成的代码一致性。
