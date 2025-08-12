import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import {htmlTemplate} from './templates/templateBase'
@Injectable()
export class PdfGeneratorService {

    private browser: puppeteer.Browser | null = null;

    
  async generatePdf(month: string): Promise<Buffer> {
     if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'shell',
      });
    }
    const page = await this.browser.newPage();

    await page.setContent(htmlTemplate(month), {
        timeout: 0,
        waitUntil: 'domcontentloaded',
      });
    

    const margin: puppeteer.PDFMargin = {
      top: '90px',
      right: '30px',
      bottom: '20px',
      left: '30px',
    };

    await page.emulateMediaType('print');
  const pdfUint8Array = await page.pdf({
      preferCSSPageSize: true,
      timeout: 0,
      format: 'A4',
      margin: margin,
      displayHeaderFooter: true,
      //You can provide header template here if you have multi page PDF with same header.      
      //headerTemplate:'HEADER TEMPLATE GOES HERE'
    });

  const pdfBuffer = Buffer.from(pdfUint8Array);
    await page.close();
    await this.browser.close();
    return pdfBuffer;
  }
}