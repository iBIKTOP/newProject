import React from "react";
import Item from "./Item";
import {getPlaces} from "../services/searchService";
import Message from "./Message";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { places: [], radius: "?" };
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch() {
        if (this.props.data.lat == '' || this.props.data.lng == ''){
            alert('Введены некорректные данные');
        }else{
            getPlaces(this.props.data.lat, this.props.data.lng, (obj) => {
                this.setState(obj);
            });
        }
        
    }

    render() {
        return (
            <div>
                <button name="button" type="button" className='btn btn-outline-info' onClick={this.onSearch} >Поиск ближайших мест</button>
                <div className="list-group">
                    <Message data={this.state}/>
                    {/* <p>Вариантов ответа: {this.state.places.length}, радиус: {this.state.radius}</p> */}
                    {//выводим список мест
                        this.state.places.map(function (place, i) {
                            return (
                                <Item key={i} place={place} index={i}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Search;