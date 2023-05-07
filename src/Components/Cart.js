import React,{useState , useEffect} from "react";
import {database} from '../firebase';
import { ref ,  onValue } from "firebase/database";
import { ref as pdRef, set,remove,get } from "firebase/database";
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';


const Cart = () =>{

    const [data , setData] = useState([]);
    const [gTotal , setGTotal] = useState(1);
    const [dbCart , setDbCart] = useState({})
    const [stock , setStock] = useState(0);

    


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


    useEffect(()=>{
        setGTotal(0);
        for(let i=0; i<data.length ; i++){
            setGTotal(n => Number(n) +  (Number(data[i].price)*Number(data[i].qnty)));
            console.log(data[i].productId);
          }
    },[data]);


    const handleBuy = () =>{

        console.log("waiting");
        var today = new Date();
        let date =today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


        for(let i=0; i<data.length ; i++){

            set(ref(database, 'products/'+ data[i].productId+'/stock'),(Number(data[i].stock)- Number(data[i].qnty)))
                .then(() => {
                console.log("Stock updated successfully!");
                })
                .catch((error) => {
                console.error("Error updating Stock: ", error);
            });

            


            let id=v4();
            set(pdRef(database, 'orders/' + id), {
                id: id,
                date : date,
                title: data[i].title,
                category : data[i].category,
                qnty : data[i].qnty,
                price :data[i].price,
                image :data[i].image,
                user : localStorage.getItem("email")
          });    
        }


          remove(ref(database, 'cart/'+localStorage.getItem("loggedId")+'/'))
          .then(()=>{
            alert("Order Confirmed");
            setData([]);
          
        })
          .catch((error)=>console.log(error));

    }




    const handleDelete = (e) =>{
        const { value } = e.target.dataset;
        console.log(value);

        remove(ref(database, 'cart/'+localStorage.getItem("loggedId")+'/'+value ))
          .then(()=>{
            alert("Deleted 1 Item From Cart");
 
        })
          .catch((error)=>console.log(error));

          const dbData = [];
          const dbRef = ref(database, 'cart/'+localStorage.getItem("loggedId")+'/');
          onValue(dbRef, (snapshot)=>{
             snapshot.forEach(childSnapshot =>{
              dbData.push(childSnapshot.val());
              
             });
             setData(dbData);
             console.log(data);
          });

    }




    return(

        <div className="cFull pFull">
            <h2><Link to='/'>Home / </Link>Cart</h2>
       
        <div  className="cContent">

            

        <div className="cLeft">

            <table id="table" className="cTable">
                <thead>
                <tr>
                    <th className="cTableId">#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr> 
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr>
                        <td className="cTableId" >{index+1}</td>
                        <td className= "cTableName">
                            <img src={row.image} alt="imgx" width="50px"/>
                            <p>{row.title}</p>
                        </td>
                        <td>{row.price}</td>
                        <td>{row.qnty}</td>
                        <td>{row.qnty * row.price}</td>
                        <td><button className='dltBtn'  ><i data-value={row.id} onClick={handleDelete}  class="fa fa-trash" aria-hidden="true"></i> </button></td>
                    </tr>
                  ))}
                </tbody>  
            </table>

        </div>


        <div className="cRight">
            <div className="cTop"> 
        
                <h3>Summary</h3>
                <hr/> 
           
            </div>
                  
            
            <div className="cMid">
                <br/>
                <p>Items : {data.length}</p>
                <br/>
                <p>Price : ${gTotal}</p>
                <br/>
                <p>Delivery Price : $32.00</p>
                <br/>
                <p>Discount : $32.00</p>
                <br/><br/><br/>
            </div>
        
            <hr/>
            
            <div className="cBot">
                <div className="a">
                  
                    <p>Grand Total :</p>
                    
                    <h2 id="total">${gTotal}</h2>
                </div>
                    
                <div className="b">
                 <button className="ckBtn" onClick={handleBuy} >CHECKOUT</button>
                </div>

                <br/> 
            </div>

        </div>
    </div>

    </div>


    );
}

export default Cart;