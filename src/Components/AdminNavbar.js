import '../App.css';
import {  NavLink } from 'react-router-dom';
import pic from "../Images/logo.jpg";

const AdminNavBar = () =>{
    



    return(
        <div className='navbar'>
            
            <ul type="none">

                <img src={pic} alt="jdsj" width="100px"/>
                <NavLink to="/admin/" exact activeClassName="active"><li> <i class="fa fa-home" aria-hidden="true"></i>  Dashboard</li></NavLink>
                <NavLink to="/admin/allproducts" activeClassName="active"><li> <i class="fa fa-shopping-cart" aria-hidden="true"></i> Products</li></NavLink>
                <NavLink to="/admin/newproduct" activeClassName="active"><li><i class="fa fa-plus-circle" aria-hidden="true"></i> Add Product</li></NavLink>
                <NavLink to="/admin/users" activeClassName="active"><li><i class="fa fa-user-circle-o" aria-hidden="true"></i> Customers</li></NavLink>
                <NavLink to="/admin/orders" activeClassName="active"><li><i class="fa fa-list-alt" aria-hidden="true"></i> Orders</li></NavLink>
                <li><i class="fa fa-cog" aria-hidden="true"></i>{" Settings"}</li>
            </ul>
            
        </div>
    );
}

export default AdminNavBar;