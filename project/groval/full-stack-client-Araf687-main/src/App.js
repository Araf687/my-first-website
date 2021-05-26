import './App.css';
import Admin from './components/Admin/Admin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import { createContext, useState } from 'react';

// import PrivateRoute from './components/PrivateRout/PrivateRoute';

export const UserContext=createContext({});


function App() {

  const [user,setUser]=useState({});
  const [cart,setCart]=useState([]);
  return (
    <UserContext.Provider value={[user,setUser,cart,setCart]}>
      
      <Router>
        <Switch>
          <Route path="/admin">
              <Admin></Admin>
          </Route>
            <Route path="/Home">
              <Home></Home>
            </Route>
            <Route path="/checkouts">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Home></Home>
            </Route>
            <Route path="/signUp">
              <Home></Home>
            </Route>
            <Route path="/orderHistory">
              <Home></Home>
            </Route>
            <Route path="/">
              <Home></Home>
            </Route>  
            <Route path='*'>
              <h2>not found</h2>
            </Route>   
        </Switch>

      </Router>
         
      
      
    </UserContext.Provider>
  );
}

export default App;
