import React, { createRef, Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import useContact from '../../hooks/useContact';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faMobile } from '@fortawesome/free-solid-svg-icons'

const Contacts = () => {
  const contactContext = useContact();
  const { contacts, setSelected, deleteContact, contactError, contactErrorMsg } = contactContext;
  const [confirmDelete, setConfirmDelete] = useState({});
  const [success, setSuccess] = useState(false);
  const delRefs = [];


  const onEdit = (contact) => {
    return setSelected(contact);
  }

  const onConfirmDelete = (ref) => {
    console.log(ref.current.id);
    setConfirmDelete((prev) => ({ ...prev, [ref.current.id]: true }));
  }

  const onDelete = async (e, id) => {
    e.preventDefault();
    const res = await deleteContact(id);
    setSuccess(res);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }

  const onCancelDelete = (e, id) => {
    e.preventDefault();
    setConfirmDelete((prev) => ({ ...prev, [id]: false }));
  }

  return (
    <Fragment>
      <div className='row mt-2'>
        <div className="col-md-12 col-sm-12 mb-2 mx-auto">
          {contactError && <div className="alert alert-danger" role="alert">
            {contactErrorMsg}
          </div>}
          {success && <div className="alert alert-success" role="alert">
            {'Contact deleted successfully'}
          </div>}
        </div>
        {
          contacts.map(
            (eachContact, i) => {
              const newRef = createRef();
              delRefs.push({ newRef });
              return (
                <div className="col-md-3 col-sm-6 mb-2" key={eachContact._id}>
                  <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title text-truncate">
                        {eachContact.name}
                        {eachContact.contact_type === 'Personal' && <span className="badge badge-pill badge-primary p-2 float-right">{eachContact.contact_type}</span>}
                        {eachContact.contact_type === 'Professional' && <span className="badge badge-pill badge-warning p-2 float-right">{eachContact.contact_type}</span>}
                      </h5>
                      <p className="card-text text-truncate" title='Email'>
                        <FontAwesomeIcon icon={faInbox} /> {eachContact.email}
                      </p>
                      <p className="card-text text-truncate" title='Phone'>
                        <FontAwesomeIcon icon={faMobile} /> {eachContact.phone}
                      </p>
                      <p className="card-text text-truncate" title='Created'>
                        {eachContact.created_at}
                      </p>
                      <Link to={`/contacts/${eachContact._id}`} className="btn btn-primary btn-md" onClick={() => onEdit(eachContact)}>Edit</Link>
                      {confirmDelete && !confirmDelete[eachContact._id] && <button href='/#' id={eachContact._id} onClick={() => onConfirmDelete(newRef)} ref={newRef} className="btn btn-danger btn-md ml-2">Delete</button>}
                      {confirmDelete && confirmDelete[eachContact._id] && <button  id={eachContact._id} onClick={(e) => onDelete(e, eachContact._id)} className="btn btn-danger btn-md ml-2">Confirm?</button>}
                      {confirmDelete && confirmDelete[eachContact._id] && <button  id={eachContact._id} onClick={(e) => onCancelDelete(e, eachContact._id)} className="btn btn-secondary btn-md ml-2">Cancel</button>}
                    </div>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
      {/* {contacts.map(eachContact => <h4 key={eachContact.id}>{eachContact.phone}</h4>)} */}
    </Fragment>
  )
}

export default Contacts;