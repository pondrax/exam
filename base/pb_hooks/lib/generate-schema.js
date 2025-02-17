/// <reference path="../../pb_data/types.d.ts" />

'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const generate_docs_1 = require('./generate-docs');
const utils_1 = require('./utils');
const config_json_1 = __importDefault(require('./config.json'));
const PATH_TO_SCHEMA_FILE = config_json_1.default.output;
const UNIQUE_IDENTIFIER_KEY = `declare const uniqueIdentifier: unique symbol`;
const UNIQUE_IDENTIFIER = `
	/**
	 * This is a unique identifier to help TypeScript differentiate this interface from others sharing the same properties.
	 * Refer to https://github.com/satohshi/pocketbase-ts#dealing-with-tables-with-exactly-the-same-properties for more information.
	 */
	readonly [uniqueIdentifier]: unique symbol
`;
const TYPE_MAP = {
  number: 'number',
  bool: 'boolean',
  json: 'any'
};
exports.default = () => {
  var _a, _b, _c, _d, _e;
  var _f;
  const allCollections = $app.findAllCollections();
  const collectionIdToNameMap = Object.fromEntries(
    allCollections.map((collection) => [collection.id, collection.name])
  );
  let collectionInterfaces = '';
  const fieldSets = [];
  for (const collection of allCollections) {
    const fields = new Set();
    collectionInterfaces += (0, utils_1.newLine)(
      0,
      `export interface ${(0, utils_1.toPascalCase)(collection.name)} {`
    );
    for (const fieldOptions of collection.fields) {
      const name = fieldOptions.name;
      const type = fieldOptions.type();
      const multipleValues =
        (_b =
          (_a = fieldOptions.isMultiple) === null || _a === void 0
            ? void 0
            : _a.call(fieldOptions)) !== null && _b !== void 0
          ? _b
          : false;
      if (config_json_1.default.includeDocstring) {
        collectionInterfaces += (0, utils_1.newLine)(
          1,
          (0, generate_docs_1.generateDocString)(
            fieldOptions,
            multipleValues,
            collectionIdToNameMap
          )
        );
      }
      if (type === 'select') {
        const selectOptions = fieldOptions.values.map((v) => `'${v}'`).join(' | ');
        const field = `${name}: ${multipleValues ? `(${selectOptions})[]` : selectOptions}`;
        fields.add(field);
        collectionInterfaces += (0, utils_1.newLine)(1, field);
      } else {
        const fieldType = (_c = TYPE_MAP[type]) !== null && _c !== void 0 ? _c : 'string';
        const field = `${name}: ${fieldType}${multipleValues ? '[]' : ''}`;
        fields.add(field);
        collectionInterfaces += (0, utils_1.newLine)(1, field);
      }
    }
    if (fieldSets.some((set) => (0, utils_1.haveSameValues)(set, fields))) {
      if (!collectionInterfaces.includes(UNIQUE_IDENTIFIER_KEY)) {
        collectionInterfaces =
          (0, utils_1.newLine)(0, UNIQUE_IDENTIFIER_KEY, 2) + collectionInterfaces;
      }
      collectionInterfaces += (0, utils_1.newLine)(1, UNIQUE_IDENTIFIER);
    }
    collectionInterfaces += (0, utils_1.newLine)(0, '}', 2);
    fieldSets.push(fields);
  }
  const collectionToRelationMap = {};
  for (const collection of allCollections) {
    const fieldsWithUniqueIndex = new Set(
      collection.indexes
        .filter((index) => index.includes('UNIQUE') && !index.includes(','))
        .map((index) => /^CREATE UNIQUE.+\(`?([^`\s]+).*\).*/.exec(index)[1])
    );
    for (const fieldSchema of collection.fields) {
      (_d = collectionToRelationMap[(_f = collection.name)]) !== null && _d !== void 0
        ? _d
        : (collectionToRelationMap[_f] = []);
      if (fieldSchema.type() === 'relation') {
        const isOptional = !fieldSchema.required;
        const isToMany = fieldSchema.isMultiple();
        const relatedCollectionName = collectionIdToNameMap[fieldSchema.collectionId];
        const hasUniqueConstraint = fieldsWithUniqueIndex.has(fieldSchema.name);
        collectionToRelationMap[collection.name].push(
          `${fieldSchema.name}${isOptional ? '?' : ''}: ${(0, utils_1.toPascalCase)(relatedCollectionName)}${isToMany ? '[]' : ''}`
        );
        let backRelation = `${collection.name}_via_${fieldSchema.name}?: ${(0, utils_1.toPascalCase)(collection.name)}`;
        if (!hasUniqueConstraint) {
          backRelation = `// ${backRelation}[]`;
        }
        (_e = collectionToRelationMap[relatedCollectionName]) !== null && _e !== void 0
          ? _e
          : (collectionToRelationMap[relatedCollectionName] = []);
        collectionToRelationMap[relatedCollectionName].push(backRelation);
      }
    }
  }
  let schemaText = `/**
 * Commented-out back-relations are what will be inferred by pocketbase-ts from the forward relations.
 *
 * The "UNIQUE index constraint" case is automatically handled by this hook,
 * but if you want to make a back-relation non-nullable, you can uncomment it and remove the "?".
 *
 * See [here](https://github.com/satohshi/pocketbase-ts#back-relations) for more information.
 */
`;
  schemaText += (0, utils_1.newLine)(0, 'export type Schema = {');
  for (const [collection, relations] of Object.entries(collectionToRelationMap)) {
    schemaText += (0, utils_1.newLine)(1, `${collection}: {`);
    schemaText += (0, utils_1.newLine)(2, `type: ${(0, utils_1.toPascalCase)(collection)}`);
    if (relations.length) {
      schemaText += (0, utils_1.newLine)(2, `relations: {`);
      for (const relation of relations) {
        schemaText += (0, utils_1.newLine)(3, relation);
      }
      schemaText += (0, utils_1.newLine)(2, `}`);
    }
    schemaText += (0, utils_1.newLine)(1, `}`);
  }
  schemaText += (0, utils_1.newLine)(0, `}`);
  $os.writeFile(PATH_TO_SCHEMA_FILE + 'schema.ts', collectionInterfaces + schemaText, 0o644);

  let schemaJson = {
    indexes: {},
    fields: {}
  };
  // let record = $app.findFirstRecordByFilter('users', '', {})

  // console.log(JSON.stringify(record))
  for (const collection of allCollections) {
    let record;
    try {
      record = $app.findFirstRecordByFilter(collection.name, '', {});
    } catch (e) { }

    const fields = collection.fields
      .map((fieldOptions) => {
        if (fieldOptions.getHidden() || fieldOptions.getSystem()) return;

        return {
          ...fieldOptions,
          type: fieldOptions.type(),
          sample: record?.get(fieldOptions.name) ?? 'sample'
        };
      })
      .filter(Boolean);

    const indexes = [];
    for (const field of fields) {
      indexes.push(field.name);
      // console.log(field.type)
      if (field.type === 'text') {
        indexes.push(field.name + ':lower');
      }
      if (field.type === 'relation') {
        allCollections
          .find((c) => c.id === field.collectionId)
          .fields.forEach((f) => {
            indexes.push(field.name + '.' + f.name);
            // console.log(f.type)
            if (f.type() === 'text' && f.name !== 'id') {
              indexes.push(field.name + '.' + f.name + ':lower');
            }
          });
      }
    }

    if (fields.length === 0) continue;
    schemaJson.fields[collection.name] = fields;
    schemaJson.indexes[collection.name] = indexes;
  }

  // for (const collection of allCollections) {
  //   const indexes = [];
  //   for (const field of schemaJson.fields[collection.id]) {
  //     indexes.push(field.name)
  //     if (field.type === 'relation') {
  //       indexes.push(field.name + '.' + field.collectionId)
  //     }
  //   }
  //   schemaJson.indexes[collection.name] = indexes
  // }

  $os.writeFile(PATH_TO_SCHEMA_FILE + 'schema.json', JSON.stringify(schemaJson, null, 2), 0o644);
};
