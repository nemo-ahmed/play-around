import {checkIfFileExist} from '@/utils/filesHandling/checkFile'
import {unzippingFile} from '@/utils/filesHandling/zipping'

export async function handleFilesBeforeExecution(difficulty: string | null) {
  if (difficulty && !checkIfFileExist(`${difficulty}.json`)) {
    const promises = [unzippingFile(`${difficulty}.json.gz`)]
    if (checkIfFileExist(`solved-${difficulty}.json.gz`)) {
      promises.push(unzippingFile(`solved-${difficulty}.json.gz`))
    }
    await Promise.all(promises)
    return 'done'
  }
  return 'file exists'
}
