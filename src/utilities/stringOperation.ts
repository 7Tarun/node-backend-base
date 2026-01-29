export const toLocalCase = (str: any) => {
  if (typeof str !== "string" || str.length === 0) return str;
  const lowerCaseStr = str.toLowerCase();
  return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
};
