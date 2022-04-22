import React from "react"
import "./AddCardOverlay.css"

export default function AddCardOverlay({open, children, onClose}) {
    if (!open) return null

    return (
        <>
            <div className="overlayBackground"></div>
            <div className="overlayForm">
                <button className="overlayButton" onClick={onClose}>X</button>
                {children}
                <button className="overlayButton">Save</button>
            </div>
        </>
        
    )
}
