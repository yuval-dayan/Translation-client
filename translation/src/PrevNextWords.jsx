import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';

const PrevNextWord = ({ pageNumber, setPageNumber, dataLength, containerName }) => {
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(false)
    const nextPage = () => {
        setPageNumber(pageNumber + 1)
        setPrevButtonDisabled(false);
    }
    const prevPage = () => {
        if ((pageNumber - 1 == 1)) {
            setPrevButtonDisabled(true)
        }
        setPageNumber(pageNumber - 1)
    }
    useEffect(() => {
        if (pageNumber) {
            let prevButton = (pageNumber == 1)
            setPrevButtonDisabled(prevButton)
        }

    }, [pageNumber]);

    useEffect(() => {
        if (dataLength == pageNumber) {
            setNextButtonDisabled(true)
        }
        else { setNextButtonDisabled(false) }

    }, [dataLength, pageNumber])

    return (
        <div className="prev-next-word">
            <Button disabled={prevButtonDisabled} onClick={prevPage}>Prev</Button>
            <p> {`${pageNumber}/${dataLength}`}</p>
            <Button disabled={nextButtonDisabled} onClick={nextPage}>Next</Button>
        </div>
    )


}
export default PrevNextWord;