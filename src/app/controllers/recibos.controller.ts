import { Injectable } from '@angular/core';
import { Recibo } from '../models/recibo';
import { ReciboService } from '../services/recibo.service';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;







@Injectable({ providedIn: 'root' })
export class ReciboController {
  recibos: Recibo[] = [];
  cargando = true;

  constructor(private reciboService: ReciboService) {}

  cargarRecibos() {
    this.reciboService.listar().subscribe({
      next: (data) => {
        this.recibos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(' Error al cargar recibos:', err);
        this.cargando = false;
      }
    });
  }

  private async getBase64ImageFromUrl(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}



async generarPDF(recibo: any) { 
  const logo = await this.getBase64ImageFromUrl('assets/img/cafe.png');

  const generarBloque = (titulo: string, valor: string) => [
    { text: titulo, fontSize: 8, bold: true },
    { text: valor || '', fontSize: 10, margin: [0, 2, 0, 5] }
  ];

  const generarRecibo = (tipoCopia: string) => [
    // 🔹 Bloque de encabezado completo con título, logo y número de recibo
    {
      stack: [
        { 
          text: 'CENTRO DE ACOPIO', 
          fontSize: 20, 
          bold: true, 
          alignment: 'center', 
          margin: [0, 0, 0, 5] 
        },
        {
          columns: [
            { image: logo, width: 70 },
            { text: '', width: '*' },
            {
              stack: [
                { text: 'RECIBO DE CAFÉ', alignment: 'center', bold: true, fontSize: 12 },
                { text: recibo.recibo_id ?? '', alignment: 'center', fontSize: 14, bold: true }
              ]
            }
          ]
        }
      ]
    },
    { text: '\n' },

    // Bloques superiores
    {
      columns: [
        { stack: generarBloque('Fecha:', new Date(recibo.fecha ?? new Date()).toLocaleDateString()) },
        { stack: generarBloque('Transporte:', recibo.transporte ?? '') },
        { stack: generarBloque('Piloto:', recibo.piloto ?? '') }
      ]
    },

    {
      columns: [
        { stack: generarBloque('Partida:', recibo.numero_partida ?? '') },
        { stack: generarBloque('Tipo:', recibo.tipo ?? 'MADURO') },
        { stack: generarBloque('Cosecha:', recibo.cosecha ?? '2024-2025') },
        {
          stack: generarBloque(
            'Productor:',
            `${recibo.codigo ?? ''}\n${recibo.proveedor ?? ''}`
          )
        }
      ]
    },
    { text: '\n' },

    // Tabla de pesos
    {
      table: {
        widths: ['20%', '20%', '20%', '20%', '20%'],
        body: [
          [
            { text: 'PESO BRUTO (qq)', bold: true, fontSize: 8, alignment: 'center' },
            { text: 'SACOS NYLON', bold: true, fontSize: 8, alignment: 'center' },
            { text: 'SACOS YUTE', bold: true, fontSize: 8, alignment: 'center' },
            { text: 'PESO NETO (qq)', bold: true, fontSize: 8, alignment: 'center' }
          ],
          [
            { text: parseFloat(recibo.peso_bruto ?? 0).toFixed(2), alignment: 'center' },
            { text: parseFloat(recibo.saco_nylon ?? 0).toFixed(2), alignment: 'center' },
            { text: parseFloat(recibo.saco_yute ?? 0).toFixed(2), alignment: 'center' },
            { text: parseFloat(recibo.peso_recibo ?? 0).toFixed(2), alignment: 'center', bold: true }
          ]
        ]
      }
    },

    // Firma
    { text: '\n\n\n_________________________', alignment: 'center', margin: [0, 15, 0, 0] },
    { text: 'FIRMA RESPONSABLE', alignment: 'center', fontSize: 8, margin: [0, 2, 0, 0] },

    // Tipo de copia
    {
      text: tipoCopia,
      alignment: 'right',
      italics: true,
      fontSize: 8,
      margin: [0, 5, 0, 0]
    }
  ];

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content: [
      ...generarRecibo('ORIGINAL'),
      { text: '\n\n\n\n\n\n' },
      ...generarRecibo('COPIA ACOPIO')
    ]
  };

  pdfMake.createPdf(docDefinition).open();
}



}
