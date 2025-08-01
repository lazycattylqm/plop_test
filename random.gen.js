const fs = require("fs");

const types = ['int', 'String', 'boolean', 'double', 'char', 'float', 'long'];
const names = ['foo', 'bar', 'baz', 'qux', 'data', 'result', 'value', 'temp'];
const modifiers = ['public', 'private', 'protected'];

function random (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMethod () {
  const returnType = random(types);
  const methodName = `get${capitalize(random(names))}`;
  const paramType = random(types);
  const paramName = random(names);
  return `${random(modifiers)} ${returnType} ${methodName}(${paramType} ${paramName}) {\n    // TODO: implement\n    return ${randomReturn(returnType)};\n}`;
}

function randomField () {
  return `${random(modifiers)} ${random(types)} ${random(names)} = ${randomValue()};`;
}

function randomClass () {
  const className = `Fake${capitalize(random(names))}`;
  const fieldCount = Math.floor(Math.random() * 3) + 1;
  const methodCount = Math.floor(Math.random() * 2) + 1;

  let fields = [];
  for (let i = 0; i < fieldCount; i++) fields.push(`    ${randomField()}`);

  let methods = [];
  for (let i = 0; i < methodCount; i++) methods.push(`\n    ${randomMethod().replace(/\n/g, '\n    ')}\n`);

  return `public class ${className} {\n\n${fields.join('\n')}\n${methods.join('\n')}\n}`;
}

function randomValue () {
  const options = ['42', '3.14', 'true', 'false', '"hello"', "'a'", '0'];
  return random(options);
}

function randomReturn (type) {
  switch (type) {
    case 'int':
    case 'long':
      return '0';
    case 'boolean':
      return 'false';
    case 'double':
    case 'float':
      return '0.0';
    case 'char':
      return "'a'";
    case 'String':
      return '"TODO"';
    default:
      return 'null';
  }
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 生成并输出一段假 Java 代码
console.log(randomClass());
