const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedbooks: [Book]
  }

  type Book {
    _id: ID!
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
    users: [Users]!
    user(userId: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, description: String!, title: String!): User
    deleteBook(userId: ID! bookId: ID!): User
  }
`;

module.exports = typeDefs;
