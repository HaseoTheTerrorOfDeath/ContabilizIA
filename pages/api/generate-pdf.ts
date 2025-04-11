import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import Tesseract from 'tesseract.js';

export const config = {
  api: {
    bodyParser: true,
  },
};

async function recognizeText(filePath: string) {
  try {
    const { data: { text } } = await Tesseract.recognize(filePath, 'por');
    return text;
  } catch (error) {
    console.error('Erro no OCR:', error);
    return '';
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { files } = req.body;

    const extractedData = {
      nome: '',
      cpf: '',
      rendimentoTributavel: '',
      rendimentoIsento: '',
      deducoes: '',
      impostoDevido: '',
      resultado: ''
    };

    for (const file of files) {
      const fullPath = path.join(process.cwd(), 'public', file.replace('/uploads', 'uploads'));
      const text = await recognizeText(fullPath);

      if (!extractedData.nome) {
        const nomeMatch = text.match(/Nome\s*[:\-]?\s*(.+)/i);
        if (nomeMatch) extractedData.nome = nomeMatch[1].trim();
      }

      if (!extractedData.cpf) {
        const cpfMatch = text.match(/CPF\s*[:\-]?\s*([\d\.\-]+)/i);
        if (cpfMatch) extractedData.cpf = cpfMatch[1].trim();
      }

      if (!extractedData.rendimentoTributavel) {
        const rendMatch = text.match(/Rendimentos\s*Tributáveis\s*[:\-]?\s*R?\$?\s*([\d\.\,]+)/i);
        if (rendMatch) extractedData.rendimentoTributavel = rendMatch[1].trim();
      }

      if (!extractedData.rendimentoIsento) {
        const isentoMatch = text.match(/Rendimentos\s*Isentos\s*[:\-]?\s*R?\$?\s*([\d\.\,]+)/i);
        if (isentoMatch) extractedData.rendimentoIsento = isentoMatch[1].trim();
      }

      if (!extractedData.deducoes) {
        const deducaoMatch = text.match(/Deduções\s*[:\-]?\s*R?\$?\s*([\d\.\,]+)/i);
        if (deducaoMatch) extractedData.deducoes = deducaoMatch[1].trim();
      }

      if (!extractedData.impostoDevido) {
        const impostoMatch = text.match(/Imposto\s*Devido\s*[:\-]?\s*R?\$?\s*([\d\.\,]+)/i);
        if (impostoMatch) extractedData.impostoDevido = impostoMatch[1].trim();
      }

      if (!extractedData.resultado) {
        const resultadoMatch = text.match(/Resultado\s*[:\-]?\s*(.+)/i);
        if (resultadoMatch) extractedData.resultado = resultadoMatch[1].trim();
      }
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize();

    page.drawText('Declaração de Imposto de Renda 2025', {
      x: 50,
      y: height - 80,
      size: 20,
      font,
      color: rgb(0, 0.53, 0.71),
    });

    page.drawText(`Nome: ${extractedData.nome || 'Não informado'}`, { x: 50, y: height - 140, size: 14, font });
    page.drawText(`CPF: ${extractedData.cpf || 'Não informado'}`, { x: 50, y: height - 170, size: 14, font });
    page.drawText(`Rendimentos Tributáveis: R$ ${extractedData.rendimentoTributavel || '0,00'}`, { x: 50, y: height - 200, size: 14, font });
    page.drawText(`Rendimentos Isentos: R$ ${extractedData.rendimentoIsento || '0,00'}`, { x: 50, y: height - 230, size: 14, font });
    page.drawText(`Deduções: R$ ${extractedData.deducoes || '0,00'}`, { x: 50, y: height - 260, size: 14, font });
    page.drawText(`Imposto Devido: R$ ${extractedData.impostoDevido || '0,00'}`, { x: 50, y: height - 290, size: 14, font });
    page.drawText(`Resultado: ${extractedData.resultado || 'A calcular'}`, { x: 50, y: height - 320, size: 14, font });

    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.join(process.cwd(), 'public/uploads/declaracao-final.pdf');

    fs.writeFileSync(pdfPath, pdfBytes);

    res.status(200).json({ pdfUrl: '/uploads/declaracao-final.pdf' });

  } catch (err) {
    console.error('Erro na geração do PDF:', err);
    res.status(500).json({ error: 'Erro ao gerar PDF' });
  }
}
