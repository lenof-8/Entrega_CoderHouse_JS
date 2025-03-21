import Employee from "./preScriptSchAss.js";4
const employeesJSONList = JSON.parse(localStorage.getItem('employeesList'));
const employeesList = [];

const errorMessage = document.getElementById('errorMessage');
const editorDiv = document.getElementById('editorDiv')

function openEmpEditorMenu(employee = new Employee )
{
    editorDiv.innerHTML = "";

    const name_Div = document.createElement('div');
    const hrsWkly_Div = document.createElement('div');
    const hrsDbt_Div = document.createElement('div');
    const unavlb_Div = document.createElement('div');
    

    name_Div.appendChild(Object.assign(document.createElement('label'), { innerText: "Nombre del empleado: "}))
    hrsWkly_Div.appendChild(Object.assign(document.createElement('label'), { innerText: "Horas semanales: "}))
    hrsDbt_Div.appendChild(Object.assign(document.createElement('label'), { innerText: "Horas en deuda: "}))

    const name_Inpt = document.createElement("input");
    name_Div.appendChild(name_Inpt);
    name_Inpt.setAttribute("placeholder", employee.name);
    name_Inpt.setAttribute("type", 'text');
    
    const hrsWkly_Inpt = document.createElement("input");
    hrsWkly_Div.appendChild(hrsWkly_Inpt);
    hrsWkly_Inpt.setAttribute("placeholder", employee.getWeeklyHours());
    hrsWkly_Inpt.setAttribute("type", 'number');

    const hrsDbt_Inpt = document.createElement("input");
    hrsDbt_Div.appendChild(hrsDbt_Inpt);
    hrsDbt_Inpt.setAttribute("placeholder", employee.getHoursOwed());
    hrsDbt_Inpt.setAttribute("type", 'number');
    
    editorDiv.append(name_Div, hrsWkly_Div, hrsDbt_Div, unavlb_Div);
}


if(employeesJSONList == null)
{
    errorMessage.innerText = 'No hay ningún empleado registrado';
    errorMessage.classList.add('resaltado')
    editorDiv.innerHTML = '';
    editorDiv.appendChild(errorMessage);
}
else
{
    employeesJSONList.forEach(e => {
        let employee = new Employee(e.name, e.hoursWeekly, e.hoursOwed);
        employeesList.push(employee);
        e.hoursUnavailable.forEach(unvSch => {
            employee.setHoursUnavailable(unvSch[0], unvSch[1]);
        })
        employee.setHoursUnavailable()
    });
    let btnDiv = document.createElement('div');
    editorDiv.appendChild(btnDiv);
    employeesList.forEach(e =>{

        let a = document.createElement('button');
        a.innerText = e.name;
        a.setAttribute('id', e.name + 'Btn')
        btnDiv.appendChild(a);
    })

    employeesList.forEach(emp => {
        document.getElementById(emp.name+'Btn').addEventListener("click", ()=>{
        console.log("soy "+ emp.name) 
        openEmpEditorMenu(emp);
        })
    })
}