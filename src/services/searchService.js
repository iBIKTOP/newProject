export function getSearch(lat, lng, radius, callback) {
    let placesArr = [];
    let thisRadius = radius;
    function startSearch(radius){
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=ru&location=${lat},${lng}&radius=${radius}&fields=icon,name,vicinity,rating,opening_hours&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc`, { mode: 'cors' })
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            //если ответ от сервера пришел с пустым массивом, то увеличиваем радиус и вызываем функцию заново.
            if (data.results.length == 0) {
                let new_radius = radius + 1;
                startSearch(new_radius);
            }
            // если радиус больше 0, бежим по результату и сохраняем его данные в наш массив placesArr
            else if (data.results.length > 0) {
                for (let i = 0; i < data.results.length; i++) {
                    placesArr.push(data.results[i]);
                }
                // если нет следующей страницы, то выводим данные на экран
                if (!data.next_page_token){
                    callback({ places: placesArr });
                    console.log("Первый запрос-----------Длинна = " + placesArr.length + " дополнительных страниц нет");
                }else{
                    nextPage(data.next_page_token); // запускаем функцию которая добавит данные в массив со след страницы
                    console.log("Первый запрос-----------Длинна = " + placesArr.length + " дополнительные страницы есть");
                }   
            }
        }) 
        .catch(function (error) {
            log('Request failed', error)
        });
    }
    startSearch(thisRadius);

    function nextPage(next_page_token) {
        if (next_page_token) {
            setTimeout(function(){
                fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=' + next_page_token + '&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc', { mode: 'cors' })
                .then(function (response) {
                    if(response.status == 200) return response.text();
                })
                .then(function (data) {
                    data = JSON.parse(data);//парсим JSON, создаем объект
                    console.log(data.results);
                    for (let i = 0; i < data.results.length; i++) {//бежим по новому массиву и добавляем данные в наш массив
                        placesArr.push(data.results[i]);
                    }
                    if (placesArr.length != 60 && data.next_page_token) {
                        nextPage(data.next_page_token);
                        console.log("Дополнительный запрос------Длинна = " + placesArr.length + " дополнительные страницы есть ");
                    }
                    else if (placesArr.length < 60 && !data.next_page_token) {
                        callback({ places: placesArr });
                        console.log("Дополнительный запрос------Длинна = " + placesArr.length + " дополнительных страниц нет ");
                    }
                    else if (placesArr.length = 60) {
                        console.log("Дополнительный запрос------Длинна = " + placesArr.length + " Достигли предела, ищим заново. ");
                        placesArr = [];
                        let new_radius = thisRadius - 10;
                        startSearch(new_radius);
                    }
                })
                .catch(function (error) {
                    log('Request failed', error)
                });
            },2000);
        }
    }
}