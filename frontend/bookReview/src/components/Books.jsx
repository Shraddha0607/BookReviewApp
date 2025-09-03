import React, { useEffect, useState } from 'react'
import BookDetails from './BookDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function Books() {
  const [isSpecificBook, setIsSpecificBook] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookId, setBookId] = useState(0);
  const [BookList, setBookList] = useState([]);

  useEffect(() => {
    async function getBookList() {

      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:5210/api/Book');

        if (!response.ok) {
          throw new Error("Http error");
        }

        const data = await response.json();
        setBookList(data);
        return data;
      }
      catch (error) {
        console.log("Error occured");
      }
      setIsLoading(false);
    }
    getBookList();
  }, []);

  function onClickHandler(id) {
    setIsSpecificBook(true);
    setBookId(id);
  }

  return (
    <>
      {!isLoading && <p> Fetching data</p>}
      {isLoading && isSpecificBook &&
        <BookDetails bookId={bookId} setIsSpecificBook={setIsSpecificBook} />
      }
      {isLoading && !isSpecificBook &&
        <>
          <h1 class="display-1 mb-3">Book Review Store</h1>
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th>About</th>
                <th></th>
              </tr>

            </thead>
            <tbody>
              {BookList.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.about}</td>
                  <td><button class="btn btn-secondary btn-sm" onClick={() => onClickHandler(book.id)}>More Details</button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </>}
    </>
  );
}

export default Books
