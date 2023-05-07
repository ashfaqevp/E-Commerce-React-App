import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import ProductFilter from './ProductFilter' ;
import '../App.css';
import {set, ref ,  onValue , orderByChild, equalTo,query } from "firebase/database";
import {database} from '../firebase';
import { v4 } from 'uuid';
import {useOutletContext} from 'react-router-dom';

const ProductsKids = () =>{

    const [data,setData] = useState([]);
    const [data2,setData2] = useState([]);
    const [logged,setLogged] = useState(false);

    const [filterTitle ,setFilterTitle]=useState("")


    const [searchValue] = useOutletContext('');
    
    const [colorValue,setColorValue] = useState(null);
    const [priceValue,setPriceValue] = useState(null);



    useEffect (()=> {
        console.log("dd")
        console.log(data.length)
        const dbData = [];

        const dbRef = ref(database, 'products');
        const q = query(dbRef, orderByChild("category"), equalTo("Kids"));

        onValue(q, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbData.push(childSnapshot.val());
      
           });
           setData(dbData);
           console.log(data);
           setData2(dbData);
          
        })


        if(localStorage.getItem("logged")=="true"){
            setLogged(true);
        }


    },[]);



    
 
  


   
   useEffect (()=>{

    setData(data2)
    console.log("ss")

     
    if(colorValue){
        console.log(colorValue);
        let newArrays= data2.filter(function (el){
        return el.description.toLowerCase().includes(colorValue.toLowerCase());  
    }); 
    setData(newArrays);
    console.log(newArrays);
    console.log(colorValue);
    setFilterTitle(" / "+colorValue)
    }

    else{
        setData(data2)
        setFilterTitle("")  
        console.log("yess")
    }
},[colorValue]);




useEffect (()=>{

    setData(data2)
    
    if(priceValue){
        console.log(colorValue);
        let newArrays= data2.filter(function (el){
        return Number(el.price) <= Number(priceValue);
       
        // el.description.toLowerCase().includes(colorValue.toLowerCase());  
    }); 
    setData(newArrays);
    console.log(newArrays);
    console.log(colorValue);
    setFilterTitle(" / Below "+priceValue)
    }

    else{
        console.log("yess")
        setData(data2)
        setFilterTitle("") ;
    }

},[priceValue]);




useEffect (()=>{
    console.log("yy")
    setData(data2);
    console.log(data2)
   if(searchValue){
    
       let newArrays = data2.filter(function (el){
           return el.title.toLowerCase().includes(searchValue.toLowerCase());  
       }); 
       
       setData(newArrays);
       console.log(data)
   }

   else{
       console.log("yess")
       setData(data2);
       fetchDbAgain();
       

   }
},[searchValue]);
   



    const fetchDbAgain =() =>{
        const dbData = [];
        const dbRef = ref(database, 'products');
        const q = query(dbRef, orderByChild("category"), equalTo("Kids"));
 
        onValue(q, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbData.push(childSnapshot.val());
      
           });
           setData(dbData);
           console.log(data);
           setData2(dbData);
          
        })
    }
    

   


    const handleChildData = (value) => {
        setColorValue(value)
    };

    const handlePriceFilter = (value) => {
        setPriceValue(value)
    };


    const handleAddToCart=(e)=>{
        if(logged){
            const { value } = e.target.dataset;
            console.log("waiting");
            console.log(value);
            const i=value;
            let id=v4();
            set(ref(database, 'cart/'+localStorage.getItem("loggedId")+'/'+id ), {
                id: id,
                title: data[i].title,
                category : data[i].category,
                qnty : 1,
                price :data[i].price,
                image :data[i].image,
                productId : data[i].id,
                stock : data[i].stock
              });
              alert("Added To Cart");
        }

        else alert("Please Login...");  
    }




        return(
            <div className="productsPage">

                <ProductFilter onChildData={handleChildData} onPriceData={handlePriceFilter} />

             

              
                <div className="products">
                <h2><Link to='/'>Home / </Link>Kids{filterTitle}</h2>
                    {data.map((product,index) => (
                       
                        <div key={product.id} className="card">
                             
                            <Link to={`/product/${product.id}`}>
                            <div className="pDetails">
                                <div><img src={product.image} alt="#" className="image"></img></div>
                                <p style={{fontWeight : '800'}} >{product.title.length > 18 ? product.title.substring(0,18) + ".." : product.title}</p>
                                <p style={{color:'gray'}}>{product.category +" Clothing"}</p>
                                <p>{"Price : $ "+product.price +".00/-"}</p> 
                            </div> 
                            </Link>   
                           
                            <button data-value={index} onClick={handleAddToCart}>ADD TO CART</button> 
                            </div> 
                        
                     
                    ))}
                
                </div> 
            </div>   
        );
    }

    export default ProductsKids;
