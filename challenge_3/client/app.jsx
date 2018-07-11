


/*
 * App
*/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false
    }


    this.startProcess = this.startProcess.bind(this);
  }


  startProcess() {
    this.setState({ start: true });
  }

  render() {
    return (
      <div>
        <CheckOut start={ this.state.start } />
        <div>
          <button 
            className="btn"
            onClick={ this.startProcess }>check out</button>
        </div>
      </div>
    )
  }
}


/*
 * Check Out
*/

class CheckOut extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    }

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);

  }

  next() {
    var newIndex = this.state.index + 1;
    
    if (newIndex > 2){ newIndex = 2; } 

    this.setState({ index: newIndex });
  }

  prev() {
    var newIndex = this.state.index - 1;
    
    if (newIndex < 0){ newIndex = 0; } 

    this.setState({ index: newIndex });
  }

  render() {
    var sections = [AccountCreation, Address, Payment ];
    var Section = sections[ this.state.index ];

    return (
      <div className={ this.props.start ? '' : 'hide' }>
        <Section next={ this.next } prev={ this.prev } />
      </div>
    )
  }
}

/*
 * Check Out Controls
*/

var CheckoutControls = (props) => (
  <div className='checkout-continuation'>
    <button onClick={ props.prev }> pre </button>
    <input type='submit' onClick={ props.next } value={ (props.nextTitle || 'next') } />
  </div>
)


/*
 * Form
*/

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.tracker = this.tracker.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    console.log('form submitting is now working')
    this.props.submit( this.state );
  }

  tracker(event) {
    var {name, value} = event.currentTarget;

    var newState = {};
    newState[ name ] = value;

    this.setState(newState);
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        {this.props.render(this)}
      </form>
    )
  }
}


/*
 * Account Creation
*/

class AccountCreation extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.state = {};
  }
  
  submit( data ) {
    console.log(data)
    this.props.next();
  }

  render() {
    return (
      <div>
        <h2> Account Creation </h2>

        <Form submit={ this.submit } render={(form) => (
          <div>
            <input type="text" name="name" onKeyUp={form.tracker} />
            <input type="email" name="email" onKeyUp={form.tracker} />
            <input type="password" name="password" onKeyUp={form.tracker} />
            {/*<input type="submit" value="submit"/>*/}
            <CheckoutControls next={this.submit} prev={ this.props.prev } />
          </div>
        )} />
        

      </div>
    )
  }
}

/*
 * Address
*/

class Address extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }
  
  submit() {
    this.props.next();
  }

  render() {
    return (
      <div>
        <h2> Address Info </h2>
        <CheckoutControls next={this.submit} prev={ this.props.prev } />
      </div>
    )
  }
}


/*
 * Payment
*/

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }
  
  submit() {
    this.props.next();
  }

  render() {
    return (
      <div>
        <h2> Payment Info </h2>
        <CheckoutControls next={this.submit} prev={ this.props.prev } nextTitle='Purchase' />
      </div>
    )
  }
}



ReactDOM.render( <App />, document.getElementById('app') );

