'use client';

import { useEffect, useRef } from 'react';

const VIDEO_ID = 'Gi3_59mwLV0';
const START_SEC = 7594; // 2:06:34
const END_SEC   = 7601; // 2:06:41

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function HeroBackground() {
  const targetRef  = useRef<HTMLDivElement>(null);
  const playerRef  = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (!targetRef.current) return;

      playerRef.current = new window.YT.Player(targetRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay:        1,
          mute:            1,
          controls:        0,
          loop:            0,
          start:           START_SEC,
          playsinline:     1,
          rel:             0,
          modestbranding:  1,
          disablekb:       1,
          fs:              0,
          iv_load_policy:  3,
        },
        events: {
          onReady(e: any) {
            e.target.seekTo(START_SEC, true);
            e.target.playVideo();

            // Cover the hero section regardless of viewport ratio
            const iframe: HTMLIFrameElement = e.target.getIframe();
            iframe.style.cssText = [
              'position:absolute',
              'top:50%',
              'left:50%',
              'width:100vw',
              'height:56.25vw',
              'min-height:100vh',
              'min-width:177.78vh',
              'transform:translate(-50%,-50%)',
              'pointer-events:none',
              'border:0',
            ].join(';');

            // Poll every 200 ms to loop the 7-second segment
            intervalRef.current = setInterval(() => {
              const t = playerRef.current?.getCurrentTime?.();
              if (typeof t === 'number' && t >= END_SEC) {
                playerRef.current.seekTo(START_SEC, true);
              }
            }, 200);
          },

          onStateChange(e: any) {
            // Recover from unexpected pause / end
            if (
              e.data === window.YT.PlayerState.ENDED ||
              e.data === window.YT.PlayerState.PAUSED
            ) {
              playerRef.current?.seekTo(START_SEC, true);
              playerRef.current?.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id  = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      playerRef.current?.destroy?.();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1A1A2E]">
      <div ref={targetRef} />
    </div>
  );
}
