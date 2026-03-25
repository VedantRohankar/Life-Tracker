export const calculateLevel=(xp)=>{
  return Math.floor(xp/100)+1;
};

export const getRank = (level) => {
  if (level >= 10) return "Legend";
  if (level >= 7) return "Elite";
  if (level >= 5) return "Pro";
  if (level >= 3) return "Intermediate";
  return "Beginner";
};
