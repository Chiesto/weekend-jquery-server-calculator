const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));

//serving up static files
app.use(express.static('server/public'));

const history = require('/Users/chris/Desktop/workspace/Tier2/week7/weekend-jquery-server-calculator/server/public/historyList.js');
const calcHistory = require('/Users/chris/Desktop/workspace/Tier2/week7/weekend-jquery-server-calculator/server/public/calcHistory.js');
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

  //sending our answer along with the inputs back to the 
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
    res.send(calculation);
  });




app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  });