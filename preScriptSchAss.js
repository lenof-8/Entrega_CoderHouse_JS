export default class Employee{
    #hoursUnavailable = [];
    #hoursWeekly = 48;
    #hoursOwed = 0;
    constructor(name, hoursWeekly, hoursOwed)
    {
        this.name = name;
        this.#hoursWeekly = Number(hoursWeekly);       
        this.#hoursOwed = Number(hoursOwed);
    }


    //Añade al array '#hoursUnavailable' un horario en el que el empleado NO esta disponible
    setHoursUnavailable(hoursRange, day)
    {
        //Si la hora no ha sido registrada antes, procede 
        if(!(this.#hoursUnavailable.includes(([hoursRegistered, dayRegistered]) => hoursRegistered.every((item, i) => item === hoursRange[i]) && dayRegistered === day)))
        {
            //Si los valores son validos, añade estos al array '#hoursUnavailable' 
            this.#hoursUnavailable.push([hoursRange, day]);
        }
    }

    //Elimina un rango de horas NO disponibles del empleado
    recoverAvailableHours(hoursRange, day)
    {
        //Consigue el index en el array 'hoursUnavailable' con los contenidos que pide el usuario
        let hoursToRecover = this.#hoursUnavailable.findIndex(([hoursRegistered, dayRegistered]) => hoursRegistered.every((item, i) => item === hoursRange[i]) && dayRegistered === day)
        //Elimina el elemento del array y cambia su longitud
        this.#hoursUnavailable.splice(hoursToRecover, 1);
    }        
 

    //Aumenta horas que el empleado debe al empleador
    increaseHoursOwed(hours)
    {
        this.#hoursOwed += hours;
    }

    //Resta horas de deuda al empleado, por horas que debe el empleador
    decreaseHoursOwed(hours)
    {
        this.#hoursOwed -= hours;
    }

    //Cambia la cantidad de horas que debe trabajar el empleado a la semana
    changeWeeklyHours(newHours)
    {
        this.#hoursWeekly = newHours;
    }

    //Permite retirar del objeto, el array de los horarios que no tiene disponible el empleado
    getHoursUnavailable()
    {
        return this.#hoursUnavailable;    
    }

    //Permite retirar del objeto, las horas que el empleado debe
    getHoursOwed()
    {
        return this.#hoursOwed;    
    }

    //Permite retirar del objeto, las horas que el empleado trabaja semanalmente
    getWeeklyHours()
    {
        return this.#hoursWeekly;    
    }
}
//Array de empleados
let employeesList = [];

try
{
    document.getElementById("eplyCreatorButton").addEventListener("click", () => window.location.href = "/eplyCreator.html");
    document.getElementById("eplyDataButton").addEventListener("click", () => window.location.href = "/eplyDataShow.html");
    document.getElementById("eplyEditorButton").addEventListener("click", () => window.location.href = "/eplyEditor.html");
    document.getElementById("eplyDeleteButton").addEventListener("click", () => window.location.href = "/eplyDelete.html");
}
catch(error)
{
    console.error("Está pasando esto:", error.message + " pero ojo que no me importa" )
}


const nameEmply_INP = document.getElementById("nameEmply");
const hoursWkly_INP = document.getElementById("hrsWeekly");
const hrsDbt_INP = document.getElementById("hrsDebt");
const hrsUnvlb_DIV = document.getElementById("unavailableHrsDiv");

//Revisa si 'day' es un string con un dia de la semana, independientemente si tiene tildes o mayusculas
export function isTheDayAllowed(day)
{
    let weekdays = ['lunes', 'martes','miercoles','jueves','viernes','sabado','domingo'];
    /* if(day.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === 'lunes'||'martes'||'miercoles'||'jueves'||'viernes'||'sabado'||'domingo')
    Este anterior código fue reemplazado porque por alguna razón que no entiendo, dejó de funcionar.
    */
        if(weekdays.includes(day.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()))
            return true;
        else
            return false;
} 

//Revisa si el array 'hoursRange' se encuentra en formato HH:MM
export function isTheHoursAllowed(hoursRange)
{ 
    if(hoursRange.length == 2 && (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).test(hoursRange[0]) && (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).test(hoursRange[1]))
            return true;
        else
            return false;
}


//Menu para agregar los datos del empleado en los que no está disponible
function addUnavailableHours(name)
{
    do{
        dayUnavailable = prompt(`¿Qué día no está disponible?
                
            Porfavor, coloque un solo día`);
        if(!isTheDayAllowed(dayUnavailable))
            alert("El dia ingresado no es aceptable. Intente nuevamente.");

    }while(!isTheDayAllowed(dayUnavailable));

    do{
        hoursRangeUnavailable = prompt(`Coloque en formato HH:MM-HH:MM, de qué hora a qué hora no está disponible en los ${dayUnavailable}    
    
            Porfavor, no coloque más de un rango de horas a la vez`);
        hoursRangeUnavailable = hoursRangeUnavailable.split(`-`);  

        if(!isTheHoursAllowed(hoursRangeUnavailable))
            alert("Las horas ingresadas no son aceptables. Intente nuevamente.");
            
    }while(!isTheHoursAllowed(hoursRangeUnavailable));

    for(let employee of employeesList)
    {
        if(employee.name === name)
            employee.setHoursUnavailable(hoursRangeUnavailable, dayUnavailable);
    }

    if(confirm(`¿Desea agregar otro horario en el que el ${name} no esté disponible?`))
        addUnavailableHours(name);
    else
        startUpMenu();
} 

//Menú para visualizar los datos de cada empleado    
function showEmployeesData()
{
    let employeesNamesString;
    let employeesNames = [];

    for(let employee of employeesList)
    {   //Guarda todos los nombres de los empleados en un array privado para mostrarlos después
        employeesNames.push(employee.name);
    }
        //Pues muestra los nombres xd
        employeesNamesString = ` \n - `+ employeesNames.join('\n  - ');            
    let employeeChoice = prompt(`Seleccione el empleado del que quiera saber los datos... ${employeesNamesString}`);
    
    for(let employee of employeesList)
    {   //Si es el empleado que nombra el usuario, muestra sus datos
        if(employeeChoice === employee.name)
        {
            let weeklyHours = String(employee.getWeeklyHours());
            let owedHours = String(employee.getHoursOwed());
            let unavialbleHours = String(employee.getHoursUnavailable());

            alert(`Estos son los datos de ${employee.name}:
                 -Cuántas horas trabaja a la semana: ${weeklyHours}
                 -Cuántas horas debe: ${owedHours}
                 -En qué horarios no está disponible: ${unavialbleHours}`)
        }
    }

    
}


