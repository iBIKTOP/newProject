import React from 'react';

export default class Message extends React.Component{
    render(){
        if(this.props.data.places.length >0){
            return <p>Найдены {this.props.data.places.length} вариантов мест.</p>
        }  
        else if (this.props.data.places.length == 0 ){
            return <p></p>
        }
    }
    
}