//https://medium.com/nuances-of-programming/%D0%BA%D0%B0%D0%BA-%D1%81-%D0%BD%D1%83%D0%BB%D1%8F-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82-%D0%BD%D0%B0-react-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-webpack-4-%D0%B8-babel-172c256d228
import React, { Component } from "react";
import Location from './Location';
import Search from './Search';

import '../styles/App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {lat: '---', lng: '---'};

        // this.onSearch = this.onSearch.bind(this);
        this.setLocation = this.setLocation.bind(this);
    }
    setLocation(obj){
        this.setState({lat: obj.lat, lng: obj.lng});
        console.log(this.state.lat, this.state.lng);
    }
    
    
    render() {
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-header"><Location setLocation={this.setLocation}/></div>              
                    <div className="card-body">
                        {/* <button name="button" type="button" className="btn btn-outline-info" onClick={this.onSearch} >Поиск подходящих мест</button>
                        <h5 className="card-title">Ответ с Google API</h5>
                        <p className="card-text" id="response">text</p> */}
                        <Search data={this.state}/>
                    </div>

                    <div className="card-footer text-muted">
                    https://developers.google.com/places/web-service/search
                    </div>
                </div>
            </div>
        );
    }
}

export default App;