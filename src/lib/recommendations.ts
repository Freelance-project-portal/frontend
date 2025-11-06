export function calculateSkillMatch(userSkills: string[], projectSkills: string[]) {
  if (!projectSkills || projectSkills.length === 0) return 0;
  const normalizedUser = new Set(userSkills.map((s) => s.toLowerCase().trim()));
  const normalizedProject = projectSkills.map((s) => s.toLowerCase().trim());
  const matches = normalizedProject.filter((s) => normalizedUser.has(s)).length;
  return Math.round((matches / normalizedProject.length) * 100);
}


