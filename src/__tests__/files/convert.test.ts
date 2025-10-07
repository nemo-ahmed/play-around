import {SodukuPromiseReturn} from '@/types/soduku'
import {
  checkIfFileExist,
  appendOrCreateFile,
  readLocalFile,
  getPath,
} from '@/utils/filesHandling'
import {mkdirSync, rmdirSync, rmSync} from 'fs'
import {writeFile} from 'fs/promises'
import {expect, test, suite, beforeAll, afterAll, vi} from 'vitest'

const FILENAME = 'test/testing'
const FILE_DATA = [
  {
    id: '6e74dcd05697',
    soduku:
      '175849623382756419649132587814327956236985741597614238923571864758463192461298375',
    rating: '1.5',
  },
]

const newData = {
  id: '6f9953e78fea',
  soduku:
    '431256789892347651657189342723915468965428137148673295386791524574832916219564873',
  rating: '1.7',
}

test('created file doesn`t exist', () => {
  expect(checkIfFileExist(FILENAME)).toBeFalsy()
})

suite('TeSting File', () => {
  beforeAll(async () => {
    // ? Creating testing directory and writing testing file
    mkdirSync(getPath('test'))
    await writeFile(
      getPath(FILENAME + '.json'),
      JSON.stringify({total: FILE_DATA.length, data: FILE_DATA}),
    )
  })
  afterAll(async () => {
    // ? Cleaning testing directory and writing testing file
    rmSync(getPath(FILENAME + '.json'))
    rmSync(getPath(FILENAME + '.json.gz'))
    rmdirSync(getPath('test'))
  })

  test('read file and confirm data', async () => {
    const res = await readLocalFile(FILENAME + '.json')
    console.log(res)
    const data = JSON.parse(res) as SodukuPromiseReturn
    expect(data.total).toEqual(1)
    expect(data.data).toHaveLength(1)
    expect(data.data[0].id).toEqual(FILE_DATA[0].id)
    expect(data.data[0].rating).toEqual(FILE_DATA[0].rating)
    expect(data.data[0].soduku).toEqual(FILE_DATA[0].soduku)
  })

  test('update file data', async () => {
    await appendOrCreateFile({[FILENAME]: [newData]})

    expect(checkIfFileExist(FILENAME + '.json')).toBeTruthy()

    const res = await readLocalFile(FILENAME + '.json')

    console.log(res)
    const data = JSON.parse(res) as SodukuPromiseReturn
    expect(data.total).toEqual(2)
    expect(data.data).toHaveLength(2)

    expect(data.data[0].id).toEqual(FILE_DATA[0].id)
    expect(data.data[0].rating).toEqual(FILE_DATA[0].rating)
    expect(data.data[0].soduku).toEqual(FILE_DATA[0].soduku)
  })

  test('Confirm updated file', async () => {
    const res = await vi.waitFor(
      async () => {
        return await readLocalFile(FILENAME + '.json')
      },
      {
        timeout: 500, // default is 1000
        interval: 20, // default is 50
      },
    )
    console.log(res)
    const data = JSON.parse(res) as SodukuPromiseReturn
    expect(data.data[1].id).toEqual(newData.id)
    expect(data.data[1].rating).toEqual(newData.rating)
    expect(data.data[1].soduku).toEqual(newData.soduku)
  })

  test('Confirm Zipped file', async () => {
    expect(checkIfFileExist(FILENAME + '.json.gz')).toBeTruthy()
  })
})
