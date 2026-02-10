import { AdmitCard, AnswerKey, ExamResult } from "../types/exam-updates";

export const mockAnswerKeys: AnswerKey[] = [
  {
    id: "1",
    title: "EMRS Answer Tier-1 Key 2025",
    slug: "",
    logo: "https://blackbuck.blob.core.windows.net/blackbucks-media/logo_emrs-1758510563845.jpg",
    organizationName: "EMRS",
    examDate: "13th, 14th and 21st December 2025",
    releaseDate: "4th January 2026",
    officialSiteUrl:
      "https://nests.tribal.gov.in/show_content.php?lang=1&level=1&ls_id=974&lid=571",
    shifts: [
      {
        id: "s1-d1",
        label: "Principal",
        date: "2025-12-13",
        downloadUrl:
          "https://nests.tribal.gov.in/WriteReadData/RTF1984/1770202721.pdf",
      },
      {
        id: "s2-d1",
        label: "PGT",
        date: "2025-12-14",
        downloadUrl:
          "https://nests.tribal.gov.in/WriteReadData/RTF1984/1770202727.pdf",
      },
      {
        id: "s1-d2",
        label: "TGT",
        date: "2025-12-14",
        downloadUrl:
          "https://nests.tribal.gov.in/WriteReadData/RTF1984/1770202734.pdf",
      },
      {
        id: "s2-d2",
        label: "Accountant",
        date: "2025-12-14",
        downloadUrl:
          "https://nests.tribal.gov.in/WriteReadData/RTF1984/1770202741.pdf",
      },
      {
        id: "s3-d3",
        label: "Hostel Warden & Female Staff Nurse",
        date: "2025-12-21",
        downloadUrl:
          "https://nests.tribal.gov.in/WriteReadData/RTF1984/1770202751.pdf",
      },
      {
        id: "s4-d4",
        label: "JSA & Lab Attendant",
        date: "2025-12-21",
        downloadUrl:
          "https://nests.tribal.gov.in/WriteReadData/RTF1984/1770202757.pdf",
      },
    ],
  },
];

export const mockResults: ExamResult[] = [
  {
    id: "1",
    title: "EMRS Tier 1 Result 2025",
    slug: "",
    logo: "https://blackbuck.blob.core.windows.net/blackbucks-media/logo_emrs-1758510563845.jpg",
    organizationName: "EMRS",
    examDate: "13th, 14th and 21st December 2025",
    resultDate: "31st January 2023",
    officialSiteUrl: "https://examinationservices.nic.in/recsys2025/root/CandidateLogin.aspx?enc=Ei4cajBkK1gZSfgr53ImFZ5JDNNIP7I8JbNwGOl976uPeIvr9X7G7iVESmo7y1L6",
    meritListUrl: "",
    cutOffUrl: "https://nests.tribal.gov.in/WriteReadData/RTF1984/1769779741.pdf",
    scoreCardUrl: "",
  },
];

export const mockAdmitCards: AdmitCard[] = [
  {
    id: "1",
    title: "EMRS Tier 1 Admit Card 2025",
    slug: "",
    logo: "https://blackbuck.blob.core.windows.net/blackbucks-media/logo_emrs-1758510563845.jpg",
    organizationName: "EMRS",
    examDate: "13th, 14th and 21st December 2025",
    releaseDate: "11th Decemeber 2025",
    downloadUrl: "https://nests.tribal.gov.in/WriteReadData/RTF1984/Notice_admit.pdf",
    officialSiteUrl: "https://nests.tribal.gov.in/show_content.php?lang=1&level=1&ls_id=949&lid=550",
    noticeUrl: "https://nests.tribal.gov.in/WriteReadData/RTF1984/Notice_admit.pdf",
  },
];
