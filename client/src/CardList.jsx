import React from 'react';
import Card from './Card.jsx'
import AddCardOverlay from './AddCardOverlay.jsx'
import { makeKey } from './tools.js'
import './CardList.css'
import axios from 'axios';

class CardList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            isOverlayOpen: false,
        }
    }

    getCardsFromDatabase() {

        axios.get("http://localhost:3000/api/getCards").then((response) => {
            if (response)
                return response
            else
                return []
        })

    }

    setIsOverlayOpen(value) {
        this.setState({
            isOverlayOpen: value,
        })
    }

    addCardToDatabase(card) {
        axios.post("http://localhost:3000/api/insertCard", {
            card: card
        })
    }

    addCard(title, url, entries) {
        const userInput = entries.map((entry) => ({
            labelText: entry.labelRef.current.value,
            inputText: entry.inputRef.current.value
        }))

        const card = {
            title: title,
            url: url,
            entries: userInput
        }

        this.addCardToDatabase(card)
               
        const oldCards = this.state.cards.slice()
        this.setState({
            cards: oldCards.concat(card)
        })

    }

    getCards() {
        const cardComponents = []
        const curCards = this.state.cards.slice()

        curCards.forEach(element => {
            cardComponents.push(<Card key={makeKey()} title={element.title} url={element.url} entries={element.entries}/>)
        })

        return cardComponents
    }

    render() {
        return (
            <div className='cardList'>
                <div className='headerRow'>
                    <button className='addCardButton' onClick={() => this.setIsOverlayOpen(true)}>Add Card</button>
                </div>
                {this.getCards()}
                <AddCardOverlay open={this.state.isOverlayOpen} onClose={() => this.setIsOverlayOpen(false)} addCard={(title, url, entries) => this.addCard(title, url, entries)}/>
            </div>
        )
    }
}

export default CardList