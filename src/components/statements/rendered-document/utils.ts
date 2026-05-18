import { differenceInYears, isValid } from "date-fns";

export const renderAge = (dateOfBirth: Date, over18?: boolean) => {
  if (!dateOfBirth || !isValid(dateOfBirth) || over18) return "Over 18";

  const difference = differenceInYears(Date.now(), dateOfBirth);
  if (difference >= 18) return "Over 18";
  if (difference < 0) return "0 years";

  return `${difference.toString()} years`;
};
