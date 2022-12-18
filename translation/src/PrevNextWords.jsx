import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';

const PrevNextWord = ({ pageNumber, setPageNumber,dataLength }) => {
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)

    const nextPage = () => {
        setPageNumber(pageNumber + 1)
        console.log("nextPage")
        setPrevButtonDisabled(false);
    }
    const prevPage = () => {
        if ((pageNumber - 1 == 1)) {
            setPrevButtonDisabled(true)
        }
        setPageNumber(pageNumber - 1)
    }
    return (
        <div className="prev-next-word">
            <Button disabled={prevButtonDisabled} onClick={prevPage}>Prev</Button>
           <p> {`${pageNumber}/${dataLength}`}</p>
            <Button disabled={nextButtonDisabled} onClick={nextPage}>Next</Button>
        </div>
    )


}
export default PrevNextWord;