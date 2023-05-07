import React, {useState , useEffect} from 'react';
import {database} from '../firebase';
import { ref ,  onValue } from "firebase/database";
import {Line , Pie} from 'react-chartjs-2';
import {Chart as Chartjs, Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement,ArcElement,Filler} from 'chart.js'

Chartjs.register(
    Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement
    ,Filler,ArcElement
)


const Dashboard = () =>{


    const [pData, setPData]=useState([]);
    const [oData, setOData]=useState([]);
    const [cData, setCData]=useState([]);
    const [sale, setSale]=useState(0);

    const [categoryMen, setCategoryMen]=useState(0);
    const [categoryWomen, setCategoryWomen]=useState(0);
    const [categoryKids, setCategoryKids]=useState(0);
    const [category, setCategory]=useState([]);

    const [dateSix, setDateSix]=useState(0);
    const [dateFive, setDateFive]=useState(0);
    const [dateFour, setDateFour]=useState(0);
    const [dateThree, setDateThree]=useState(0);
    const [dateTwo, setDateTwo]=useState(0);
    const [dateOne, setDateOne]=useState(0);
    const [dateZero, setDateZero]=useState(0);


    const today = new Date();

    const oneDaysBefore = new Date(today);
    oneDaysBefore.setDate(oneDaysBefore.getDate() - 1);

    const twoDaysBefore = new Date(today);
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);

    const threeDaysBefore = new Date(today);
    threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);

    const fourDaysBefore = new Date(today);
    fourDaysBefore.setDate(fourDaysBefore.getDate() - 4);

    const fiveDaysBefore = new Date(today);
    fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5);

    const sixDaysBefore = new Date(today);
    sixDaysBefore.setDate(sixDaysBefore.getDate() - 6);

    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const oneDaysBeforeDate = oneDaysBefore.getFullYear()+'-'+(oneDaysBefore.getMonth()+1)+'-'+oneDaysBefore.getDate();
    const twoDaysBeforeDate = twoDaysBefore.getFullYear()+'-'+(twoDaysBefore.getMonth()+1)+'-'+twoDaysBefore.getDate();
    const threeDaysBeforeDate = threeDaysBefore.getFullYear()+'-'+(threeDaysBefore.getMonth()+1)+'-'+threeDaysBefore.getDate();
    const fourDaysBeforeDate = fourDaysBefore.getFullYear()+'-'+(fourDaysBefore.getMonth()+1)+'-'+fourDaysBefore.getDate();
    const fiveDaysBeforeDate = fiveDaysBefore.getFullYear()+'-'+(fiveDaysBefore.getMonth()+1)+'-'+fiveDaysBefore.getDate();
    const sixDaysBeforeDate = sixDaysBefore.getFullYear()+'-'+(sixDaysBefore.getMonth()+1)+'-'+sixDaysBefore.getDate();

    const dates =[sixDaysBeforeDate,fiveDaysBeforeDate,fourDaysBeforeDate,threeDaysBeforeDate,twoDaysBeforeDate,oneDaysBeforeDate,todayDate]

    




    const [dataPie, setDataPie] = useState(
        {
            labels: ['Men' , 'Women' , 'Kids'],
        datasets: [
            {
                label: 'Sale of Categories',
                data: [1,2,3],
                backgroundColor: [
                  '#eb4986',
                  '#6393d9',
                  '#f68257',
                 
                ],
                borderColor: [
                  '#eb4986',
                  '#6393d9',
                  '#f68257',
                 
                ],
                borderWidth: 1,
            },
        ],
    })




    const [data, setData] = useState({

        labels:dates,
        datasets:[
            {
                data:[0,10,10,30,20,10,30],
                // backgroundColor :"rgb(255, 224, 255)",
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgb(238, 183, 238)");
                    gradient.addColorStop(1, "rgba(251, 238, 251, 0.952)");
                    return gradient;
                  },

                borderColor:"rgb(172, 109, 172)",
                tension:0.5,
                fill:true,
                pointBackgroundColor:"purple",
            }
        ]
    });




useEffect (()=> {
    const dbOData = [];
        const dbORef = ref(database, 'orders/' );
        onValue(dbORef, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbOData.push(childSnapshot.val());
           });
           setOData(dbOData);
        });
},[]);





useEffect (()=> {
    setSale(0);
    setCategory([]);

    for(let i=0 ; i < oData.length; i++){

         let salePrice =oData[i].price;
         setSale(n => Number(n) + Number(salePrice));

            if(oData[i].category === "Men") {
                    setCategoryMen(n => Number(n) + Number(oData[i].qnty) );
                   
            } 

            else if(oData[i].category === "Women") {
                    setCategoryWomen(n => Number(n) + Number(oData[i].qnty) )
            } 

            else if(oData[i].category === "Kids") {
                    setCategoryKids(n => Number(n) + Number(oData[i].qnty) )
            } 
            
      } 



      console.log(sale);
      console.log(category);
},[oData]);





useEffect (()=> {
   
    for(let i=0 ; i < oData.length; i++){
        
        switch(oData[i].date){
            case dates[6]:
                setDateSix(n => Number(n) + (Number(oData[i].qnty) * Number(oData[i].price )))
                console.log(Number(oData[i].qnty) * Number(oData[i].price ))
                break;

            case dates[5]:
                setDateFive(n => Number(n) + (Number(oData[i].qnty) * Number(oData[i].price )))
                console.log(Number(oData[i].qnty) * Number(oData[i].price ))
                break; 

            case dates[4]:
                setDateFour(n => Number(n) + (Number(oData[i].qnty) * Number(oData[i].price )))
                console.log(Number(oData[i].qnty) * Number(oData[i].price ))
                break;
    
            case dates[3]:
                setDateThree(n => Number(n) + (Number(oData[i].qnty) * Number(oData[i].price )))
                console.log(Number(oData[i].qnty) * Number(oData[i].price ))
                break; 
                    
            case dates[2]:
                setDateTwo(n => Number(n) + (Number(oData[i].qnty) * Number(oData[i].price )))
                console.log(Number(oData[i].qnty) * Number(oData[i].price ))
                break;

            case dates[1]:
                setDateOne(n => Number(n) + (Number(oData[i].qnty) * Number(oData[i].price )))
                console.log(Number(oData[i].qnty) * Number(oData[i].price ))
                break; 

            case dates[0]:
                setDateZero(n => Number(n) + (Number(oData[i].qnty) * Number(oData[i].price )))
                console.log(Number(oData[i].qnty) * Number(oData[i].price ))
                break;     

            default:
                // console.log("Item is not 1, 2, or 3");     
        }
            
      } 


},[oData]);


useEffect (()=> {
    setData({

        labels:dates,
        datasets:[
            {
                data:[dateZero,dateOne,dateTwo,dateThree,dateFour,dateFive,dateSix],
                // backgroundColor :"rgb(255, 224, 255)",
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgb(238, 183, 238)");
                    gradient.addColorStop(1, "rgba(251, 238, 251, 0.952)");
                    return gradient;
                  },

                borderColor:"rgb(172, 109, 172)",
                tension:0.5,
                fill:true,
                pointBackgroundColor:"purple",
            }
        ]
    });
},[dateSix,dateFive,dateFour,dateThree,dateTwo,dateOne,dateZero])





    useEffect (()=> {
        setDataPie(
            {
                labels: ['Men' , 'Women' , 'Kids'],
                datasets: [
                 {
                    label: 'Sale of Categories',
                    data: [categoryMen,categoryWomen,categoryKids],
                    backgroundColor: [
                    '#eb4986',
                    '#6393d9',
                    '#f68257',
    
                    ],
                    borderColor: [
                    '#eb4986',
                    '#6393d9',
                    '#f68257',
                    
                    ],
                    borderWidth: 1,
                },
            ], });
    },[categoryMen,categoryWomen,categoryKids]);










    

    useEffect (()=> {
        const dbPData = [];
        
        const dbPRef = ref(database, 'products/' );
        onValue(dbPRef, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbPData.push(childSnapshot.val());
           });
           setPData(dbPData);
        });



        const dbCData = [];
        const dbCRef = ref(database, 'users/' );
        onValue(dbCRef, (snapshot)=>{
           snapshot.forEach(childSnapshot =>{
            dbCData.push(childSnapshot.val());
           });
           setCData(dbCData);
        });
       

    },[]);



    




    



    
    

    const [optionsPie, setOptionsPie] = useState({
        plugins: {
            responsive: true,
            legend: {
              display: false,
            },
          },
    });

    const [options, setoptions] = useState({
        plugins: {
            legend: {
                display: false,
            },
            scales: {
                 xAxes: [{
                    gridLines: {
                       display: false,
                    }
                 }],
                 yAxes: [{
                    gridLines: {
                       display: false
                    }
                 }]
            }
         }
    });













    return(  
        <div className='dContent'>
            <div className='dTop'>
                <h3>Dashboard</h3>
                <div className='boxes'>
                    <div className='box box1'>
                        <div className='bLeft'>
                            <p className='a'>PRODUCTS</p>
                            <p className='b'>{pData.length}</p>
                        </div>
                        <div className='bRight'>
                         <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>

                    </div>
                    <div className='box box2'>
                    <div className='bLeft'>
                            <p className='a'>NEW ORDERS</p>
                            <p className='b'>{oData.length}</p>
                        </div>
                        <div className='bRight'>
                            <i class="fa fa-list-alt" aria-hidden="true"/> 
                        </div>
                    </div>
                    <div className='box box3'>
                    <div className='bLeft'>
                            <p className='a'>CUSTOMERS</p>
                            <p className='b'>{cData.length}</p>
                        </div>
                        <div className='bRight'>
                            <i class="fa fa-user-circle-o" aria-hidden="true"></i> 
                        </div>
                    </div>
                    <div className='box box4'>
                    <div className='bLeft'>
                            <p className='a'>SALE</p>
                            <p className='b'>{sale}</p>
                        </div>
                        <div className='bRight'>
                        <i class="fa fa-line-chart" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className='dMid'>
                <div className='dLeft'>
                    <h3>Last Weak Sale :</h3>
                    <div className='box'>
                        
                        <Line data={data}
                        options={options}
                        > Hello </Line>
                    </div>
                </div>
                <div className='dRight'>
                <h3>Sale By Category :</h3>
                    <div className='box'>
                         <Pie data={dataPie} className="pie" options={optionsPie} > </Pie> 
                         
                    </div>
                    <div className='legends'>
                        <i class="fa fa-circle" aria-hidden="true" style={{color:"#eb4986"}}> <pre> Men</pre> </i>
                        <i class="fa fa-circle" aria-hidden="true" style={{color:"#6393d9"}}> <pre> Women</pre> </i>
                        <i class="fa fa-circle" aria-hidden="true" style={{color:"tomato"}}> <pre> Kids</pre> </i>
                    </div>
                    
                </div>
            </div>

          
        </div>
    );
};

export default Dashboard;