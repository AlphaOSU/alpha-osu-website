export const isJson = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
};
