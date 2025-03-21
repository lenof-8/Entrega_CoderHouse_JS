import { isTheDayAllowed } from "./preScriptSchAss.js";
import { isTheHoursAllowed } from "./preScriptSchAss.js";

const unavailableHrs_Inpt = document.createElement("input"); 
const unavailableHrs_Lbl = document.createElement("label");
const unavailableDay_Inpt = document.createElement("input");
const unavailableDay_Lbl = document.createElement("label");
const submitUnavailableSch_Btn = document.createElement("button");
const unavailableSchUl_H3 = document.createElement("h3");
const unavailableSch_Ul = document.getElementById("unavailableSch_Ul");
const formErrorMessage = document.getElementById("formErrorMessage");
const hrsWeekly = document.getElementById("hrsWeekly");
const hrsDebt = document.getElementById("hrsDebt");
const nameEmply = document.getElementById("nameEmply");
const saveEmply = document.getElementById("saveEmply");

let unavailableSchList = [];
let employeesList = []

unavailableHrs_Inpt.setAttribute("placeholder", "HH:MM-HH:MM");
unavailableHrs_Lbl.innerText = "Coloque el rango de horas no disponible";
unavailableDay_Inpt.setAttribute("placeholder", "Día");
unavailableDay_Lbl.innerText = "\nColoque el día no disponible";
submitUnavailableSch_Btn.innerText = "Agregar Horario*";
unavailableSch_Ul.style.position = 'absolute';
unavailableSch_Ul.style.right = '5%';
unavailableSch_Ul.style.top = '50px';
unavailableSchUl_H3.innerText = 'Horarios no disponibles del empleado';
formErrorMessage.classList.add("resaltado");

console.log(unavailableSchList);

document.getElementById("noUH_Btn").addEventListener("click", ()=>
{
    const unavailableHrs_Div = document.getElementById("unavailableHrs_Div");
    const unavailableForumInfo = document.createElement("h6");
    unavailableHrs_Div.innerHTML = "";  
    unavailableForumInfo.innerText = '*Coloque un horario a la vez en el formato indicado. El rango de horas en formato 24hrs';
    
    unavailableHrs_Div.appendChild(unavailableHrs_Lbl);
    unavailableHrs_Div.appendChild(unavailableHrs_Inpt);
    unavailableHrs_Div.appendChild(unavailableDay_Lbl);
    unavailableHrs_Div.appendChild(unavailableDay_Inpt);
    unavailableHrs_Div.appendChild(submitUnavailableSch_Btn);
    document.getElementById('emplyData').appendChild(unavailableForumInfo);
})

document.getElementById('yesUH_Btn').addEventListener("click", ()=>
{
    
})

submitUnavailableSch_Btn.addEventListener("click", (e)=>{
    e.preventDefault();
    let unavailableHrs;
    let unavailableDay;
    unavailableHrs = unavailableHrs_Inpt.value;  
    unavailableHrs = unavailableHrs.split(`-`); 
    unavailableDay = unavailableDay_Inpt.value;
    if(isTheHoursAllowed(unavailableHrs) && isTheDayAllowed(unavailableDay))
    {
        if(unavailableSchList.length == 0)
            {
                unavailableSch_Ul.appendChild(unavailableSchUl_H3);
            }
    
        let unavailableSch = []
        unavailableSch.push(unavailableHrs);
        unavailableSch.push(unavailableDay_Inpt.value);
        unavailableSchList.push(unavailableSch);
        unavailableDay_Inpt.value = "";
        unavailableHrs_Inpt.value = "";
        console.log(unavailableSchList);
    
        let unavailableSch_Li = document.createElement("li");
        unavailableSch_Li.innerText = `De ${unavailableSch[0][0]} a ${unavailableSch[0][1]} los ${unavailableSch[1]}`;
        unavailableSch_Ul.appendChild(unavailableSch_Li);
        console.log(unavailableSch);
    }else
    {   
        formErrorMessage.innerText = "*Ingrese los datos en el formato solicitado*";
        document.getElementById('emplyData').appendChild(formErrorMessage);
        unavailableDay_Inpt.value = "";
        unavailableHrs_Inpt.value = "";
    }
})

saveEmply.addEventListener("click", (e)=>{
    e.preventDefault();
    

    if(isNaN(hrsDebt.value) || Boolean(hrsDebt.value) === false || hrsDebt.value === `0`)
    {
        hrsDebt.value = 0;
    }

    if(document.contains(formErrorMessage))
    {
        document.getElementById('emplyData').removeChild(formErrorMessage);
    }

    if(!!nameEmply.value != true)
    {
        console.log(!!nameEmply.value + 'eeee')
        formErrorMessage.innerText = "*Ingrese un nombre para el empleado*";
        document.getElementById('emplyData').appendChild(formErrorMessage);
    } 
    else if(!!hrsWeekly.value == 0 || !!hrsWeekly.value != true)
    {
        formErrorMessage.innerText = "*Ingrese cuántas horas trabajará el empleado a la semana*";
        document.getElementById('emplyData').appendChild(formErrorMessage);
    }
    

    if(!!nameEmply.value == true && !!hrsWeekly.value == true)
    {
        let employee = {
            name: nameEmply.value,
            hoursWeekly: hrsWeekly.value,
            hoursOwed: hrsDebt.value,
            hoursUnavailable: unavailableSchList
        };
        employeesList = JSON.parse(localStorage.getItem('employeesList')) || [];
        employeesList.push(employee);
        let employeesJSON = JSON.stringify(employeesList);
        console.log(employeesJSON);
        localStorage.setItem('employeesList', employeesJSON);
        console.log(employee);
        console.log(employeesList);
        window.location.href = "./schAssIndex.html"
    }
     
    
})