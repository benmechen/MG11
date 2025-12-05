import { differenceInYears, isValid } from "date-fns";

export const renderAge = (dateOfBirth: Date) => {
  if (!dateOfBirth || !isValid(dateOfBirth)) return "";

  const difference = differenceInYears(Date.now(), dateOfBirth);
  if (difference >= 18) return "Over 18";
  if (difference < 0) return "0 years";

  return `${difference.toString()} years`;
};
