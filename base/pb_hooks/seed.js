'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.seeder = seeder;
exports.encrypt = encrypt;
exports.decrypt = decrypt;

function seeder(collectionName, collectionData, skips = [], encrypted = false, except = ['id']) {
  const ENV = require(`${__hooks}/env.js`)
  let collection = $app.findCollectionByNameOrId(collectionName)
  collectionData.forEach(data => {
    let record;
    try {
      record = $app.findRecordById(collectionName, data.id)
    } catch (e) {
      record = new Record(collection);
    }

    // console.log(except)
    Object.entries(data).forEach(([key, value]) => {
      if (skips.includes(key)) return;
      // if (encrypted && !except.includes(key)) {
      //   value = $security.encrypt(value, ENV.SECRET_KEY)
      //   console.log(key, value)
      // }
      record.set(key, value);
    })
    $app.save(record)
  })
  console.log(`${collectionName} seeded`)
}

function encrypt(value) {
  const ENV = require(`${__hooks}/env.js`)
  return $security.encrypt(value, ENV.SECRET_KEY)
}


function decrypt(value) {
  const ENV = require(`${__hooks}/env.js`);
  console.log('')
  console.log('')
  console.log('')
  // console.log(String(value).replace(/\"/g, ''))
  // return value;
  return $security.decrypt(String(value).replace(/\"/g, ''), ENV.SECRET_KEY);
}