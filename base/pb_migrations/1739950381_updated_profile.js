/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_268752357")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3231175423",
    "hidden": false,
    "id": "relation3400339481",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "applicant",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_268752357")

  // remove field
  collection.fields.removeById("relation3400339481")

  return app.save(collection)
})
