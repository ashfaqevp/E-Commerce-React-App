import { Outlet } from 'react-router-dom';
import {useState} from 'react'
import Header from './Header' ;

const ProductsHome = () => {

   const[searchValue , setSearchValue] = useState()

  const handleChildData = (data) => {
    console.log(data);
    setSearchValue(data)
  }


  return (

    
    <>
     <Header onChildData={handleChildData} />
     
     
      <div className='content'>
      <Outlet context={[searchValue]}/>
     </div>

     
      
    </>

  );
};
export default ProductsHome;