/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_532070774")

  // update collection data
  unmarshal({
    "name": "results"
  }, collection)

  // remove field
  collection.fields.removeById("relation2838785213")

  // remove field
  collection.fields.removeById("editor1843675174")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4009210445",
    "hidden": false,
    "id": "relation3069659470",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "question",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3671935525",
    "max": 0,
    "min": 0,
    "name": "answer",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number848901969",
    "max": null,
    "min": null,
    "name": "score",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_532070774")

  // update collection data
  unmarshal({
    "name": "exam"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
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

  // add field
  collection.fields.addAt(2, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor1843675174",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // remove field
  collection.fields.removeById("relation3069659470")

  // remove field
  collection.fields.removeById("text3671935525")

  // remove field
  collection.fields.removeById("number848901969")

  return app.save(collection)
})
