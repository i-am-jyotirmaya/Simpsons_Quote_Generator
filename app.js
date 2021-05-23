const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;
const NEW_QUOTE = 'new_quote';

const newQuote = (data) => ({
  type: NEW_QUOTE,
  data
});

const defaultState = {
  quote: '',
  author: '',
  image: '',
  left: true
}

const quoteReducer = (state = defaultState, action) => {
  console.warn(action)
  switch(action.type) {
      case NEW_QUOTE:
        return action.data;
    default:
      return state;
  }
}

const store = Redux.createStore(quoteReducer);

const App = () => {
  return (
    <main id="main">
      <AppName />
      <QuoteBoxConnected />
      <About />
    </main>
  );
}

const AppName = () => {
  return(
    <div id="head">
      Simpsons said...
    </div>
  );
}

const QuoteBox = (props) => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(async () => {
    const data = await fetchData();
    props.getNewQuote(data);
  }, []);
  const handleNewQuote = async () => {
    props.getNewQuote(defaultState);
   const data = await fetchData();
    props.getNewQuote(data);
  }
  const fetchData = async () => {
    setLoading(true);
    const data = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes').then(response => response.json());
    console.log(data);
    setLoading(false);
    return {
      quote: data[0].quote,
      image: data[0].image,
      author: data[0].character,
      left: data[0].characterDirection === "Right" ? false : true
    }
  }
  getTwitterLink = () => {
    return 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + props.quote + '" ' + props.author)
  }
  console.log(props);
  return(
    <div id="quote-box">
      <div id="quote" class={props.left ? 'left' : 'right'}>
        <img id="author-img" src={props.image}/>
        <div style={{flex: 1}}>
          <div id="text">
          {loading ? 'Thinking...' : props.quote}
          </div>
          <div id="author">
            {loading ? 'Wait!' :props.author}
          </div>
        </div>
      </div>
      <div id="control">
        <a id="tweet-quote" target="_top" href={getTwitterLink()}>
          <i class="fab fa-twitter"></i>
        </a> 
        <button onClick={handleNewQuote} id="new-quote">
          New Quote
        </button>
      </div>
    </div>
  );
}
const QuoteBoxConnected = connect((state) => {
  console.log(state);
  return state;
}, (dispatch) => {
  return {
    getNewQuote: (data) => {
      dispatch(newQuote(data))
    }
  }
})(QuoteBox);

const About = () => {
  return(
    <div id="about">
      Made By 
      <span class="name">Jyotirmaya Sahu</span>
    </div>
  );
}

ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));