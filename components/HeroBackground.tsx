'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoogleGenAI } from '@google/genai';

export default function HeroBackground() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function generateImage() {
      // Check if we already have a cached image to avoid regenerating
      const cached = sessionStorage.getItem('hero-image');
      if (cached) {
        setImageUrl(cached);
        return;
      }

      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error("API key is missing");
        }

        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Istanbul skyline at golden hour (1 hour before sunset). The Hagia Sophia or Blue Mosque prominently visible but not overpowering. Bosphorus strait visible in the background with golden reflections. Foreground: slightly blurred traditional Turkish architecture or rooftop. Sky: dramatic with scattered clouds catching warm light. Mood: magical, aspirational, makes you want to book immediately. The center and top portion should be darker (where white text will overlay). Color temperature: warm (5500K), rich oranges, golds, blues. Style: National Geographic meets luxury travel magazine. Ultra-high definition, cinematic quality. Do NOT include: Tourists or people in foreground, visible modern buildings or cars, text or watermarks, overprocessed HDR look.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
          config: { imageConfig: { aspectRatio: "16:9" } },
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData?.data) {
              const url = `data:image/jpeg;base64,${part.inlineData.data}`;
              setImageUrl(url);
              try {
                sessionStorage.setItem('hero-image', url);
              } catch (e) {
                // Ignore quota exceeded errors for sessionStorage
              }
              return;
            }
          }
        }
        throw new Error("No image data found in response");
      } catch (error) {
        console.error("Failed to generate image:", error);
        // Fallback to a high-quality Unsplash image that matches the description
        setImageUrl('https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1920&auto=format&fit=crop');
      }
    }
    generateImage();
  }, []);

  if (!imageUrl) {
    return <div className="absolute inset-0 bg-[#1A1A2E] animate-pulse" />;
  }

  return (
    <Image
      src={imageUrl}
      alt="Istanbul skyline"
      fill
      className="object-cover"
      priority
      referrerPolicy="no-referrer"
    />
  );
}
