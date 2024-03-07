# @sgtpooki/streams-transform-slice

[![codecov](https://img.shields.io/codecov/c/github/sgtpooki/slice-transform.svg?style=flat-square)](https://codecov.io/gh/sgtpooki/slice-transform)
[![CI](https://img.shields.io/github/actions/workflow/status/sgtpooki/slice-transform/js-test-and-release.yml?branch=main\&style=flat-square)](https://github.com/sgtpooki/slice-transform/actions/workflows/js-test-and-release.yml?query=branch%3Amain)

> A transform stream that accepts a ReadableStream, offsets and length and returns a ReadableStream containing only the specified slice of the input stream.

# About

<!--

!IMPORTANT!

Everything in this README between "# About" and "# Install" is automatically
generated and will be overwritten the next time the doc generator is run.

To make changes to this section, please update the @packageDocumentation section
of src/index.js or src/index.ts

To experiment with formatting, please run "npm run docs" from the root of this
repo and examine the changes made.

-->

## Example - Getting started

```typescript
import sliceTransformStream from '@sgtpooki/streams-transform-slice'

const response = await fetch('https://example.com/file.mp4')
if (response.body != null) {
 const slicedStream = response.body.pipeThrough(sliceTransformStream(100, 200)) // read 200 bytes starting from the 100th byte}
}
```

## Example - Without using pipeThrough methods

```typescript
import { spliceStream } from '@sgtpooki/streams-transform-slice'

const response = await fetch('https://example.com/file.mp4')

if (response.body != null) {
 const slicedStream = spliceStream(response.body, 100, 200) // read 200 bytes starting from the 100th byte
}
```

## Example - Using nodejs streams

```typescript
import { createReadStream } from 'node:fs'
import { nodeTransformStream } from '@sgtpooki/streams-transform-slice'

const slicedStream = createReadStream('file.mp4').pipe(nodeTransformStream(100, 200))
```

# Install

```console
$ npm i @sgtpooki/streams-transform-slice
```

## Browser `<script>` tag

Loading this module through a script tag will make it's exports available as `SgtpookiStreamsTransformSlice` in the global namespace.

```html
<script src="https://unpkg.com/@sgtpooki/streams-transform-slice/dist/index.min.js"></script>
```

# License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

# Contribute

Contributions welcome! Please check out [the issues](https://github.com/sgtpooki/slice-transform/issues).

Also see our [contributing document](https://github.com/ipfs/community/blob/master/CONTRIBUTING_JS.md) for more information on how we work, and about contributing in general.

Please be aware that all interactions related to this repo are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
