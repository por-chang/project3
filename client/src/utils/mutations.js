import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation createUser($userName: String!, $email: String!, $password: String!) {
    createUser(userName: $userName, email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

//Need to adjust these when get bark to work //TODO
export const ADD_BARK = gql`
  mutation createBark($description: String!) {
    createBark(description: $description) {
          _id
          description
          likes
          date
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
        email
        password
        barks {
          _id
          description
          likes
        }
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      userName
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser {
    updateUser {
      _id
      userName
      email
      password
      barks {
        _id
        description
        likes
      }
    }
  }
`;

export const REMOVE_BARK = gql`
  mutation deleteBark($barkId: String!) {
    deleteBark(barkId: $barkId) {
      _id
      userName
      email
      password
      barks {
        description
        _id
        likes
        date
      }
    }
  }
`;
