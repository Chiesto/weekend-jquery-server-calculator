$(document).ready(onReady);

function onReady(){
    console.log('onReady Function');
    $('#enterBtn').on('click', performCalculation);
    $('#plus').on('click', plusBtn);
    $('#minus').on('click', minusBtn);
    $('#multiply').on('click', multiplyBtn);
    $('#divide').on('click', divideBtn);
    $('#clearBtn').on('click', clearButton);
    $('#clearHistoryBtn').on('click', deleteHistory);
    $('.numberBtn').on('click', numberButton);
    getCalcHistory();
}
let operator = '';

//clears the input fields when you press 'C' button
function clearButton(){
    $('#num1').val('');
}

//send our input data to the server
function postHistory(event){
    event.preventDefault();

    let input1 = $('#num1').val();
    let input2 = $('#num2').val();
    let plus = $('#plus').val();
    let minus = $('#minus').val();
    let multiply = $('#multiply').val();
    let divide = $('#divide').val();
    
    $.ajax({
        method: 'POST',
        url: '/history',
        data:{
            num1: input1,
            num2: input2,
            plus,
            minus,
            multiply,
            divide
        }
    }).then(function(response){
        console.log('postHistory function works!');
        getHistory();
        getCalcHistory();
    }).catch(function(error){
        console.log('Error in our postHistory function =>', error);
        alert('Error in our postHistory function =>', error);
    }) 
}

//get our answer from the server
// function getHistory(){
//     $.ajax({
//         method: 'GET',
//         url: '/history'
//     }).then(function(response){
//         console.log('getHistory function works', response);
//         renderToDom(response);
//     }).catch(function(error){
//         console.log('getHistory function broke down =>', error);
//         alert('getHistory function broke down =>', error);
//     })
// }

//get calculation history from the server
function getCalcHistory(){
    $.ajax({
        method: 'GET',
        url: '/calcHistory'
    }).then(function(response){
        console.log('here is our calc history -', response);
        
        renderToDom(response);
        historyToDOM(response)
    }).catch(function(error){
        console.log('getCalcHistory function doesnt work =>', error);
        alert('getCalcHistory function doesnt work =>', error);
    })
}

//render my answer to the DOM
function renderToDom(calculation){
    if(calculation.length>0){
        let recentAnswer = calculation[calculation.length-1];
        $('#answer').empty();
        $('#answer').append(`Your answer is: <b>${recentAnswer.answer}</b>`);
    }
}

//render calculation history to the DOM
function historyToDOM(array){
    $('#history').empty();
    for(item of array){
        $('#history').append(`
        <li>${item.num1} ${item.operator} ${item.num2} = ${item.answer}</li>
        `);
    }
}

//deletes the calculator history
function deleteHistory(){
    $.ajax({
      method: 'DELETE',
      url: '/calculatorHistory'
    }).then(function(response){
        $('#history').empty();
      console.log('Calculator History deleted!');
    }).catch(function(error){
      console.log('Problems in our deleteHistory function =>', error);
    })
  }

function plusBtn(){
    $('#plus').val('plus');
    $('#minus').val('');
    $('#divide').val('');
    $('#multiply').val('');
    operator = ' + ';
    const num1Value = $('#num1').val();
    $('#num1').val(num1Value + operator);

}
function minusBtn(){
    $('#plus').val('');
    $('#minus').val('minus');
    $('#divide').val('');
    $('#multiply').val('');
    operator = ' - ';
    const num1Value = $('#num1').val();
    $('#num1').val(num1Value + operator);
}
function divideBtn(){
    $('#plus').val('');
    $('#minus').val('');
    $('#divide').val('divide');
    $('#multiply').val('');
    operator = ' / ';
    const num1Value = $('#num1').val();
    $('#num1').val(num1Value + operator);
}
function multiplyBtn(){
    $('#plus').val('');
    $('#minus').val('');
    $('#divide').val('');
    $('#multiply').val('multiply');
    operator = ' * ';
    const num1Value = $('#num1').val();
    $('#num1').val(num1Value + operator);
}
//number buttons on-click functions
function numberButton(){
    const value = $(this).text();
    const num1Value = $('#num1').val();
  $('#num1').val(num1Value + value);
}

function performCalculation() {
    const calculationInput = $('#num1').val();
    const [num1, operator, num2] = calculationInput.split(/(\+|\-|\*|\/)/);
  
    if (!num1 || !num2 || !operator) {
      alert('Invalid calculation');
      return;
    }
  
    $.ajax({
      method: 'POST',
      url: '/history',
      data: {
        num1: num1.trim(),
        num2: num2.trim(),
        [operator]: operator.trim()
      },
    })
      .then(function (response) {
        console.log('performCalculation function works!');
        // getHistory();
        getCalcHistory();
      })
      .catch(function (error) {
        console.log('Error in our performCalculation function =>', error);
        alert('Error in our performCalculation function =>', error);
      });
  }