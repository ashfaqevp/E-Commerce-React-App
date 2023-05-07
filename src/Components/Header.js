import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import logo from "../Images/logo2.png";
import React,{useState , useEffect} from "react";
import {database} from '../firebase';
import { ref ,  onValue } from "firebase/database";

const Header = (props) =>{

    const [data , setData] = useState([]);
    const [cartCount , setCartCount] = useState(0);


    useEffect (()=> {
        const dbData = [];
        const dbRef = ref(database, 'cart/'+localStorage.getItem("loggedId")+'/' );
        onValue(dbRef, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbData.push(childSnapshot.val());
           });
           setData(dbData);
           
           console.log(data);
        });
    },[]);


    useEffect (()=> {

        setCartCount(data.length)
    });
    

  
    const handleChange = (event) => {
        props.onChildData(event.target.value);
      };

    return(

        <div className='nav'>

            <div className="logo">
                <img className="ilogo" src={logo} alt=""/>
                <h3>Shopping.com</h3>
            </div>

            <div className="nBar">
                <NavLink to="/products/men" activeClassName="active"><button id="men" >MEN</button></NavLink>
                <NavLink to="/products/women" activeClassName="active"><button id="women">WOMEN</button></NavLink>
                <NavLink to="/products/kids" activeClassName="active"><button id="jewelery">KIDS</button></NavLink>
            </div>
       

            <div className="leftNav">

            <div  className="search form" action="/action_page.php" >
                    <input id="sText" type="text" placeholder="Search.." name="search2" onChange={handleChange}/>
                    <button id="sBtn" type="submit"><i class="fa fa-search"></i></button>
            </div>

               <Link to="/cart/">
                    <button id="sBtn" type="submit">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                    {/* <h3 id="cartCount" class="cc"> {data.length} </h3> */}
                </Link>

                <Link to="/profile/">
                    <div class="profile">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                </Link>

               
            </div> 



        </div>

        // <div className='heading'>
            
        //     <h1  className =""> SHOPPING SITE</h1>
        //     <Link to={`/profile`} >
        //         <button >Profile</button>
        //     </Link>
        // </div>
    );
}

export default Header;