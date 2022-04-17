import React from 'react';
import Card from './Card.js'
import './CardList.css'

class CardList extends React.Component {
    constructor(props) {
        super()
        this.state = {
            numCards: 3,
        }
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
                    <button className='addCardButton'>Add Card</button>
                </div>
                {this.generateCards()}
            </div>
        )
    }
}

export default CardList