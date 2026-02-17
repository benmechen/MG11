export const isValidId = (id: string | number | undefined): boolean => {
  if (id === undefined) return false;

  const parsedId = Number(id);
  return !Number.isNaN(parsedId) && parsedId > 0;
};
