import React from "react";
import {BookShelfChanger} from './BookShelfChanger';

export const Book = ({book}) => (
  <li>
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url("${book.imageLinks.thumbnail}")`,
          }}
        ></div>
        <BookShelfChanger />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors[0]}</div>
    </div>
  </li>
);
