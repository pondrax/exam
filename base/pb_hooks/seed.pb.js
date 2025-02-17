/// <reference path="../pb_data/types.d.ts" />


$app.rootCmd.addCommand(new Command({
  use: "seed",
  run: (cmd, args) => {
    console.log("Seed data")
    const seeder = (require(`${__hooks}/lib/utils.js`)).seeder;

    const roles = require(`${__hooks}/seeds/roles.js`);
    const posts = require(`${__hooks}/seeds/posts.js`);
    const pages = require(`${__hooks}/seeds/pages.js`);
    const vacancies = require(`${__hooks}/seeds/vacancies.js`);

    const questionsTemplates = require(`${__hooks}/seeds/questionsTemplates.js`);
    const questionsCategories = require(`${__hooks}/seeds/questionsCategories.js`);
    const questions = require(`${__hooks}/seeds/questions.js`);


    $app.db()
      .newQuery("DELETE FROM questions WHERE 1=1")
      .execute()

    seeder('roles', roles);
    seeder('posts', posts, ['user', 'media']);
    seeder('pages', pages, ['user', 'media']);
    seeder('vacancies', vacancies, ['user', 'media']);

    seeder('questionsTemplates', questionsTemplates);
    seeder('questionsCategories', questionsCategories);
    seeder('questions', questions);
  },
}));
