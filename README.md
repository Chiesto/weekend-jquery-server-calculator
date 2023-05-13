# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

PROJECT DESCRIPTION
- I've created a calculator! 
- takes in 2 input numbers and an operator then outputs the answer.
- also show's a history of all the calculations made since starting the server.

PROBLEMS
1. Initially I was going to display the history as I did with past assignments but that didn't work as there are multiple inputs and buttons and we only wanted the button that was pressed to have it's operator performed. 
2. Once I figured out how to get my answer to display, the functions used started messing with my calculation history. Mainly how it outputted. 

SOLUTIONS
1. to deal with the multiple buttons, I put all inputs and buttons into an object with the value of a button being set on 'click'. When you pressed a button the remaining buttons would have there value removed (i had them set to ''). This way, I could still access my history that was being sent to the server and if the desired operator existed (+ operator was given a value of 'plus', - was given a value of 'minus' and so on..) it would perform the corresponding calculation on the server and send back "input1" + "operator" + "input2" + "answer";
2. - for some reason I wasn't  able to assign the operator to the literal operation (ex. + operator couldn't be assigned the value of '+' it had to be a word. I used 'plus'). This would mess with my history as '1 multiply 6 = 6' is just an ugly format. To fix that, I put an 'if' statement that would change my 'coolerOperator' value to the correct operator and displayed that instead of the value that was sent back from the server. 
- With the same function, displaying the full history started to change as it would have the correct amount of items in the calculation array but it would just repeat the most recent calculation over and over. To fix that, I made a new variable on my server, 'newCalculation' that put my most recent calculation in an object which would THEN be added to the array. This way it would push an array of objects and my history displayed correctly. 
- That also made my calculation history output  on the DOM go haywire and only display '{object}{object}{object} = {object}'. So I had to reconfigure my display to DOM function to account for the calculation history being sent over as an array of objects instead of just an array. 



Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
