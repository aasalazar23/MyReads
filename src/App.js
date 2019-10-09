import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BookShelf } from "./components/BookShelf";
import { Search } from "./components/Search";
class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showSearchPage: false,
    };
  }

  componentDidMount() {
    this.getBooks();
  }
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */

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
        {this.state.showSearchPage ? (
          <Search onShelfChange={this.handleShelfChange}/>
        ) : (
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
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
