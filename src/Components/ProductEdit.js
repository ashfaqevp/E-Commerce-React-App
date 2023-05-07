import React, {useState , useEffect,useRef} from 'react';
import {storage , database} from '../firebase'
import { ref, uploadBytes, getDownloadURL }  from "firebase/storage";
import { ref as dbRef, set,get , child } from "firebase/database";
import { v4 } from 'uuid';
import {Link, useParams} from 'react-router-dom';





const ProductEdit = () =>{

    const {id}=useParams();
    console.log(id);

    const titleRef = useRef(null);
    const catRef = useRef(null);
    const desRef = useRef(null);
    const priceRef = useRef(null);
    const imgRef = useRef(null);
    const stockRef = useRef(null);


    const [data, setData] = useState(null);

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [imgPrev, setImgPrev] =useState(null);



    useEffect (()=> {
        const dbData = [];
        const dbsRef = dbRef(database);
        

        get(child(dbsRef, 'products/'+id))
        .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              setData(snapshot.val());
              setTitle(snapshot.val().title);
              setCategory(snapshot.val().category);
              setPrice(snapshot.val().price);
              setStock(snapshot.val().stock);
              setImgPrev(snapshot.val().image);
              setDescription(snapshot.val().description);
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);

           });

         
    },[]);


    



    const uploadImage = () =>{
        if (image == null){
            let url = imgPrev
            publish(url);
        }

        const storageRef = ref(storage, `images/${image.name + v4()} `);
        console.log(`images/${image.name + v4()} `);
        uploadBytes(storageRef, image ).then((snapshot) => {
            console.log('Uploaded image');
            getDownloadURL(snapshot.ref).then( (url) => {
                setImageUrl(url);
                publish(url);

            });
          }
          
          );   
          

    }



    const publish = (url) =>{

       
        set(dbRef(database, 'products/' + id), {
            id: id,
            title: title,
            category : category,
            description :description,
            price :price,
            stock :stock,
            image : url
          });

          alert("Product Updated");
          window.location.href = 'http://localhost:3001/admin/allproducts';
         
    }


    
    const imageHandle = (e)=>{
        setImage(e.target.files[0])
        setImgPrev(URL.createObjectURL(e.target.files[0]) );
    }


    // const imageHandle = (e)=>{

    // }

    // const uploadImage = (e)=>{
        
    // }




    return(
        <div className="npMain">
            <div className="npContainer">
                <div className="npTop">
                    <h5>Edit Product</h5> 
                    <hr/>
                </div>
                <div className="npMid">

                    <div className="npLeft">
                        <p> Edit Image</p> 
                        
                        
                        <img className="addImage" src={imgPrev} >
                          
                        </img>

                        <br/>


                        <input ref={imgRef}  type="file" accept="image/*" onChange={imageHandle}>

                        </input>

                       
                        
                    </div>

                    <div className="npRight">
                        <label> Product Name</label>
                        <input ref={titleRef} type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <br/>
                        <label> Category</label>
                        <input ref={catRef} type="text"  value={category} onChange={(e) => setCategory(e.target.value)}/>
                        <br/>
                        <label> Price</label>
                        <input ref={priceRef} type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                        <br/>
                        <label> Stock Quantity</label>
                        <input ref={stockRef}  type="number" value={stock} onChange={(e) => setStock(e.target.value)}/>
                        <br/>
                        <label> Description</label>
                        <textarea ref={desRef} className="desc" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <br/>
                        
                    </div>

                </div>
                <div className="npBot">
                    <button onClick={uploadImage}>Edit Product</button>
                </div>

            </div>
        </div>
    );
}

export default ProductEdit;
