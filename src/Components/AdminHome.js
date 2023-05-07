import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar.js' ;
// get our fontawesome imports
import 'font-awesome/css/font-awesome.min.css';



const AdminHome = () => {
  return (


    <div className='adminContent'>
        <div className="ahLeft">
          <AdminNavbar/>
        </div>
        <div className='ahRight'>
            <div className='ahTop'>
                <div className='ahtLeft'>
                    <input type="text" placeholder='search for...'></input>
                    <button><i className="fa fa-search" aria-hidden="true"></i></button>
                    
                </div>
                <div className='ahtRight'>
                    <img alt="jj" src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg" /> 
                    <div>
                        <p className='a'>Ashfaqe</p>
                        <p className='b'>Seller account</p>
                    </div>
                </div>
            </div>
            <div className='ahBot'> <Outlet/> </div>
        </div>

        
     
     
     
     <div className='contents'>
     
     </div>
      
    </div>

  );
};
export default AdminHome;