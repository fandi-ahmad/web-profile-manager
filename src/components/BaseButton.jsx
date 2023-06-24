import React from 'react'

export const BasicButton = (props) => {
    return (
        <button onClick={props.onClick} className={`button ${props.className || 'blue'}`}>
            <span className={`icon ${props.iconShow || 'hidden'}`}>
                <i className={`mdi ${props.icon || 'mdi-credit-card-outline'}`}></i>
            </span>
            <span>{props.title || 'title here'}</span>
        </button>
    )
}
