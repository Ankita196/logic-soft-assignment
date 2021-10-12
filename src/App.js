import {useEffect, useState } from 'react';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft:500,
   
  },

  book: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'left',
    marginLeft: 24,
  },

  root1: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
   

  },
  iconButton: {
    padding: 10,
  },
  paper:{
width:430,
height:400,
BackgroundColor:"grey",
marginTop:30,
marginRight:600

  },
  divider: {
    height: 28,
    margin: 4,
  },
  books:{
marginLeft:40
  },
 
  div1: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  book1: {
    color: 'pink',
    fontSize: 40,
  },
  grid1: {
    marginLeft: 'auto',
    alignItems: 'center',
  },
  title:{
    fontSize:25,
    textAlign:'center',
    padding:20
  },
  App:{
    backgroundColor:"black"
  }
}));

function App() {
  const classes = useStyles();
 
  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);
  const getBookData = async () => {
    try {
      const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms');
      const actualData = await res.json();
      console.log(actualData.items);
      setBooks(actualData.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

  
  const searchHandler = (e) => {
    const val = e.target.value;
    setInput(val);
  };
  const search = (e) => {
    e.preventDefault();
    setBooks(
      books.filter((book) => {
        if (input == '') {
          return book;
        } else if (
          book.volumeInfo.title.toLowerCase().includes(input.toLowerCase()) 
        
        ) {
          return book;
        }
      })
    );
  };

  return (
    <div className={classes.App}>
      <br />
      <br />
      <br />
      <br />
      <div className={classes.root}>
        <div >
          <div>
            <Typography className={classes.book}>
             Book Search App
            </Typography>
          </div>
          <br/>
          <div>
            <Paper component="form" className={classes.root1}>
              <InputBase
                className={classes.input}
                placeholder="Search book here with title or author name"
                onChange={searchHandler}
              />

              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon onClick={search} />
              </IconButton>
            </Paper>
          </div>
        </div>
        <div>
        <br/><br/><br/>
            {books.map(book=>(
              <Grid xs={12} className={classes.books}>
                <Paper className={classes.paper} key={book.id}>
                  <div className=
                  {classes.books}>
              <Typography className=
              {classes.title}>{book.volumeInfo.title}</Typography>
              <Typography 
             > Content Version:{book.volumeInfo.contentVersion}</Typography>
              <Typography 
             > pageCount:{book.volumeInfo.pageCount}</Typography>
              <Typography 
             > sub title:{book.volumeInfo.subtitle}</Typography>
              <Typography 
             > publishedDate:{book.volumeInfo.publishedDate}</Typography>
              <Typography 
             >  publisher:{book.volumeInfo. publisher}</Typography>
            </div>
              </Paper>
              </Grid>
            ))}
            
        </div>
      </div>
    </div>
  );
}

export default App;
