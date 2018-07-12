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
        <CheckOut />
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
    this.sendProgress = this.sendProgress.bind(this);

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

  sendProgress(url, data) {
    return fetch( url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(function(results){
      return results.json();
    })
    .then(function(data) {
      console.log(data);
    })
    // .then(function(){
      // save state here?
    // })
  }

  render() {
    var sections = [CheckOutHome, AccountCreation, Address, Payment ];
    var Section = sections[ this.state.index ];

    return (
      <div>
        <Section next={ this.next } prev={ this.prev } sendProgress={ this.sendProgress } />
      </div>
    )
  }
}

var CheckOutHome = (props) => {
  var handleStartCheckout = () => {
    props
      .sendProgress('/f0', {})
      .then( ()=> props.next() );
  };

  return (
    <div>
      <h2> Ready to checkout? </h2>
      <button 
        className='btn'
        onClick={ handleStartCheckout }>check out</button>
    </div>
  )
};


/*
 * Account Creation
*/

class AccountCreation extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }
  
  submit( data ) {
    this.props.sendProgress('/f1', data)
    .then((data) => {
      this.props.next() 
    })
    
  }

  render() {
    var self = this;
    return (
      <div>
        <h2> Account Creation </h2>

        <Form submit={ this.submit } render={(form) => (
          <div>
            <div>
              <label htmlFor="name"> Name: </label>
              <input id="name" type="text" name="name" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="email"> Email: </label>
              <input id="email" type="email" name="email" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="password"> Password: </label>
              <input id="password" type="password" name="password" onKeyUp={form.tracker} />
            </div>
            <CheckoutControls next={self.props.next} prev={ self.props.prev } />
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

        <Form submit={ this.submit } render={(form) => (
          <div>
            <div>
              <label htmlFor="line1"> address 1: </label>
              <input id="line1" type="text" name="line1" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="line2"> address 2: </label>
              <input id="line2" type="text" name="line2" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="city"> City: </label>
              <input id="city" type="text" name="city" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="state"> State: </label>
              <input id="state" type="text" name="state" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="zipCode"> Zip code: </label>
              <input id="zipCode" type="text" name="zipCode" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="number"> Phone number: </label>
              <input id="number" type="text" name="number" onKeyUp={form.tracker} />
            </div>
            <CheckoutControls prev={ this.props.prev } />
          </div>
        )} />

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

        <Form submit={ this.submit } render={(form) => (
          <div>
            <div>
              <label htmlFor="cardNumber"> Card number: </label>
              <input id="cardNumber" type="text" name="cardNumber" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="expiryDate"> Expiry date: </label>
              <input id="expiryDate" type="text" name="expiryDate" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="cvv"> cvv: </label>
              <input id="cvv" type="text" name="cvv" onKeyUp={form.tracker} />
            </div>
            <div>
              <label htmlFor="billingZipCode"> Billing zip code: </label>
              <input id="billingZipCode" type="text" name="billingZipCode" onKeyUp={form.tracker} />
            </div>
            <CheckoutControls prev={ this.props.prev } />
          </div>
        )} />

      </div>
    )
  }
}

/*
 * Check Out Controls
*/

var CheckoutControls = (props) => (
  <div className='checkout-continuation'>
    <button type='button' onClick={ props.prev }> pre </button>
    <input type='submit' value={ (props.nextTitle || 'next') } />
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
 * Helper Functions
*/

ReactDOM.render( <App />, document.getElementById('app') );

