import axios from "axios";
import { useEffect, useState } from "react";
import { axiosApi } from "@/services/axiosApi";
import { ContactStore } from "@/store/contacts-store";
import { contactStorage } from "@/utils/contacts-storage";

export type ContactType = {
  _id: string;
  username: string;
  email: string;
  isActive: boolean;
  avatarUrl: string;
};

export default function useFetchContacts() {
  const [error, setError] = useState<string>("");
  const contacts = ContactStore((s) => s.contacts);
  const setStorageContacts = ContactStore((s) => s.setContacts);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(true);

  const fetchContacts = async () => {
    try {
      setLoadingContacts(true);
      const response = await axiosApi("/api/user/contacts");
      setStorageContacts(response.data.res);
      contactStorage.setContacts(response.data.res);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      }
    } finally {
      setLoadingContacts(false);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);
  return { contacts, error, fetchContacts, loadingContacts };
}
