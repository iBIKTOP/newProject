import React from "react";

class Item extends React.Component {
    render() {
        // console.log(this.props.place);
        return (
            <button type="button" className="list-group-item list-group-item-action text-left">
                {this.props.index + 1}. <img width="20px;" src={this.props.place.icon}></img> {this.props.place.name} ({this.props.place.vicinity}). Рейтинг: {this.props.place.rating}
            </button>
        )
    }
}

export default Item;