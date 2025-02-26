class Employee{
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

//El menú de inicio
function startUpMenu()
{
    let firstOption = prompt(`Bienvenido al asistente de horarios
        ¿Qué opción desea elegir?
          1- Crear un nuevo empleado
          2- Revisar los datos de algún empleado
          `);
    

    switch (firstOption)
    {
        case `1`:
            employeeCreator();
        break;
        case `2`:
            showEmployeesData();
        break;
        case `3`:
            alert()
        default:
            alert(`No ha ingresado un valor válido, porfavor ingrese un número del 1 al 5`);
    }
}
   
//Revisa si 'day' es un string con un dia de la semana, independientemente si tiene tildes o mayusculas
function isTheDayAllowed(day)
{
    if(day.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === 'lunes'||'martes'||'miercoles'||'jueves'||'viernes'||'sabado'||'domingo')
            return true;
        else
            return false;
} 

//Revisa si el array 'hoursRange' se encuentra en formato HH:MM
function isTheHoursAllowed(hoursRange)
{ 
    if(hoursRange.length == 2 && (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).test(hoursRange[0]) && (/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).test(hoursRange[1]))
            return true;
        else
            return false;
}


//Creador de empleados
function employeeCreator()
{
    let hoursRangeUnavailable;
    let dayUnavailable;

    let hoursWeekly = 48;
    let hoursOwed = 0;
    let name = "";

    name = prompt(`¿Cómo desea que se llame su trabajador?`);

    //Revisa que el nombre no sea un número o un valor vacío
    if(isNaN(name) && name != null && name != ``)
    {
        
        do
        {   //Revisa que el valor ingresado sea un número que no sea 0 y lo guarda como las horas semanales que trabaja el empleado
            hoursWeekly = prompt(`¿Cuántas horas semanales trabaja ${name}?`);
            if(isNaN(hoursWeekly) || Boolean(hoursWeekly) === false || hoursWeekly === `0`)
                alert(`Ingrese un número válido`);
        } while(isNaN(hoursWeekly) || Boolean(hoursWeekly) === false || hoursWeekly === `0`);
          
        do
        {   //Revisa que el valor ingresado sea un número y lo guarda como las horas que debe o se le deben al empleado
            hoursOwed = prompt(`Si ${name} le debe horas, introdúzcalas. En caso de que usted le deba horas, ponga un número negativo`);
            if(isNaN(hoursOwed) || Boolean(hoursOwed) === false)
                alert(`Ingrese un número válido`);
        } while(isNaN(hoursOwed) || Boolean(hoursOwed) === false);

        //Crea al empleado y lo guarda en un Array    
        employeesList.push(new Employee(name, hoursWeekly, hoursOwed));    

        //Si el empleado tiene horarios en los que no está disponible, activa el menú para recopilar esa info
        if(confirm(`¿${name} se encuentra no disponible a ciertas horas?
            Si es así, seleccione "Aceptar"...`))
            addUnavailableHours(name);                
        else
            startUpMenu();
    }
    else
    {   //Si no se ha puesto un nombre valido al inicio, no permite avanzar hasta que haya un nombre valido
        alert(`Introduzca un nombre válido`);
        employeeCreator();
    }
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


