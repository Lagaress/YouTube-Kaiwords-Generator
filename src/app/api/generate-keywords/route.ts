import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  try {
    const { description, language }: { description: string, language: string } = await request.json();

    if (!description || !language) {
      return NextResponse.json(
        { error: 'Description and language are required' },
        { status: 400 }
      );
    }

  const systemMessage = {
      role: "system",
      content: `
    You are a YouTube SEO expert specializing in generating highly effective keywords for videos. Follow these rules to create an optimized keyword list:
    
    CRITICAL INSTRUCTION:
    - Output must be between 480–500 characters total. If under 480, add more relevant terms. If over 500, remove less important terms. Stay within this range.
    - Ensure keywords are commonly searched terms in ${language}-speaking regions
  
    KEYWORD TYPES TO INCLUDE:
    1. **Primary Keywords:** Main topic terms; these must always appear first.
    2. **Question-Based Keywords:** Common questions users search about the topic (2–3 keywords).
    3. **Long-Tail Keywords:** Specific phrases of 3–5 words.
    4. **Related Terms:** Synonyms and relevant topics to enhance coverage.
    5. **Brand/Channel Terms:** Include only if relevant.
    
    RULES FOR GENERATING THE KEYWORDS:
    - Start with the primary keyword.
    - Include 20–25 total keywords across all types.
    - Use both singular and plural variations of important terms.
    - Maintain a balance:
      - 20% generic high-volume terms.
      - 50% medium-volume specific terms.
      - 30% highly specific long-tail terms.
    - Avoid repetition of exact phrases.
    - Use simple, direct language in ${language}.
    
    AVOID:
    - Generic or irrelevant terms.
    - Trending keywords unrelated to the topic.
    - Overstuffing or excessive repetition.
    - Unnecessary technical jargon.
    
    OUTPUT FORMAT:
    - Return keywords as a comma-separated list, no additional text.
    - Example: palabra-clave-principal, pregunta-relevante-1, palabra-específica-1, término-relacionado-1, término-de-marca
    `
    };

    const userMessage = {
      role: "user",
      content: `Generate an optimized list of YouTube keywords in ${language} for the following video description: "${description}". Ensure the output adheres to the character count limit and all specified keyword guidelines.`
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [systemMessage, userMessage],
        temperature: 0.3,
        max_tokens: 550,
        presence_penalty: 0.5,
        frequency_penalty: 0.4,
      })
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    return NextResponse.json({ keywords: data.choices[0].message.content });

  } catch (error) {
    console.error('Error generating keywords:', error);
    return NextResponse.json(
      { error: 'Failed to generate keywords' },
      { status: 500 }
    );
  }
}
