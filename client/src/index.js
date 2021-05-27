import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css' ;
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,Route} from 'react-router-dom';
import Login from './components/login' ;
import Register from './components/register' ;
import Contacts from './components/contacts';


ReactDOM.render(
  <BrowserRouter>
   <div>
     <Route exact={true} path='/' component={Login} ></Route>
     <Route path='/register' component={Register}/>
     <Route path='/contacts' component={Contacts}/>
   </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
