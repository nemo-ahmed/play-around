import fs from 'fs'
import zlib from 'zlib'
import {getPath} from './getPath'

/**
 * To zip all file in the directory.
 * @param dir directory name
 */
export async function zippingFile(filename: string) {
  return new Promise((resolve, reject) => {
    const fileContents = fs.createReadStream(getPath(filename))
    const writeStream = fs.createWriteStream(getPath(`${filename}.gz`))
    const zip = zlib.createGzip()
    fileContents
      .pipe(zip)
      .pipe(writeStream)
      .on('error', err => {
        if (err) return reject(err)
      })
      .on('finish', () => {
        resolve(filename)
      })
  })
    .then(() => console.log('done'))
    .catch(err => console.log(err))
    .finally(() => {
      // ? Delete the file after zipping it
      fs.rmSync(getPath(filename), {
        force: true,
      })
    })
}
/**
 * To zip all files in the directory.
 * @param dir directory name
 */
export async function zippingFiles(dir: 'soduku') {
  const directoryFiles = fs
    .readdirSync(getPath(dir))
    .filter(filename => !filename.endsWith('.gz'))

  return await Promise.all(
    directoryFiles.map(filename => {
      console.log(filename)
      return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(getPath(`${dir}/${filename}`))
        const writeStream = fs.createWriteStream(
          getPath(`${dir}/${filename}.gz`),
        )
        const zip = zlib.createGzip()
        fileContents
          .pipe(zip)
          .pipe(writeStream)
          .on('error', err => {
            if (err) return reject(err)
          })
          .on('finish', () => {
            resolve(filename)
          })
      })
    }),
  )
    .then(() => console.log('done'))
    .catch(err => console.log(err))
    .finally(() => {
      // ? Delete the file after zipping it
      directoryFiles.forEach(filename =>
        fs.rmSync(getPath(`${dir}/${filename}`), {
          force: true,
        }),
      )
    })
}

/**
 * To unzip in zipped file.
 * @param dir directory name
 */
export async function unzippingFile(filename: string) {
  return await new Promise((resolve, reject) => {
    const fileContents = fs.createReadStream(getPath(filename))
    const writeStream = fs.createWriteStream(getPath(filename.slice(0, -3)))
    const unzip = zlib.createGunzip()
    fileContents
      .pipe(unzip)
      .pipe(writeStream)
      .on('error', err => {
        if (err) return reject(err)
      })
      .on('finish', () => {
        resolve(filename)
      })
  })
    .then(() => console.log('done'))
    .catch(err => console.log('error', err))
    .finally(() => {
      // ? Delete the file after zipping it
      fs.rmSync(getPath(filename), {
        force: true,
      })
    })
}

/**
 * To unzip all files in zipped directory.
 * @param dir directory name
 */
export async function unzippingFiles(dir: 'soduku') {
  const directoryFiles = fs
    .readdirSync(getPath(dir))
    .filter(filename => filename.endsWith('.gz'))

  return await Promise.all(
    directoryFiles.map(filename => {
      return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(getPath(`${dir}/${filename}`))
        const writeStream = fs.createWriteStream(
          getPath(`${dir}/${filename.slice(0, -3)}`),
        )
        const unzip = zlib.createGunzip()
        fileContents
          .pipe(unzip)
          .pipe(writeStream)
          .on('error', err => {
            if (err) return reject(err)
          })
          .on('finish', () => {
            resolve(filename)
          })
      })
    }),
  )
    .then(() => console.log('done'))
    .catch(err => console.log('error', err))
    .finally(() => {
      // ? Delete the file after zipping it
      directoryFiles.forEach(filename =>
        fs.rmSync(getPath(`${dir}/${filename}`), {
          force: true,
        }),
      )
    })
}
