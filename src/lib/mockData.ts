export type Candidate = {
  id: string;
  name: string;
  district: string;
  skill: string;
  language: string;
  date: string;
  fitment: "Job-Ready" | "Requires Training" | "Manual Verification" | "Flagged";
  scores: {
    relevance: number;
    clarity: number;
    confidence: number;
  };
  integrity: {
    faceVisible: boolean;
    audioClear: boolean;
    duplicateFlag: boolean;
  };
};

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "C-1001",
    name: "Ramesh K.",
    district: "Hubli",
    skill: "Heavy Machinery",
    language: "Kannada",
    date: "2026-04-29",
    fitment: "Job-Ready",
    scores: { relevance: 92, clarity: 85, confidence: 90 },
    integrity: { faceVisible: true, audioClear: true, duplicateFlag: false },
  },
  {
    id: "C-1002",
    name: "Suresh P.",
    district: "Belagavi",
    skill: "Welding",
    language: "Hindi",
    date: "2026-04-28",
    fitment: "Requires Training",
    scores: { relevance: 65, clarity: 70, confidence: 60 },
    integrity: { faceVisible: true, audioClear: true, duplicateFlag: false },
  },
  {
    id: "C-1003",
    name: "Manjula S.",
    district: "Mysuru",
    skill: "Assembly Line",
    language: "Kannada",
    date: "2026-04-29",
    fitment: "Manual Verification",
    scores: { relevance: 88, clarity: 60, confidence: 85 },
    integrity: { faceVisible: true, audioClear: false, duplicateFlag: false },
  },
  {
    id: "C-1004",
    name: "Anil D.",
    district: "Bengaluru",
    skill: "Electrician",
    language: "English",
    date: "2026-04-27",
    fitment: "Flagged",
    scores: { relevance: 30, clarity: 40, confidence: 20 },
    integrity: { faceVisible: false, audioClear: true, duplicateFlag: true },
  },
  {
    id: "C-1005",
    name: "Prakash M.",
    district: "Kalaburagi",
    skill: "Plumbing",
    language: "Kannada",
    date: "2026-04-29",
    fitment: "Job-Ready",
    scores: { relevance: 85, clarity: 80, confidence: 88 },
    integrity: { faceVisible: true, audioClear: true, duplicateFlag: false },
  }
];
