import React,{useState , useEffect} from 'react';
import ReactDOM from 'react-dom'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { ref ,  onValue, child ,get,query,orderByChild,equalTo} from "firebase/database";
import {database} from '../firebase';
import { ref as pdRef, set } from "firebase/database";
import { v4 } from 'uuid';


const API = ""

const Product =() => {

    const {id}=useParams();
    console.log(id);

    const [data,setData] = useState({});
    const [qnty,setQnty] = useState(1);
    const [logged,setLogged] = useState(false);

    useEffect (()=> {
        const dbData = [];
        const dbRef = ref(database);

        console.log(localStorage.getItem('loggedId'));

        const dbRef2 = ref(database, 'users');
        const q = query(dbRef2, orderByChild("email"), equalTo("mohammad.ashfaqudheen@skillsafari.in"));
        onValue(q, (snapshot)=>{
            if (snapshot.exists()) {

                 snapshot.forEach(childSnapshot =>{
                  console.log(childSnapshot.val().id);
                })
            } 
            else {
                console.log("No data available");
            }
        });

       
        get(child(dbRef, 'products/'+id))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setData(snapshot.val())
            } 
            else {
                console.log("No data available");
            }
          }).catch((error) => {
                console.error(error);
        });

           if(localStorage.getItem("logged")=="true"){
            setLogged(true);
        }

    },[]);



    const handleAddQnty = () =>{
        setQnty(qnty + 1);
    }

    const handleSubQnty = () =>{
        setQnty(qnty - 1);
    }


  




    const handleAddToCart=(e)=>{
        if(logged){
            const { value } = e.target.dataset;
            console.log("waiting");
            console.log(value);
            const i=value;
            let id=v4();
            set(ref(database, 'cart/'+localStorage.getItem("loggedId")+'/'+id ), {
                id: id,
                title: data.title,
                category : data.category,
                qnty : qnty,
                price :data.price,
                image :data.image,
                productId : data.id,
                stock : data.stock
              });
              alert("Added To Cart");
        }

        else alert("Please Login...");  
    }







    return (
        <div className="cFull pFull">
        <h2><Link to='/'>Home / </Link>{data.title}</h2>
   
        <div  className="cContent pContent">
             
        <div className="pLeft">
            <img id="image" className="pImg" src={data.image} alt="dj"/>
        </div>

            <div className="pRight">
                <div className="pTop">   
                    <h3 id="title" >{data.title}</h3>
                    <br/>
                    <h4 id="cat">{data.category +" Clothing"}</h4>
                    <br/>
                </div>
            

             
                <div className="pMid">
                    <br/>
                    <p className="pDes" id="des">
                     {data.description}
                    </p>

                    <br/>
                    <br/>

                    <h3 id="price">Price : ${data.price}.00/-</h3>

                    <br/>
                    
                    <div className="dQ">
                        <button id="qMin" class="qMin" onClick={handleSubQnty}>-</button>
                        <h3 id="qty" class="qty">{qnty}</h3>
                        <button id="qAdd" class="qAdd"  onClick={handleAddQnty}> + </button>
                    </div> 
                </div> 

                <div className="pBot">
                    <br/>
                    <button id="total" className="b1">$ {data.price * qnty}</button>
                    <button className="b2" id="addToCart" onClick={handleAddToCart}>ADD TO CART</button>
                   

                    <br/> 
                </div>

            </div>


        </div>
        

</div>


    );
}

export default Product;