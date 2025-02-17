/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3610134426")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool1820223666",
    "name": "protected",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3610134426")

  // remove field
  collection.fields.removeById("bool1820223666")

  return app.save(collection)
})
