
//     const data =  fetch("https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48;")
//     .then(res => res.json())
//         .then(res => console.log(res))
// console.log(data)
const anapa = document.querySelector('.anapa')

const url = `https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48;`
const sendRequest =(method,url)=> {
    return fetch(url).then(res=> res.json())
}


sendRequest(`GET`,url).then(response => {
console.log(response)
    anapa.textContent = `sss`
})


// fetch(`https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48;`).then((resonse)  => {console.log(resonse.json())}
// );
// let script = document.createElement('script');
// script.src = `https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48"`;
// document.body.append(script);
// async function request(url, method = 'GET', data = null) {
//     try {
//         const headers = {}
//
//         let body
//
//         if (data) {
//             headers['Content-Type'] = 'application/json'
//             body = JSON.stringify(data)
//         }
//
//         const response = await fetch(url, {
//             mode : 'no-cors',
//             method,
//             headers,
//             body
//         })
//         console.log(response.json())
//         return await response.json()
//     } catch (e) {
//         console.warn('чпокарь', e.message)
//     }
// }
// request(`GET`,`https://data-live.flightradar24.com/zones/fcgi/feed.js?bounds=56.84,55.27,33.48,41.48`)