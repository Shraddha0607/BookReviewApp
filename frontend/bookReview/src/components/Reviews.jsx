import React, { useEffect, useState } from 'react'
// import { ReviewList } from '../../util/ReviewList'

function Reviews() {
    const [isLoading, setIsLoading] = useState(false);
    const [ReviewList, setReviewList] = useState([]);
    console.log("hjk");

    useEffect(() => {
        console.log("keep going, never stop");
        async function getReviewList() {
            setIsLoading(true);
            try {
                var response = await fetch('http://localhost:5210/api/Review');

                if (!response.ok) {
                    throw new Error("Error occured in fetching data");
                }
                var data = await response.json();
                setReviewList(data);
                console.log(data);
            }
            catch (error) {
                console.log("error occured");
            }
            setIsLoading(false);
        }

        getReviewList();
    }, []);

    return (
        <>
        <h1>Review Details</h1>
            {isLoading && <p> Please wait Data fetching!</p>}
            {!isLoading && <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Book Id</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {ReviewList.map((review) =>
                        <tr key={review.id}>
                            <td>{review.id}</td>
                            <td>{review.bookId}</td>
                            <td>{review.rating}</td>
                            <td>{review.comment}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            }
        </>
    )
}

export default Reviews
