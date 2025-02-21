/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3678450690")

  // update collection data
  unmarshal({
    "name": "vacanciesTemplates"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3678450690")

  // update collection data
  unmarshal({
    "name": "zzzquestionsTemplates"
  }, collection)

  return app.save(collection)
})
