/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_532070774")

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4248681665",
    "hidden": false,
    "id": "relation2838785213",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "vacancy",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_532070774")

  // remove field
  collection.fields.removeById("relation2838785213")

  return app.save(collection)
})
