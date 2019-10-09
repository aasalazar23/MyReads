import React from "react";
import { BookShelf } from "./BookShelf";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: [],
      books: [],
    };
  }
  checkedBooks = (results) => {
    const shelvedBooks = this.props.shelvedBooks;
    const ids = shelvedBooks.map(book => book.id);

    if (results.error) {
      this.setState({ books: [] })
    } else {
      const books = results.map((result) => {
        if (ids.includes(result.id)) {
          return shelvedBooks.find(book => book.id === result.id)
        }
        return result;
      })
      this.setState({ books });
    }

  }

  handleQuery = event => {
    const { query } = this.state;
    console.log(query);
    const searchTerm = event.target.value;
    this.setState({ query: searchTerm });
    if (searchTerm) {
      BooksAPI.search(searchTerm).then(results => {
        this.checkedBooks(results);
        this.setState({ results: results });
      });
    } else {
        this.setState({ results: [] });
    }

  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleQuery}
            />
          </div>
        </div>

        <div className="search-books-results">
                {/* TODO: if shelved book in results, pass shelf to book render */}
          <BookShelf books={this.state.books} onShelfChange={this.props.onShelfChange}>Results</BookShelf>
        </div>
      </div>
    );
  }
}
