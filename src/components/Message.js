import React from 'react';

export default class Message extends React.Component{
    render(){
        if(this.props.data.places.length >= 51 && this.props.data.places.length <= 59){
            return <p>Найдены {this.props.data.places.length} вариантов мест в радиусе {this.props.data.radius}м.</p>
        } 
        else if (this.props.data.places.length > 0 && this.props.data.places.length <= 50 || this.props.data.places.length == 60){
            return <p>Ищем....</p>
        }  
        else if (this.props.data.places.length == 0 ){
            return <p>Нажмите на Поиск</p>
        }
    }
    
}