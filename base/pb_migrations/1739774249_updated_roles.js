/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2105053228")

  // update collection data
  unmarshal({
    "listRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2105053228")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.role = id ||\n@request.auth.role.name = 'developer' ||\n@request.auth.role.name = 'administrator' "
  }, collection)

  return app.save(collection)
})
