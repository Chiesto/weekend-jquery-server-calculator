const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));

//serving up static files
app.use(express.static('server/public'));

//setting up our answer and calculation variable
//also importing our history and calcHistory from their respective files
const history = require('./public/historyList.js');
let calcHistory = require('./public/calcHistory.js');
let answer = 0;
let calculation = {
    answer:0,
    operator:'',
    number1:0,
    number2:0
}
//update my calculation object to have the correct answer and numbers
//based on what was entered on the DOM
function updateCalculation(){
    calculation.answer = answer;
    calculation.number1 = history[history.length-1].num1;
    calculation.number2 = history[history.length-1].num2;
}

//getting our inputs from the client and sending back our answers
app.post('/history', function(req, res){
    const data = req.body;
    history.push(data);
    console.log(history);
    
    res.sendStatus(201);
  
  });

  //sending our answer along with the inputs back to the client
  app.get('/history', function(req, res){
    const item = history[history.length-1];
    if (item.plus === 'plus') {
      calculation.operator = 'plus';
      answer = Number(item.num1) + Number(item.num2);
    } else if (item.minus === 'minus') {
      calculation.operator = 'minus';
      answer = Number(item.num1) - Number(item.num2);
    } else if (item.multiply === 'multiply') {
      calculation.operator = 'multiply';
      answer = Number(item.num1) * Number(item.num2);
    } else if (item.divide === 'divide') {
      calculation.operator = 'divide';
      answer = Number(item.num1) / Number(item.num2);
    }
    updateCalculation();
    console.log(calculation);
    const newCalculation = { ...calculation };
    calcHistory.push(newCalculation);
    res.send(calculation);
  });

  // //erases our calculator history on the server side
  app.delete('/calculatorHistory', function(req,res){
    calcHistory=[];
    res.sendStatus(200);
  })

  app.get('/calcHistory', function(req, res){
    console.log(calcHistory);
    res.send(calcHistory);
  });




app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  });