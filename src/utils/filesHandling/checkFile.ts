import {existsSync} from 'fs'
import {getPath} from './getPath'

export const checkIfFileExist = (filename: string) =>
  existsSync(getPath(filename))
