import { Controller, Get, Res, Param } from '@nestjs/common';
import type { Response } from 'express';
import { PdfGeneratorService } from '../pdf-generator/pdf-generator.service';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

   @Get('generate/:month')
  async generatePdf(@Param('month') month: string, @Res() res: Response) {
    const pdfBuffer = await this.pdfGeneratorService.generatePdf(month);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    });
    res.send(pdfBuffer);
  }
}
