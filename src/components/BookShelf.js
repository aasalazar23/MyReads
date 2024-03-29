import React from "react";
import { Book } from "./Book";

export const BookShelf = ({ books, children, onShelfChange }) => {
  if (!books.length) {
    return <p>nothing here yet</p>;
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{children}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book book={book} key={book.id} onShelfChange={onShelfChange} />
          ))}
        </ol>
      </div>
    </div>
  );
};
