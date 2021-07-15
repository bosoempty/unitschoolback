const { gql } = require('apollo-server-express');

const schema = gql`
  type Query {
    user: User
    users: [User]!
  }

  type Mutation {
    signinWithAccessToken(accessToken: String): User
    register(
      firstName: String!
      lastName: String!
      email: String!
      phone: String!
      state: String!
      rank: String!
      serviceId: String!
      position: String!
      base: String!
    ): User
  }
  scalar Date

  type User {
    id: String!
    lineId: String
    firstName: String
    lastName: String
    rank: String
    serviceId: String
    position: String
    base: String
    email: String
    phone: String
    pictureUrl: String
    state: State
    createdAt: Date
  }

  enum State {
    admin
    teacher
    student2
    student1
    student0
    guess
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    pictureUrl: String!
    user: User!
    createdAt: Date!
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    user: User!
    createdAt: Date!
  }

  type Address {
    id: ID!
    subdetail: String
    district: String
    city: String
    province: String
    zip: String
  }
`;

module.exports = schema;
