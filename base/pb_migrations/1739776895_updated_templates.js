/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3610134426")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3610134426")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
