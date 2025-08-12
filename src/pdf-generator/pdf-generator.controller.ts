import { Controller, Get, Res, Param } from '@nestjs/common';
import type { Response } from 'express';
import { PdfGeneratorService } from '../pdf-generator/pdf-generator.service';

@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

   @Get('generate/:month')
  async generatePdf(@Param('month') month: string, @Res() res: Response) {
    console.log("entro al metodo");
    const pdfBuffer = await this.pdfGeneratorService.generatePdf(month);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    });
    res.send(pdfBuffer);
  }
  
  @Get('certificado')
  async generarCertificado(@Res() res: Response) {
    const nombre = (res.req.query.nombre as string) || '';
    const curso = (res.req.query.curso as string) || '';
    const fecha = (res.req.query.fecha as string) || '';
    const firmaInstructor = (res.req.query.firmaInstructor as string) || '';
    const firmaDirector = (res.req.query.firmaDirector as string) || '';
    const pdfBuffer = await this.pdfGeneratorService.generarCertificado(
      nombre,
      curso,
      fecha,
      firmaInstructor,
      firmaDirector,
    );
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="certificado.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}
