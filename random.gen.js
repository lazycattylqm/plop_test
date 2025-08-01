const types = ['int', 'String', 'boolean', 'double', 'char', 'float', 'long'];
const names = ['foo', 'bar', 'baz', 'qux', 'data', 'result', 'value', 'temp', 'index', 'count', 'size', 'length'];
const modifiers = ['public', 'private', 'protected'];

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
      return `"${random(names)}"`;
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
  const snippets = [
    `int sum = 0;\n        for (int i = 0; i < 10; i++) {\n            sum += i;\n        }`,
    `System.out.println("Debug info: " + ${random(names)});`,
    `if (${random(names)} > 0) {\n            System.out.println("Positive");\n        } else {\n            System.out.println("Negative");\n        }`,
    `${random(types)} tempVar = ${randomValue(random(types))};`,
    `while (${random(names)} < 5) {\n            ${random(names)}++;\n        }`,
  ];
  return snippets[Math.floor(Math.random() * snippets.length)];
}

function generateMethod () {
  const returnType = random(types);
  const methodName = `${random(['get', 'calc', 'compute', 'fetch', 'find'])}${capitalize(random(names))}`;
  const paramCount = Math.floor(Math.random() * 3);
  const params = [];

  for (let i = 0; i < paramCount; i++) {
    const pType = random(types);
    const pName = random(names);
    params.push(`${pType} ${pName}`);
  }

  const paramStr = params.join(', ');
  const bodySnippet = fakeCodeBlock();
  const returnStatement = returnType === 'void' ? '' : `\n        return ${randomReturn(returnType)};`;

  return `${random(modifiers)} ${returnType} ${methodName}(${paramStr}) {\n        ${bodySnippet}${returnStatement}\n    }`;
}

function generateClass () {
  const className = `Fake${capitalize(random(names))}`;
  const fieldCount = Math.floor(Math.random() * 4) + 2;
  const methodCount = Math.floor(Math.random() * 4) + 3;

  const fields = Array.from({ length: fieldCount }, () => `    ${generateField()};`);
  const methods = Array.from({ length: methodCount }, () => `\n    ${generateMethod()}`);

  return `public class ${className} {\n\n${fields.join('\n')}\n${methods.join('\n')}\n\n}`;
}

console.log(generateClass());
