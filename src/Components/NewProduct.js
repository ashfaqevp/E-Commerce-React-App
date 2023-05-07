import {useState , useRef} from 'react';
import {storage , database} from '../firebase'
import { ref, uploadBytes, getDownloadURL }  from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { v4 } from 'uuid';



const NewProduct = () =>{

    const titleRef = useRef(null);
    const catRef = useRef(null);
    const desRef = useRef(null);
    const priceRef = useRef(null);
    const imgRef = useRef(null);
    const stockRef = useRef(null);



    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [imgPrev, setImgPrev] =useState(null);



    const uploadImage = () =>{
        if (image == null){
            return;
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

        let id=v4();
        set(dbRef(database, 'products/' + id), {
            id: id,
            title: title,
            category : category,
            description :description,
            price :price,
            stock :stock,
            image : url,
            tags:"",
            user:"Ashfaqe"
          });

          alert("New Product published");
          titleRef.current.value = "";
          catRef.current.value = "";
          priceRef.current.value = "";
          desRef.current.value = "";
          stockRef.current.value = "";
          imgRef.current.value = "";
          setImgPrev("");
    }


    
    const imageHandle = (e)=>{
        setImage(e.target.files[0])
        setImgPrev(URL.createObjectURL(e.target.files[0]) );
    }




    return(
        <div className="npMain">
            <div className="npContainer">
                <div className="npTop">
                    <h5>Add Product</h5> 
                    <hr/>
                </div>
                <div className="npMid">

                    <div className="npLeft">
                        <p> Add Image</p> 
                        
                        
                        <img className="addImage" src={imgPrev} >
                          
                        </img>

                        <br/>


                        <input ref={imgRef}  type="file" accept="image/*" onChange={imageHandle}>

                        </input>

                       
                        
                    </div>

                    <div className="npRight">
                        <label> Product Name</label>
                        <input ref={titleRef} type="text" onChange={(e) => setTitle(e.target.value)}/>
                        <br/>
                        <label> Category</label>
                        <select ref={catRef} value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                        {/* <input ref={catRef} type="text" onChange={(e) => setCategory(e.target.value)}/> */}
                        <br/>
                        <label> Price</label>
                        <input ref={priceRef} type="number" onChange={(e) => setPrice(e.target.value)}/>
                        <br/>
                        <label> Stock Quantity</label>
                        <input ref={stockRef}  type="number" onChange={(e) => setStock(e.target.value)}/>
                        <br/>
                        <label> Description</label>
                        <textarea ref={desRef} className="desc" onChange={(e) => setDescription(e.target.value)}/>
                        <br/>
                        
                    </div>

                </div>
                <div className="npBot">
                    <button onClick={uploadImage}>Publish Product</button>
                </div>

            </div>
        </div>
    );
}

export default NewProduct;
