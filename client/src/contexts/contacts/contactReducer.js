import { CONTACT_ERROR, GET_ALL_CONTACTS, SELECT_CONTACT } from "../types";

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        selectedContact: null,
        contactError: false,
        contactErrorMsg: ''
      };
    case SELECT_CONTACT:
      return {
        ...state,
        contactError: false,
        contactErrorMsg: '',
        selectedContact: action.payload
      }
    case CONTACT_ERROR:
      return {
        ...state,
        contactError: true,
        contactErrorMsg: action.payload
      }
    default:
      break;
  }
};

export default contactReducer;