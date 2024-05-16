// const fs=require('fs');
// const path=require('path');

// const data=fs.readFileSync('trendingsection-AE.json','utf-8');
// const parsedData=JSON.parse(data);
// console.log(parsedData.list)
const express=require('express');
const bodyParser=require('body-parser');
const axios=require('axios');
const app=express();

const port=3200;
function submitApi()
{

// axios.post('https://api.edzipp.com/api/v1/contactUs',
// {"first_name":"sharwan","last_name":"rai","email":"sharwan.rai@appsmartz.com","org":"Appsmartz","msg":"aaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa"})
// .then((res)=>console.log(res));

axios.post('https://api.edzipp.com/api/v1/getallplans').then((res)=>console.log(res));
}

// for(let i=0;i<1000;i++)
// {
// submitApi();
// }

app.listen(port,()=>{
    console.log("app is listening on port ",port);
})