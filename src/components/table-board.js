import AbstractComponent from './abstract-component.js';

const lat2 = 55.410;
const lon2 = 37.902;
const deg2rad =(deg)=> {
  return deg * (Math.PI/180)
}

const getDistanceFromLatLonInKm =(lat1,lon1) => {
  const R = 6371;
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c*1000;
  return d;
}

const renderTable =(data)=> {
const blackList = JSON.parse(window.localStorage.getItem(`boardList`))||[];
  if(!data.length) {
    return 'Await'
  }
  data.sort((a,b)=> {
    return getDistanceFromLatLonInKm(a[2],a[1]) - getDistanceFromLatLonInKm(b[2],b[1])
  })
  return data.map((item)=>{
    return (`
        <tr data-number = "${item[7]}" class="row${blackList.includes(item[7]) ? ` row--active`:``}">
            <td >
                ${item[11]&&item[12] ? (`${item[11]} --> ${item[12]}`): `AWAIT`}
            </td>
            <td>
              ${item[1]} - ${item[2]}
            </td>
            <td>
                ${Math.floor(item[5]* 1.852)}
            </td>
            <td>
                ${item[3]}
            </td>
            <td>
                ${Math.floor(item[4] / 3.281)}
            </td>
            <td>
              ${Math.floor(getDistanceFromLatLonInKm(item[2],item[1]))}
            </td>
        </tr>`)
  }).join('\n');


}

const createBoardTemplate = (data) => {
  return (
    `<table class="table-content">
        <thead>
        <tr>
            <th>
                <br>
                &nbsp; <span class="th__title" >Коды аэропортов вылета и назначения</span> &nbsp;
                <blockquote style="text-align: left;">
                </blockquote>
            </th>
            <th>
                <span class="th__title" >Координаты самолета</span><br>
                <span class="th__title" >
\t\tвыполнения</span>&nbsp;
            </th>
            <th>
                <span class="th__title" >Скорость в км/ч</span>
            </th>
            <th>
                <span class="th__title" >Курс в градусах</span>&nbsp;
            </th>
            <th>
                <span class="th__title" >Высоту полета самолета в метрах</span>&nbsp;
            </th>
            <th class="distance">
                <span class="th__title" >Дальность до аэропорта Домодедово в метрах</span>&nbsp;
            </th>
        </tr>
        </thead>
        <tbody>
         ${renderTable(data)}
         </tbody>

    </table>`
  );
};


export default class TableBoard extends AbstractComponent {
  constructor(data) {
    super();
    this.data = data;
  }
  getTemplate() {
    return createBoardTemplate(this.data);
  }
  handlerTable () {
   let blackList = JSON.parse(window.localStorage.getItem(`boardList`)) ||[];

    document.querySelectorAll('.row').forEach(it=> {

      it.addEventListener('click',(evt)=>{
       evt.currentTarget.classList.toggle(`row--active`)

      if(blackList && blackList.includes(it.dataset.number)) {
        blackList =  blackList.filter(el=>{
          return el!==it.dataset.number
        })
      } else {
      blackList.push(it.dataset.number)
      }

        window.localStorage.setItem(`boardList`,JSON.stringify(blackList))
      })
    })
  }
  handlerDistance () {
    document.querySelector(`.distance`).addEventListener(`click`,()=>{
       const arr = [...document.querySelectorAll(`tbody tr`)].reverse()
    document.querySelector(`tbody`).innerHTML = "";
       arr.forEach(it=>{
         document.querySelector(`tbody`).append(it)
       })
    })
  }
}
