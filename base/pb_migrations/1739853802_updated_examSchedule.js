/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369294270")

  // update collection data
  unmarshal({
    "name": "vacanciesSchedule"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369294270")

  // update collection data
  unmarshal({
    "name": "examSchedule"
  }, collection)

  return app.save(collection)
})
