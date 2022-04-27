import axios from 'axios';
import { useEffect, useReducer } from 'react';
import useAuth from '../../hooks/useAuth';
import { CONTACT_ERROR, GET_ALL_CONTACTS } from '../types';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

export const ContactState = ({ children }) => {
  const auth = useAuth();
  const { token } = auth;

  const initialState = {
    contacts: [],
    selectedContact: null,
    contactError: false,
    contactErrorMsg: ''
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  const getAllContacts = async () => {
    try {
      const resp = await axios.get('/contacts', {
        headers: {
          Authorization: token
        }
      });
      console.log('DATA: ', resp.data);
      dispatch({type: GET_ALL_CONTACTS, payload: resp.data || []});
    } catch (error) {
      console.error('GET CONTACTS ERROR: ', error.response.data);
      dispatch({type: CONTACT_ERROR, payload: error.response?.data || 'Internal Server Error'});
    }
  }

  useEffect(() => {
    console.log('inside the contact state useeffect, calling getAllContacts');
    (async () => {
      await getAllContacts();
    })();
    // eslint-disable-next-line
  }, []);

  return <ContactContext.Provider value={{
    ...state
  }} >
    {children}
  </ContactContext.Provider>
}