import React from "react";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
import "./styles/App.css";
import Main from "./model/main";

const client = new ApolloClient({
    uri: 'http://13.127.101.229:4000/graphql',
    request: (operation) => {

        operation.setContext({
            headers: {
                authorization: process.env.REACT_APP_TOKEN ? `Bearer ${process.env.REACT_APP_TOKEN}` : ''
            }
        })
    }
})



function App() {
  return (
      <ApolloProvider client={client}>
             <Main/>
      </ApolloProvider>
  );
}

export default App;

