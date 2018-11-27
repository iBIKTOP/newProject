//https://medium.com/nuances-of-programming/%D0%BA%D0%B0%D0%BA-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82-%D0%BD%D0%B0-react-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-webpack-4-%D0%B8-babel-172c256d228
import React, { Component } from "react";
import {getLocation} from "../services/locationService";
import Search from './Search';

import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { lat: '---', lng: '---' };
        this.onChangeLat = this.onChangeLat.bind(this);
        this.onChangeLng = this.onChangeLng.bind(this);
    }
    componentDidMount() {
        getLocation(({lat, lng}) => {
            this.setState({lat, lng});
        })
    }
    onChangeLat(e){
        this.setState({lat: e.target.value});
    }
    onChangeLng(e){
        this.setState({lng: e.target.value});
    }
    render() {
        if (this.state.lat === '---') {
            return (
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">Поиск ближайших мест (GooglePlaceApi)</div>
                        <div className="card-body">
                            <small>Автоматически определяем Ваше местоположение...</small>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">Поиск ближайших мест (GooglePlaceApi)</div>
                        <div className="card-body">
                            <small>Местоположение определено:</small>

                            <div className="row">
                                <div className="col">
                                    <input id="lat" type="text" className="form-control" defaultValue={this.state.lat} onChange={this.onChangeLat}></input>
                                </div>
                                <div className="col">
                                    <input id="lng" type="text" className="form-control" defaultValue={this.state.lng} onChange={this.onChangeLng}></input>
                                </div>
                            </div>

                            <Search data={this.state} />
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

export default App;