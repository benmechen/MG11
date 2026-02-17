export const parseCad = (cad: string) => {
  const [cadNumber, date] = cad.split("/");

  return {
    cadNumber: Number(cadNumber),
    date,
  };
};
