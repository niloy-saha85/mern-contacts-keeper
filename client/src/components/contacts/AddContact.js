import React, { Fragment } from 'react'

const AddContact = () => {
  return (
    <Fragment>
      <div className="card card-secondary">
        <div className="card-header">
          <h3 className="card-title">Add New Contact</h3>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label for="inputEstimatedBudget">Estimated budget</label>
            <input type="number" id="inputEstimatedBudget" className="form-control" />
          </div>
          <div className="form-group">
            <label for="inputSpentBudget">Total amount spent</label>
            <input type="number" id="inputSpentBudget" className="form-control" />
          </div>
          <div className="form-group">
            <label for="inputEstimatedDuration">Estimated project duration</label>
            <input type="number" id="inputEstimatedDuration" className="form-control" />
          </div>
        </div>

      </div>
    </Fragment>
  )
}

export default AddContact;