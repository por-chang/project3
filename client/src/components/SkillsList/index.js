import React from 'react';
import { useMutation, useQuery } from '@apollo/client';


import { REMOVE_BARK } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";


const BarksList = ({ barks, isLoggedInUser = false }) => {

  const [removeBark, { error }] = useMutation(REMOVE_BARK, {
    update(cache, { data: { removeBark } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeBark },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveBark = async (id) => {
    try {

      const { data } = await removeBark({
        variables: { id: id },

      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!barks.length) {
    return <h3>No Barks Yet</h3>;
  }

  console.log(barks[0]);
  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {barks &&
          barks.map((bark) => (
            <div key={bark._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{bark.description}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveBark(bark._id)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default BarksList;
