import axios from 'axios';
import { useEffect, useReducer } from 'react';
import useAuth from '../../hooks/useAuth';
import { CONTACT_ERROR, GET_ALL_CONTACTS, SELECT_CONTACT } from '../types';
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
      dispatch({ type: GET_ALL_CONTACTS, payload: resp.data || [] });
    } catch (error) {
      console.error('GET CONTACTS ERROR: ', error.response.data);
      dispatch({ type: CONTACT_ERROR, payload: error.response?.data || 'Internal Server Error' });
    }
  }

  const addContact = async (inputs) => {
    try {
      if (validate(inputs)) {
        const resp = await axios.post('/contacts', inputs, {
          headers: {
            Authorization: token
          }
        });
        if (resp.status === 201) await getAllContacts();
        return true;
      } else return false;
    } catch (error) {
      console.error('ADD CONTACTS ERROR: ', error.response.data);
      if (error.response.data?.errors) {
        const msg = error.response.data?.errors.map((e, i) => {
          return (<li key={i}>{e}</li>)
        });
        dispatch({ type: CONTACT_ERROR, payload: <ul>{msg}</ul> });
      }
      else dispatch({ type: CONTACT_ERROR, payload: 'Internal Server Error' });
      return false;
    }
  }

  const updateContact = async (inputs) => {
    try {
      if (validate(inputs)) {
        const { name, email, phone, contact_type } = inputs;
        await axios.put(`/contacts/${inputs._id}`, { name, email, phone, contact_type }, {
          headers: {
            Authorization: token
          }
        });
        await getAllContacts();
        dispatch({ type: SELECT_CONTACT, payload: inputs });
        return true;
      } else return false;
    } catch (error) {
      console.error('UPDATE CONTACTS ERROR: ', error.response.data);
      dispatch({ type: CONTACT_ERROR, payload: error.response?.data || 'Internal Server Error' });
      return false;
    }
  }

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/contacts/${id}`, {
        headers: {
          Authorization: token
        }
      });
      await getAllContacts();
      return true;
    } catch (error) {
      console.error('UPDATE CONTACTS ERROR: ', error.response.data);
      dispatch({ type: CONTACT_ERROR, payload: error.response?.data || 'Internal Server Error' });
      return false;
    }
  }

  const validate = (inputs) => {
    if (!inputs.name || inputs.name === '') return dispatch({ type: CONTACT_ERROR, payload: 'Name is required' });
    if (!inputs.email || inputs.email === '') return dispatch({ type: CONTACT_ERROR, payload: 'Email is required' });
    if (!inputs.phone || inputs.phone === '') return dispatch({ type: CONTACT_ERROR, payload: 'Phone is required' });
    if (!inputs.contact_type || inputs.contact_type === '') return dispatch({ type: CONTACT_ERROR, payload: 'Contact type is required' });
    return true;
  }

  const setSelected = (contact) => {
    dispatch({ type: SELECT_CONTACT, payload: contact });
  }

  useEffect(() => {
    console.log('inside the contact state useeffect, calling getAllContacts');
    (async () => {
      await getAllContacts();
    })();
    // eslint-disable-next-line
  }, []);

  return <ContactContext.Provider value={{
    ...state,
    addContact,
    updateContact,
    deleteContact,
    setSelected
  }} >
    {children}
  </ContactContext.Provider>
}