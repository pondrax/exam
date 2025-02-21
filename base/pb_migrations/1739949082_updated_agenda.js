/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_469677369")

  // update collection data
  unmarshal({
    "name": "gallery"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_469677369")

  // update collection data
  unmarshal({
    "name": "agenda"
  }, collection)

  return app.save(collection)
})
