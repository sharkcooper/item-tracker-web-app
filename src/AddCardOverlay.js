import React from "react"
import "./AddCardOverlay.css"

export default function AddCardOverlay({open, children, onClose}) {
    if (!open) return null

    return (
        <>
            <div className="overlayBackground"></div>
            <div className="overlayForm">
                <div className="overlayButtonContainer">
                    <button className="overlayButton" onClick={onClose}>X</button>
                </div>
                <div className="overlayContentContainer">
                    {children}
                </div>
                <div className="overlayButtonContainer">
                    <button className="overlayButton">Save</button>
                </div>
            </div>
        </>
        
    )
}
