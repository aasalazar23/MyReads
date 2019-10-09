import React from "react";
import { BookShelfChanger } from "./BookShelfChanger";

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
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            }}
          ></div>
          <BookShelfChanger onShelfChange={onShelfChange} book={book} />
        </div>
        <div className="book-title">{book.title}</div>
        {!!book.authors && !!book.authors.length && (
          <div className="book-authors">
            {book.authors.map(author => (
              <p>{author}</p>
            ))}
          </div>
        )}
      </div>
    </li>
  );
};
