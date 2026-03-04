'use client';
import { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';

export default function GenerateNewsletterImage() {
  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    const generate = async () => {
      const isGenerated = localStorage.getItem('newsletter-image-generated-v1');
      if (isGenerated) {
        setStatus('Success');
        return;
      }

      setStatus('Generating Newsletter image...');
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) return;

        const ai = new GoogleGenAI({ apiKey });
        const prompt = "Photorealistic landscape photo of Istanbul at night. The Bosphorus bridge illuminated, city lights reflecting on the water, majestic mosques in the background. Deep blues, warm amber city lights. Cinematic style, high quality travel photography, no text, no watermarks.";

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
          config: { imageConfig: { aspectRatio: "16:9" } },
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData?.data) {
              await fetch('/api/save-image', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folder: '', name: 'newsletter-istanbul-night', base64Data: part.inlineData.data })
              });
              break;
            }
          }
        }
        localStorage.setItem('newsletter-image-generated-v1', 'true');
        setStatus('Success');
        window.location.reload();
      } catch (err: any) {
        setStatus('Failed: ' + err.message);
      }
    };
    generate();
  }, []);

  if (status === 'Idle' || status === 'Success') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg z-50 text-sm shadow-lg backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <p>{status}</p>
      </div>
    </div>
  );
}
