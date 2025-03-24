import Employee from "./preScriptSchAss.js";4
const employeesJSONList = JSON.parse(localStorage.getItem('employeesList'));
const employeesList = [];

const errorMessage = document.getElementById('errorMessage');
const editorDiv = document.getElementById('editorDiv')
const weekdays = ['Lunes', 'Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
function openEmpEditorMenu(employee = new Employee )
{
    console.log(employee)

    editorDiv.innerHTML = "";

    const name_Div = document.createElement('div');
    const hrsWkly_Div = document.createElement('div');
    const hrsDbt_Div = document.createElement('div');
    const unavlb_Div = document.createElement('div');
    const unavlbShow_Div = document.createElement('div');
    

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

    let unavlbSch = employee.getHoursUnavailable();

    console.log(unavlbSch)
    const unavlb_Slct = document.createElement('select', { placeHolder: 'Horario' }) ;
    unavlb_Div.appendChild(Object.assign(document.createElement('label'), {innerText: 'Horas no disponibles: '}))
    unavlb_Div.appendChild(unavlb_Slct);
    const unavlbMenu = document.createElement('div');
    unavlbMenu.appendChild(Object.assign(document.createElement('label'), { innerText: 'Hora de inicio: '}));
    const hrs1_Inpt = unavlbMenu.appendChild(Object.assign(document.createElement('input'), { placeholder: 'HH:MM'}));
    unavlbMenu.appendChild(Object.assign(document.createElement('label'), { innerText: ' Hora de fin: '}));
    const hrs2_Inpt = unavlbMenu.appendChild(Object.assign(document.createElement('input'), { placeholder: 'HH:MM'}));
    unavlbMenu.appendChild(Object.assign(document.createElement('label'), { innerText: ' Día: '}));
    const day_Slct = unavlbMenu.appendChild(Object.assign(document.createElement('select')));
    day_Slct.appendChild(Object.assign(document.createElement('option'), { disabled: true, selected: true, innerText: 'Día ' }))
    weekdays.forEach(wDay => {
        const wDay_Opt = document.createElement('option');
        wDay_Opt.value = (wDay.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
        wDay_Opt.innerText = wDay;
        day_Slct.appendChild(wDay_Opt);
    })


    unavlb_Slct.appendChild(Object.assign(document.createElement('option'), { disabled: true, selected: true, innerText: 'Horario a editar' }))
    unavlb_Div.appendChild(unavlbMenu);

    unavlbSch.forEach(sch => {
        if(sch.some(e => e !== undefined))
        {    
            const hrs = sch[0];
            const hrs1 = sch[0][0];
            const hrs2 = sch[0][1];
            const day = sch[1];

            const hrsTxt = sch[0].join(' - ');
            const unavlb_Opt = unavlb_Slct.appendChild(Object.assign(document.createElement('option'), { value: sch, innerText: `${hrsTxt}, ${day}`}));
            
            unavlb_Slct.addEventListener('change', () =>{
                hrs1_Inpt.value = null;
                hrs2_Inpt.innerText = null;
                if(unavlb_Slct.value == sch)
                {
                    hrs1_Inpt.setAttribute('placeholder', hrs1);
                    hrs2_Inpt.setAttribute('placeholder', hrs2);
                    day_Slct.value = day;

                    hrs1_Inpt.addEventListener('change', () =>{
                        sch[0][0] = hrs1_Inpt.value;
                        console.log(unavlbSch)
                    })

                    hrs2_Inpt.addEventListener('change', () =>{
                        sch[0][1] = hrs2_Inpt.value;
                        console.log(unavlbSch)
                    })
                }
            })
        }
    })
    

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