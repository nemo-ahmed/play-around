import {checkIfFileExist} from '@/utils/filesHandling/checkFile'
import {unzippingFile} from '@/utils/filesHandling/zipping'

export async function handleFilesBeforeExecution(rating: string | null) {
  if (rating && !checkIfFileExist(`${rating}.json`)) {
    const promises = [unzippingFile(`${rating}.json.gz`)]
    if (checkIfFileExist(`solved-${rating}.json.gz`)) {
      promises.push(unzippingFile(`solved-${rating}.json.gz`))
    }
    await Promise.all(promises)
    return 'done'
  }
  return 'file exists'
}
