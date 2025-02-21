/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4248681665")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "json3678360912",
    "maxSize": 0,
    "name": "requirements",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4248681665")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "json3678360912",
    "maxSize": 0,
    "name": "requirementa",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
