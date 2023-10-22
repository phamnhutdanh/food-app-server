const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
  {
    title: "The Awakening2",
    author: "Kate Chopin2",
  },
  {
    title: "City of Glass2",
    author: "Paul Auster2",
  },
];

export const resolvers = {
  Query: {
    books: () => books,
  },
};
