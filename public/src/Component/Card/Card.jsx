import React from 'react'
import cardData from './Card.json'

const Card = () => {
    return (
        <div className="cardcontainer">
            {cardData.map((value, index) => {
                return (<div key={index} className="mycard">
                    <div className="cardtitle">
                        <h2>{value.company}</h2>
                        <img src={value.logo} alt="card" />
                    </div>
                    <div className="cardshares">
                        <h1>{value.shares}</h1>
                    </div>
                </div>)
            })}
        </div>
    )
}

export default Card
