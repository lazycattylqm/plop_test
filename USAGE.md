# 如何使用 Java 类生成器

## 运行命令

```bash
npm run g
```

## 示例输入

- 类名：`UserService`
- 包名：`com.example.service`

## 预期输出

会生成文件：`src/main/java/com/example/service/UserService.java`

## 注意事项

- 类名必须以大写字母开头
- 包名必须符合 Java 包名规范（小写字母，用点分隔）

## 问题解决

如果遇到 "Missing helper: replace" 错误，现在已经修复，使用了自定义的 `packageToPath` helper。
