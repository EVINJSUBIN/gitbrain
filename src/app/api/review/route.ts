import { NextResponse } from 'next/server';
import { ai } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Source code is required' }, { status: 400 });
    }

    const prompt = `
      You are an expert senior developer reviewing a pull request.
      Analyze the following code and provide a comprehensive review.
      Point out bugs, security issues, performance bottlenecks, and suggest refactorings.
      Be concise and use Markdown.
      
      Code:
      ${code}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error('Error reviewing code:', error);
    return NextResponse.json({ error: 'Failed to review code' }, { status: 500 });
  }
}
