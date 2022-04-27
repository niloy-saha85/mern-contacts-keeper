import { useContext } from "react"
import ContactContext from '../contexts/contacts/contactContext';

const useContact = () => {
  return useContext(ContactContext);
}

export default useContact;