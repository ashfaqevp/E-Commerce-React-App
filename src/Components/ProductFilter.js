import React,{useState} from 'react';

const ProductFilter = ({onChildData,onPriceData}) =>{


  const [selected, setSelected] = useState(null);
  const [slctColor, setSlctColor] = useState(null);
  const [slctPrice, setSlctPrice] = useState(null);





  const handleColor = (event) => {


    if (event.target.checked) {
      setSelected(event.target.value);
      onChildData(event.target.value);
    } else {
      setSelected(null);
      onChildData("");
    }
    
  };


  const handlePrice = (event) => {

    if (event.target.checked) {
      setSelected(event.target.value);
      onPriceData(event.target.value);
    } else {
      setSelected(null);
      onPriceData('');
    }
    
  };



    return(
        <div className="filter">
                
            <br/>
            <h4>FILTERS</h4>
            <br/>
            <hr/>
            <br/>


            <h5>BRAND</h5>
            <br/>
            
            <form>
                <input type="checkbox" name="color"  value="Nike" checked={selected === "Nike"} onChange={handleColor}  />
                <label > Nike</label><br/>

                <input type="checkbox"  name="color" value="Allen Solly" checked={selected === "Allen Solly"}  onChange={handleColor}/>
                <label > Allen Solly</label><br/>

                <input type="checkbox" name="color"  value="Chanel" checked={selected === "Chanel"} onChange={handleColor}/>
                <label > Chanel</label><br/>

                <input type="checkbox"  name="color"  value="H&M Kids" checked={selected === "H&M Kids"}  onChange={handleColor}/>
                <label > H&M Kids</label><br/>
   
              </form>
              <br/>
              <hr/>
              <br/>


            <h5>COLORS</h5>
            <br/>
            
            <form className="colorFilterForm">
                <input type="checkbox" name="color"  value="red" checked={selected === "red"} onChange={handleColor}  />
                <label > <i class="fa fa-circle" aria-hidden="true" style={{color:"red"}} /> Red</label><br/>

                <input type="checkbox"  name="color" value="pink" checked={selected === "pink"}  onChange={handleColor}/>
                <label > <i class="fa fa-circle" aria-hidden="true" style={{color:"#eb4986"}} /> Pink</label><br/>

                <input type="checkbox" name="color"  value="blue" checked={selected === "blue"} onChange={handleColor}/>
                <label > <i class="fa fa-circle" aria-hidden="true" style={{color:"blue"}} /> Blue</label><br/>

                <input type="checkbox" name="color" value="green" checked={selected === "green"} onChange={handleColor}/> 
                <label > <i class="fa fa-circle" aria-hidden="true" style={{color:"green"}} />  Green</label><br/>

                <input type="checkbox"  name="color"  value="white" checked={selected === "white"}  onChange={handleColor}/>
                <label > <i class="fa fa-circle" aria-hidden="true" style={{color:"gray"}} />  White</label><br/>

                <input type="checkbox" name="color" value="black" checked={selected === "black"} onChange={handleColor}/> 
                <label > <i class="fa fa-circle" aria-hidden="true" style={{color:"black"}} />  Black</label><br/><br/>    
              </form>
              <br/>
              <hr/>
              <br/>


           
            <h5>CLOTH TYPES</h5>
            <br/>
            
            <form>
                <input type="checkbox" name="color"  value="cotton" checked={selected === "cotton"} onChange={handleColor}  />
                <label > Cotton</label><br/>

                <input type="checkbox"  name="color" value="polyster" checked={selected === "polyster"}  onChange={handleColor}/>
                <label > Polyster</label><br/>

                <input type="checkbox" name="color"  value="silk" checked={selected === "silk"} onChange={handleColor}/>
                <label > Silk</label><br/>

                <input type="checkbox"  name="color"  value="jeans" checked={selected === "jeans"}  onChange={handleColor}/>
                <label > Jeans</label><br/>
   
              </form>
              <br/>
              <hr/>
              <br/>



              <h5>PRICE</h5>
              <br/>
                <form>
                  <input type="checkbox" name="price"  value="500" checked={selected === "500"} onChange={handlePrice}  />
                  <label> Below Rs.500 </label><br/>
  
                  <input type="checkbox" name="price"  value="1000" checked={selected === "1000"} onChange={handlePrice}  />
                  <label> Below Rs.1000 </label><br/>
  
                  <input type="checkbox" name="price"  value="2000" checked={selected === "2000"} onChange={handlePrice}  />
                  <label> Below Rs.2000</label><br/>
  
                  <input type="checkbox" name="price"  value="5000" checked={selected === "5000"} onChange={handlePrice}  />
                  <label> Below Rs.5000 </label><br/>
  
                </form>
                <br/>
                <hr/>
                <br/>



               {/*
            <h5>CATEGORIES</h5>
            <br/>
            <form>
                <input type="checkbox" name="color"  value="red" checked={selected === "red"} onChange={handleClick}  />
                <label > Formal Shirt</label><br/>

                <input type="checkbox"  name="color" value="pink" checked={selected === "pink"}  onChange={handleClick}/>
                <label for="vehicle2"> Cashual Shirt</label><br/>

                <input type="checkbox" name="color"  value="blue" checked={selected === "blue"} onChange={handleClick}/>
                <label > Boxers</label><br/>

                <input type="checkbox"  name="color"  value="white" checked={selected === "white"}  onChange={handleClick}/>
                <label for="vehicle2"> Jeans</label><br/>

                <input type="checkbox" name="color" value="black" checked={selected === "black"} onChange={handleClick}/> 
                <label for="vehicle3"> Tshirt</label><br/><br/>    
              </form>
              <br/>
              <hr/>
              <br/>
              */}
   

            {/* <h5>BRAND</h5>
            <br/>
              <form>
                <input type="checkbox"  value="Bike"/>
                <label > Puma</label><br/>

                <input type="checkbox"   value="Car"/>
                <label for="vehicle2"> Nike</label><br/>

                <input type="checkbox"  value="Bike"/>
                <label > US Polo</label><br/>

                <input type="checkbox"   value="Car"/>
                <label > Max</label><br/>

                <input type="checkbox"   value="Car"/>
                <label for="vehicle2"> Tommy Hilfiger</label><br/>

                <input type="checkbox"  value="Bike"/>
                <label > HRX</label><br/>

                <input type="checkbox"   value="Car"/>
                <label > Allensonly</label><br/>

                <input type="checkbox" value="Car"/> 
                <label for="vehicle3"> Otto</label><br/><br/>    
              </form>
              <br/>
              <hr/>
              <br/> */}

              {/* <h5>COLOR</h5>
            <br/>
              <form>
                <input type="checkbox"  value="Bike"/>
                <img data-colorhex="black" class="color-label" 
                    style="background-color: rgb(54, 69, 79);"/>
                <label > Black</label><br/>

                <input type="checkbox"   value="Car"/>
                <img data-colorhex="black" class="color-label" 
                    style="background-color: rgb(5, 105, 171);"/>
                <label for="vehicle2"> Blue</label><br/>

                <input type="checkbox"  value="Bike"/>
                <img data-colorhex="black" class="color-label" 
                    style="background-color: #fafafa;"/>
                <label > White</label><br/>

                <input type="checkbox"   value="Car"/>
                <img data-colorhex="black" class="color-label" 
                    style="background-color: green;"/>
                <label for="vehicle2"> Green</label><br/>

                <input type="checkbox" value="Car"/> 
                <img data-colorhex="black" class="color-label" 
                    style={"background-color:red;"}/>
                <label for="vehicle3"> Red</label><br/><br/>    
              </form>
              <br/>
              <hr/>
              <br/> */}



            


        </div>
    );
}

export default ProductFilter;