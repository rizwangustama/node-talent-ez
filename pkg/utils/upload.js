import fs from 'fs'
import util from "util";
import { v4 as uuid } from 'uuid'

export const emsUpload = async (file) => {
    let ext = file.originalname.split(".")[file.originalname.split(".").length-1]
    let name = `${uuid()}.${ext}`
    const promWrite = util.promisify(fs.writeFile)
    await promWrite(`${__dirname}/../../../file/files/${ext}/${name}`, file.buffer, `binary`)
    return name
}