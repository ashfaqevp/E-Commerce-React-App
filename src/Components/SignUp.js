import {useState} from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider ,createUserWithEmailAndPassword} from "firebase/auth";
import {auth, database} from '../firebase'
import { ref as dbRef, set } from "firebase/database";
import { useNavigate , Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { ref ,  onValue , orderByChild, equalTo,query } from "firebase/database";


const SignUp = () =>{

    const [error , setError] = useState(false);
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [pass , setPass] = useState("");
    const [uEmail,setUEmail] = useState("");
    const [logged , setLogged] = useState(false);


    const navigate = useNavigate();

   


    const handleSignUp = (e) =>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
         
          const user = userCredential.user;
          console.log(user);
        
          
          console.log(user.email);


          let Uid =v4();
          localStorage.setItem("email" , user.email);
          localStorage.setItem("logged" , "true"); 
          localStorage.setItem("loggedId" , Uid); 

          console.log("dhesfjkglhj");
          console.log(localStorage.getItem('loggedId'));

          set(dbRef(database, 'users/' + Uid), {
            id: Uid,
            name: name,
            email : email,
            pass :pass,
          });

          

          navigate("/profile")
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert('Already have an account');
          // ..
        });   
    }


    // const publish = () =>{

    //     set(dbRef(database, 'users/' + v4()), {
    //         id: v4(),
    //         name: name,
    //         email : email,
    //         pass :pass,
    //       });
    // }

   
    const handleGoogleSignup = () =>{
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {

                let id =v4();
             
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);

                const dbRef2 = ref(database, 'users');
                const q = query(dbRef2, orderByChild("email"), equalTo(user.email));
                onValue(q, (snapshot)=>{
                    if (snapshot.exists()) {
        
                        snapshot.forEach(childSnapshot =>{
                          console.log(childSnapshot.val().id);
                          localStorage.setItem("email" , user.email);
                          localStorage.setItem("logged" , "true"); 
                          localStorage.setItem("loggedId" , childSnapshot.val().id); 
                        })
                    } 
                    else {
                        console.log("No Previouse Email  available");
        
                        set(dbRef(database, 'users/' + id), {
                            id: id,
                            name: user.displayName,
                            email : user.email,
                            image : "",
                            pass :"!@##!@!#!#!$^!$^!&",
                          });

                        localStorage.setItem("email" , user.email);
                        localStorage.setItem("logged" , "true"); 
                        localStorage.setItem("loggedId" , id);   
                    }
                });

                  

                navigate("/profile");

              
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                
                const email = error.customData.email;
               
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });

    }


    return (
     

        <div class="main">

            <div className='container'>
                <div className='left signupLeft'>
                </div>


                <div className='right'>

                    <div className="top">
                        <h2 className='h2'>SignUp</h2>
                        <p>Already have an account yet?  <Link to={`/login`}>Login</Link></p>
                    </div>

                    <div className ="mid signupMid">
                        <form  onSubmit={handleSignUp}>

                            <label for="Name">Username</label>
                            <input placeholder="your name" type={'text'} onChange={(e) => setName(e.target.value)}></input>
                           

                            <label for="Email">Email</label>
                            <input placeholder="you@example.com" type={'email'} onChange={(e) => setEmail(e.target.value)}></input>
                           
                            <label for="Password">Password</label>
                            <input placeholder="Enter 6 character or more" type={'password'} onChange={(e) => setPass(e.target.value)}></input>
                            <br/>
                            <button>Login</button>
                        </form> 
                    </div>



                    <div className='bot'>
                        <div className="or" >------ or Login with ------</div>
                        <br/>
                        <button onClick={handleGoogleSignup}>Google</button>
                        
                    </div>
            
            </div>
            </div>
            </div>

    );
}

export default SignUp; 