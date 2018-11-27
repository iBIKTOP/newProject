export function getPlaces(lat, lng, callback) {
    let placesArr = [];
    let thisRadius = 25;
    function startSearch(radius){
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=ru&location=${lat},${lng}&radius=${radius}&fields=icon,name,vicinity,rating,opening_hours&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc`, { mode: 'cors' })
        .then(function (response) {
                return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            if (data.status == "OK") {
                //если ответ от сервера пришел с пустым массивом, то увеличиваем радиус и вызываем функцию заново.
                if (data.results.length == 0) {
                    thisRadius += 25;
                    startSearch(thisRadius);
                }
                // если радиус больше 0, бежим по результату и сохраняем его данные в наш массив placesArr
                else if (data.results.length > 0) {
                    for (let i = 0; i < data.results.length; i++) {
                        placesArr.push(data.results[i]);
                        callback({ places: placesArr, radius: thisRadius });
                    }
                    // если нет следующей страницы, то увеличиваем радиус и вызываем функцию заново.
                    if (!data.next_page_token){
                        // callback({ places: placesArr, radius: thisRadius });
                        console.info("Первый запрос-----------Длинна = " + placesArr.length + " дополнительных страниц нет");
                        console.log("Увеличиваем радиус на 25м и ищем заново");
                        placesArr = [];
                        thisRadius += 25;
                        startSearch(thisRadius);
                    }else{
                        nextPage(data.next_page_token); // запускаем функцию которая добавит данные в массив со след страницы
                        console.log("Первый запрос-----------Длинна = " + placesArr.length + " дополнительные страницы есть");
                    }   
                } 
            }else if(data.status == "ZERO_RESULTS"){
                alert('Введены некорректные данные');
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
                    return response.text();
                })
                .then(function (data) {
                    data = JSON.parse(data);//парсим JSON, создаем объект
                    // console.log(data);
                    if ( data.status == "OK" ) {
                        // console.log(data.results);
                        for (let i = 0; i < data.results.length; i++) {//бежим по новому массиву и добавляем данные в наш массив
                            placesArr.push(data.results[i]);
                            callback({ places: placesArr, radius: thisRadius });
                        }
                        //если длинна не достигла предела и есть след страница то открываем ее.
                        if (placesArr.length != 60 && data.next_page_token) {
                            nextPage(data.next_page_token);
                            console.info("Дополнительный запрос------Длинна = " + placesArr.length + " дополнительные страницы есть ");
                        }
                        // если массив хранит от 20 до 40 елементов и нет след страницы то увеличиваем радиус на 20м и начинаем сначала
                        else if (placesArr.length <= 40 && !data.next_page_token) {
                            // callback({ places: placesArr, radius: thisRadius });
                            console.info("Дополнительный запрос------Длинна = " + placesArr.length + " дополнительных страниц нет ");
                            console.log("Увеличиваем радиус на 20м и ищем заново");
                            placesArr = [];
                            thisRadius += 20;
                            startSearch(thisRadius);
                        }
                        // если массив хранит от 41 до 50 елементов то увеличиваем радиус на 10м и начинаем сначала
                        else if (placesArr.length >= 41 && placesArr.length <= 50) {
                            console.info("Дополнительный запрос------Длинна = " + placesArr.length + " дополнительных страниц нет ");
                            console.log("Увеличиваем радиус на 10м и ищем заново");
                            placesArr = [];
                            thisRadius += 10;
                            startSearch(thisRadius);
                        }
                        // если массив хранит от 51 до 59 елементов то выводим на экран
                        else if (placesArr.length >= 51 && placesArr.length <= 59) {
                            callback({ places: placesArr, radius: thisRadius });
                        }
                        // если массив достиг предела, Уменьшаем радиус на 5м и ищем заново и ищим заново.
                        else if (placesArr.length = 60) {
                            console.log("Дополнительный запрос------Длинна = " + placesArr.length + " Достигли предела, ищим заново. ");
                            console.log("Уменьшаем радиус на 5м и ищем заново");
                            placesArr = [];
                            thisRadius -= 5;
                            startSearch(thisRadius);
                        }
                    }
                })
                .catch(function (error) {
                    log('Request failed', error)
                });
            },2500);
        }
    }
}