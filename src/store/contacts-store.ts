import { ContactType } from "@/hooks/useFetchContacts";
import { create } from "zustand";

type PropType = {
  contacts: ContactType[];
  setContacts: (contacts: ContactType[]) => void;
  getContact: (contactid: string) => ContactType | undefined;
  updateContactPresence: (contact: {
    userid: string;
    isActive: boolean;
  }) => void;
};
export const ContactStore = create<PropType>((set, get) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
  getContact: (contactid) => get().contacts.find((c) => c._id === contactid),
  updateContactPresence: (contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c._id === contact.userid ? { ...c, isActive: contact.isActive } : c,
      ),
    })),
}));
