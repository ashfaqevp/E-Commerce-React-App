
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProductsHome from './Components/ProductsHome';
import Products from './Components/Products';
import ProductsKids from './Components/ProductsKids';
import ProductsMen from './Components/ProductsMen';
import ProductsWomen from './Components/ProductsWomen';
import Product from './Components/Product';
import Cart from './Components/Cart';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Profile from './Components/Profile';


import AdminHome from './Components/AdminHome';
import Dashboard from './Components/Dashboard';
import NewProduct from './Components/NewProduct';
import AllProducts from './Components/AllProducts';
import ProductEdit from './Components/ProductEdit';
import Users from './Components/Users';
import Orders from './Components/Orders';

class App extends React.Component{
  render(){

    return(

     <BrowserRouter>
        <Routes>
          
            <Route path='/' element={<ProductsHome />}>
              <Route index element={<Products />} />
              <Route path='/products/kids' element={<ProductsKids/>} />
              <Route path='/products/men' element={<ProductsMen/>} />
              <Route path='/products/women' element={<ProductsWomen/>} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/cart' element={<Cart/>}></Route>
            </Route>

            <Route path='/admin' element={<AdminHome />}>
              <Route index element={<Dashboard />} />
              <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
              <Route path='/admin/allproducts' element={<AllProducts/>}></Route>
              <Route path='/admin/allproducts/edit/:id' element={<ProductEdit />} />
              <Route path='/admin/newproduct' element={<NewProduct/>}></Route>
              <Route path='/admin/users' element={<Users/>}></Route>
              <Route path='/admin/orders' element={<Orders/>}></Route> 
            </Route>

            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>


            {/* <Route path='/newproduct' element={<NewProduct/>}></Route>
            <Route path='/allproducts' element={<AllProducts/>}></Route>
             */}
            
            
           
        </Routes> 
    </BrowserRouter> 
       
      
    );
  }
}

export default App;
