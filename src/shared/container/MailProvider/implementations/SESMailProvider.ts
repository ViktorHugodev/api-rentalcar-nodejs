import { SES } from 'aws-sdk'
import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider } from '../IMailProvider'

class SESMailProvider implements IMailProvider {
  private client: Transporter
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: 'sa-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }),
    })
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileSystem = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileSystem)
    const templateHtml = templateParse(variables)
    await this.client.sendMail({
      to,
      from: 'Rentx <victorcorrea@zohomail.com>',
      subject,

      html: templateHtml,
    })
  }
}

export { SESMailProvider }
