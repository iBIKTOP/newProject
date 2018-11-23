import React from "react";

class Location extends React.Component{
    constructor(props){
        super(props);
        this.state = {lat: '---', lng: '---'}

        this.getLocation = this.getLocation.bind(this);
    }
    componentWillMount(){
        this.getLocation();
    }
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
                console.log(this.state);
                this.props.setLocation({lat: this.state.lat, lng: this.state.lng});
            });
        } else {
            console.info("navigator.geolocation error");
        }
    }
    render(){
        return(
            <div>
                <p>Ваше местоположение определено:</p>
                <p>{this.state.lat}, {this.state.lng}</p>
            </div>
        )
    }
}
export default Location;