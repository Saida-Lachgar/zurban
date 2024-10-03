import { contactDetailsQuery } from "../../contacts/queries/contactDetailsQuery";
import { db } from "../../db";

export const useContactDetails = (id: string) => {
  return contactDetailsQuery(id)(db)
}
