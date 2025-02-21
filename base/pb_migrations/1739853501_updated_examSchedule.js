/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2369294270")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number3262944105",
    "max": null,
    "min": null,
    "name": "stage",
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
  collection.fields.removeById("number3262944105")

  return app.save(collection)
})
