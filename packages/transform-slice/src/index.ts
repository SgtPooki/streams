/**
 * @module @sgtpooki/streams-transform-slice
 *
 * @packageDocumentation
 *
 * `@sgtpooki/streams-transform-slice` is a transform stream that slices the bytes in an input stream based on the given offset and length. It is useful for implementing HTTP range requests or similar use cases.
 *
 * It should work in both Node.js and the browser.
 *
 * @example Getting started
 *
 * ```typescript
 * import sliceTransformStream from '@sgtpooki/streams-transform-slice'
 *
 * const response = await fetch('https://example.com/file.mp4')
 * if (response.body != null) {
 *  const slicedStream = response.body.pipeThrough(sliceTransformStream(100, 200)) // read 200 bytes starting from the 100th byte}
 * }
 * ```
 *
 * @example Without using pipeThrough methods
 *
 * ```typescript
 * import { spliceStream } from '@sgtpooki/streams-transform-slice'
 *
 * const response = await fetch('https://example.com/file.mp4')
 *
 * if (response.body != null) {
 *  const slicedStream = spliceStream(response.body, 100, 200) // read 200 bytes starting from the 100th byte
 * }
 * ```
 *
 * @example Using nodejs streams
 *
 * ```typescript
 * import { createReadStream } from 'node:fs'
 * import { nodeTransformStream } from '@sgtpooki/streams-transform-slice'
 *
 * const slicedStream = createReadStream('file.mp4').pipe(nodeTransformStream(100, 200))
 * ```
 */
import { nodeTransformStream } from './node-transform-stream.js'
import { spliceStream } from './splice-stream.js'
import { transformStream } from './transform-stream.js'

// warning of unknown symbols when running `npx aegir docs`
export type { ComponentLogger, Logger } from '@libp2p/logger'
export default transformStream

export { spliceStream, transformStream, nodeTransformStream }
