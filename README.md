# Stream utilities

[![codecov](https://img.shields.io/codecov/c/github/sgtpooki/streams.svg?style=flat-square)](https://codecov.io/gh/sgtpooki/streams)
[![CI](https://img.shields.io/github/actions/workflow/status/sgtpooki/streams/js-test-and-release.yml?branch=main\&style=flat-square)](https://github.com/sgtpooki/streams/actions/workflows/js-test-and-release.yml?query=branch%3Amain)


## About

This monorepo contains the `@sgtpooki/streams-transform-slice` package and its corresponding interop tests.

# Getting started

See the [**`@sgtpooki/streams-transform-slice`**](./packages/transform-slice#readme) package for how to get started with the package including usage examples.

# Packages

- [`@sgtpooki/streams-transform-slice`](./packages/transform-slice) A transform stream that accepts a ReadableStream, offsets and length and returns a ReadableStream containing only the specified slice of the input stream.
- [`@sgtpooki/streams-transform-slice-interop`](./packages/interop) Interop tests for @sgtpooki/streams-* packages

# License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

# Contribute

Contributions welcome! Please check out [the issues](https://github.com/sgtpooki/streams/issues).

Also see our [contributing document](https://github.com/ipfs/community/blob/master/CONTRIBUTING_JS.md) for more information on how we work, and about contributing in general.

Please be aware that all interactions related to this repo are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
