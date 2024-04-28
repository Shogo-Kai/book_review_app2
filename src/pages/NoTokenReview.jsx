import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NoTokenHeader } from '../components/NoTokenHeader';
import { Pagination } from '../components/Pagination';
import { url } from '../const';
import './notokenreview.scss';

export const NoTokenReview = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [bookOffset, setBookOffset] = useState(0);

  const handlePaginate = (selectedPage) => {
    const newOffset = selectedPage.selected * 10;
    setBookOffset(newOffset);
  };

  useEffect(() => {
    axios
      .get(`${url}/public/books?offset=${bookOffset}`)
      .then((res) => {
        setBooks(res.data);
        setErrorMessage(null);
      })
      .catch((err) => {
        setErrorMessage(`書籍一覧の取得に失敗しました。${err}`);
      });
  }, [bookOffset]);

  return (
    <div className="whole">
      <NoTokenHeader />
      <div className="books">
        <p className="books__error-message">{errorMessage}</p>
        <div className="books-header">
          <h2 className="books-header__title">書籍一覧</h2>
        </div>
        <ul className="books-list">
          {books.map((book) => {
            return (
              <li key={book.id} className="books-list__info" tabIndex="0">
                {book.title}
              </li>
            );
          })}
        </ul>
        <div className="books-footer">
          <Pagination onPageChange={handlePaginate} />
        </div>
      </div>
    </div>
  );
};
