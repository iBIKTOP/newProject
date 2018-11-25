import React from "react";
import Search from './Search';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lat: '---', lng: '---' }

        this.getLocation = this.getLocation.bind(this);
    }
    componentWillMount() {
        this.getLocation();
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
                // console.log(this.state);
                this.props.setLocation({ lat: this.state.lat, lng: this.state.lng });
            });
        } else {
            console.info("navigator.geolocation error");
        }
    }
    render() {
        if (this.state.lat === '---') {
            return (
                <div>
                    <small>Автоматически определяем Ваше местоположение...</small>
                </div>
            )
        } else {
            return (
                <div>
                    <small>Местоположение определено: {this.state.lat}, {this.state.lng}</small>
                    <Search data={this.state} />
                </div>
            )
        }

    }
}
export default Location;