const inputslider=document.querySelector("[dataslide]");
const lengthdisplay=document.querySelector("[data-lengthnumber]");
const passworddisplay=document.querySelector("[data-passwordDisplay]");
const copybtn=document.querySelector("[data-copy]");
const copymsg=document.querySelector("[data-copymsg]");
const uppercasecheck=document.querySelector('#Uppercase');
const lowercasecheck=document.querySelector('#lowercase');
const numbercheck=document.querySelector('#number-letter');
const symbolcheck=document.querySelector('#symbol-letter');
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".geneartbutton");
const allcheckbox=document.querySelectorAll("input[type=checkbox");
const symbols='! @  # $ % ^ & * ( ) ~ <  /  > ' ;
let password="";
let passwordLength = '10'; 
let checkcount=0;
handleslider();

 //set password length
function handleslider(){
    inputslider.value = passwordLength;
    lengthdisplay.innerText = passwordLength ;
}

function setIndicator(color){
    indicator.style.backgroundcolor=color;
}
function getrandomint(min,max){
  return Math.floor( Math.random()*(max-min))+min;
}
function generaterandomnumber(){
    return getrandomint(0,9);

}
function generateLowerCase(){
    return String.fromCharCode(getrandomint(97,123))
}
function generateupperrCase(){
    return String.fromCharCode(getrandomint(65,91))
}



function  generateSymbol(){
    const randnum= getrandomint(0,symbols.length);
    return symbols.charAt(randnum);
}


    //colors according to the strength
function calStrength (){
    let hasUpper =false;
    let hasLower =false;
    let hasNum =false;
    let hasSym =false;

    if(uppercasecheck.checked) hasUpper=true;
    if(lowercasecheck.checked) hasLower=true;
    if(numbercheck.checked) hasNum=true;
    if(symbolcheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
    setIndicator("#0f0");
    }else if(
        (hasUpper || hasLower) &&
        (hasNum || hasSym)&&
        passwordLength>= 6
    ){
        setIndicator("ff0"); 
    }else {
        setIndicator("#f00");
    }
} 
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passworddisplay.value);
        copymsg.innerText="copied";
    }
    catch(e){
        copymsg.innerText="Failed";
    }
    copymsg.classList.add("active");

    setTimeout( ()=>{
        copymsg.classList.remove(" active");
 
    },2000);
}
function shufflepassword(array){
    for(let i=array.length-1; i>0 ;i--){
        const j=math.floor(math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
      }
    let str="";
    array.forEach((el) => (str += el));  
    return str;
}

function handleCheckBoxChange(){
    checkcount=0;
    allcheckbox.forEach((checkbox) =>{
        if(checkbox.checked)
        checkcount++;
    });
    if(passwordLength<checkcount){
        passwordLength =checkcount;
        handleslider();
    }
} 

allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
}) 

inputslider.addEventListener('input', (e) => { 
    passwordLength= e.target.value;
    handleslider();
}) 


copybtn.addEventListener('click', () => {
        if (passworddisplay.value)
             copyContent();
})   
generatebtn.addEventListener('click',() => {
    if (checkcount ==0) 
        return;

    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleslider();
    }
    


    console.log("starting the journey ");
    password="";
    let funcArr=[];

    if(uppercasecheck.checked)
        funcArr.push(generateupperrCase);
  

    if(lowercasecheck.checked)
        funcArr.push(generateLowerCase);
 
    if(numbercheck.checked)
        funcArr.push(generaterandomnumber);
 
    if(symbolcheck.checked)
        funcArr.push(generateSymbol); 
 
       //compulsary addition

    for(let i=0;i<funcArr.length; i++){
    password += funcArr[i]();
    }
    console.log("compulsory addition");
            //remaing addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex =getrandomint(0,funcArr.length);
        console.log("randIndex"+randIndex)
        password += funcArr[randIndex]();
    }
    console.log("remaining addition");
            //shuffle password
    password = shufflepassword(Array.from(password));
 
    passworddisplay.value=password;
 
    calStrength ();



});