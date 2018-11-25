import React from "react";

class Item extends React.Component {
    render() {
        // console.log(this.props.place);
        return (
            <button type="button" className="list-group-item list-group-item-action">
                <img width="20px;" src={this.props.place.icon}></img>{this.props.place.name}
            </button>
        )
    }
}

export default Item;