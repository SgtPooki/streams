import { Transform } from 'node:stream'
import { getTransformFunctions } from './get-transform-functions.js'
import type { ComponentLogger } from '@libp2p/logger'

export const nodeTransformStream = (offset: number | undefined, length: number | undefined, logger?: ComponentLogger): Transform => {
  // we need to use the node transform stream API
  const { transform, flush } = getTransformFunctions(offset, length, logger)

  return new Transform({
    async transform (chunk, encoding, callback) {
      // we need to create an enqueue function that will call this.push
      const enqueue = (data: Uint8Array): void => {
        this.push(data)
        // callback()
      }
      const fakeController: TransformStreamDefaultController<Uint8Array> = {
        // isTerminated: false,
        enqueue,
        error: (err: Error) => { callback(err) },
        desiredSize: 0, // not implemented
        terminate () {
          // this.isTerminated = true
          // callback()
        }
      }
      await Promise.resolve(transform(chunk, fakeController)).then(() => { callback() }).catch(callback)
    },
    async flush (callback) {
      if (flush == null) {
        callback()
        return
      }
      // we need to create an enqueue function that will call this.push
      const enqueue = (data: Uint8Array): void => {
        this.push(data)
        callback()
      }
      const fakeController: TransformStreamDefaultController<Uint8Array> = {
        enqueue,
        error: (err: Error) => { callback(err) },
        desiredSize: 0, // not implemented
        terminate: () => { callback() }
      }
      void Promise.resolve(flush(fakeController)).then(() => { callback() }).catch(callback)
    }

  })
}
