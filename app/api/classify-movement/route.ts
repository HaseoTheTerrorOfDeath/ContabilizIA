import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  const { description } = await req.json();

  try {
    const prompt = `Classifique a seguinte movimentação contábil: "${description}". Responda apenas com a categoria contábil apropriada.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Você é um assistente contábil.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 50
    });

    const category = completion.choices[0].message.content?.trim();
    return NextResponse.json({ category });

  } catch (error) {
    console.error('Erro ao classificar movimentação:', error);
    return NextResponse.json({ error: 'Erro ao classificar movimentação.' }, { status: 500 });
  }
}

