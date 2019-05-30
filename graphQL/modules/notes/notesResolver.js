export const noteResolvers = {
  Query: {
    author: () => 'You wrote the note?',
  },
  
  Author: {
    books: () => 'Want some books?',
  }
}