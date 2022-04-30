import React from "react"
import { useState } from "react"
import "./AddCardOverlay.css"

function addCardItem(cardItems, setCardItems) {
    const oldItems = cardItems.slice()
    const newItem = <CardItem key={cardItems.length}>
                        <label className="cardItemLabel">Card Item Name</label>
                        <input className="labelName"/>
                        <label className="cardItemLabel">HTML XPath</label>
                        <input className="xpath"/>
                    </CardItem>
    setCardItems(oldItems.concat(newItem))
}

function CardItem({children}) {
    return (
        <div className="cardItem">
            {children}
        </div>
    )
}

export default function AddCardOverlay({open, onClose}) {
    if (!open) return null

    const [cardItems, setCardItems] = useState([]) 

    if (cardItems.length == 0) {
        setCardItems([
            <CardItem key={cardItems.length}>
                <label className="cardItemLabel">URL</label>
                <input className="cardItemInput"/>
            </CardItem>
        ])
    }

    console.log(cardItems)

    return (
        <>
            <div className="overlayBackground"></div>
            <div className="overlayForm">
                <div className="overlayButtonContainer">
                    <button className="overlayButton" onClick={onClose}>X</button>
                </div>
                <div className="overlayContentContainer">
                    {cardItems}
                    <button className="overlayButton" onClick={() => addCardItem(cardItems, setCardItems)}>Add Tracker</button>
                </div>
                <div className="overlayButtonContainer">
                    <button className="overlayButton">Save</button>
                </div>
            </div>
        </>
        
    )
}
