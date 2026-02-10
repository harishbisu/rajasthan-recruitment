export interface ShiftDetails {
    id: string;
    label: string; // e.g., "Shift 1", "Morning Shift", "Paper I"
    date?: string; // Exam date for this specific shift
    downloadUrl: string; // Direct link to PDF or resource
}

export interface AnswerKey {
    id: string;
    title: string; // e.g. "Rajasthan Police Constable 2024"
    slug: string; // for detail page if needed
    logo?: string;
    organizationName: string; // e.g. "RSMSSB"
    examDate: string; // Main exam date or range
    shifts: ShiftDetails[]; // List of answer keys per shift/date
    officialSiteUrl?: string;
    releaseDate: string; // When the key was released
}

export interface ExamResult {
    id: string;
    title: string;
    slug: string;
    logo?: string;
    organizationName: string;
    examDate: string;
    resultDate: string;
    cutOffUrl?: string; // Link to cutoff marks PDF
    meritListUrl?: string; // Link to merit list PDF
    scoreCardUrl?: string; // Link to check individual marks
    officialSiteUrl?: string;
}

export interface AdmitCard {
    id: string;
    title: string;
    slug: string;
    logo?: string;
    organizationName: string;
    examDate: string; // The upcoming exam date
    downloadUrl: string; // Direct admit card download link
    noticeUrl?: string; // Exam center/city intimation notice
    officialSiteUrl?: string;
    releaseDate: string;
}
