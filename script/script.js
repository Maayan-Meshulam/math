/*****************************************************************  הגדרת משתנים  ********************************************************/

let num1 = Math.floor(Math.random() * 10),
num2 = Math.floor(Math.random() * 10);
let operator = '+';
let numRange = '1';
let groupNum = '0';

let answerStr = num1 + operator + num2;
let totalAnswer = eval(answerStr);
let userAnwser;

let points = 0;
let totalPoints = 0

//אובייקט שבו המפתחות מסמלים את סוג קבוצת המספרים או את האופרטור הנבחר והערכים מסמלים את מס הנקודות שיקבל עבור אותה בחירה
let arrPoints = {'+':5, '-':5, '*':10, '/':10, '**':15, '\u221A':15, '%':5, 1:30, 0:0};
let arrOperators = ['+', '-', '*', '/', '**', '\u221A', '%'];




/*****************************************************************  הגדרת פונקציות  ********************************************************/

//פונקציה שבוחרת 2 מספרים בהתאם לטווח באופן רנדומלי
function chooseNumRandom(){
    
    numRange = document.getElementsByClassName('selectClass')[0].value;   

    if(groupNum == 0){
        if(numRange == 1){
            num1 = Math.round(Math.random() * 10);
            num2 = Math.round(Math.random() * 10);
        }
        else if(numRange == 2){
            num1 = Math.round(Math.random() * 100);
            num2 = Math.round(Math.random() * 100);
        }
        else{
            num1 = Math.round(Math.random() * 1000);
            num2 = Math.round(Math.random() * 1000);
        }
    }
    else{
        if(numRange == 1){
            num1 = (Math.random() * 10).toFixed(2);
            num2 = (Math.random() * 10).toFixed(2);
        }
        else if(numRange == 2){
            num1 = (Math.random() * 100).toFixed(2);
            num2 = (Math.random() * 100).toFixed(2);
        }
        else{
            num1 = (Math.random() * 1000).toFixed(2);
            num2 = (Math.random() * 1000).toFixed(2);
        }
    }
          
    answerStr = num1 + operator + num2;
    if(operator != '\u221A')
        totalAnswer = eval(answerStr);
    else
        totalAnswer = num1 * Math.sqrt(num2);

        
    //במקרה שזה עשרוני ניקח 2 מספרים אחרי הנקודה
    if(!Number.isInteger(totalAnswer)){
        if(operator != '\u221A')
            totalAnswer = eval(answerStr).toFixed(2);
        else
            totalAnswer = (num1 * Math.sqrt(num2)).toFixed(2);

        //למקרה שהספרה השנייה אחרי הנקודה היא 0 אז נוריד אותה
        totalAnswer = String(totalAnswer)
        parseFloat(totalAnswer);
        totalAnswer = Number(totalAnswer)
    }
    showEx();
}


//פונקציה שבוחרת את האופרטור המתאים
function chooseOperator(){
    opertaorValue = document.getElementsByClassName('selectClass')[1].value;  
    //הערך תואם לאינדקס - נקבל את האופרטור הנבחר
    operator = arrOperators[opertaorValue];
    
    answerStr = num1 + operator + num2;
    
    if(operator != '\u221A')
        totalAnswer = eval(answerStr);
    else
        totalAnswer = num1 * Math.sqrt(num2);

    //במקרה שזה עשרוני ניקח 2 מספרים אחרי הנקודה
    if(!Number.isInteger(totalAnswer)){
        if(operator != '\u221A')
            totalAnswer = eval(answerStr).toFixed(2);
        else
            totalAnswer = (num1 * Math.sqrt(num2)).toFixed(2);

        //למקרה שהספרה השנייה אחרי הנקודה היא 0 אז נוריד אותה
        totalAnswer = String(totalAnswer)
        parseFloat(totalAnswer);
        totalAnswer = Number(totalAnswer)
    }
    showEx();
}



//פונקציה שמדפיסה למסך את התרגיל
function showEx(){
    answerStr = answerStr.replace('**', '^');
    document.getElementById('ex').innerText = answerStr;
}
showEx();


//פונקציה שבודקת האם התשובה של המשתמש נכונה
function checkAnswer(){
    userAnwser = document.getElementById('inputAns').value;
    userAnwser = userAnwser;

    if(userAnwser == ''){
        alert('יש להזין ערך חוקי');
    }
    else{
        if(userAnwser == totalAnswer){       
            points = arrPoints[operator] + arrPoints[groupNum];
            totalPoints += points;
            addLinesTable();
            document.getElementById('inputAns').value = '';
            chooseNumRandom();
        }
        else{
           points = 0;
           addLinesTable();
           document.getElementById('inputAns').value = '';
        }
    }
    
}




//פונקציה שמוסיפה לטבלה
function addLinesTable(){
    document.querySelector('tbody').innerHTML += `<tr><td>${answerStr}</td><td>${totalAnswer}</td><td>${userAnwser}</td><td>${points}</td></tr>`;
    document.getElementById('totalTd').innerText = totalPoints;
}

//פונקציה שמאספת את הטבלה
function resetPointsTb(){
    document.querySelector('tbody').innerHTML = '';
    totalPoints = 0;
    points = 0;
    document.getElementById('totalTd').innerText = totalPoints;
}

//פונקציה שמשנה קבוצת מספרים
function changeRange(){
    opertaorValue = document.getElementsByClassName('selectClass')[1].value;
    chooseNumRandom(opertaorValue);
    showEx();
}

//פונקציה שבוחרת את הקבוצת מספרים המתאימה
function changeNumberGroup(){
    if(document.getElementsByClassName('selectClass')[2].value == 0)
        groupNum = 0;
    else
        groupNum = 1;
    chooseNumRandom();
}

//פונקציה שמשנה אופרטור
function changeOpertor(){
    numRange = document.getElementsByClassName('selectClass')[0].value;
    chooseOperator(numRange);
    showEx();
}


//קוביות מסתובבות שלחיצה עליהן מגרילה מספרים חדשים
window.onload = function(){
    let angel = 360;
  this.setInterval(()=>{
    this.document.getElementsByClassName('kubia')[0].style.transform = `rotate(${-angel}deg)`;
    this.document.getElementsByClassName('kubia')[1].style.transform = `rotate(${angel}deg)`;
    angel+=360;
  },800)
}

document.getElementById('inputAns').addEventListener('keypress', function(event){
    if(event.key == 'Enter')
        checkAnswer();
})
