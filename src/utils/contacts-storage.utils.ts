import { ContactType } from "@/hooks/useFetchContacts";
import * as SecureStorage from "expo-secure-store";

export const contactStorage = {
  async setContacts(contacts: ContactType[]) {
    const stringifiedContacts = JSON.stringify(contacts);
    await SecureStorage.setItemAsync("contacts", stringifiedContacts);
  },
  async getContacts(): Promise<ContactType[] | null> {
    const contacts: string | null =
      await SecureStorage.getItemAsync("contacts");
    if (contacts) return JSON.parse(contacts);
    return null;
  },
  async clearContacts() {
    await SecureStorage.deleteItemAsync("contacts");
  },
};
