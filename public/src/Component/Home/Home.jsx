import React, { useCallback, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { NavLink } from 'react-router-dom'
import Pagination from '../Pagination/Pagination';


const Home = ({ apistoredata, localtemp, savestock }) => {

    const [search, setSearch] = useState("")

    const tableSlice = 5;

    const [pagination, setPagination] = useState({
        start: 0,
        end: tableSlice
    })

    const onSliceChange = useCallback((pagesVisited, adduserpagesvisted)=> {
        setPagination({ start: pagesVisited, end: adduserpagesvisted })
    },[])

    return (
        <div className="container">
            <table className="table text-center">
                <thead className="thead-light">
                    <tr>
                        <th colSpan="1" className="text-center head1">Stock Details Table</th>
                        <th colSpan="4" className="text-left py-1"><input className="w-50 py-1" type="text" placeholder="search..." onChange={(e) => setSearch(e.target.value)} /></th>
                    </tr>
                    <tr>
                        <th scope="col">COMPANY NAME</th>
                        <th scope="col">SYMBOL</th>
                        <th scope="col">MARKET CAP</th>
                        <th scope="col"> </th>
                        <th scope="col">CURRENT PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {apistoredata.slice(pagination.start, pagination.end).filter((value) => {
                        if (search === "") {
                            return value;
                        }
                        else if (value.name.toLowerCase().includes(search.toLowerCase())) {
                            return value;
                        } else {
                            return 0;
                        }
                    }).map((apielements, index) => {
                        return (
                            <tr key={index}>
                                <td>{apielements.name}</td>
                                <td>{apielements.symbol}</td>
                                <td>{apielements.market_cap}</td>
                                <td>{localtemp.includes(apielements.symbol) ?
                                    <NavLink to="/view"><button className="btn mybutton">View</button> </NavLink> : <button className="btn btn-primary" onClick={() => savestock(apielements)}>Save Data</button>}</td>
                                <td>{apielements.current_price}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
            <Pagination tableSlice={tableSlice} onSliceChange={onSliceChange} total={apistoredata.length} />
        </div >
    )
}

export default Home
