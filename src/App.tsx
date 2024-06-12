import '@aws-amplify/ui-react/styles.css'
import { Route, Routes } from "react-router-dom";
import Todo from "./todo";
import Storage_Page from './storage_page';

// const client = generateClient<Schema>();

function App() {
  return (
        <Routes>
          <Route path="/">
            <Route index element={<Todo/>} />
            <Route path='storing' element={<Storage_Page/>} />
          </Route>
        </Routes>
  );
}

export default App;
