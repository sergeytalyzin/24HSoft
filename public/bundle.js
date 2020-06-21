/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
/* harmony import */ var _models_airportData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/airportData */ "./src/models/airportData.js");


const url = 'https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48'
// const checkStatus = (response) => {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   } else {
//     throw new Error(`${response.status}: ${response.statusText}`);
//   }
// };



class Api {
  constructor() {
  }

  getData() {
    return this.load()
  }

  // load(method = `GET`) {
  //   return fetch(url,{
  //     method
  //   })
  //     .then(response =>response.json())
  //     .then(AirportData.parseTask)
  // }
  async load() {
    const response = await fetch(url)
    const  data = await response.json()
    return  _models_airportData__WEBPACK_IMPORTED_MODULE_0__["default"].parseTask(data)
  }

  // _load({url, method = Method.GET, body = null, headers = new Headers()}) {
  //   return fetch(url, {method, body, headers})
  //     .then(checkStatus)
  //     .catch((err) => {
  //       throw err;
  //     });
  // }
}





/***/ }),

/***/ "./src/api/provider.js":
/*!*****************************!*\
  !*** ./src/api/provider.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Provider; });


class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getData() {

    const storeTasks = Object.values(this._store.getAll());
    return Promise.resolve(storeTasks);
  }

  setData() {
    this._api.getData().then(
      (data) => {
       this._store.setItem(data);
      }
    )
  }
}


/***/ }),

/***/ "./src/api/store.js":
/*!**************************!*\
  !*** ./src/api/store.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;

  }
  getAll() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey));
    } catch (err) {
      return {}
    }
  }

  setItem(data) {
     this._storage.setItem(
      this._storeKey,
      JSON.stringify(data)
    );
  }
}


/***/ }),

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");


const HIDDEN_CLASS = `visually-hidden`;

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}


/***/ }),

/***/ "./src/components/table-board.js":
/*!***************************************!*\
  !*** ./src/components/table-board.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TableBoard; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


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
 console.log(`aaaa`,data)
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


class TableBoard extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
      // document.querySelector(`tbody`).innerHTML = arr.join(' ')
      // console.log(arr)
    document.querySelector(`tbody`).innerHTML = "";
       arr.forEach(it=>{
         document.querySelector(`tbody`).append(it)
       })
    })
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/index.js */ "./src/api/index.js");
/* harmony import */ var _api_store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/store.js */ "./src/api/store.js");
/* harmony import */ var _api_provider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/provider.js */ "./src/api/provider.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/render.js */ "./src/utils/render.js");
/* harmony import */ var _components_table_board__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/table-board */ "./src/components/table-board.js");






const STORE_PREFIX = `airport-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;


const start = () => {
  const provider = new _api_provider_js__WEBPACK_IMPORTED_MODULE_2__["default"](api,store)
  provider.setData()
  provider.getData()
    .then((res) => {
      const data =   formatData(res[0]).slice(2)
      const tableBoard = new _components_table_board__WEBPACK_IMPORTED_MODULE_4__["default"](data)

      const main = document.querySelector('.airport')
      main.innerHTML = ''
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_3__["render"])(main,tableBoard,_utils_render_js__WEBPACK_IMPORTED_MODULE_3__["RenderPosition"].BEFOREEND);
      tableBoard.handlerTable()
      tableBoard.handlerDistance()
    })
}

const formatData = (data)=> {
  return Object.values(data)
}
const api = new _api_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const store = new _api_store_js__WEBPACK_IMPORTED_MODULE_1__["default"](STORE_NAME, window.localStorage);
console.log(`store`,store)

start();
setInterval(start,3000)














/***/ }),

/***/ "./src/models/airportData.js":
/*!***********************************!*\
  !*** ./src/models/airportData.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AirportData; });
class AirportData {
  constructor(data) {
    this.data = data;
  }
  static parseTask(data) {
    return new AirportData(data);
  }
}




/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: RenderPosition, createElement, render, remove, replace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map