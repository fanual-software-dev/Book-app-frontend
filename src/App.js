import {Routes,Route} from'react-router-dom'
import Login from './components/Login';
import Books from './components/Books';
import AddBook from './components/AddBook';
import Signup from './components/Signup';
import Edit from './components/Edit';
import Details from './components/Details';
import Verify from './components/Verify';

function App() {
  return (

    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/user/verification' element={<Verify/>}></Route>
      <Route path='/books' element={<Books/>}></Route>
      <Route path='/add/book' element={<AddBook/>}></Route>
      <Route path='/edit/book/:id' element={<Edit/>}></Route>
      <Route path='/details/book/:id' element={<Details/>}></Route>
    </Routes>
  );
}

export default App;
