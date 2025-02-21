declare const uniqueIdentifier: unique symbol

export interface Mfas {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    collectionRef: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    recordRef: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    method: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Otps {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    collectionRef: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    recordRef: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `password` |
     * | hidden   | `true`     |
     * | required | `true`     |
     */
    password: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `true`  |
     * | required | `false` |
     */
    sentTo: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface ExternalAuths {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    collectionRef: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    recordRef: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    provider: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    providerId: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface AuthOrigins {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    collectionRef: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    recordRef: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    fingerprint: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Superusers {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `password` |
     * | hidden   | `true`     |
     * | min      | `8`        |
     * | required | `true`     |
     */
    password: string
    /**
     * |                     |                   |
     * | ------------------- | ----------------- |
     * | type                | `text`            |
     * | hidden              | `true`            |
     * | min                 | `30`              |
     * | max                 | `60`              |
     * | autogeneratePattern | `[a-zA-Z0-9]{50}` |
     * | required            | `true`            |
     */
    tokenKey: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    email: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `bool`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    emailVisibility: boolean
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `bool`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    verified: boolean
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Users {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `password` |
     * | hidden   | `true`     |
     * | min      | `8`        |
     * | required | `true`     |
     */
    password: string
    /**
     * |                     |                   |
     * | ------------------- | ----------------- |
     * | type                | `text`            |
     * | hidden              | `true`            |
     * | min                 | `30`              |
     * | max                 | `60`              |
     * | autogeneratePattern | `[a-zA-Z0-9]{50}` |
     * | required            | `true`            |
     */
    tokenKey: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    email: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `bool`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    emailVisibility: boolean
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `bool`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    verified: boolean
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | max      | `255`   |
     * | required | `false` |
     */
    name: string
    /**
     * |           |                                                                       |
     * | --------- | --------------------------------------------------------------------- |
     * | type      | `file(single)`                                                        |
     * | hidden    | `false`                                                               |
     * | mimeTypes | `image/jpeg`, `image/png`, `image/svg+xml`, `image/gif`, `image/webp` |
     * | protected | `false`                                                               |
     * | required  | `false`                                                               |
     */
    avatar: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `pbc_2105053228`   |
     * | collectionName | `roles`            |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    role: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Applicants {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |            |
     * | -------- | ---------- |
     * | type     | `password` |
     * | hidden   | `true`     |
     * | min      | `8`        |
     * | required | `true`     |
     */
    password: string
    /**
     * |                     |                   |
     * | ------------------- | ----------------- |
     * | type                | `text`            |
     * | hidden              | `true`            |
     * | min                 | `30`              |
     * | max                 | `60`              |
     * | autogeneratePattern | `[a-zA-Z0-9]{50}` |
     * | required            | `true`            |
     */
    tokenKey: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `email` |
     * | hidden   | `false` |
     * | required | `true`  |
     */
    email: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `bool`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    emailVisibility: boolean
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `bool`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    verified: boolean
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    name: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    nik: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    address: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    birth: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    phone: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    gender: 'Laki Laki' | 'Perempuan'
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface QuestionsCategories {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    name: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `true`           |
     */
    status: 'active' | 'disabled'
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `bool`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    protected: boolean
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Posts {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    title: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    content: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    slug: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | protected | `false`        |
     * | required  | `false`        |
     */
    media: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'draft' | 'published' | 'archive'
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    schedule: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    tags: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    user: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Pages {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    title: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    content: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    slug: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | protected | `false`        |
     * | required  | `false`        |
     */
    media: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'draft' | 'published' | 'archive'
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    schedule: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    tags: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    user: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
    
	/**
	 * This is a unique identifier to help TypeScript differentiate this interface from others sharing the same properties.
	 * Refer to https://github.com/satohshi/pocketbase-ts#dealing-with-tables-with-exactly-the-same-properties for more information.
	 */
	readonly [uniqueIdentifier]: unique symbol

}

export interface Galleries {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    title: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | protected | `false`        |
     * | required  | `false`        |
     */
    media: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'scheduled' | 'completed' | 'canceled'
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    schedule: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    location: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    start: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    end: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Roles {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    name: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    permissions: any
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'active' | 'inactive'
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Vacancies {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    code: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    title: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    category: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    location: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    position: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    requirements: any
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    type: 'recruitment' | 'assesment'
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'open' | 'closed' | 'pending'
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Questions {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation(single)`    |
     * | hidden         | `false`               |
     * | collectionId   | `pbc_3610134426`      |
     * | collectionName | `questionsCategories` |
     * | cascadeDelete  | `false`               |
     * | required       | `false`               |
     */
    category: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    question: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    options: any
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    answer: any
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface ReferencesCategories {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    name: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    category: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    type: 'browser' | 'navigation' | 'percent' | 'point'
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface VacanciesTemplates {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    name: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `json`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    stages: any
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `true`           |
     */
    status: 'active' | 'disabled'
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `bool`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    protected: boolean
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Results {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `pbc_4248681665`   |
     * | collectionName | `vacancies`        |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    vacancy: string
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation(single)`    |
     * | hidden         | `false`               |
     * | collectionId   | `pbc_3610134426`      |
     * | collectionName | `questionsCategories` |
     * | cascadeDelete  | `false`               |
     * | required       | `false`               |
     */
    category: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `pbc_4009210445`   |
     * | collectionName | `questions`        |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    question: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    answer: string
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | onlyInt  | `false`  |
     * | required | `false`  |
     */
    score: number
    /**
     * |           |                  |
     * | --------- | ---------------- |
     * | type      | `file(multiple)` |
     * | hidden    | `false`          |
     * | maxSelect | `99`             |
     * | protected | `false`          |
     * | required  | `false`          |
     */
    file: string[]
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `pbc_3081603196`   |
     * | collectionName | `applied`          |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    applied: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface VacanciesSchedule {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `pbc_4248681665`   |
     * | collectionName | `vacancies`        |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    vacancy: string
    /**
     * |                |                       |
     * | -------------- | --------------------- |
     * | type           | `relation(single)`    |
     * | hidden         | `false`               |
     * | collectionId   | `pbc_3610134426`      |
     * | collectionName | `questionsCategories` |
     * | cascadeDelete  | `false`               |
     * | required       | `false`               |
     */
    questionCategory: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    batch: string
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | onlyInt  | `false`  |
     * | required | `false`  |
     */
    questionNumber: number
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | onlyInt  | `false`  |
     * | required | `false`  |
     */
    passingGrade: number
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | onlyInt  | `false`  |
     * | required | `false`  |
     */
    stage: number
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'open' | 'closed'
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    start: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    end: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface References {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |                |                        |
     * | -------------- | ---------------------- |
     * | type           | `relation(single)`     |
     * | hidden         | `false`                |
     * | collectionId   | `pbc_2769025244`       |
     * | collectionName | `referencesCategories` |
     * | cascadeDelete  | `false`                |
     * | required       | `false`                |
     */
    category: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    name: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    value: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | protected | `false`        |
     * | required  | `false`        |
     */
    file: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'active' | 'inactive'
    /**
     * |          |          |
     * | -------- | -------- |
     * | type     | `number` |
     * | hidden   | `false`  |
     * | onlyInt  | `false`  |
     * | required | `false`  |
     */
    order: number
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Companies {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    user: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    name: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |           |                |
     * | --------- | -------------- |
     * | type      | `file(single)` |
     * | hidden    | `false`        |
     * | protected | `false`        |
     * | required  | `false`        |
     */
    media: string
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'active' | 'inactive'
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Interviews {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `pbc_4248681665`   |
     * | collectionName | `vacancies`        |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    vacancy: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `text`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    name: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    description: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `url`   |
     * | hidden   | `false` |
     * | required | `false` |
     */
    link: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    start: string
    /**
     * |          |         |
     * | -------- | ------- |
     * | type     | `date`  |
     * | hidden   | `false` |
     * | required | `false` |
     */
    end: string
    /**
     * |                |                      |
     * | -------------- | -------------------- |
     * | type           | `relation(multiple)` |
     * | hidden         | `false`              |
     * | collectionId   | `_pb_users_auth_`    |
     * | collectionName | `users`              |
     * | cascadeDelete  | `false`              |
     * | maxSelect      | `999`                |
     * | required       | `false`              |
     */
    users: string[]
    /**
     * |                |                      |
     * | -------------- | -------------------- |
     * | type           | `relation(multiple)` |
     * | hidden         | `false`              |
     * | collectionId   | `pbc_3231175423`     |
     * | collectionName | `applicants`         |
     * | cascadeDelete  | `false`              |
     * | maxSelect      | `999`                |
     * | required       | `false`              |
     */
    applicants: string[]
    /**
     * |          |                  |
     * | -------- | ---------------- |
     * | type     | `select(single)` |
     * | hidden   | `false`          |
     * | required | `false`          |
     */
    status: 'open' | 'closed'
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

export interface Applied {
    /**
     * |                     |                |
     * | ------------------- | -------------- |
     * | type                | `text`         |
     * | hidden              | `false`        |
     * | min                 | `15`           |
     * | max                 | `15`           |
     * | pattern             | `^[a-z0-9]+$`  |
     * | autogeneratePattern | `[a-z0-9]{15}` |
     * | required            | `true`         |
     */
    id: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `pbc_3231175423`   |
     * | collectionName | `applicants`       |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    applicant: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `_pb_users_auth_`  |
     * | collectionName | `users`            |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    user: string
    /**
     * |                |                    |
     * | -------------- | ------------------ |
     * | type           | `relation(single)` |
     * | hidden         | `false`            |
     * | collectionId   | `pbc_4248681665`   |
     * | collectionName | `vacancies`        |
     * | cascadeDelete  | `false`            |
     * | required       | `false`            |
     */
    vacancy: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `false`     |
     */
    created: string
    /**
     * |          |             |
     * | -------- | ----------- |
     * | type     | `autodate`  |
     * | hidden   | `false`     |
     * | onCreate | `true`      |
     * | onUpdate | `true`      |
     */
    updated: string
}

/**
 * Commented-out back-relations are what will be inferred by pocketbase-ts from the forward relations.
 *
 * The "UNIQUE index constraint" case is automatically handled by this hook,
 * but if you want to make a back-relation non-nullable, you can uncomment it and remove the "?".
 *
 * See [here](https://github.com/satohshi/pocketbase-ts#back-relations) for more information.
 */
export type Schema = {
    _mfas: {
        type: Mfas
    }
    _otps: {
        type: Otps
    }
    _externalAuths: {
        type: ExternalAuths
    }
    _authOrigins: {
        type: AuthOrigins
    }
    _superusers: {
        type: Superusers
    }
    users: {
        type: Users
        relations: {
            role?: Roles
            // posts_via_user?: Posts[]
            // pages_via_user?: Pages[]
            // companies_via_user?: Companies[]
            // interviews_via_users?: Interviews[]
            // applied_via_user?: Applied[]
        }
    }
    roles: {
        type: Roles
        relations: {
            // users_via_role?: Users[]
        }
    }
    applicants: {
        type: Applicants
        relations: {
            // interviews_via_applicants?: Interviews[]
            // applied_via_applicant?: Applied[]
        }
    }
    questionsCategories: {
        type: QuestionsCategories
        relations: {
            // questions_via_category?: Questions[]
            // results_via_category?: Results[]
            // vacanciesSchedule_via_questionCategory?: VacanciesSchedule[]
        }
    }
    posts: {
        type: Posts
        relations: {
            user?: Users
        }
    }
    pages: {
        type: Pages
        relations: {
            user?: Users
        }
    }
    galleries: {
        type: Galleries
    }
    vacancies: {
        type: Vacancies
        relations: {
            // results_via_vacancy?: Results[]
            // vacanciesSchedule_via_vacancy?: VacanciesSchedule[]
            // interviews_via_vacancy?: Interviews[]
            // applied_via_vacancy?: Applied[]
        }
    }
    questions: {
        type: Questions
        relations: {
            category?: QuestionsCategories
            // results_via_question?: Results[]
        }
    }
    referencesCategories: {
        type: ReferencesCategories
        relations: {
            // references_via_category?: References[]
        }
    }
    vacanciesTemplates: {
        type: VacanciesTemplates
    }
    results: {
        type: Results
        relations: {
            vacancy?: Vacancies
            category?: QuestionsCategories
            question?: Questions
            applied?: Applied
        }
    }
    applied: {
        type: Applied
        relations: {
            // results_via_applied?: Results[]
            applicant?: Applicants
            user?: Users
            vacancy?: Vacancies
        }
    }
    vacanciesSchedule: {
        type: VacanciesSchedule
        relations: {
            vacancy?: Vacancies
            questionCategory?: QuestionsCategories
        }
    }
    references: {
        type: References
        relations: {
            category?: ReferencesCategories
        }
    }
    companies: {
        type: Companies
        relations: {
            user?: Users
        }
    }
    interviews: {
        type: Interviews
        relations: {
            vacancy?: Vacancies
            users?: Users[]
            applicants?: Applicants[]
        }
    }
}
