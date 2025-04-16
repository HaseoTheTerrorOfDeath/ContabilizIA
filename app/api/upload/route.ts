import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const form = new IncomingForm({ multiples: true, keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        console.error('Erro ao processar upload:', err);
        return reject(new NextResponse('Erro ao fazer upload', { status: 500 }));
      }

      console.log('Arquivos recebidos:', files);

      return resolve(new NextResponse('Upload feito com sucesso!', { status: 200 }));
    });
  });
}

