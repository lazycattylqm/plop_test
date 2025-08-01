const casual = require('casual');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

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

const types = ['int', 'String', 'boolean', 'double', 'char', 'float', 'long', 'List<String>', 'Map<String, Object>', 'Optional<String>', 'BigDecimal', 'LocalDateTime'];
const names = ['foo', 'bar', 'baz', 'qux', 'data', 'result', 'value', 'temp', 'index', 'count', 'size', 'length', 'item', 'element', 'node', 'entity', 'model', 'service', 'repository', 'controller', 'manager', 'handler', 'processor', 'validator', 'converter', 'transformer'];
const modifiers = ['public', 'private', 'protected', 'static', 'final', 'static final'];
const javaKeywords = ['abstract', 'assert', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default', 'do', 'else', 'enum', 'extends', 'final', 'finally', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'interface', 'native', 'new', 'package', 'return', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'volatile', 'while'];

function random (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomValue (type) {
  switch (type) {
    case 'int':
    case 'long':
      return Math.floor(Math.random() * 100);
    case 'boolean':
      return Math.random() > 0.5 ? 'true' : 'false';
    case 'double':
    case 'float':
      return (Math.random() * 100).toFixed(2);
    case 'char':
      return `'${String.fromCharCode(97 + Math.floor(Math.random() * 26))}'`;
    case 'String':
      return `"${casual.word}"`;
    case 'List<String>':
      return `Arrays.asList("${casual.word}", "${casual.word}", "${casual.word}")`;
    case 'Map<String, Object>':
      return `new HashMap<>()`;
    case 'Optional<String>':
      return `Optional.of("${casual.word}")`;
    case 'BigDecimal':
      return `new BigDecimal("${(Math.random() * 1000).toFixed(2)}")`;
    case 'LocalDateTime':
      return `LocalDateTime.now()`;
    default:
      return 'null';
  }
}

function randomReturn (type) {
  return randomValue(type);
}

function generateField () {
  const type = random(types);
  const name = random(names);
  const mod = random(modifiers);
  return `${mod} ${type} ${name} = ${randomValue(type)};`;
}

function fakeCodeBlock () {
  const businessLogicSnippets = [
    // 数据处理
    `List<String> items = Arrays.asList("${casual.word}", "${casual.word}", "${casual.word}");\n        items.forEach(item -> System.out.println("Processing: " + item));`,

    // 条件判断
    `if (${random(names)} != null && ${random(names)}.length() > 0) {\n            log.info("Valid ${random(names)}: " + ${random(names)});\n        } else {\n            throw new IllegalArgumentException("Invalid ${random(names)}");\n        }`,

    // 循环处理
    `for (int i = 0; i < ${random(names)}.size(); i++) {\n            String item = ${random(names)}.get(i);\n            if (item.contains("${casual.word}")) {\n                return item.toUpperCase();\n            }\n        }`,

    // 异常处理
    `try {\n            ${random(names)} = ${random(['service', 'repository', 'manager'])}.process(${random(names)});\n            log.debug("${casual.sentence}");\n        } catch (Exception e) {\n            log.error("Error processing ${random(names)}: " + e.getMessage());\n            throw new RuntimeException("Processing failed", e);\n        }`,

    // 数据库操作模拟
    `Optional<${capitalize(random(names))}> entity = ${random(['repository', 'dao'])}.findById(${Math.floor(Math.random() * 1000)});\n        if (entity.isPresent()) {\n            return entity.get().get${capitalize(random(names))}();\n        }`,

    // 服务调用
    `${capitalize(random(names))}Response response = ${random(['client', 'service'])}.call${capitalize(random(names))}(\n            ${capitalize(random(names))}Request.builder()\n                .${random(names)}("${casual.word}")\n                .build());\n        return response.get${capitalize(random(names))}();`,

    // 数据转换
    `Map<String, Object> ${random(names)}Map = new HashMap<>();\n        ${random(names)}Map.put("${casual.word}", "${casual.sentence}");\n        ${random(names)}Map.put("timestamp", LocalDateTime.now());\n        ${random(names)}Map.put("${casual.word}", ${Math.floor(Math.random() * 100)});`,

    // 验证逻辑
    `if (StringUtils.isBlank(${random(names)})) {\n            throw new ValidationException("${capitalize(random(names))} cannot be empty");\n        }\n        if (${random(names)}.length() > ${Math.floor(Math.random() * 50) + 10}) {\n            throw new ValidationException("${capitalize(random(names))} too long");\n        }`,

    // 缓存操作
    `String cacheKey = "cache:" + ${random(names)} + ":" + System.currentTimeMillis();\n        Object cachedValue = cacheManager.get(cacheKey);\n        if (cachedValue == null) {\n            cachedValue = ${random(['compute', 'calculate', 'fetch'])}${capitalize(random(names))}();\n            cacheManager.put(cacheKey, cachedValue, Duration.ofMinutes(${Math.floor(Math.random() * 60) + 5}));\n        }`,

    // 批量处理
    `List<${capitalize(random(names))}> batch = new ArrayList<>();\n        for (int i = 0; i < batchSize; i++) {\n            ${capitalize(random(names))} item = new ${capitalize(random(names))}();\n            item.set${capitalize(random(names))}("${casual.word}" + i);\n            batch.add(item);\n        }\n        ${random(['repository', 'service'])}.saveAll(batch);`,

    // 状态机模拟
    `switch (${random(names)}.getStatus()) {\n            case PENDING:\n                ${random(names)}.setStatus(Status.PROCESSING);\n                break;\n            case PROCESSING:\n                ${random(names)}.setStatus(Status.COMPLETED);\n                break;\n            case COMPLETED:\n                log.info("${capitalize(random(names))} already completed");\n                break;\n            default:\n                throw new IllegalStateException("Unknown status: " + ${random(names)}.getStatus());\n        }`,

    // 线程安全操作
    `synchronized (this) {\n            if (${random(names)}Counter.get() < maxLimit) {\n                ${random(names)}Counter.incrementAndGet();\n                return process${capitalize(random(names))}();\n            } else {\n                throw new RuntimeException("Rate limit exceeded");\n            }\n        }`,

    // JSON 处理
    `ObjectMapper mapper = new ObjectMapper();\n        try {\n            String json = mapper.writeValueAsString(${random(names)});\n            log.debug("Serialized ${random(names)}: " + json);\n            return mapper.readValue(json, ${capitalize(random(names))}.class);\n        } catch (JsonProcessingException e) {\n            throw new RuntimeException("JSON processing failed", e);\n        }`,

    // 文件操作
    `Path filePath = Paths.get("${casual.word}.txt");\n        try {\n            List<String> lines = Files.readAllLines(filePath);\n            return lines.stream()\n                .filter(line -> line.contains("${casual.word}"))\n                .collect(Collectors.toList());\n        } catch (IOException e) {\n            log.error("Failed to read file: " + filePath, e);\n            return Collections.emptyList();\n        }`,

    // Stream 操作
    `return ${random(names)}.stream()\n            .filter(item -> item.get${capitalize(random(names))}() != null)\n            .map(item -> item.get${capitalize(random(names))}().toUpperCase())\n            .distinct()\n            .sorted()\n            .limit(${Math.floor(Math.random() * 10) + 5})\n            .collect(Collectors.toList());`,

    // 时间处理
    `LocalDateTime now = LocalDateTime.now();\n        LocalDateTime ${random(names)}Time = now.minus${random(['Days', 'Hours', 'Minutes'])}(${Math.floor(Math.random() * 30) + 1});\n        if (${random(names)}Time.isAfter(${random(names)}.getCreatedAt())) {\n            return Duration.between(${random(names)}.getCreatedAt(), now).toMinutes();\n        }`,

    // HTTP 调用模拟
    `HttpHeaders headers = new HttpHeaders();\n        headers.setContentType(MediaType.APPLICATION_JSON);\n        HttpEntity<${capitalize(random(names))}Request> entity = new HttpEntity<>(request, headers);\n        ResponseEntity<${capitalize(random(names))}Response> response = restTemplate.exchange(\n            "${casual.url}", HttpMethod.POST, entity, ${capitalize(random(names))}Response.class);\n        return response.getBody();`,

    // 事件发布
    `${capitalize(random(names))}Event event = new ${capitalize(random(names))}Event();\n        event.set${capitalize(random(names))}("${casual.word}");\n        event.setTimestamp(LocalDateTime.now());\n        event.setSource("${casual.word}-service");\n        applicationEventPublisher.publishEvent(event);\n        log.info("Published event: " + event);`
  ];

  return businessLogicSnippets[Math.floor(Math.random() * businessLogicSnippets.length)];
}

function generateMethod () {
  const returnType = random(types);
  const methodName = `${random(['get', 'set', 'calc', 'compute', 'fetch', 'find', 'create', 'update', 'delete', 'process', 'validate', 'transform', 'convert', 'handle', 'manage', 'execute', 'build', 'parse', 'format', 'serialize', 'deserialize'])}${capitalize(casual.word)}`;
  const paramCount = Math.floor(Math.random() * 4);
  const params = [];

  for (let i = 0; i < paramCount; i++) {
    const pType = random(types);
    const pName = casual.word.toLowerCase();
    params.push(`${pType} ${pName}`);
  }

  const paramStr = params.join(', ');
  const bodySnippet = fakeCodeBlock();
  const returnStatement = returnType === 'void' ? '' : `\n        return ${randomReturn(returnType)};`;

  // 添加注释
  const comment = `/**\n     * ${lorem.generateSentences(1)}\n     * \n     * @param ${params.length > 0 ? params[0].split(' ')[1] : 'param'} ${lorem.generateWords(3)}\n     * @return ${lorem.generateWords(2)}\n     */`;

  return `${comment}\n    ${random(modifiers)} ${returnType} ${methodName}(${paramStr}) {\n        ${bodySnippet}${returnStatement}\n    }`;
}

function generateClass () {
  const className = `${capitalize(casual.word)}${random(['Service', 'Controller', 'Repository', 'Manager', 'Handler', 'Processor', 'Validator', 'Converter', 'Helper', 'Utility', 'Component', 'Factory', 'Builder', 'Strategy', 'Adapter'])}`;
  const fieldCount = Math.floor(Math.random() * 6) + 2;
  const methodCount = Math.floor(Math.random() * 8) + 3;

  // 生成包声明
  const packageName = `com.${casual.word.toLowerCase()}.${casual.word.toLowerCase()}.${random(['service', 'controller', 'repository', 'util', 'config', 'model', 'dto', 'entity'])}`;

  // 生成导入语句
  const imports = [
    'import java.util.*;',
    'import java.time.LocalDateTime;',
    'import java.math.BigDecimal;',
    'import java.util.stream.Collectors;',
    'import java.util.concurrent.atomic.AtomicInteger;',
    'import org.slf4j.Logger;',
    'import org.slf4j.LoggerFactory;',
    'import org.springframework.stereotype.Service;',
    'import org.springframework.util.StringUtils;'
  ];

  // 生成字段
  const fields = Array.from({ length: fieldCount }, () => `    ${generateField()}`);

  // 添加 Logger 字段
  fields.unshift(`    private static final Logger log = LoggerFactory.getLogger(${className}.class);`);

  // 生成方法
  const methods = Array.from({ length: methodCount }, () => `\n${generateMethod()}`);

  // 类注释
  const classComment = `/**\n * ${lorem.generateSentences(2)}\n * \n * @author ${casual.full_name}\n * @version 1.0\n * @since ${new Date().getFullYear()}\n */`;

  return `package ${packageName};\n\n${imports.join('\n')}\n\n${classComment}\n@Service\npublic class ${className} {\n\n${fields.join('\n')}\n${methods.join('\n')}\n\n}`;
}

console.log(generateClass());
