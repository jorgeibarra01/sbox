// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// render(<App />, document.getElementById("root"));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React from "react";
// import { render } from "react-dom";
import ReactDOM from 'react-dom';

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query, Mutation} from "react-apollo";


const client = new ApolloClient({
 uri: "http://localhost:4000/"
});

 const ADD_TODO = gql`
   mutation AddTodo($todo: String!) {
       addTodo(todo: $todo) {
           todos
       }
   }
   `;

   const GET_NEWS = gql`
       query GetNews {
        news {
          title
        }
      }
      
       `;

   const AddTodo = () => {
       let input;

       return (
         <Mutation mutation={ADD_TODO}>
           {(addTodo, { data }) => (
             <div>
               <form
                 onSubmit={e => {
                   e.preventDefault();
                   addTodo({ variables: { todo: input.value } });
                   input.value = "";
                 }}
               >
                 <input
                   ref={node => {
                     input = node;
                   }}
                 />
                 <button type="submit">Add Todo</button>
               </form>
             </div>
           )}
         </Mutation>
       );
     };

     const FetchTodos = () => (
       <Query
         query={GET_NEWS}
       >
         {({ loading, error, data }) => {
           if (loading) return <p>Loading...</p>;
           if (error) return <p>Error :(</p>;

           return (
             <div >
               <p>{data.todos }</p>
             </div>
           );
         }}
       </Query>
     );


 const ExchangeRates = () => (
   <Query
     query={gql`
        {
            news {
            title
            }
        }
     `}
   >
     {({ loading, error, data }) => {
       if (loading) return <p>Loading...</p>;
       if (error) return <p>Error :(</p>;

       return (
         <div >
           {data.news.map(bleh => (<p> {bleh.title} </p>)) }
         </div>
       );
     }}
   </Query>
 );

const App = () => (
 <ApolloProvider client={client}>
   <div>
     <h2> My first Apollo app :rocket:</h2>
     <ExchangeRates/>
     {/* <FetchTodos /> */}
     {/* <AddTodo/> */}
   </div>
 </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));