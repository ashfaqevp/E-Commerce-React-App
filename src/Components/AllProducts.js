import React, {useState , useEffect} from 'react';
import {database} from '../firebase';
import { ref ,  onValue ,remove} from "firebase/database";
import {Link, useParams} from 'react-router-dom';


const AllProducts = () =>{

    const [data , setData] = useState([]);

    useEffect (()=> {
        const dbData = [];
        const dbRef = ref(database, 'products');

        onValue(dbRef, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbData.push(childSnapshot.val());
           });
           setData(dbData);
           console.log(data);
           console.log(data[1].title)
        })
    },[]);




    const handleDelete = (e) =>{
      const { value } = e.target.dataset;
      console.log(value);

      remove(ref(database, 'products/'+value))
        .then(()=>{
          alert("Deleted 1 Item From Products");

      })
        .catch((error)=>console.log(error));

        const dbData = [];
        const dbRef = ref(database, 'products/');
        onValue(dbRef, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbData.push(childSnapshot.val());
            
           });
           setData(dbData);
           console.log(data);
        });
  }



    
    const handleEdit =() =>{

    }



  return(
    <div className="npMain">
     <div className="npContainer">
      <br/>
        <h5> Products</h5>
        <table className="apTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr>
                <td>{index+1}</td>
                <td className= "tdPN">
                  <img src={row.image} alt="img" width="50px"/>
                  <p>{row.title}</p>
                </td>
                <td>{row.category}</td>
                <td>{row.price}</td>
                <td>{row.stock}</td>
                <td>
                 <Link to={`/admin/allproducts/edit/${row.id}`}><button className='editBtn' >Edit</button></Link>
                 </td>
                <td><button className='dltBtn' data-value={row.id}  onClick={handleDelete}>Delete</button></td>

              </tr>
            ))}

          </tbody>

        </table>
    </div>
    </div>
  )  

}

export default AllProducts