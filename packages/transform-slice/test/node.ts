import { createReadStream } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect } from 'aegir/chai'
import { nodeTransformStream } from '../src/node-transform-stream.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url))

async function getAllStreamData (stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
    stream.on('end', () => {
      resolve(Buffer.concat(chunks))
    })
    stream.on('error', reject)
  })
}
describe('using nodejs streams', () => {
  it('.pipe', async () => {
    const slicedStream = createReadStream(join(__dirname, '..', '..', 'README.md')).pipe(nodeTransformStream(100, 200)) // read 200 bytes starting from the 100th byte
    // wait for the stream to finish, and ensure it's got only 200 bytes

    const data = await getAllStreamData(slicedStream)
    expect(data.byteLength).to.equal(200)
  })
})
