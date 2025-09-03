import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function BookDetails({ bookId, setIsSpecificBook }) {
    const [rating, setRating] = useState(5);
    const [book, setBook] = useState([]);
    const [ratingSectionOpen, setRatingSectionOpen] = useState(false);
    const [rate, setRate] = useState(5);
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let ratingStar = "";
    for (let i = 0; i < rating; i++) {
        ratingStar += '*';
    }

    useEffect(() => {
        async function getBook() {
            setIsLoading(true);
            try {
                const url = `http://localhost:5210/id/${bookId}`;
                var response1 = await fetch(url);
                var response2 = await fetch(`http://localhost:5210/api/Review/average/${bookId}`);
                console.log(response2);

                if (!response1.ok) {
                    throw new Error("Error occured while fetching data");
                }
                if (response2.ok) {
                    var data2 = await response2.json();
                    console.log(data2);
                    setRating(data2.rating);
                }

                var data1 = await response1.json();

                setBook(data1);

            }
            catch {
                console.log("Error occured");
            }

            setIsLoading(false);

        }
        getBook();
    }, [])

    function onBackClick() {
        setIsSpecificBook(false);
    }

    function onRatingOpenClick() {
        setRatingSectionOpen(true);
    }

    function onCloseClick() {
        setRatingSectionOpen(false);
    }

    async function onSubmitClick() {

        console.log(rate, " is the rate and comment ", review);

        const payload = {
            "id": 0,
            "rating": rate,
            "comment": review,
            "bookId": book.id
        }

        console.log("this is payload");
        console.log(payload);
        try {
            const response = await fetch('http://localhost:5210/api/Review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            console.log(response);

        }
        catch (Error) {
            console.log("Error Occured");
        }
        setRate(0);
        setReview("");
        setRatingSectionOpen(false);
    }

    function onChangeRateHandler(event) {
        setRate(event.target.value);
    }

    function onChangeReviewHandler(event) {
        setReview(event.target.value);
    }



    const ratingSection = <div className=" p-2">
        <ul className="modal-body list-group">
            <li className='mb-2 list-group-item'>
                <label className='mx-4' >Rate me</label>
                <input type="text" value={rate} onChange={(event) => onChangeRateHandler(event)}></input>
            </li>

            <li className='mb-2 list-group-item'>
                <label className='mx-4'>Review</label>
                <input type="text" value={review} onChange={(event) => onChangeReviewHandler(event)}></input>
            </li>
            <li className='mb-2 list-group-item'>
                <button class="btn btn-primary btn-sm mb-1 mx-2" onClick={onSubmitClick}>Submit</button>
                <button class="btn btn-secondary btn-sm mb-1" onClick={onCloseClick}>Close</button>
            </li>
        </ul>
    </div>


    return (
        <>
            {isLoading && <p>Please wait! Data is fetching</p>}
            {!isLoading && <section id="book-section">
                <div class="container mb-2" id = "book">
                    <div>
                        <h1>{book.name}</h1>
                        <h3>{ratingStar}</h3>
                    </div>
                    <div >
                        <h2 >About</h2>
                        <p >{book.about}</p>
                    </div>
                    <button  onClick={onRatingOpenClick}>Add your Review</button>
                    {ratingSectionOpen && ratingSection}

                </div>

                <button onClick={onBackClick}>Back to previous</button>
            </section>}
        </>

    )
}

export default BookDetails
