# Valist

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvalist-io%2Fvalist&env=WEB3_PROVIDER&envDescription=Enter%20a%20Web3%20HTTP%20Provider%20(can%20be%20an%20Infura%20Project%20URL))

A software/firmware/binary data notary system, similar to the concept that Apple uses to digitally sign and secure applications, but open to developers to extend and integrate into almost any system, traditional or decentralized.

## Our Mission

Valist seeks to create a secure, trustless software distribution system for both traditional and decentralized infrastructures. With valist there is no need for expensive and centralized PKIs or manual code signing processes!

The Valist API supports the following package types natively, with many more in the pipeline:

* Any arbitrary binaries (software, firmware, you name it)

* NPM packages (native `npm install` support)

* Pip packages

* Docker images

The ultimate goal is to be able to point **any** software distribution system at a Valist relay, which will ensure the integrity of the packages and act as a universal cache.

You can think of it as a trustless **Bintray**, or a universal **Verdaccio**, but with far more powerful `access control` and `data integrity` features.

This includes key features such as **multi-factor releases** where M of N keys are needed to sign off on some firmware before release, as well as the ability to use any hardware wallet to sign code.

## Setting up a Valist Relay from Source

1. Clone the valist repository ` git clone https://github.com/valist-io/valist.git`

2. Inside the `Relay` folder create a new `.env` containing a `WEB_PROVIDER` for matic:

    ```
    WEB3_PROVIDER=https://rpc-mumbai.matic.today
    ```

3. Run `make install`

4. Run `make run`

5. Considering using a tool such as `pm2` for process management and additional infrastructure logging.

## Using the Valist API

Using the Valist API you can easily query your software/firmware distributions through a convenient web2 rest API. By default a valist relay has a dedicated API route at `/api`.

### Getting the Latest Project Release (GET)

Fetches the latest release for a project.

```
/api/<OrgName>/<ProjectName>/latest
```

```
https://app.valist.io/api/valist/valist/latest
```

### Getting a Project Release by Version (GET)

Fetches the targe release for a project by tag.

```
/api/<OrgName>/<ProjectName>/<TAG>
```

```
https://app.valist.io/api/valist/valist/0.0.1
```

### Getting an Projects Metadata (GET)

Fetches the metadata for a project

```
/api/<OrgName>/meta
```

```
https://app.valist.io/api/valist/meta
```

### Getting an Organization's Metadata (GET)

Fetches the metadata for an organization

```
/api/<OrgName>/meta
```

```
https://app.valist.io/api/valist/meta
```

## What's next

* [x] Full-featured Web UI

* [x] (Basic) Support for NPM registries

* [ ] Filecoin integration

* [ ] CLI and CI/CD support

* [ ] Deployment tooling for Relays

* [ ] Encryption Support

## Documentation

Documentation for how to get started with Valist can be found at [https://docs.valist.io](https://docs.valist.io)
