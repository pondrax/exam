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
    birthDate: string
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

export interface Templates {
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

export interface Streams {
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
    email: string
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
    audioData: string
    /**
     * |             |          |
     * | ----------- | -------- |
     * | type        | `editor` |
     * | hidden      | `false`  |
     * | convertURLs | `false`  |
     * | required    | `false`  |
     */
    imageData: string
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
    }
    applicants: {
        type: Applicants
    }
    templates: {
        type: Templates
    }
    streams: {
        type: Streams
    }
}
