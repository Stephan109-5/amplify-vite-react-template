import '@aws-amplify/ui-react/styles.css'
import { Route, Routes } from "react-router-dom";
import Todo from "./todo";
import Gallery_Page from './gallery';
import Translate from './translate';


function App() {
  return (
      <>
        <Routes>
          <Route path="/">
            <Route index element={<Todo/>} />
            <Route path='gallery' element={<Gallery_Page/>} />
            <Route path='translate' element={<Translate/>} />
          </Route>
        </Routes>
      </>
  );
}

export default App;
