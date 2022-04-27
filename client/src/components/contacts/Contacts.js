import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import ContactContext from '../../contexts/contacts/contactContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faMobile } from '@fortawesome/free-solid-svg-icons'

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;
  
  return (
    <Fragment>
      <div className='row mt-2'>
        <div className="col-md-3 col-sm-6 mb-2">
          {contacts.map(eachContact => (
            <div className="card" key={eachContact.id}>
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
                <Link to={`/contacts/${eachContact._id}`} className="btn btn-primary btn-md">View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {contacts.map(eachContact => <h4 key={eachContact.id}>{eachContact.phone}</h4>)} */}
    </Fragment>
  )
}

export default Contacts;