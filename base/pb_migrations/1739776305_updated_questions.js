/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4009210445")

  // remove field
  collection.fields.removeById("editor3493198471")

  // remove field
  collection.fields.removeById("editor3671935525")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json3493198471",
    "maxSize": 0,
    "name": "options",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json3671935525",
    "maxSize": 0,
    "name": "answer",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4009210445")

  // add field
  collection.fields.addAt(3, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor3493198471",
    "maxSize": 0,
    "name": "options",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor3671935525",
    "maxSize": 0,
    "name": "answer",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // remove field
  collection.fields.removeById("json3493198471")

  // remove field
  collection.fields.removeById("json3671935525")

  return app.save(collection)
})
