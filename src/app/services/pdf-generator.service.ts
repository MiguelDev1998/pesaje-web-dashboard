// src/app/services/pdf-generator.service.ts
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;

@Injectable({ providedIn: 'root' })
export class PdfGeneratorService {
  generateReciboPDF(data: any) {
    const docDefinition: any = {
      content: [
        this.getReciboContent(data, 'ORIGINAL'),
        { text: '', pageBreak: 'before' },
        this.getReciboContent(data, 'COPIA BENEFICIO')
      ],
      styles: {
        encabezado: { fontSize: 10, bold: true },
        valor: { fontSize: 10 },
        tabla: { margin: [0, 5, 0, 15] }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }

  private getReciboContent(data: any, copia: string) {
    return {
      content: [
        {
          columns: [
            { image: 'logo', width: 100 },
            {
              stack: [
                { text: 'BENEFICIO SAN MIGUEL', bold: true },
                { text: 'KM. 65 CARRETERA A SAN MIGUEL DUEÑAS, SACATEPÉQUEZ' },
                { text: 'TEL: 4211-6346, 4211-6344, 4211-6348' }
              ],
              alignment: 'center'
            },
            {
              text: `RECIBO DE CAFÉ\n${data.recibo}`,
              alignment: 'right',
              bold: true,
              fontSize: 12
            }
          ]
        },
        {
          table: {
            widths: ['25%', '25%', '25%', '25%'],
            body: [
              [
                { text: 'Fecha:', style: 'encabezado' },
                { text: data.fecha, style: 'valor' },
                { text: 'Transporte:', style: 'encabezado' },
                { text: data.transporte, style: 'valor' }
              ],
              [
                { text: 'Piloto:', style: 'encabezado' },
                { text: data.piloto, colSpan: 3, style: 'valor' }, {}, {}
              ],
              [
                { text: 'Partida:', style: 'encabezado' },
                { text: data.partida, style: 'valor' },
                { text: 'Tipo:', style: 'encabezado' },
                { text: data.tipo, style: 'valor' }
              ],
              [
                { text: 'Cosecha:', style: 'encabezado' },
                { text: data.cosecha, style: 'valor' },
                { text: 'Productor:', style: 'encabezado' },
                { text: data.codigo + '\n' + data.proveedor, style: 'valor' }
              ],
              [
                { text: 'PESO BRUTO (qq):', style: 'encabezado' },
                { text: data.peso_bruto, style: 'valor' },
                { text: 'SACOS NYLON:', style: 'encabezado' },
                { text: data.sacos_nylon, style: 'valor' }
              ],
              [
                { text: 'SACOS YUTE:', style: 'encabezado' },
                { text: data.sacos_yute, style: 'valor' },
                { text: '(-) TARA:', style: 'encabezado' },
                { text: data.tara, style: 'valor' }
              ],
              [
                { text: 'PESO NETO (qq):', style: 'encabezado' },
                { text: data.peso_neto, colSpan: 3, style: 'valor' }, {}, {}
              ]
            ]
          },
          style: 'tabla'
        },
        {
          text: 'NOTAS: ' + (data.notas || ''),
          margin: [0, 10, 0, 30]
        },
        {
          columns: [
            { text: 'FIRMA RESPONSABLE', alignment: 'center' },
            { text: copia, alignment: 'right', italics: true }
          ]
        }
      ],
      images: {
        logo: 'data:image/png;base64,...' // Logo
      }
    };
  }
}
