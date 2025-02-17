/// <reference path="../pb_data/types.d.ts" />


// fires only for "questions" records
onRecordCreate((e) => {
  const seed = require(`${__hooks}/lib/utils.js`);
  ['question', 'options', 'answer'].forEach(key => {
    let value = e.record.get(key);
    e.record.set(key, seed.encrypt(value));
  });
  e.next()
}, "questions")

// fires only for "questions" records
onRecordUpdate((e) => {
  const seed = require(`${__hooks}/lib.utils.js`);
  ['question', 'options', 'answer'].forEach(key => {
    let value = e.record.get(key);
    e.record.set(key, seed.encrypt(value));
  });
  e.next()
}, "questions")

onRecordEnrich((e) => {
  const seed = require(`${__hooks}/lib/utils.js`);
  const auth = e.requestInfo.auth;
  e.app.expandRecord(auth, ['role'], null);

  // console.log(JSON.stringify(e.requestInfo.query, null, 2));
  if (['developer', 'administrator'].includes(auth?.expandedOne('role')?.get('name'))) {
    e.record.unhide("answer");
  }

  ['question', 'options', 'answer'].forEach(key => {
    if (e.requestInfo?.query?.decrypt == 'true') {
      let value = seed.decrypt(e.record.get(key));
      e.record.set(key, value)
    }
  });

  // add new custom field for registered users
  // if (e.requestInfo.auth?.collection()?.name == "users") {
  //     e.record.withCustomData(true) // for security custom props require to be enabled explicitly
  //     // e.record.set("computedScore", e.record.get("score") * e.requestInfo.auth.get("base"))
  // }

  e.next()
}, "questions")