import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BookShelf } from "./components/BookShelf";
import { Search } from "./components/Search";
import { Route, Link } from "react-router-dom";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  filteredBooks = shelf => {
    const books = this.state.books;
    const filteredBooks = books.filter(book => book.shelf === shelf);
    return filteredBooks;
  };

  getBooks = () => {
    BooksAPI.getAll().then(response => this.setState({ books: response }));
  };

  handleShelfChange = (event, book) => {
    const { books } = this.state;
    // filters out book to be updated, updated book pushed to list
    const updatedBooks = books.filter(b => b.id !== book.id);

    const shelf = event.target.value;
    book.shelf = shelf;
    updatedBooks.push(book);

    this.setState({ books: updatedBooks });
    BooksAPI.update(book, shelf);
  };
  render() {
    return (
      <div className="app">
        <Route exact path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    books={this.filteredBooks("currentlyReading")}
                    onShelfChange={this.handleShelfChange}
                  >
                    Currently Reading
                  </BookShelf>
                  <BookShelf
                    books={this.filteredBooks("wantToRead")}
                    onShelfChange={this.handleShelfChange}
                  >
                    Want to Read
                  </BookShelf>
                  <BookShelf
                    books={this.filteredBooks("read")}
                    onShelfChange={this.handleShelfChange}
                  >
                    Read
                  </BookShelf>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search' className="search-button">Add a Book</Link>
              </div>
            </div>
          )}
        />
        <Route path="/search"
          render={({ history }) => (
            <Search
              shelvedBooks={this.state.books}
              onShelfChange={this.handleShelfChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
