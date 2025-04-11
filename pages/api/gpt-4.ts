import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você é um assistente contábil especializado em finanças e contabilidade.' },
        { role: 'user', content: message },
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Erro GPT-4:', error);
    res.status(500).json({ error: 'Erro ao processar sua requisição' });
  }
}
