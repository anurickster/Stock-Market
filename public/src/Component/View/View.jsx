import React from 'react'
import { NavLink } from 'react-router-dom'


const View = ({ localstoredata, deletelocalstock }) => {

    return (
        <div className="container">
            <table class="table text-center">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" colspan="5">SAVED DATA TABLE</th>
                    </tr>
                </thead>
                <tbody>
                    {localstoredata.map((apielements,index) => {
                        return (
                            <tr>
                                <td>{apielements.name}</td>
                                <td>{apielements.symbol}</td>
                                <td>{apielements.market_cap}</td>
                                <td><button onClick={()=>deletelocalstock(apielements,index)} className="btn mybutton">Delete</button></td>
                                <td>{apielements.current_price}</td>
                            </tr>)
                    })}
                </tbody>
                <tr>
                    <th scope="col" colspan="5"><NavLink to="/"><button className="mybutton btn">Back</button></NavLink></th>
                </tr>
            </table>
        </div>
    )
}

export default View
