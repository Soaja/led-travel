'use client';
import { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';

export default function GenerateWhyUs() {
  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    const generate = async () => {
      const isGenerated = localStorage.getItem('why-us-generated-v1');
      if (isGenerated) {
        setStatus('Success');
        return;
      }

      setStatus('Generating Why Us image...');
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) return;

        const ai = new GoogleGenAI({ apiKey });
        const prompt = "Photorealistic portrait orientation photo. A knowledgeable, passionate Turkish guide (male, 30-40 years old, smart casual dress) leading a small intimate group of 3-4 international tourists on an Istanbul rooftop at golden hour. The guide is pointing out city landmarks, making eye contact with the tourists, mid-explanation. The tourists look genuinely interested, happy, taking photos, fully engaged. Warm afternoon golden hour light, warm earth tones, orange accents. Authentic, personal, photorealistic, professional travel photography. No posed shots, no bored expressions, no large crowds, no text, no watermarks.";

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
          config: { imageConfig: { aspectRatio: "3:4" } },
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData?.data) {
              await fetch('/api/save-image', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ folder: '', name: 'why-us-guide', base64Data: part.inlineData.data })
              });
              break;
            }
          }
        }
        localStorage.setItem('why-us-generated-v1', 'true');
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
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50 text-sm shadow-lg backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        <p>{status}</p>
      </div>
    </div>
  );
}
