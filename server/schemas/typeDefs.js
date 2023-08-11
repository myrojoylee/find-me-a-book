const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedbooks: [Book]
  }

  input Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: Book!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
