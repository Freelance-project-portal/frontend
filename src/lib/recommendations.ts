import type { Project, Profile } from "@/src/types";

export const calculateSkillMatch = (
  studentSkills: string[],
  projectSkills: string[]
): number => {
  if (!studentSkills?.length || !projectSkills?.length) return 0;

  const studentSkillsLower = studentSkills.map((s) => s.toLowerCase());
  const projectSkillsLower = projectSkills.map((s) => s.toLowerCase());

  const matchingSkills = studentSkillsLower.filter((skill) =>
    projectSkillsLower.includes(skill)
  );

  return Math.round((matchingSkills.length / projectSkillsLower.length) * 100);
};

export const getRecommendedProjects = (
  studentProfile: Profile,
  allProjects: Project[]
): Project[] => {
  const scoredProjects = allProjects.map((project) => {
    const skillMatchScore = calculateSkillMatch(
      studentProfile.skills || [],
      project.skills || []
    );

    // Factor in recency (newer projects get slight boost)
    const daysOld = Math.floor(
      (Date.now() - new Date(project.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    const recencyScore = Math.max(0, 20 - daysOld); // Max 20 points for new projects

    const totalScore = skillMatchScore + recencyScore;

    return {
      project,
      score: totalScore,
      skillMatch: skillMatchScore,
    };
  });

  // Sort by score descending
  scoredProjects.sort((a, b) => b.score - a.score);

  // Return top 10 projects with at least 30% skill match
  return scoredProjects
    .filter((sp) => sp.skillMatch >= 30)
    .slice(0, 10)
    .map((sp) => sp.project);
};

export const getMatchedSkills = (
  studentSkills: string[],
  projectSkills: string[]
): { matched: string[]; unmatched: string[] } => {
  const studentSkillsLower = studentSkills.map((s) => s.toLowerCase());
  const projectSkillsLower = projectSkills.map((s) => s.toLowerCase());

  const matched = projectSkills.filter((skill) =>
    studentSkillsLower.includes(skill.toLowerCase())
  );

  const unmatched = projectSkills.filter(
    (skill) => !studentSkillsLower.includes(skill.toLowerCase())
  );

  return { matched, unmatched };
};


