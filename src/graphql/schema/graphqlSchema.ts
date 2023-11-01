export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  enum Role {
    ADMIN
    CUSTOMER
    SHOP
  }

  enum Gender {
    MALE
    FEMALE
    OTHERS
  }

  enum OrderStatus {
    PENDING
    CANCEL
    ACCEPT
    COMPLETE
  }

  type UserAccount {
    id: String   
    email: String!   
    role: Role!
    customer: [Customer]
    shop: [Shop]
  }

  type Customer {
    id: Int!
    name: String!
    imageUrl: String
    phoneNumber: String
    defaultAddress: String
    gender: Gender
    # birthday: DateTime
    userAccount: UserAccount!
    cart: [Cart]
    order: [Order]
  }

  type Cart {
    customer: Customer!
    food: Food!
    shop: Shop!
    quantity: Int
  }

  type Shop {
    id: Int!
    name: String!
    imageUrl: String
    backgroundImageUrl: String
    phoneNumber: String
    defaultAddress: String
    userAccount: UserAccount!
    cart: [Cart]
    category: [Category]
    order: [Order]
  }

  type Food {
    id: Int!
    name: String!
    imageUrl: String
    description: String
    price: Int!
    foodType: FoodType
    cart: [Cart]
    category: [Category]
    orderDetails: [OrderDetails]
  }

  type FoodType {
    id: Int!
    type: String!
    foodType: [FoodType]
  }

  type FoodSize {
    id: Int!
    size: String!
    foodSize: [FoodSize]
  }

  type Category {
    id: Int!
    amount: Int
    sellCount: Int
    # dateAdded: DateTime
    food: Food!
    shop: Shop!
    foodSize: FoodSize
  }

  type Order {
    id: Int!
    orderStatus: OrderStatus
    # createdAt: DateTime
    # timeDeliveryToCustomer: DateTime?
    totalCost: Int!
    noteFromShop: String
    customer: Customer!
    shop: Shop!
    orderDetails: [OrderDetails]
  }

  type OrderDetails {
    quantity: Int!
    order: Order!
    food: Food!
  }

  type Book {
    title: String
    name: String
  }

  type Query {
    books: Book
  }

  type Mutation {
    createUserAccount(name: String!, email: String!, password: String!, role: Role): Boolean
  }
`;
