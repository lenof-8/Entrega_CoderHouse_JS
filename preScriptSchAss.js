class Employee{
    #hoursUnavailable = [];
    #hoursWeekly = 48;
    #hoursOwed = 0;
    constructor(name, hoursWeekly, hoursOwed)
    {
        this.name = name;
        this.#hoursWeekly = hoursWeekly;       
        this.#hoursOwed = hoursOwed;
    }

    //Confirma que los valores de horas ingresados por el usuario son validos
    areTheHoursAllowed(hoursRange, day)
    {
        //Revisa si el array 'hoursRange' se encuentra en formato HH:MM
        if(hoursRange.lenght == 2 && (hoursRange[0]).test(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)&&(hoursRange[1]).test(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/))
            {
                //Revisa si 'day' es un string con un dia de la semana, independientemente si tiene tildes o mayusculas
                if(day.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === 'lunes'||'martes'||'miercoles'||'jueves'||'viernes'||'sabado'||'domingo')
                {
                    return true;
                }
                else{
                    console.log("El dia ingresado no es aceptable");
                }    
            }
            else{
                console.log("Las horas ingresadas no son aceptables");
            }
    }

    //Añade al array '#hoursUnavailable' un horario en el que el empleado NO esta disponible
    setHoursUnavailable(hoursRange, day)
    {
       this.areTheHoursAllowed(hoursRange, day)
       {
            //Si la hora no ha sido registrada antes, procede 
            if(!(this.#hoursUnavailable.includes(([hoursRegistered, dayRegistered]) => hoursRegistered.every((item, i) => item === hoursRange[i]) && dayRegistered === day)))
            {
                //Si los valores son validos, añade estos al array '#hoursUnavailable' 
                this.#hoursUnavailable.push([hoursRange, day]);
            }
       } 
    }

    //Elimina un rango de horas NO disponibles del empleado
    recoverAvailableHours(hoursRange, day)
    {
        this.areTheHoursAllowed(hoursRange, day)
        {
            //Consigue el index en el array 'hoursUnavailable' con los contenidos que pide el usuario
            let hoursToRecover = this.#hoursUnavailable.findIndex(([hoursRegistered, dayRegistered]) => hoursRegistered.every((item, i) => item === hoursRange[i]) && dayRegistered === day)
            //Elimina el elemento del array y cambia su longitud
            this.#hoursUnavailable.splice(hoursToRecover, 1);
        }        
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
}


