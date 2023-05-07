import React, {useState , useEffect} from 'react';
import {database} from '../firebase';
import { ref ,  onValue } from "firebase/database";


const Orders = () =>{

    const [data , setData] = useState([]);

    useEffect (()=> {
        const dbData = [];
        const dbRef = ref(database, 'orders');

        onValue(dbRef, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbData.push(childSnapshot.val());
           });
           setData(dbData);
           console.log(data);
           console.log(data[1].title)
        })
    },[]);


    const handleDelete =() =>{

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
              <th>Date</th>
              <th>Customer</th>
              <th>Price</th>
              <th>Qnty</th>
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
                <td>{row.date}</td>
                <td>{row.user}</td>
                <td>{row.price}</td>
                <td>{row.qnty}</td>
                <td><button className='dltBtn' onClick={handleDelete}>Delete</button></td>

              </tr>
            ))}

          </tbody>

        </table>
    </div>
    </div>
  )  

}

export default Orders