import { getTransformFunctions } from './get-transform-functions.js'
import type { ComponentLogger } from '@libp2p/logger'

/**
 * Given a stream and a byte range, returns a new stream that only contains the requested range
 *
 * offset is inclusive
 * final byte included is offset + length - 1
 */
export const transformStream = (offset: number | undefined, length: number | undefined, logger?: ComponentLogger): TransformStream<Uint8Array, Uint8Array> => {
  const { transform, flush } = getTransformFunctions(offset, length, logger)

  return new TransformStream<Uint8Array, Uint8Array>({
    transform,
    flush
  })
}

// @ts-expect-error - this is a typecheck only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface typechecks extends Record<string, true> {
  canPipeThrough: ReturnType<typeof transformStream> extends Parameters<ReadableStream['pipeThrough']>[0] ? true : false
}
