/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3231175423")

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1146066909",
    "max": 0,
    "min": 0,
    "name": "phone",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "select3343321666",
    "maxSelect": 1,
    "name": "gender",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Laki Laki",
      "Perempuan"
    ]
  }))

  // update field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "date852947741",
    "max": "",
    "min": "",
    "name": "birth",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3231175423")

  // remove field
  collection.fields.removeById("text1146066909")

  // remove field
  collection.fields.removeById("select3343321666")

  // update field
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
})
