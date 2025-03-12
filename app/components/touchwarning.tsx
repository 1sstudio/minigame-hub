'use client'

import styles from "./touchwarning.module.css";
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';

const LocalStorageKey = "__DROPOUT_TOUCH_WARNING_DISMISSED"
export default function TouchWarning() {
  // hidden at first until we get client useEffect...
  const [acceptedWarning, setAcceptedWarning] = useState(true);

  useEffect(() => {
    // only perform this action if we're on a known mobile device
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      setAcceptedWarning(localStorage.getItem(LocalStorageKey) === "1" || false);
    }
  }, []);


  function acceptWarning() {
    localStorage.setItem(LocalStorageKey, "1");
    setAcceptedWarning(true);
  }

  const classList = [styles.touchwarning, acceptedWarning ? styles.touchwarninghidden : null];
  return (
    <div className={classList.join(' ')}>
      <div className={styles.touchwarningmiddle}>
        Whoa there! The games featured here require a keyboard to play: you may not be able to
        play them on your current device, and we recommend using a desktop computer. If you have
        a keyboard attached to your device, you may press the CONTINUE button to play.
        <Button variant="dark" onClick={acceptWarning}>CONTINUE</Button>
      </div>
    </div>
  );
}