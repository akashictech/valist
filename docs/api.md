# Using the Valist API

Using the Valist API you can easily query your software/firmware distributions through a convenient web2 rest API. By default a valist relay has a dedicated API route at `/api`.

## Getting the Latest Project Release (GET)

Fetches the latest release for a project.

```
/api/<OrgName>/<ProjectName>/latest
```

```
https://app.valist.io/api/valist/valist/latest
```

## Getting a Project Release by Version (GET)

Fetches the targe release for a project by tag.

```
/api/<OrgName>/<ProjectName>/<TAG>
```

```
https://app.valist.io/api/valist/valist/0.0.1
```

## Getting an Projects Metadata (GET)

Fetches the metadata for a project

```
/api/<OrgName>/meta
```

```
https://app.valist.io/api/valist/meta
```

## Getting an Organization's Metadata (GET)

Fetches the metadata for an organization

```
/api/<OrgName>/meta
```

```
https://app.valist.io/api/valist/meta
```