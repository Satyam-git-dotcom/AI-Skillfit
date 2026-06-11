"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Briefcase, AlertTriangle, CheckCircle } from "lucide-react";
import { MOCK_CANDIDATES } from "@/lib/mockData";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  const [filterFitment, setFilterFitment] = useState("All");

  const filteredCandidates = MOCK_CANDIDATES.filter(c => 
    filterFitment === "All" ? true : c.fitment === filterFitment
  );

  const stats = {
    total: MOCK_CANDIDATES.length,
    jobReady: MOCK_CANDIDATES.filter(c => c.fitment === "Job-Ready").length,
    manual: MOCK_CANDIDATES.filter(c => c.fitment === "Manual Verification").length,
    flagged: MOCK_CANDIDATES.filter(c => c.fitment === "Flagged").length,
  };

  const getBadgeClass = (fitment: string) => {
    switch (fitment) {
      case "Job-Ready": return styles.jobReady;
      case "Requires Training": return styles.training;
      case "Manual Verification": return styles.manual;
      case "Flagged": return styles.flagged;
      default: return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Workforce Fitment Dashboard</h1>
        <Link href="/" passHref legacyBehavior>
          <a className={styles.homeLink}>Back to Home</a>
        </Link>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.blue}`}>
            <Users size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricValue}>{stats.total}</span>
            <span className={styles.metricLabel}>Total Candidates</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.green}`}>
            <Briefcase size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricValue}>{stats.jobReady}</span>
            <span className={styles.metricLabel}>Job-Ready</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.orange}`}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricValue}>{stats.manual}</span>
            <span className={styles.metricLabel}>To Verify</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.metricIcon} ${styles.red}`}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricValue}>{stats.flagged}</span>
            <span className={styles.metricLabel}>Flagged</span>
          </div>
        </div>
      </div>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>Candidate Roster</h2>
          <div className={styles.filters}>
            <select 
              className={styles.filterSelect}
              value={filterFitment}
              onChange={(e) => setFilterFitment(e.target.value)}
            >
              <option value="All">All Fitments</option>
              <option value="Job-Ready">Job-Ready</option>
              <option value="Requires Training">Requires Training</option>
              <option value="Manual Verification">Manual Verification</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate ID</th>
                <th>Name</th>
                <th>District</th>
                <th>Skill / Role</th>
                <th>Language</th>
                <th>Fitment Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.district}</td>
                  <td>{c.skill}</td>
                  <td>{c.language}</td>
                  <td>
                    <span className={`${styles.badge} ${getBadgeClass(c.fitment)}`}>
                      {c.fitment}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/${c.id}`} passHref legacyBehavior>
                      <a className={styles.actionLink}>View Report</a>
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                    No candidates found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
