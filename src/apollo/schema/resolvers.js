var firebase = require('../../config/fbConfig'); 

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.

//Firebase Database Json Export: 
// {
//   "news" : [ {
//     "title" : "Article One"
//   }, {
//     "title" : "Article Two"
//   }, {
//     "title" : "Article Three"
//   } ]
// }
  

  async function articles() { 
    let newArr = []; 
    await firebase.database().ref("news").once("value", function(snapshot) {
      newArr = snapshot.val(); 
      //newArr = [ { title: 'Article One' }, { title: 'Article Two' }, { title: 'Article Three' } ]
      
      // Object.keys(snappy).map(key => {snappy[key].id = key; newArr.push(snappy[key])}); 
    })
    return newArr; 
}
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
      news: () => articles(),
    },
  };

module.exports = resolvers;