import Api from './api/index.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

import {render, RenderPosition} from './utils/render.js';
import TableBoard from "./components/table-board";
const STORE_PREFIX = `airport-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;


const start = () => {
  const provider = new Provider(api,store)
  provider.setData()
  provider.getData()
    .then((res) => {
      const data =   formatData(res[0]).slice(2)
      const tableBoard = new TableBoard(data)

      const main = document.querySelector('.airport')
      main.innerHTML = ''
      render(main,tableBoard,RenderPosition.BEFOREEND);
      tableBoard.handlerTable()
      tableBoard.handlerDistance()
    })
}

const formatData = (data)=> {
  return Object.values(data)
}
const api = new Api();
const store = new Store(STORE_NAME, window.localStorage);

start();
setInterval(start,3000)












