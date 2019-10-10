import React from "react";
import { BookShelf } from "./BookShelf";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      books: [],
    };
  }
  checkedBooks = results => {
    const shelvedBooks = this.props.shelvedBooks;
    const ids = shelvedBooks.map(book => book.id);

    if (!results || results.error) {
      this.setState({ books: [] });
    } else {
      const books = results.map(result => {
        if (ids.includes(result.id)) {
          return shelvedBooks.find(book => book.id === result.id);
        }
        return result;
      });
      this.setState({ books });
    }
  };

  handleQuery = event => {
    const searchTerm = event.target.value;
    this.setState({ query: searchTerm }, () => {
      const { query } = this.state;
      if (query) {
        BooksAPI.search(query).then(results => {
          this.checkedBooks(results);
        });
      } else {
        this.setState({ books: [] });
      }
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleQuery}
            />
          </div>
        </div>

        <div className="search-books-results">
          <BookShelf
            books={this.state.books}
            onShelfChange={this.props.onShelfChange}
          >
            Results
          </BookShelf>
        </div>
      </div>
    );
  }
}
