import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

class BookList extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      books: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState( { isLoading: true } );

    fetch( 'api/books' )
      .then( response => response.json() )
      .then( data => this.setState( { books: data, isLoading: false } ) );

  }

  removeBook = async ( id ) => {
    await fetch( `/api/book/${ id }`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    } )
    console.log( 'Remove done!' );
    //update inventory state minus removed item
    let updatedBooks = [ ...this.state.books ].filter( i => i._id !== id );
    this.setState( { books: updatedBooks } );
  }

  render() {
    const { books, isLoading } = this.state;

    if ( isLoading ) {
      return <p>Loading...</p>;
    }

    const bookList = books.map( book => {
      return <tr key={book._id}>
        {/* <td style={{ whiteSpace: 'nowrap' }}>{book.id}</td> */}
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>
          <ButtonGroup>
            <Button
              size='sm'
              color='info'
              tag={Link}
              to={'/books/' + book._id}
            >
              Edit
            </Button>
            <Button
              size='sm'
              color='warning'
              onClick={() => this.removeBook( book._id )}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    } )
    return (
      <div>
        <Container fluid>
          <div className='float-right'>
            <Button
              color='primary'
              className='my-4'
              tag={Link}
              to='/books/new'
            >
              Add Book
            </Button>
            <h3>Book List</h3>
            <Table className='mt-4'>
              <thead>
                <tr style={{ borderBottom: '1.2pt solid black' }}>
                  <th width='20%'>Book Title</th>
                  <th width='15%'>Author</th>
                  <th width='15%'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookList}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    )
  }
}

export default BookList;