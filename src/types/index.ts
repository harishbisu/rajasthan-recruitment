
export interface Job {
  id: number;
  title: string;
  slug: string;
  logo: string;
  registrationStartDate?: string;
  notificationDate?: string;
  level?: string;
  examDate?: string;
  posts?: number;
  detailsUrl?: string;
  officialSiteUrl?: string;
  registrationEndDate?: string;
  categories?: string[];
}