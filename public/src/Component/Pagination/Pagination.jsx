import React, { useState, useEffect } from 'react';

const Pagination = ({ tableSlice, onSliceChange, total }) => {
    const [pageNumber, setpageNumber] = useState(1)

    useEffect(() => {
        const pagesVisited = tableSlice * pageNumber;
        onSliceChange(pagesVisited - tableSlice, pagesVisited)
    }, [pageNumber, tableSlice, onSliceChange])

    function onButtonClick(type) {
        if (type === "prev") {
            if (pageNumber === 1) {

                setpageNumber(1)
            }
            else {
                setpageNumber(pageNumber - 1)
            }
        }
        else if (type === "next") {
            if (Math.ceil(total / tableSlice) === pageNumber) {
                setpageNumber(pageNumber)
            }
            else {
                setpageNumber(pageNumber + 1);
            }
        }
    }


    return (
        <div className="d-flex justify-content-end px-5 align-items-center pagination_styling">
            <span className="pagenumber">Page-{pageNumber}</span>
            <button className="pagebutton" onClick={() => onButtonClick("prev")}>&lt;</button>
            <button className="pagebutton" onClick={() => onButtonClick("next")}>&gt;</button>
        </div>
    )
}

export default Pagination






