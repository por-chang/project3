import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BARK } from '../../utils/mutations';

import Auth from '../../utils/auth';

const BarkForm = ({ userId }) => {
  const [bark, setBark] = useState('');

  const [createBark, { error }] = useMutation(ADD_BARK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userId);
    console.log(bark);
    try {
      const data = await createBark({
        variables: { userId, description: bark },
      });
      console.log(data);
      setBark('');
    } catch (err) {
      console.error(err);
      console.log("There was an error");
    }
  };

  return (
    <div>
      <h4>Create a Bark</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Bark Bark Bark..."
              value={bark}
              className="form-input w-100"
              onChange={(event) => setBark(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Add Bark
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to create a Bark. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default BarkForm;
