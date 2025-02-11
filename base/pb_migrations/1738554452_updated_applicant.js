/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3231175423")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "date852947741",
    "max": "",
    "min": "",
    "name": "birthDate",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3231175423")

  // remove field
  collection.fields.removeById("date852947741")

  return app.save(collection)
})
