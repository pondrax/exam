/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872498860")

  // update collection data
  unmarshal({
    "name": "interviews"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2872498860")

  // update collection data
  unmarshal({
    "name": "interview"
  }, collection)

  return app.save(collection)
})
