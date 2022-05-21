import React from 'react';
import Card from './Card.jsx'
import AddCardOverlay from './AddCardOverlay.jsx'
import { makeKey } from './tools.js'
import './CardList.css'

class CardList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            isOverlayOpen: false,
            numCards: 3,
        }
    }

    setIsOverlayOpen(value) {
        this.setState({
            isOverlayOpen: value,
        })
    }

    addCard(title, url, entries) {
        const userInput = entries.map((entry) => ({
            labelText: entry.labelRef.current.value,
            inputText: entry.inputRef.current.value
        }))

        const card = <Card key={makeKey()} title={title} url={url} entries={userInput}/>

        const oldCards = this.state.cards.slice()
        this.setState({
            cards: oldCards.concat(card)
        })

    }

    render() {
        return (
            <div className='cardList'>
                <div className='headerRow'>
                    <button className='addCardButton' onClick={() => this.setIsOverlayOpen(true)}>Add Card</button>
                </div>
                {this.state.cards}
                <AddCardOverlay open={this.state.isOverlayOpen} onClose={() => this.setIsOverlayOpen(false)} addCard={(title, url, entries) => this.addCard(title, url, entries)}/>
            </div>
        )
    }
}

export default CardList