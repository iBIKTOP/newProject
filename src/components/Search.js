import React from "react";
import Item from "./Item";
import {getSearch} from "../services/searchService"

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { places: [], radius: 1 };
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch() {
        getSearch(this.props.data.lat, this.props.data.lng, this.state.radius, (obj) => {
            this.setState(obj);
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
                        })
                    }
                </div>
            </div>
        )
    }
}
export default Search;