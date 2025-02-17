'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.newLine = newLine;
exports.toPascalCase = toPascalCase;
exports.haveSameValues = haveSameValues;
exports.seeder = seeder;
exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.parseENV = parseENV;

function seeder(collectionName, collectionData, skips = []) {
  let collection = $app.findCollectionByNameOrId(collectionName)
  collectionData.forEach(data => {
    let record;
    try {
      record = $app.findRecordById(collectionName, data.id)
    } catch (e) {
      record = new Record(collection);
    }
    Object.entries(data).forEach(([key, value]) => {
      if (skips.includes(key)) return;
      record.set(key, value);
    })
    $app.saveNoValidate(record)
  })
  console.log(`${collectionName} seeded`)
}

function encrypt(value) {
  const ENV = parseENV()
  return $security.encrypt(value, ENV.SECRET_KEY)
}


function decrypt(value) {
  const ENV = parseENV()
  return $security.decrypt(String(value).replace(/\"/g, ''), ENV.SECRET_KEY);
}

function newLine(indent, str, newLine = 1) {
  return '    '.repeat(indent) + str + '\n'.repeat(newLine);
}
function toPascalCase(collectionName) {
  return collectionName
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
function haveSameValues(set1, set2) {
  if (set1.size !== set2.size) return false;
  return [...set1].every((value) => set2.has(value));
}


function parseENV() {
  const envFile = $os.readFile(`${__hooks}/../../.env`);
  const envText = String.fromCharCode(...envFile).replace(/\r\n?/gm, "\n");
  const env = {};
  envText.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^#]*))\s*(?:#.*)?$/);
    if (match) {
      env[match[1]] = match[2] || match[3] || match[4] || '';
    }
  });
  return env;
}