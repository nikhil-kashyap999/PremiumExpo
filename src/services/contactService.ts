import { ContactType } from "@/hooks/useFetchContacts";
import { contactStorage } from "@/utils/contacts-storage";

export const filterContacts = (
  searchQuery: string,
  Contacts: ContactType[] | [],
) => {
  return searchQuery.trim()
    ? Contacts.filter((contact: any) =>
        contact.username
          ?.toLowerCase()
          .includes(searchQuery.trim().toLocaleLowerCase()),
      )
    : Contacts;
};

//get a specific contact from stored contacts
export const getStoredContact = async (id: string): Promise<ContactType | undefined> => {
  const contacts = await contactStorage.getContacts();
  const contact = contacts?.find((contact) => contact._id === id);
  if (contact) return contact;
  else return undefined;
};
