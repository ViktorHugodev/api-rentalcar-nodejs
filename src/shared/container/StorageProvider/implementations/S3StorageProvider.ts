import { S3 } from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'

import upload from '@config/upload'
import { IStorageProvider } from '@shared/container/StorageProvider/IStorageProvider'

class S3StorageProvider implements IStorageProvider {
  private client: S3
  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    })
  }
  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file)
    const fileContent = await fs.promises.readFile(originalName)
    const formatImgForView = mime.getType(originalName)
    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: formatImgForView,
      })
      .promise()

    await fs.promises.unlink(originalName)
    return file
  }
  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise()
  }
}

export { S3StorageProvider }
