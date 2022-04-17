import React from 'react';
import './Card.css'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded,
        })
        console.log("expanded state is now:")
        console.log(this.state.expanded)
    }

    createTitle() {
        return (
            <div className='titleContainer'>
                <p className='cardTitle leftCardItem'>Sample Title</p>
                {
                    this.state.expanded ? 
                        <button className='expandButton rightCardItem' onClick={() => this.toggleExpand()}>-</button> :
                        <button className='expandButton rightCardItem' onClick={() => this.toggleExpand()}>+</button>
                }
            </div>
        )
    }

    createDetailsArea() {
        if (this.state.expanded){
            return (
                <div className='detailsContainer'>
                    {this.createAvailability()}
                    {this.createPrice()}
                </div>
            )
        }
    }

    createAvailability() {
        return (
            <div className='availabilityContainer statusContainer leftCardItem'>
                <p className='availability'>Sample Availability</p>
            </div>
        )
    }

    createPrice() {
        return (
            <div className='priceContainer statusContainer rightCardItem'>
                <p className='price'>Sample Price</p>
            </div>
        )
    }

    render() {
        return (
            <div className='card'>
                {this.createTitle()}
                {this.createDetailsArea()}
            </div>
        )
    }
}

export default Card