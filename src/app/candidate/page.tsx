"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, Mic, CheckCircle2 } from "lucide-react";
import styles from "./candidate.module.css";

export default function CandidateOnboarding() {
  const router = useRouter();
  const [language, setLanguage] = useState<string | null>(null);
  const [camGranted, setCamGranted] = useState(false);
  const [micGranted, setMicGranted] = useState(false);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (stream.getVideoTracks().length > 0) setCamGranted(true);
      if (stream.getAudioTracks().length > 0) setMicGranted(true);
      // Stop the stream immediately, we just needed permission check for onboarding
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error("Permission denied", err);
      alert("Please allow camera and microphone access to proceed with the interview.");
    }
  };

  const isReady = language !== null && camGranted && micGranted;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Interview Setup</h1>
        <p className={styles.subtitle}>Let's get you ready for your AI interview.</p>
      </div>

      <div className={styles.content}>
        {/* Language Selection */}
        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className={styles.sectionTitle}>1. Select Language</h2>
          <div className={styles.langGrid}>
            {["Kannada (ಕನ್ನಡ)", "Hindi (हिंदी)", "English"].map((lang) => (
              <button
                key={lang}
                className={`${styles.langBtn} ${language === lang ? styles.selected : ""}`}
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Device Permissions */}
        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={styles.sectionTitle}>2. Device Check</h2>
          <div className={styles.checkList}>
            <div className={styles.checkItem}>
              <div className={`${styles.checkIcon} ${camGranted ? styles.granted : ""}`}>
                {camGranted ? <CheckCircle2 /> : <Camera />}
              </div>
              <div className={styles.checkInfo}>
                <div className={styles.checkTitle}>Camera Access</div>
                <div className={styles.checkDesc}>Required for identity verification</div>
              </div>
            </div>

            <div className={styles.checkItem}>
              <div className={`${styles.checkIcon} ${micGranted ? styles.granted : ""}`}>
                {micGranted ? <CheckCircle2 /> : <Mic />}
              </div>
              <div className={styles.checkInfo}>
                <div className={styles.checkTitle}>Microphone Access</div>
                <div className={styles.checkDesc}>Required for answering questions</div>
              </div>
            </div>

            {(!camGranted || !micGranted) && (
              <button className={styles.actionBtn} onClick={requestPermissions}>
                Grant Access
              </button>
            )}
          </div>
        </motion.div>

        <motion.button
          className={styles.startBtn}
          disabled={!isReady}
          onClick={() => router.push(`/candidate/interview?lang=${encodeURIComponent(language || 'English')}`)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Proceed to Interview
        </motion.button>
      </div>
    </div>
  );
}
