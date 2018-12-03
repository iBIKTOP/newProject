export function getPlaces(lat, lng, callback) {
    let placesArr = [];
    let thisRadius = 40;
    function startSearch(radius){
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=ru&location=${lat},${lng}&radius=${radius}&fields=icon,name,vicinity,rating,opening_hours&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc`, { mode: 'cors' })
        .then(function (response) {
                return response.text();
        })
        .then(function (data) {
            data = JSON.parse(data);//парсим JSON, создаем объект
            console.log(data);
            if (data.status == "OK") {
                //если ответ от сервера пришел с пустым массивом, то увеличиваем радиус и вызываем функцию заново.
                if (data.results.length == 0) {
                    thisRadius += 25;
                    (thisRadius != 100) ? startSearch(thisRadius) : alert("В радиусе 100м не нашлось ни одного варианта");
                }
                // если радиус больше 0, бежим по результату и сохраняем его данные в наш массив placesArr
                else if (data.results.length > 0) {
                    for (let i = 0; i < data.results.length; i++) {
                        placesArr.push(data.results[i]);
                    }
                    callback({ places: placesArr, radius: thisRadius });
                    if (data.next_page_token) {
                        nextPage(data.next_page_token); // запускаем функцию которая добавит данные в массив со след страницы
                        console.log("Первый запрос-----------Длинна = " + placesArr.length + " есть дополнительные страницы");
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
                    if ( data.status == "OK" ) {
                        for (let i = 0; i < data.results.length; i++) {//бежим по новому массиву и добавляем данные в наш массив
                            placesArr.push(data.results[i]);
                        }
                        callback({ places: placesArr, radius: thisRadius });
                        //есть след страница - открываем ее.
                        if (data.next_page_token) {
                            nextPage(data.next_page_token);
                            console.info("Дополнительный запрос------Длинна = " + placesArr.length + " дополнительные страницы есть ");
                        }
                        //Достигли предела, Уменьшаем радиус на 10м и ищем заново.
                        else if (placesArr.length == 60) {
                            console.log("Дополнительный запрос------Длинна = " + placesArr.length + " Достигли предела, ищим заново. ");
                            console.log("Уменьшаем радиус на 5м и ищем заново");
                            placesArr = [];
                            thisRadius -= 10;
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