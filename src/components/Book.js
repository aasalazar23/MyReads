import React from "react";
import { BookShelfChanger } from "./BookShelfChanger";
import PropTypes from 'prop-types';

export const Book = ({ book, onShelfChange }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: !!book.imageLinks
                ? `url("${book.imageLinks.thumbnail}")`
                : 'url("https://i.pinimg.com/originals/d7/a3/ae/d7a3ae5506817d1ef60dabde37150fe9.png")',
            }}
          ></div>
          <BookShelfChanger onShelfChange={onShelfChange} book={book} />
        </div>
        <div className="book-title">{book.title}</div>
        {!!book.authors && !!book.authors.length && (
          <div className="book-authors">
            {book.authors.map((author, authorIndex) => (
              <p key={authorIndex}>{author}</p>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
  }),
  onShelfChange: PropTypes.func.isRequired,

}
