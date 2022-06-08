import React from "react"
import { useState } from "react"
import { useRef } from "react"
import { createRef } from "react"
import "./AddCardOverlay.css"

class CardItem extends React.Component {
    constructor(props) {
        super(props)
        this.labelText = props.labelText
        this.xpath = props.xpath
        this.labelRef = createRef("")
        this.xpathRef = createRef("")
    }

    render()
    {
        return (
            <div className="cardItem">
                <label className="cardItemLabel">{this.labelText}</label>
                <input ref={this.labelRef} className="labelName"/>
                <label className="cardItemLabel">{this.xpath}</label>
                <input ref={this.xpathRef} className="xpath"/>
            </div>
        )
    }
}

class DefaultCardItem extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = props.inputRef
        this.labelText = props.labelText
    }

    getInput() {
        return this.inputRef.current
    }

    render() {
        return (
            <div className="cardItem">
                <label className="cardItemLabel">{this.labelText}</label>
                <input ref={this.inputRef} className="cardItemInput"/>
            </div>
        )
    }
}

export default function AddCardOverlay({open, onClose, addCard}) {
    if (!open) return null

    const titleRef = useRef("")
    const urlRef = useRef("")

    const cardTitle = <DefaultCardItem inputRef={titleRef} labelText={"Card Title"}/>
    
    const cardUrl = <DefaultCardItem inputRef={urlRef} labelText={"Card URL"}/>
    
    const [cardItems, setCardItems] = useState([])
    const cardItemRefs = useRef([])

    function addCardHandler(addCard, callback) {
        addCard(titleRef.current?.value, urlRef.current?.value, cardItemRefs.current)
        callback()
    }

    function addCardItem() {
        const newItem = <CardItem 
                            key={cardItems.length}
                            ref={addCardItemRef} 
                            labelText={"Card Item Name"} 
                            xpath={"HTML XPath"}>
                        </CardItem>
        const oldItems = cardItems.slice()
        setCardItems(oldItems.concat(newItem))
    }
    
    const addCardItemRef = (el) => {
        if (el && !cardItemRefs.current.includes(el)) {
            cardItemRefs.current.push(el)
        }
    }

    return (
        <>
            <div className="overlayBackground"></div>
            <div className="overlayForm">
                <div className="overlayButtonContainer">
                    <button className="overlayButton" onClick={onClose}>X</button>
                </div>
                <div className="overlayContentContainer">
                    {cardTitle}
                    {cardUrl}
                    {cardItems}
                    <button className="overlayButton" onClick={() => addCardItem(cardItems, setCardItems)}>Add Entry</button>
                </div>
                <div className="overlayButtonContainer">
                    <button className="overlayButton" onClick={() => addCardHandler(addCard, onClose)}>Add Card</button>
                </div>
            </div>
        </>
    )
}
