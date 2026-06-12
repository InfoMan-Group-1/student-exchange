/**
 * Mock Data Service for Landing Page
 * 
 * In the future, this will connect to the real database to aggregate
 * stats from tables like `applications` and `university_choices`.
 */

export interface LandingStats {
  annualPlacements: number;
  partnerUniversities: number;
  accreditedPrograms: number;
}

export async function getLandingStats(): Promise<LandingStats> {
  // Simulate network or DB latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulating aggregation from existing DB structures
  return {
    annualPlacements: 200,      // Derived from `applications` where status = accepted
    partnerUniversities: 50,    // Derived from distinct choices in `university_choices`
    accreditedPrograms: 100,    // Derived from `programs`
  };
}
