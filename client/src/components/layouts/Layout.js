import React, { Fragment } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';
import { Route, Routes } from 'react-router-dom';
import Contacts from '../contacts/Contacts';
import ContactItem from '../contacts/ContactItem';
import AddContact from '../contacts/AddContact';
import { ContactState } from '../../contexts/contacts/ContactState';

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <div className='container-fluid'>
        <div className="row">
          <Sidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <ContactState>
              <Routes>
                <Route path='/' element={<Contacts />} />
                <Route path='/contacts/add' element={<AddContact />} />
                <Route path='/contacts/:id' element={<ContactItem />} />
              </Routes>
            </ContactState>
          </main>
        </div>
      </div>
    </Fragment>
  )
}

export default Layout;