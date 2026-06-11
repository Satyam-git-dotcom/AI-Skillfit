import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, PlayCircle, Activity, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { MOCK_CANDIDATES } from "@/lib/mockData";
import styles from "./detail.module.css";

// In Next 15, params is a promise. We'll use a standard async component.
export default async function CandidateDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const candidate = MOCK_CANDIDATES.find(c => c.id === resolvedParams.id);

  if (!candidate) return notFound();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <Link href="/admin" passHref legacyBehavior>
            <a className={styles.backBtn}><ArrowLeft size={16} /> Back</a>
          </Link>
          <h1 className={styles.title}>Candidate Report: {candidate.name}</h1>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Column: Video & Transcript */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}><PlayCircle size={20} /> Interview Recording</h2>
          <div className={styles.videoPlaceholder}>
            <PlayCircle size={48} />
            <span>Encrypted Video Playback (Mock)</span>
          </div>

          <div className={styles.transcript}>
            <div className={styles.transcriptItem}>
              <span>AI Agent:</span> Please introduce yourself.
            </div>
            <div className={styles.transcriptItem}>
              <span>Candidate:</span> Namaskara, my name is {candidate.name}. I am from {candidate.district} and I have 3 years of experience in {candidate.skill}.
            </div>
            <div className={styles.transcriptItem}>
              <span>AI Agent:</span> Thank you. Let's proceed to the technical questions...
            </div>
          </div>
        </div>

        {/* Right Column: AI Assessment & Integrity */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><Activity size={20} /> AI Assessment Scores</h2>
            
            <div className={styles.scoreItem}>
              <div className={styles.scoreHeader}>
                <span>Relevance</span>
                <span>{candidate.scores.relevance}%</span>
              </div>
              <div className={styles.scoreBarBg}>
                <div className={styles.scoreBarFill} style={{ width: `${candidate.scores.relevance}%` }}></div>
              </div>
            </div>

            <div className={styles.scoreItem}>
              <div className={styles.scoreHeader}>
                <span>Communication Clarity</span>
                <span>{candidate.scores.clarity}%</span>
              </div>
              <div className={styles.scoreBarBg}>
                <div className={styles.scoreBarFill} style={{ width: `${candidate.scores.clarity}%` }}></div>
              </div>
            </div>

            <div className={styles.scoreItem}>
              <div className={styles.scoreHeader}>
                <span>Skill Confidence</span>
                <span>{candidate.scores.confidence}%</span>
              </div>
              <div className={styles.scoreBarBg}>
                <div className={styles.scoreBarFill} style={{ width: `${candidate.scores.confidence}%` }}></div>
              </div>
            </div>

            <div className={styles.fitmentBox}>
              <div className={styles.fitmentLabel}>Automated Fitment Classification</div>
              <div className={styles.fitmentValue}>{candidate.fitment}</div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}><ShieldCheck size={20} /> Integrity & Verification</h2>
            
            <div className={styles.integrityList}>
              <div className={styles.integrityItem}>
                <span className={styles.integrityLabel}>Face Visibility Continuous</span>
                <div className={`${styles.statusIcon} ${candidate.integrity.faceVisible ? styles.pass : styles.fail}`}>
                  {candidate.integrity.faceVisible ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
              </div>

              <div className={styles.integrityItem}>
                <span className={styles.integrityLabel}>Audio Clarity / No Background Voice</span>
                <div className={`${styles.statusIcon} ${candidate.integrity.audioClear ? styles.pass : styles.fail}`}>
                  {candidate.integrity.audioClear ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
              </div>

              <div className={styles.integrityItem}>
                <span className={styles.integrityLabel}>Duplicate Attempt Flag</span>
                <div className={`${styles.statusIcon} ${!candidate.integrity.duplicateFlag ? styles.pass : styles.fail}`}>
                  {!candidate.integrity.duplicateFlag ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
