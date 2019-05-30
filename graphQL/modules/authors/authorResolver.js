export const authorResolver = {
  Query: {
    getAuthors: () => 'You all wrote notes ?',
    getAuthor: () => 'You wrote a note ?'
  },
  
  Author: {
    books: () => 'Want some books?',
  }
}