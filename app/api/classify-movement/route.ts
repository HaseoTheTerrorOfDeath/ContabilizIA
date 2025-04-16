// app/api/classify-movement/route.ts
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const { description } = await req.json();

  try {
    const prompt = `Classifique a seguinte movimentação contábil: "${description}". Responda apenas com a categoria contábil apropriada.`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 50,
    });

    const category = completion.data.choices[0].text?.trim();

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Erro ao classificar movimentação:', error);
    return NextResponse.json({ error: 'Erro ao classificar movimentação.' }, { status: 500 });
  }
}

