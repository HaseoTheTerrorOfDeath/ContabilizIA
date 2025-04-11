import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({ uploadDir: './public/uploads', keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erro no upload:', err);
      return res.status(500).send('Erro no upload');
    }

    const fileArray = Array.isArray(files.files) ? files.files : [files.files];
    const filePaths = fileArray.map((file: any) => `/uploads/${file.newFilename}`);

    res.status(200).json({ files: filePaths });
  });
}
