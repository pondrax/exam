'use strict';
onBootstrap((e) => {
  e.next();
  require(`${__hooks}/lib/generate-schema.js`).default();
});
onCollectionCreateRequest((e) => {
  e.next();
  require(`${__hooks}/lib/generate-schema.js`).default();
});
onCollectionUpdateRequest((e) => {
  e.next();
  require(`${__hooks}/lib/generate-schema.js`).default();
});
onCollectionDeleteRequest((e) => {
  e.next();
  require(`${__hooks}/lib/generate-schema.js`).default();
});
