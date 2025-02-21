/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369294270")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number737142778",
    "max": null,
    "min": null,
    "name": "questionNumber",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369294270")

  // remove field
  collection.fields.removeById("number737142778")

  return app.save(collection)
})
