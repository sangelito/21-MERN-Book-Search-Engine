import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String]!
    $description: String!
    $title: String!
    $bookId: ID!
    $image: String!
  ) {
    saveBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
    ) {
      _id
      username
      bookCount
      savedBooks {
        bookId
        title
      }
    }
  }
`;
