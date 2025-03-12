'use client'

import styles from "./unity.module.css";
import { useEffect, useRef, useState } from "react";
import { Game } from "../lib/definitions";

interface Params {
  game: Game,
}

export default function UnityFrame({
  game
}: Params) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  function tryFocus() {
    iframeRef.current?.focus();
    iframeRef.current?.contentWindow?.postMessage({messageType:'focus'}, '*');
  }


  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if(event.data.messageType === "unity-progress") {
        console.log(event.data);
        setIsLoaded(event.data.complete);
        if(event.data.complete) {
          console.log(`[UnityFrame] load complete! Focusing iframe...`);
          tryFocus();
        }
      }
    }

    const onResize = (event: UIEvent) => {
    }

    window.addEventListener("message", onMessage);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("resize", onResize);
    }
  }, []);

  useEffect(() => {
    tryFocus();
  }, [iframeRef]);

  return (
    <div className={styles.frame}>
      <div className={`${styles.gamecontainer} aspect-ratio-${game.aspect_ratio}`}>
        {isLoaded ? null : <div className={`${styles.loadscreen}`}><div className={styles.loadscreencontent}>LOADING</div></div> }
        <iframe 
          src={game.hosted_index} 
          tabIndex={-1}
          id="unity_iframe"
          className={styles.unityframe}
          ref={iframeRef}
        />
      </div>
    </div>
  )
}