import fs from 'fs'
import zlib from 'zlib'

/**
 * To zip all files in the directory.
 * @param dir directory name
 */
export async function zippingFiles(dir: 'soduku') {
  const directoryFiles = fs
    .readdirSync(process.cwd() + `/src/data/${dir}`)
    .filter(filename => !filename.endsWith('.gz'))

  return await Promise.all(
    directoryFiles.map(filename => {
      console.log(filename)
      return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(
          process.cwd() + `/src/data/${dir}/${filename}`,
        )
        const writeStream = fs.createWriteStream(
          process.cwd() + `/src/data/${dir}/${filename}.gz`,
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
    }, []),
  )
    .then(() => console.log('done'))
    .catch(err => console.log(err))
    .finally(() => {
      // ? Delete the file after zipping it
      directoryFiles.forEach(filename =>
        fs.rmSync(process.cwd() + `/src/data/${dir}/${filename}`, {
          force: true,
        }),
      )
    })
}

/**
 * To unzip all files in zipped directory.
 * @param dir directory name
 */
export async function unzipping(dir: 'soduku') {
  const directoryFiles = fs
    .readdirSync(process.cwd() + `/src/data/${dir}`)
    .filter(filename => filename.endsWith('.gz'))

  return await Promise.all(
    directoryFiles.map(filename => {
      return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(
          process.cwd() + `/src/data/${dir}/${filename}`,
        )
        const writeStream = fs.createWriteStream(
          process.cwd() + `/src/data/${dir}/${filename.slice(0, -3)}`,
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
    }, []),
  )
    .then(() => console.log('done'))
    .catch(err => console.log('error', err))
    .finally(() => {
      // ? Delete the file after zipping it
      directoryFiles.forEach(filename =>
        fs.rmSync(process.cwd() + `/src/data/${dir}/${filename}`, {
          force: true,
        }),
      )
    })
}
