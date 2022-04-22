import React from 'react';
import Card from './Card.js'
import AddCardOverlay from './AddCardOverlay.js'
import './CardList.css'

class CardList extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOverlayOpen: false,
            numCards: 3,
        }
    }

    setIsOverlayOpen(value) {
        this.setState({
            isOverlayOpen: value,
        })
    }

    generateCard(i) {
        return (
            <Card
                key={i}
            />
        )
    } 

    generateCards() {
        let cards = new Array()
        for (let i = 0; i < this.state.numCards; i++) {
            cards.push(this.generateCard(i))
        }
        
        return cards
    }

    render() {
        return (
            <div className='cardList'>
                <div className='headerRow'>
                    <button className='addCardButton' onClick={() => this.setIsOverlayOpen(true)}>Add Card</button>
                </div>
                {this.generateCards()}
                <AddCardOverlay open={this.state.isOverlayOpen} onClose={() => this.setIsOverlayOpen(false)}>
                    Overlay!
                </AddCardOverlay>
            </div>
        )
    }
}

export default CardList