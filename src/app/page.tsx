"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Video, LayoutDashboard } from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <main className={styles.container}>
      <motion.div
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className={`${styles.title} gradient-text`} variants={itemVariants}>
          AI SkillFit
        </motion.h1>
        <motion.p className={styles.subtitle} variants={itemVariants}>
          Scalable AI video assessment for the blue-collar and polytechnic workforce.
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.cardsContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Link href="/candidate" passHref legacyBehavior>
          <motion.a className={`${styles.card} glass-panel`} variants={itemVariants}>
            <div className={styles.iconWrapper}>
              <Video size={32} />
            </div>
            <h2 className={styles.cardTitle}>Candidate Interview</h2>
            <p className={styles.cardDesc}>
              Experience the mobile-first AI interview in Kannada, Hindi, or English.
            </p>
            <button className={styles.button}>Start Interview</button>
          </motion.a>
        </Link>

        <Link href="/admin" passHref legacyBehavior>
          <motion.a className={`${styles.card} glass-panel`} variants={itemVariants}>
            <div className={styles.iconWrapper}>
              <LayoutDashboard size={32} />
            </div>
            <h2 className={styles.cardTitle}>Admin Dashboard</h2>
            <p className={styles.cardDesc}>
              Review candidate assessments, view fitment scores, and manage flagged profiles.
            </p>
            <button className={styles.button}>View Dashboard</button>
          </motion.a>
        </Link>
      </motion.div>
    </main>
  );
}
