# Valist

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fvalist-io%2Fvalist&env=WEB3_PROVIDER&envDescription=Enter%20a%20Web3%20HTTP%20Provider%20(can%20be%20an%20Infura%20Project%20URL))

A software/firmware/binary data notary system, similar to the concept that Apple uses to digitally sign and secure applications, but open to developers to extend and integrate into almost any system, traditional or decentralized.

## Overview

Valist seeks to create a secure, trustless software distribution system for both traditional and decentralized infrastructures. With valist there is no need for expensive and centralized PKIs or manual code signing processes!

The Valist API supports the following package types natively, with many more in the pipeline:

* Any arbitrary binaries (software, firmware, you name it)

* NPM packages (native `npm install` support)

* Pip packages

* Docker images

The ultimate goal is to be able to point **any** software distribution system at a Valist relay, which will ensure the integrity of the packages and act as a universal cache.

You can think of it as a trustless **Bintray**, or a universal **Verdaccio**, but with far more powerful `access control` and `data integrity` features.

This includes key features such as **multi-factor releases** where M of N keys are needed to sign off on some firmware before release, as well as the ability to use any hardware wallet to sign code.

## Documentation

Documentation for how to get started with Valist can be found at [https://docs.valist.io](https://docs.valist.io)

## What's next

* [x] Full-featured Web UI

* [x] (Basic) Support for NPM registries

* [ ] Filecoin integration

* [ ] CLI and CI/CD support

* [ ] Deployment tooling for Relays

* [ ] Encryption Support