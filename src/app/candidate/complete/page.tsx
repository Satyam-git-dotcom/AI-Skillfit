"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import styles from "./complete.module.css";

export default function CandidateComplete() {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div 
          className={styles.iconWrapper}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle size={40} />
        </motion.div>
        
        <h1 className={styles.title}>Interview Complete!</h1>
        <p className={styles.desc}>
          Thank you for completing your AI SkillFit assessment. Your responses have been securely uploaded for evaluation. We will notify you of the fitment results soon.
        </p>

        <Link href="/" passHref legacyBehavior>
          <a className={styles.homeBtn}>Back to Home</a>
        </Link>
      </motion.div>
    </div>
  );
}
