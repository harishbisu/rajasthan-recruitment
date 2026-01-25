import jobsData from "../data/job-data";

export async function getAllJobs(options: { category?: string; query?: string; limit?: number; offset?: number } = {}) {
  try {
    let filteredJobs = jobsData;

    if (options.category) {
      filteredJobs = filteredJobs.filter((job) => job.categories?.includes(options.category!));
    }

    if (options.query) {
      const q = options.query.toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(q) ||
        job.categories?.some(c => c.toLowerCase().includes(q))
      );
    }

    const limit = options.limit || filteredJobs.length;
    const offset = options.offset || 0;

    return {
      jobs: filteredJobs.slice(offset, offset + limit),
      total: filteredJobs.length
    };
  } catch (error) {
    console.error("Jobs not found:", error);
    return { jobs: [], total: 0 };
  }
}
