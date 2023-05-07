import React, {useState , useEffect} from 'react';
import {database} from '../firebase';
import { ref ,  onValue } from "firebase/database";



const Users = () =>{

    const [data , setData] = useState([]);

    useEffect (()=> {
        const dbData = [];
        const dbRef = ref(database, 'users');

        onValue(dbRef, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbData.push(childSnapshot.val());
            

           });
           setData(dbData);
           console.log(data);
           
        })


    },[]);



  return(
    <div className="npMain">
     <div className="npContainer">
      <br/>
        <h5> Customers</h5>
        
        <table className="apTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr>
                <td>{index+1}</td>
                <td className= "tdPN">
                  {/* <img src={row.image} alt="img" width="50px"/> */}
                  <p>{row.name}</p>
                </td>
                <td>{row.email}</td>
               
                <td><button className='dltBtn'>Delete</button></td>

              </tr>
            ))}

          </tbody>

        </table>
    </div>
    </div>
  )  

}

export default Users;