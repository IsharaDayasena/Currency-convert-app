import React ,{useEffect, useState}from 'react'
import axios from 'axios'

export default function MainPage() {
//states for the form field
const [date,setDate] = useState()
const [sourceCurrency,setSourceCurrency] = useState("")
const [targetCurrency,setTargetCurrency] = useState("")
const [amountInSourceCurrency,setAmountInSourceCurrency] = useState(0)
const [amountInTargetCurrency,setAmountInTargetCurrency] = useState(0)
const [sourceCurrencyName, setSourceCurrencyName] = useState("");
const [targetCurrencyName, setTargetCurrencyName] = useState("");
const [currencyNames,setCurrencyName] = useState([]);
const [loading,setLoading] = useState(true)
const [pressed, setPressed] = useState(false);
//get all currency names
useEffect(()=>{
  const getCurrencyNames = async() =>{
    try{

      const response = await axios.get(
        "http://localhost:5000/getAllCurrencies"
      )
      setCurrencyName(response.data)
    }
    catch(err){
      console.log(err)
    }
  }
  getCurrencyNames();
},[])

//handle submit method
const handleSubmit = async (e) =>{
    e.preventDefault();
    setPressed(true)
    try{
      const response = await axios.get("http://localhost:5000/convert",{
        params:{
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      })

      setAmountInTargetCurrency(response.data)
      setLoading(false)

    }
    catch(err){
      console.error(err)
    }
};




  return (
    <div>
      <h1 className=" lg:mx-32 text-5xl font-bold text-sky-400 text-center">
        Convert Your Currencies Today
      </h1>
      <p className=" lg:mx-32 opacity-50 py-6 text-center">
        Welcome to "Convert your currencies today".this application allows you
        to easily convert currencies based on the latest exchange rates.{" "}
      </p>
      <div className=" mt-5 flex items-center justify-center flex-col">
        <section className=" w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>

            <div className=" mb-4">
              <label
                htmlFor= {date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e)=> setDate(e.target.value)}
                type="date"
                id={date}
                name={date}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>


            <div className=" mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source currency
              </label>
              <select
              onChange={(e)=>setSourceCurrency(e.target.value)}
                type="text"
                id={sourceCurrency}
                name={sourceCurrency}
                value={sourceCurrency}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select source currency"
                required
              >
                {Object.keys(currencyNames).map((currency) =>(
                  <option className=" p-1">
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className=" mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target currency
              </label>
              <select
              onChange={(e) => setTargetCurrency(e.target.value)}
                type="text"
                id={targetCurrency}
                name={targetCurrency}
                value={targetCurrency}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select target currency"
                required
              >
                {Object.keys(currencyNames).map((currency) =>(
                  <option className=" p-1">
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
             
            </div>

            <div className=" mb-4">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount in source currency
              </label>
              <input
              onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="text"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount in source currency"
                required
              />
            </div>

            <button  className=' bg-sky-500 hover:bg-sky-600 font-medium py-2 px-4 rounded-md text-white'>
                {" "}Get the target currency</button>


          </form>
        </section>
      </div>

      {!loading ?  <section className=' mt-5 lg:mx-60  font-bold text-center'>
      {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to {" "}
      <span className=' text-blue-400 font-bold'>
        {" "}
        {amountInTargetCurrency} {" "}</span>in {currencyNames[targetCurrency]}
      </section> : null}
     
      
    </div>
  );
}
