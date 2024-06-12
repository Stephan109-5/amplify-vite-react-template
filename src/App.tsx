// import { useEffect, useState } from "react";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
import { Route, Routes } from "react-router-dom";
import Todo from "./todo";
import Storage_Page from './storage_page';

// const client = generateClient<Schema>();

function App() {

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Routes>
          <Route path="/">
            <Route index element={<Todo signOut={signOut} user={user} />} />
            <Route path='storing' element={<Storage_Page/>} />
          </Route>
        </Routes>
        
      )}
    </Authenticator>
  );
}

export default App;
