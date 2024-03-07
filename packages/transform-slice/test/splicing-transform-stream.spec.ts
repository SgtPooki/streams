import { prefixLogger } from '@libp2p/logger'
import { expect } from 'aegir/chai'
import toBrowserReadableStream from 'it-to-browser-readablestream'
import { spliceStream, transformStream } from '../src/index.js'

describe('spliceStream', () => {
  const logger = prefixLogger('test')
  const streamRepresentations: Array<() => Generator<Uint8Array, void, unknown>> = [
    function * () {
      // the whole stream in one chunk
      yield new Uint8Array([0, 1, 2, 3, 4, 5])
    },
    function * () {
      // 5 byte chunk, then 1 byte chunk
      yield new Uint8Array([0, 1, 2, 3, 4])
      yield new Uint8Array([5])
    },
    function * () {
      // 4 byte chunk, then 2 byte chunk
      yield new Uint8Array([0, 1, 2, 3])
      yield new Uint8Array([4, 5])
    },
    function * () {
      // 3 byte chunks
      yield new Uint8Array([0, 1, 2])
      yield new Uint8Array([3, 4, 5])
    },
    function * () {
      // 2 byte chunk, then 4 byte chunk
      yield new Uint8Array([0, 1])
      yield new Uint8Array([2, 3, 4, 5])
    },
    function * () {
      // 1 byte chunk, then 5 byte chunk
      yield new Uint8Array([0])
      yield new Uint8Array([1, 2, 3, 4, 5])
    },
    function * () {
      // 2 byte chunks
      yield new Uint8Array([0, 1])
      yield new Uint8Array([2, 3])
      yield new Uint8Array([4, 5])
    },
    function * () {
      // 2 byte chunk, 1 byte chunk, then 3 byte chunk
      yield new Uint8Array([0, 1])
      yield new Uint8Array([2])
      yield new Uint8Array([3, 4, 5])
    },
    function * () {
      // 3 byte chunk, 1 byte chunk, then 2 byte chunk
      yield new Uint8Array([0, 1, 2])
      yield new Uint8Array([3])
      yield new Uint8Array([4, 5])
    },
    function * () {
      // 2 byte chunk, two 1 byte chunks, then 2 byte chunk
      yield new Uint8Array([0, 1])
      yield new Uint8Array([2])
      yield new Uint8Array([3])
      yield new Uint8Array([4, 5])
    },
    function * () {
      // 2 byte chunk, then 1 byte chunks
      yield new Uint8Array([0, 1])
      yield new Uint8Array([2])
      yield new Uint8Array([3])
      yield new Uint8Array([4])
      yield new Uint8Array([5])
    },
    function * () {
      // 1 byte chunks
      yield new Uint8Array([0])
      yield new Uint8Array([1])
      yield new Uint8Array([2])
      yield new Uint8Array([3])
      yield new Uint8Array([4])
      yield new Uint8Array([5])
    }
  ]
  const getActualStreamContent = (): Uint8Array => new Uint8Array([0, 1, 2, 3, 4, 5])
  describe(':offset-only', () => {
    streamRepresentations.forEach((streamChunkRep, repIndex) => {
      for (let offset = 0; offset <= 5; offset++) {
        it(`should correctly splice the stream for "bytes=${offset}-" with streamRepresentations[${repIndex}]`, async () => {
          const stream = toBrowserReadableStream(streamChunkRep())
          const transformedStream = spliceStream(stream, offset, undefined, logger)
          const result = await new Response(transformedStream).arrayBuffer().then((buf) => new Uint8Array(buf))
          const expected = getActualStreamContent().slice(offset)
          expect(result).to.deep.equal(expected)
        })
      }
    })
  })

  describe(':offset-and-length', () => {
    streamRepresentations.forEach((streamChunkRep, repIndex) => {
      for (let offset = 0; offset <= 5; offset++) {
        for (let length = 0; length <= 5 - offset; length++) {
          it(`should correctly splice the stream for "bytes=${offset}-${offset + length}" with streamRepresentations[${repIndex}]`, async () => {
            const stream = toBrowserReadableStream(streamChunkRep())
            const transformedStream = spliceStream(stream, offset, length, logger)
            const result = await new Response(transformedStream).arrayBuffer().then((buf) => new Uint8Array(buf))
            const expected = getActualStreamContent().slice(offset, offset + length)
            expect(result).to.deep.equal(expected)
          })
        }
      }
    })
  })

  describe(':length-only', () => {
    streamRepresentations.forEach((streamChunkRep, repIndex) => {
      for (let length = 1; length <= 6; length++) {
        it(`should correctly splice the stream for "bytes=-${length}" with streamRepresentations[${repIndex}]`, async () => {
          const stream = toBrowserReadableStream(streamChunkRep())
          const transformedStream = spliceStream(stream, undefined, length, logger)
          const result = await new Response(transformedStream).arrayBuffer().then((buf) => new Uint8Array(buf))
          const expected = getActualStreamContent().slice(-length)
          expect(result).to.deep.equal(expected)
        })
      }
    })
  })

  describe('piping', () => {
    it('can be passed to originalStream.pipeThrough method', async () => {
      const stream = toBrowserReadableStream(streamRepresentations[0]())
      const transformedStream = stream.pipeThrough(transformStream(2, 2, logger))
      const result = await new Response(transformedStream).arrayBuffer().then((buf) => new Uint8Array(buf))
      const expected = getActualStreamContent().slice(2, 4)
      expect(result).to.deep.equal(expected)
    })
  })
})
