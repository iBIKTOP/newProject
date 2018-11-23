import React from "react";

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {lat: '---', lng: '---'};
        this.onSearch = this.onSearch.bind(this);
    }

    componentWillMount(){
        console.log(this.props.data);
        this.setState();
    }

    onSearch() {
        console.log(this.props.data.lat);
        if (this.props.data.lat!=='---'){
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
              // document.getElementById("response").innerHTML = this.responseText;
              var data = JSON.parse(this.responseText)
              console.log(data.results);
            }
            else{
              console.log("error");
            }//http://localhost:3333/search/${this.state.lat}/${this.state.lng}
          };//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc
          xhttp.open("GET", `https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=ru&location=${this.props.data.lat},${this.props.data.lng}&radius=50&fields=icon,name,vicinity,rating,opening_hours&key=AIzaSyAGBONIz-nYIgKCtdPt373jsPCBA42d1Fc`, true); //xhr.setRequestHeader("Origin", 'maximum.blog'); https://cors-anywhere.herokuapp.com/
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//https://cors-anywhere.herokuapp.com/
          xhttp.setRequestHeader("Access-Control-Allow-Origin", true);
          xhttp.send();// `lat=${this.state.lat}&lng=${this.state.lng}`
        }
    }

    render(){
        return(
            <div>
                <button name="button" type="button" className='btn btn-outline-info' onClick={this.onSearch} >Поиск подходящих мест</button>
                <h5 className="card-title">Ответ с Google API</h5>
                <p className="card-text" id="response">text</p>
            </div>
        )
    }
}
export default Search;
