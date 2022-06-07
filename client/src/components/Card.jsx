import React from 'react';
import { makeKey } from '../common/tools';
import './Card.css'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.id = props.id
        this.state = {
            title: props.title,
            url: props.url,
            entries: props.entries,
            expanded: false,
        }
    }

    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded,
        })
    }

    createTitle() {
        return (
            <div className='titleContainer'>
                <p className='cardTitle leftCardItem'>{this.state.title}</p>
                {
                    this.state.expanded ? 
                        <button className='expandButton rightCardItem' onClick={() => this.toggleExpand()}>-</button> :
                        <button className='expandButton rightCardItem' onClick={() => this.toggleExpand()}>+</button>
                }
            </div>
        )
    }

    createItemArea() {
        if (!this.state.expanded)
            return null

        let entries = this.state.entries.map((entry) => (
            <div key={makeKey()} className="itemContainer">
                <div className="labelContainer leftCardItem">{entry.labelText}</div>
                <div className="valueContainer leftCardItem">{entry.inputText}</div>
            </div>
        ))

        return (
            <div className='itemList'>
                <div key={makeKey()} className="itemContainer">
                    <div className="labelContainer leftCardItem">URL</div>
                    <div className="valueContainer leftCardItem">{this.state.url}</div>
                </div>
                {entries}
            </div>
        )
    }

    render() {
        return (
            <div className='card'>
                {this.createTitle()}
                {this.createItemArea()}
            </div>
        )
    }
}

export default Card