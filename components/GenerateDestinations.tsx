'use client';
import { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const destinations = [
  {
    name: 'istanbul',
    prompt: 'Istanbul Blue Mosque (Sultan Ahmed Mosque) viewed from across a garden or courtyard. Golden hour light, warm orange glow on the stone, minarets against blue sky. A few pigeons in flight add life. Colors: warm golds and blues. Photorealistic, professional travel photography. No text, no watermarks. Vivid colors, cinematic quality.'
  },
  {
    name: 'cappadocia',
    prompt: 'Cappadocia multiple colorful hot air balloons (at least 8-10 balloons) floating above the dramatic fairy chimney rock formations at dawn. Pink-orange sky, earthy brown valleys below. Magical, dreamlike atmosphere. Photorealistic, professional travel photography. No text, no watermarks. Vivid colors, cinematic quality.'
  },
  {
    name: 'antalya',
    prompt: 'Antalya ancient Roman harbor (Kaleiçi old town) with colorful traditional wooden sailing boats (gulets) in the foreground. Mediterranean turquoise water. Old town walls and clock tower visible. Bright midday Mediterranean light. Photorealistic, professional travel photography. No text, no watermarks. Vivid colors, cinematic quality.'
  },
  {
    name: 'ephesus',
    prompt: 'Ephesus low-angle dramatic view of the Library of Celsus ancient ruins. White marble columns against a perfectly blue sky. Late afternoon warm light. Sense of ancient grandeur and scale. Photorealistic, professional travel photography. No text, no watermarks. Vivid colors, cinematic quality.'
  },
  {
    name: 'pamukkale',
    prompt: 'Pamukkale iconic white travertine terraces with bright turquoise thermal pools. Aerial or elevated perspective showing the geometric patterns. Crystal clear water reflecting the sky. Pure white and blue color scheme. Photorealistic, professional travel photography. No text, no watermarks. Vivid colors, cinematic quality.'
  },
  {
    name: 'bodrum',
    prompt: 'Bodrum St. Peter\'s Castle (Bodrum Castle) on the harbor peninsula. Aegean blue sea, white traditional buildings, sailboats in harbor. Bright Mediterranean midday light, vivid colors. Photorealistic, professional travel photography. No text, no watermarks. Vivid colors, cinematic quality.'
  }
];

export default function GenerateDestinations() {
  const [status, setStatus] = useState('Idle');

  useEffect(() => {
    const generate = async () => {
      const isGenerated = localStorage.getItem('destinations-generated');
      if (isGenerated) {
        setStatus('Success! Images generated.');
        return;
      }

      setStatus('Generating destination images...');
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
          setStatus('Error: API key missing on client');
          return;
        }

        const ai = new GoogleGenAI({ apiKey });

        for (const dest of destinations) {
          setStatus(`Generating ${dest.name}...`);
          
          try {
            const checkRes = await fetch(`/images/destinations/${dest.name}.jpg`, { method: 'HEAD' });
            if (checkRes.ok) {
              const contentLength = checkRes.headers.get('content-length');
              if (contentLength && parseInt(contentLength) > 1000) {
                continue;
              }
            }
          } catch (e) {
            // ignore
          }

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: dest.prompt }] },
            config: { imageConfig: { aspectRatio: "4:3" } },
          });

          if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData?.data) {
                await fetch('/api/generate-destinations', { 
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: dest.name, base64Data: part.inlineData.data })
                });
                break;
              }
            }
          }
        }
        
        localStorage.setItem('destinations-generated', 'true');
        setStatus('Success! Images generated.');
        window.location.reload();
      } catch (err: any) {
        setStatus('Failed: ' + err.message);
      }
    };
    generate();
  }, []);

  if (status === 'Success! Images generated.') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg z-50 text-sm max-w-xs shadow-lg backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-3">
        {status.includes('Generating') && (
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        )}
        <p>{status}</p>
      </div>
    </div>
  );
}
