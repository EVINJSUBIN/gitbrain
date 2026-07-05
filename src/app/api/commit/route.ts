import { NextResponse } from 'next/server';
import { ai } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { diff } = await request.json();

    if (!diff) {
      return NextResponse.json({ error: 'Git diff is required' }, { status: 400 });
    }

    const prompt = `
      You are an expert developer. Analyze the following git diff and generate a concise, conventional commit message.
      Format: <type>(<optional scope>): <description>
      Do not include any explanations, just the commit message itself.
      
      Git Diff:
      ${diff}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error('Error generating commit:', error);
    return NextResponse.json({ error: 'Failed to generate commit message' }, { status: 500 });
  }
}
