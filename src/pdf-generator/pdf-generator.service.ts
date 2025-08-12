import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import {htmlTemplate} from './templates/templateBase'
@Injectable()
export class PdfGeneratorService {

    private browser: puppeteer.Browser | null = null;

    
  async generatePdf(month: string): Promise<Buffer> {
     if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
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

    async generarCertificado(
      nombre: string,
      curso: string,
      fecha: string,
      firmaInstructor?: string,
      firmaDirector?: string
    ): Promise<Buffer> {
    const fs = await import('fs');
    const path = await import('path');
    const templatePath = path.join(process.cwd(), 'src', 'pdf-generator', 'templates', 'certificado.html');
    let html = fs.readFileSync(templatePath, 'utf8');

        html = html
          .replace('{{nombre}}', nombre)
          .replace('{{curso}}', curso)
          .replace('{{fecha}}', fecha)
          .replace('{{firmaInstructor}}', firmaInstructor || '')
          .replace('{{firmaDirector}}', firmaDirector || '');

      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
    const pdfUint8Array = await page.pdf({ format: 'A4' });


    await browser.close();
    return Buffer.from(pdfUint8Array);
    }
}