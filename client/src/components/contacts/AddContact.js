import React, { useState } from 'react'
import useContact from '../../hooks/useContact';

const AddContact = () => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    contact_type: ''
  }
  const contactContext = useContact();
  const { addContact, contactError, contactErrorMsg } = contactContext;
  const [inputs, setInputs] = useState(initialState);
  const [success, setSuccess] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const res = await addContact(inputs);
    setSuccess(res);
    if (res) {
      setInputs(initialState);
      setTimeout(() => {
        setSuccess(false)
      }, 3000);
    }
  }


  return (
    <div className='row'>
      <div className='col-md-6 col-sm-12 mx-auto'>
        <form onSubmit={onSubmit}>
          <div className="card card-secondary">
            <div className="card-header">
              <h3 className="card-title">Add New Contact</h3>
              {contactError && <div className="alert alert-danger" role="alert">
                {contactErrorMsg}
              </div>}
              {success && <div className="alert alert-success" role="alert">
                {'Contact added successfully'}
              </div>}
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className="form-control" onChange={onChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" className="form-control" onChange={onChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="number" name="phone" className="form-control" onChange={onChange} required />
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="contact_type" value={'Personal'} onChange={onChange} checked={inputs?.contact_type === 'Personal'} />
                  <label className="form-check-label">Personal</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="contact_type" value={'Professional'} onChange={onChange} checked={inputs?.contact_type === 'Professional'} />
                  <label className="form-check-label">Professional</label>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddContact;