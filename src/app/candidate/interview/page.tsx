"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import styles from "./interview.module.css";

const MOCK_QUESTIONS = [
  {
    en: "Please introduce yourself and tell us about your past work experience.",
    kn: "ದಯವಿಟ್ಟು ನಿಮ್ಮನ್ನು ಪರಿಚಯಿಸಿಕೊಳ್ಳಿ ಮತ್ತು ನಿಮ್ಮ ಹಿಂದಿನ ಕೆಲಸದ ಅನುಭವದ ಬಗ್ಗೆ ನಮಗೆ ತಿಳಿಸಿ.",
    hi: "कृपया अपना परिचय दें और हमें अपने पिछले कार्य अनुभव के बारे में बताएं।"
  },
  {
    en: "What safety precautions do you follow when operating heavy machinery?",
    kn: "ಭಾರೀ ಯಂತ್ರೋಪಕರಣಗಳನ್ನು ನಿರ್ವಹಿಸುವಾಗ ನೀವು ಯಾವ ಸುರಕ್ಷತಾ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳನ್ನು ಅನುಸರಿಸುತ್ತೀರಿ?",
    hi: "भारी मशीनरी चलाते समय आप किन सुरक्षा सावधानियों का पालन करते हैं?"
  },
  {
    en: "Describe a time you had to solve a difficult problem on the job.",
    kn: "ಕೆಲಸದಲ್ಲಿ ಕಷ್ಟಕರವಾದ ಸಮಸ್ಯೆಯನ್ನು ನೀವು ಪರಿಹರಿಸಬೇಕಾದ ಸಮಯವನ್ನು ವಿವರಿಸಿ.",
    hi: "उस समय का वर्णन करें जब आपको काम पर किसी कठिन समस्या का समाधान करना पड़ा था।"
  }
];

export default function InterviewRoom() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [lang, setLang] = useState<"en" | "kn" | "hi">("en");
  const [qIndex, setQIndex] = useState(0);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [userRecording, setUserRecording] = useState(false);
  
  useEffect(() => {
    const selectedLang = searchParams.get("lang");
    if (selectedLang?.includes("Kannada")) setLang("kn");
    else if (selectedLang?.includes("Hindi")) setLang("hi");
    else setLang("en");

    // Setup camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error("Camera access denied", err));

    return () => {
      // Cleanup camera on unmount
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [searchParams]);

  // Handle AI question speaking flow
  useEffect(() => {
    if (qIndex < MOCK_QUESTIONS.length) {
      setAiSpeaking(true);
      const timer = setTimeout(() => {
        setAiSpeaking(false);
      }, 4000); // Simulate AI speaking for 4 seconds
      return () => clearTimeout(timer);
    } else {
      // Finished all questions
      router.push("/candidate/complete");
    }
  }, [qIndex, router]);

  const handleRecordToggle = () => {
    if (aiSpeaking) return; // Prevent recording while AI is speaking

    if (userRecording) {
      // Stop recording and move to next question
      setUserRecording(false);
      setQIndex(prev => prev + 1);
    } else {
      // Start recording
      setUserRecording(true);
    }
  };

  if (qIndex >= MOCK_QUESTIONS.length) return null; // Transitioning

  const currentQ = MOCK_QUESTIONS[qIndex][lang];

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.branding}>AI SkillFit</div>
        <div className={styles.progressBadge}>
          Question {qIndex + 1} of {MOCK_QUESTIONS.length}
        </div>
      </div>

      <div className={styles.videoArea}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className={styles.videoFeed}
        />
        <div className={styles.overlay}></div>
        
        <AnimatePresence>
          {aiSpeaking && (
            <motion.div 
              className={styles.aiAgentContainer}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className={`${styles.aiAvatar} animate-pulse-glow`}>
                <Bot size={40} color="white" />
              </div>
              <div className={styles.aiWaveform}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>
              <div className={styles.subtitlesBox}>
                <p className={styles.subtitleText}>{currentQ}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {userRecording && (
          <div className={styles.recordingStatus}>
            <div className={styles.redDot}></div>
            <span>Recording...</span>
          </div>
        )}
      </div>

      <div className={styles.bottomControls}>
        <button 
          className={`${styles.recordBtn} ${userRecording ? styles.recording : ""} ${aiSpeaking ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleRecordToggle}
          disabled={aiSpeaking}
        >
          <div className={styles.recordInner}></div>
        </button>
      </div>
    </div>
  );
}
