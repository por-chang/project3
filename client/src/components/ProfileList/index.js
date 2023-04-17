import React from "react";
import { Link } from "react-router-dom";
// import { styles } from '../styles/BarksStyles';

const UserList = ({ users, title }) => {
  if (!users.length) {
    return <h3>No Users Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {users &&
          users.map((user) => (
            <div key={user._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {user.userName} <br />
                  <span className="text-white" style={{ fontSize: "1rem" }}>
                    currently has {user.barks ? user.barks.length : 0} bark
                    {user.barks && user.barks.length === 1 ? "" : "s"}
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/users/${user._id}`}
                >
                  View Barks.
                  <span>{user.barks.description}</span>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
