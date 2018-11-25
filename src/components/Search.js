import React from "react";
import Item from "./Item";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { places: [], radius: 300 };
        this.onSearch = this.onSearch.bind(this);
    }

    nextPage(next_page_token) {
        if (next_page_token) {
            console.log('Запрос: https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=' + next_page_token + '&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc');

            fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=' + next_page_token + '&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc', { mode: 'cors' })
                .then(function (response) {
                    return response.text();
                })
                .then(function (data) {
                    data = JSON.parse(data);//парсим JSON, создаем объект
                    console.log(data);
                    let temp = this.state.places;
                    for (let i = 0; i < data.results.length; i++) {//бежим по новому массиву и добавляем данные в наш массив
                        temp.push(data.results[i]);
                    }
                    this.setState({ places: temp });

                    if (temp.length <= 55 && data.next_page_token) {
                        this.nextPage(data.next_page_token);
                    }
                    else if (temp.length >= 55 && data.next_page_token) {
                        let new_radius = this.state.radius - 1;
                        this.setState({ radius: new_radius })
                        this.onSearch();
                    }
                }.bind(this))
                .catch(function (error) {
                    log('Request failed', error)
                });
        }

    }

    onSearch() {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=ru&location=${this.props.data.lat},${this.props.data.lng}&radius=${this.state.radius}&fields=icon,name,vicinity,rating,opening_hours&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc`, { mode: 'cors' })
            .then(function (response) {
                return response.text();
            })
            .then(function (data) {
                data = JSON.parse(data);//парсим JSON, создаем объект
                if (data.results.length == 0) {
                    let new_radius = this.state.radius + 1;
                    this.setState({ radius: new_radius });
                    onSearch();
                }
                else if (data.results.length > 0 && !data.next_page_token) {
                    let temp = [];
                    for (let i = 0; i < data.results.length; i++) {//бежим по массиву и сохраняем его данные в наш массив
                        temp.push(data.results[i]);
                    }
                    this.setState({ places: temp });
                }
                else if (data.next_page_token) {
                    // console.log("Имеются дополнительные страницы..." + data.next_page_token);
                    let temp = [];
                    for (let i = 0; i < data.results.length; i++) {//бежим по массиву и сохраняем его данные в наш массив
                        temp.push(data.results[i]);
                    }
                    this.setState({ places: temp });
                    this.nextPage(data.next_page_token); // запускаем функцию которая добавит данные в массив со след страницы
                }
            }.bind(this))
            .catch(function (error) {
                log('Request failed', error)
            });
    }

    render() {
        return (
            <div>
                <button name="button" type="button" className='btn btn-outline-info' onClick={this.onSearch} >Анализ ближайших мест</button>
                <div className="list-group">
                    <p>Вариантов ответа: {this.state.places.length}, радиус: {this.state.radius}</p>
                    {//выводим список мест
                        this.state.places.map(function (place, i) {
                            return (
                                <Item key={i} place={place} />
                            )
                        }.bind(this))
                    }
                </div>


            </div>
        )
    }
}
export default Search;




            // var xhttp = new XMLHttpRequest();
            // xhttp.onreadystatechange = function () {
            //     if (this.readyState === 4 && this.status === 200) {
            //         // document.getElementById("response").innerHTML = this.responseText;
            //         var data = JSON.parse(this.responseText)
            //         console.log(data.results);
            //     }
            //     else {
            //         console.log("error");
            //     }//http://localhost:3333/search/${this.state.lat}/${this.state.lng}
            // };//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc
            // xhttp.open("GET", `https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=ru&location=${this.props.data.lat},${this.props.data.lng}&radius=50&fields=icon,name,vicinity,rating,opening_hours&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc`, true); //xhr.setRequestHeader("Origin", 'maximum.blog'); https://cors-anywhere.herokuapp.com/
            // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//https://cors-anywhere.herokuapp.com/
            // // xhttp.setRequestHeader("Access-Control-Allow-Origin", true);
            // xhttp.send();// `lat=${this.state.lat}&lng=${this.state.lng}`        