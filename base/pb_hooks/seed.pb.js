/// <reference path="../pb_data/types.d.ts" />

$app.rootCmd.addCommand(new Command({
  use: "seed",
  run: (cmd, args) => {
    console.log("Seed data")
    const seeder = (require(`${__hooks}/seed.js`)).seeder;
    const postsData = require(`${__hooks}/seeds/posts.js`);
    const pagesData = require(`${__hooks}/seeds/pages.js`);
    const vacanciesData = require(`${__hooks}/seeds/vacancies.js`);
    const questionsData = require(`${__hooks}/seeds/questions.js`);

    seeder('posts', postsData, ['user', 'media']);
    seeder('pages', pagesData, ['user', 'media']);
    seeder('vacancies', vacanciesData, ['user', 'media']);
    seeder('questions', questionsData, ['user', 'media'], true, ['id', 'template']);
  },
}));


// fires only for "questions" records
onRecordCreate((e) => {
  const seed = require(`${__hooks}/seed.js`);
  ['question', 'options', 'answer'].forEach(key => {
    let value = e.record.get(key);
    e.record.set(key, seed.encrypt(value));
  });
  e.next()
}, "questions")

// fires only for "questions" records
onRecordUpdate((e) => {
  const seed = require(`${__hooks}/seed.js`);
  ['question', 'options', 'answer'].forEach(key => {
    let value = e.record.get(key);
    e.record.set(key, seed.encrypt(value));
  });
  e.next()
}, "questions")

onRecordEnrich((e) => {
  const seed = require(`${__hooks}/seed.js`);
  const auth = e.requestInfo.auth;
  e.app.expandRecord(auth, ['role'], null);

  console.log(JSON.stringify(e.requestInfo.query, null, 2));
  if (['developer', 'administrator'].includes(auth?.expandedOne('role')?.get('name'))) {
    e.record.unhide("answer");
  }

  ['question', 'options', 'answer'].forEach(key => {
    if (e.requestInfo?.query?.decrypt == 'true') {
      let value = seed.decrypt(e.record.get(key));
      e.record.set(key, value)
    }
  });
  // console.log(JSON.stringify(auth.expandedOne('role').get('name')))
  // console.log(JSON.stringify(e.requestInfo.auth))
  // console.log(JSON.stringify(e.requestInfo.auth?.expandedOne('role')))

  // add new custom field for registered users
  // if (e.requestInfo.auth?.collection()?.name == "users") {
  //     e.record.withCustomData(true) // for security custom props require to be enabled explicitly
  //     // e.record.set("computedScore", e.record.get("score") * e.requestInfo.auth.get("base"))
  // }

  e.next()
}, "questions")