# Project Name

Weekend jQuery Server Calculator

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

---STRETCH GOALS---
PROBLEMS
1. i had a huge problem trying to get the correct answer to display after i made the list items clickable. Getting them clickable just took a quick google search but that  made the whole list clickable and would only access the most recent list item.
2. reconfiguring my variables to account for the input being send over as one item instead of 2 inputs. 
3. after reconfiguring, my answer wouldn't display. it kept displaying as NaN or undefined. 

SOLUTIONS
1. I figured out that, while i was in my appendHistory function, I needed to assign a variable to to the answer while I was inside of my 'for' loop THEN call my clickableHistory function with the 'answer' as a parameter. then append the history to the dom as it goes through each item. 
2. This was just error after error. Thank god for the 'command + F' search ability. It helped me search through my server and client for object items, functions, and variables that I either changed or weren't using anymore. 
3. in my renderToDom function, I was trying to append the array.object instead of array[array.length-1].object.. I assigned a variable to equal array[array.length-1]. This made the code clearer in my head and a little easier to read. 



Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
