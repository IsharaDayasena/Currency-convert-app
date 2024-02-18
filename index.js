const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();

//middlewares

app.use(express.json());
app.use(cors()); 

//All curruncies
app.get("/getAllCurrencies",async(req,res) =>{
    const nameURL="https://openexchangerates.org/api/currencies.json?app_id=8a215becbdd4451f9f66c49ce59b1c48"

    try{
    const namesResponse = await axios.get(nameURL)
    const nameData = namesResponse.data;
    
    return res.json(nameData)

   

    }
    catch(err){
        console.log(err)
    }
}
)
//get the target amount
app.get("/convert",async(req,res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
      req.query;

      try{
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=8a215becbdd4451f9f66c49ce59b1c48`
        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency]
        const targetRate = rates[targetCurrency]

        //final target val
        const targetAmount = (targetRate/sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));
    
    }


      catch(err){
        console.error(err);
      }
})

//listen to a port
app.listen(5000, ()=>{
    console.log("server started")
})