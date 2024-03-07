import { transformStream } from './transform-stream.js'
import type { ComponentLogger } from '@libp2p/logger'

/**
 * Helper function to slice the given stream based on the given offset and length
 */
export function spliceStream (originalStream: ReadableStream<Uint8Array>, offset: number | undefined, length: number | undefined, logger?: ComponentLogger): ReadableStream<Uint8Array> {
  return originalStream.pipeThrough(transformStream(offset, length, logger))
}
