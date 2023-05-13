$(document).ready(onReady);

function onReady(){
    console.log('onReady Function');
    $('#enterBtn').on('click', postHistory);
    $('#plus').on('click', plusBtn);
    $('#minus').on('click', minusBtn);
    $('#multiply').on('click', multiplyBtn);
    $('#divide').on('click', divideBtn);
    getCalcHistory();
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
        $('#num1').val('');
        $('#num2').val('');
        getHistory();
        getCalcHistory();
    }).catch(function(error){
        console.log('Error in our postHistory function =>', error);
        alert('Error in our postHistory function =>', error);
    }) 
}

//get our answer from the server
function getHistory(){
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function(response){
        console.log('getHistory function works');
        renderToDom(response);
    }).catch(function(error){
        console.log('getHistory function broke down =>', error);
        alert('getHistory function broke down =>', error);
    })
}

//get calculation history from the server
function getCalcHistory(){
    $.ajax({
        method: 'GET',
        url: '/calcHistory'
    }).then(function(response){
        console.log('here is our calc history -', response);
        historyToDOM(response)
    }).catch(function(error){
        console.log('getCalcHistory function doesnt work =>', error);
        alert('getCalcHistory function doesnt work =>', error);
    })
}

//render my answer to the DOM
function renderToDom(calculation){
    $('#history').empty();
    $('#answer').empty();
    $('#answer').append(`Your answer is: <b>${calculation.answer}</b>`);
    $('#history').append(`
    <li>${calculation.number1} ${calculation.operator} ${calculation.number2} = ${calculation.answer}</li>
    `);
}

//render calculation history to the DOM
function historyToDOM(array){
    $('#history').empty();
    for(item of array){
        let coolerOperator = "";
        if(item.operator === 'plus'){
            coolerOperator = '+';
        } else if(item.operator === 'minus'){
            coolerOperator = '-';
        } else if(item.operator === 'multiply'){
            coolerOperator = '*';
        }else if(item.operator === 'divide'){
            coolerOperator = '/';
        }

        $('#history').append(`
        <li>${item.number1} ${coolerOperator} ${item.number2} = ${item.answer}</li>
        `);
    }
}

function plusBtn(){
    $('#plus').val('plus');
    $('#minus').val('');
    $('#divide').val('');
    $('#multiply').val('');
}
function minusBtn(){
    $('#plus').val('');
    $('#minus').val('minus');
    $('#divide').val('');
    $('#multiply').val('');
}
function divideBtn(){
    $('#plus').val('');
    $('#minus').val('');
    $('#divide').val('divide');
    $('#multiply').val('');
}
function multiplyBtn(){
    $('#plus').val('');
    $('#minus').val('');
    $('#divide').val('');
    $('#multiply').val('multiply');
}