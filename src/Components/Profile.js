import {useState , useEffect} from 'react';
import { signOut  } from "firebase/auth";
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ref ,  onValue, child ,get,query,orderByChild,equalTo} from "firebase/database";
import {database} from '../firebase';
import { ref as pdRef, set } from "firebase/database";

const Profile = () =>{

    const [email ,setEmail] = useState("");
    const [logged ,setLogged] = useState(false);
    const [name,setName] = useState({});
    const [loggedId,setLoggedId] = useState();



    const navigate = useNavigate();

    useEffect(() => {

        setEmail(localStorage.getItem("email"))
        setLoggedId(localStorage.getItem('loggedId'))
       

        if(localStorage.getItem("logged")==="true"){

          
            console.log(loggedId);
            console.log(email);

            const dbRef = ref(database);

            get(child(dbRef, 'users/'+loggedId))
            .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val().name);
              setName(snapshot.val().name)
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);

           });
        }


        else{
            navigate("/login"); 
            console.log("noooot")
        }



        

          
        
    
    },[]);
    

    const handleSignout = ()=>{
        signOut(auth).then(() => {
            localStorage.setItem("email" , "");
            localStorage.setItem("loggedId" , "");
            localStorage.setItem("logged" , "false");
            navigate("/login"); 
            
          }).catch((error) => {
            // An error happened.
          });

    }



    // return(
    //     <div>
    //         <h1> Hi {email}</h1>
    //         <button onClick={handleSignout}>Logout</button>
    //     </div>
    // )


    

    return(

        <div className="cFull pFull profileFull">
                <h2><Link to='/'>Home / </Link>Profile</h2>
        
            <div  className="cContent profileContent">
                <div className="profileTop">
                    <div className='profileLogo'>
                        <i class="fa fa-user-circle-o profileIcon" aria-hidden="true"></i>
                    </div>
                    <p>E-mail : {email}</p>  
                </div>

                <button onClick={handleSignout}>Logout</button>

            </div>

        </div>


    );




}

export default Profile;
