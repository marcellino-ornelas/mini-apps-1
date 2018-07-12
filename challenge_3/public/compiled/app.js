'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * App
*/

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      start: false
    };

    _this.startProcess = _this.startProcess.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'startProcess',
    value: function startProcess() {
      this.setState({ start: true });
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(CheckOut, null)
      );
    }
  }]);

  return App;
}(React.Component);

/*
 * Check Out
*/

var CheckOut = function (_React$Component2) {
  _inherits(CheckOut, _React$Component2);

  function CheckOut(props) {
    _classCallCheck(this, CheckOut);

    var _this2 = _possibleConstructorReturn(this, (CheckOut.__proto__ || Object.getPrototypeOf(CheckOut)).call(this, props));

    _this2.state = {
      index: 0
    };

    _this2.prev = _this2.prev.bind(_this2);
    _this2.next = _this2.next.bind(_this2);
    _this2.sendProgress = _this2.sendProgress.bind(_this2);

    return _this2;
  }

  _createClass(CheckOut, [{
    key: 'next',
    value: function next() {
      var newIndex = this.state.index + 1;

      if (newIndex > 2) {
        newIndex = 2;
      }

      this.setState({ index: newIndex });
    }
  }, {
    key: 'prev',
    value: function prev() {
      var newIndex = this.state.index - 1;

      if (newIndex < 0) {
        newIndex = 0;
      }

      this.setState({ index: newIndex });
    }
  }, {
    key: 'sendProgress',
    value: function sendProgress(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      }).then(function (results) {
        return results.json();
      }).then(function (data) {
        console.log(data);
      });
      // .then(function(){
      // save state here?
      // })
    }
  }, {
    key: 'render',
    value: function render() {
      var sections = [CheckOutHome, AccountCreation, Address, Payment];
      var Section = sections[this.state.index];

      return React.createElement(
        'div',
        null,
        React.createElement(Section, { next: this.next, prev: this.prev, sendProgress: this.sendProgress })
      );
    }
  }]);

  return CheckOut;
}(React.Component);

var CheckOutHome = function CheckOutHome(props) {
  var handleStartCheckout = function handleStartCheckout() {
    props.sendProgress('/f0', {}).then(function () {
      return props.next();
    });
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h2',
      null,
      ' Ready to checkout? '
    ),
    React.createElement(
      'button',
      {
        className: 'btn',
        onClick: handleStartCheckout },
      'check out'
    )
  );
};

/*
 * Account Creation
*/

var AccountCreation = function (_React$Component3) {
  _inherits(AccountCreation, _React$Component3);

  function AccountCreation(props) {
    _classCallCheck(this, AccountCreation);

    var _this3 = _possibleConstructorReturn(this, (AccountCreation.__proto__ || Object.getPrototypeOf(AccountCreation)).call(this, props));

    _this3.submit = _this3.submit.bind(_this3);
    return _this3;
  }

  _createClass(AccountCreation, [{
    key: 'submit',
    value: function submit(data) {
      var _this4 = this;

      this.props.sendProgress('/f1', data).then(function (data) {
        _this4.props.next();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          ' Account Creation '
        ),
        React.createElement(Form, { submit: this.submit, render: function render(form) {
            return React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'name' },
                  ' Name: '
                ),
                React.createElement('input', { id: 'name', type: 'text', name: 'name', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'email' },
                  ' Email: '
                ),
                React.createElement('input', { id: 'email', type: 'email', name: 'email', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'password' },
                  ' Password: '
                ),
                React.createElement('input', { id: 'password', type: 'password', name: 'password', onKeyUp: form.tracker })
              ),
              React.createElement(CheckoutControls, { next: self.props.next, prev: self.props.prev })
            );
          } })
      );
    }
  }]);

  return AccountCreation;
}(React.Component);

/*
 * Address
*/

var Address = function (_React$Component4) {
  _inherits(Address, _React$Component4);

  function Address(props) {
    _classCallCheck(this, Address);

    var _this5 = _possibleConstructorReturn(this, (Address.__proto__ || Object.getPrototypeOf(Address)).call(this, props));

    _this5.submit = _this5.submit.bind(_this5);
    return _this5;
  }

  _createClass(Address, [{
    key: 'submit',
    value: function submit() {
      this.props.next();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          ' Address Info '
        ),
        React.createElement(Form, { submit: this.submit, render: function render(form) {
            return React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'line1' },
                  ' address 1: '
                ),
                React.createElement('input', { id: 'line1', type: 'text', name: 'line1', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'line2' },
                  ' address 2: '
                ),
                React.createElement('input', { id: 'line2', type: 'text', name: 'line2', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'city' },
                  ' City: '
                ),
                React.createElement('input', { id: 'city', type: 'text', name: 'city', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'state' },
                  ' State: '
                ),
                React.createElement('input', { id: 'state', type: 'text', name: 'state', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'zipCode' },
                  ' Zip code: '
                ),
                React.createElement('input', { id: 'zipCode', type: 'text', name: 'zipCode', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'number' },
                  ' Phone number: '
                ),
                React.createElement('input', { id: 'number', type: 'text', name: 'number', onKeyUp: form.tracker })
              ),
              React.createElement(CheckoutControls, { prev: _this6.props.prev })
            );
          } })
      );
    }
  }]);

  return Address;
}(React.Component);

/*
 * Payment
*/

var Payment = function (_React$Component5) {
  _inherits(Payment, _React$Component5);

  function Payment(props) {
    _classCallCheck(this, Payment);

    var _this7 = _possibleConstructorReturn(this, (Payment.__proto__ || Object.getPrototypeOf(Payment)).call(this, props));

    _this7.submit = _this7.submit.bind(_this7);
    return _this7;
  }

  _createClass(Payment, [{
    key: 'submit',
    value: function submit() {
      this.props.next();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          ' Payment Info '
        ),
        React.createElement(Form, { submit: this.submit, render: function render(form) {
            return React.createElement(
              'div',
              null,
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'cardNumber' },
                  ' Card number: '
                ),
                React.createElement('input', { id: 'cardNumber', type: 'text', name: 'cardNumber', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'expiryDate' },
                  ' Expiry date: '
                ),
                React.createElement('input', { id: 'expiryDate', type: 'text', name: 'expiryDate', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'cvv' },
                  ' cvv: '
                ),
                React.createElement('input', { id: 'cvv', type: 'text', name: 'cvv', onKeyUp: form.tracker })
              ),
              React.createElement(
                'div',
                null,
                React.createElement(
                  'label',
                  { htmlFor: 'billingZipCode' },
                  ' Billing zip code: '
                ),
                React.createElement('input', { id: 'billingZipCode', type: 'text', name: 'billingZipCode', onKeyUp: form.tracker })
              ),
              React.createElement(CheckoutControls, { prev: _this8.props.prev })
            );
          } })
      );
    }
  }]);

  return Payment;
}(React.Component);

/*
 * Check Out Controls
*/

var CheckoutControls = function CheckoutControls(props) {
  return React.createElement(
    'div',
    { className: 'checkout-continuation' },
    React.createElement(
      'button',
      { type: 'button', onClick: props.prev },
      ' pre '
    ),
    React.createElement('input', { type: 'submit', value: props.nextTitle || 'next' })
  );
};

/*
 * Form
*/

var Form = function (_React$Component6) {
  _inherits(Form, _React$Component6);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this9 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this9.state = {};

    _this9.handleSubmit = _this9.handleSubmit.bind(_this9);
    _this9.tracker = _this9.tracker.bind(_this9);
    return _this9;
  }

  _createClass(Form, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      this.props.submit(this.state);
    }
  }, {
    key: 'tracker',
    value: function tracker(event) {
      var _event$currentTarget = event.currentTarget,
          name = _event$currentTarget.name,
          value = _event$currentTarget.value;


      var newState = {};
      newState[name] = value;

      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        this.props.render(this)
      );
    }
  }]);

  return Form;
}(React.Component);

/*
 * Helper Functions
*/

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJzdGFydCIsInN0YXJ0UHJvY2VzcyIsImJpbmQiLCJzZXRTdGF0ZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2hlY2tPdXQiLCJpbmRleCIsInByZXYiLCJuZXh0Iiwic2VuZFByb2dyZXNzIiwibmV3SW5kZXgiLCJ1cmwiLCJkYXRhIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiY3JlZGVudGlhbHMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXN1bHRzIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJzZWN0aW9ucyIsIkNoZWNrT3V0SG9tZSIsIkFjY291bnRDcmVhdGlvbiIsIkFkZHJlc3MiLCJQYXltZW50IiwiU2VjdGlvbiIsImhhbmRsZVN0YXJ0Q2hlY2tvdXQiLCJzdWJtaXQiLCJzZWxmIiwiZm9ybSIsInRyYWNrZXIiLCJDaGVja291dENvbnRyb2xzIiwibmV4dFRpdGxlIiwiRm9ybSIsImhhbmRsZVN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwibmFtZSIsInZhbHVlIiwibmV3U3RhdGUiLCJyZW5kZXIiLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztJQUlNQSxHOzs7QUFDSixlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEdBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxhQUFPO0FBREksS0FBYjs7QUFLQSxVQUFLQyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JDLElBQWxCLE9BQXBCO0FBUmlCO0FBU2xCOzs7O21DQUdjO0FBQ2IsV0FBS0MsUUFBTCxDQUFjLEVBQUVILE9BQU8sSUFBVCxFQUFkO0FBQ0Q7Ozs2QkFFUTs7QUFFUCxhQUNFO0FBQUE7QUFBQTtBQUNF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LFdBQUtrQyxPQUFMLEdBQWUsT0FBS0EsT0FBTCxDQUFhbEMsSUFBYixRQUFmO0FBTmlCO0FBT2xCOzs7O2lDQUVZdUMsSyxFQUFPO0FBQ2xCQSxZQUFNQyxjQUFOOztBQUVBLFdBQUs1QyxLQUFMLENBQVdtQyxNQUFYLENBQW1CLEtBQUtsQyxLQUF4QjtBQUNEOzs7NEJBRU8wQyxLLEVBQU87QUFBQSxpQ0FDT0EsTUFBTUUsYUFEYjtBQUFBLFVBQ1JDLElBRFEsd0JBQ1JBLElBRFE7QUFBQSxVQUNGQyxLQURFLHdCQUNGQSxLQURFOzs7QUFHYixVQUFJQyxXQUFXLEVBQWY7QUFDQUEsZUFBVUYsSUFBVixJQUFtQkMsS0FBbkI7O0FBRUEsV0FBSzFDLFFBQUwsQ0FBYzJDLFFBQWQ7QUFDRDs7OzZCQUVRO0FBQ1AsYUFDRTtBQUFBO0FBQUEsVUFBTSxVQUFXLEtBQUtOLFlBQXRCO0FBQ0csYUFBSzFDLEtBQUwsQ0FBV2lELE1BQVgsQ0FBa0IsSUFBbEI7QUFESCxPQURGO0FBS0Q7Ozs7RUEvQmdCM0MsTUFBTUMsUzs7QUFtQ3pCOzs7O0FBSUEyQyxTQUFTRCxNQUFULENBQWlCLG9CQUFDLEdBQUQsT0FBakIsRUFBMEJFLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBMUIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEFwcFxuKi9cblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc3RhcnQ6IGZhbHNlXG4gICAgfVxuXG5cbiAgICB0aGlzLnN0YXJ0UHJvY2VzcyA9IHRoaXMuc3RhcnRQcm9jZXNzLmJpbmQodGhpcyk7XG4gIH1cblxuXG4gIHN0YXJ0UHJvY2VzcygpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc3RhcnQ6IHRydWUgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPENoZWNrT3V0IC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuXG4vKlxuICogQ2hlY2sgT3V0XG4qL1xuXG5jbGFzcyBDaGVja091dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbmRleDogMFxuICAgIH1cblxuICAgIHRoaXMucHJldiA9IHRoaXMucHJldi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV4dCA9IHRoaXMubmV4dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc2VuZFByb2dyZXNzID0gdGhpcy5zZW5kUHJvZ3Jlc3MuYmluZCh0aGlzKTtcblxuICB9XG5cbiAgbmV4dCgpIHtcbiAgICB2YXIgbmV3SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4ICsgMTtcbiAgICBcbiAgICBpZiAobmV3SW5kZXggPiAyKXsgbmV3SW5kZXggPSAyOyB9IFxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGluZGV4OiBuZXdJbmRleCB9KTtcbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgdmFyIG5ld0luZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCAtIDE7XG4gICAgXG4gICAgaWYgKG5ld0luZGV4IDwgMCl7IG5ld0luZGV4ID0gMDsgfSBcblxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbmRleDogbmV3SW5kZXggfSk7XG4gIH1cblxuICBzZW5kUHJvZ3Jlc3ModXJsLCBkYXRhKSB7XG4gICAgcmV0dXJuIGZldGNoKCB1cmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbihyZXN1bHRzKXtcbiAgICAgIHJldHVybiByZXN1bHRzLmpzb24oKTtcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pXG4gICAgLy8gLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgIC8vIHNhdmUgc3RhdGUgaGVyZT9cbiAgICAvLyB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzZWN0aW9ucyA9IFtDaGVja091dEhvbWUsIEFjY291bnRDcmVhdGlvbiwgQWRkcmVzcywgUGF5bWVudCBdO1xuICAgIHZhciBTZWN0aW9uID0gc2VjdGlvbnNbIHRoaXMuc3RhdGUuaW5kZXggXTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U2VjdGlvbiBuZXh0PXsgdGhpcy5uZXh0IH0gcHJldj17IHRoaXMucHJldiB9IHNlbmRQcm9ncmVzcz17IHRoaXMuc2VuZFByb2dyZXNzIH0gLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG52YXIgQ2hlY2tPdXRIb21lID0gKHByb3BzKSA9PiB7XG4gIHZhciBoYW5kbGVTdGFydENoZWNrb3V0ID0gKCkgPT4ge1xuICAgIHByb3BzXG4gICAgICAuc2VuZFByb2dyZXNzKCcvZjAnLCB7fSlcbiAgICAgIC50aGVuKCAoKT0+IHByb3BzLm5leHQoKSApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMj4gUmVhZHkgdG8gY2hlY2tvdXQ/IDwvaDI+XG4gICAgICA8YnV0dG9uIFxuICAgICAgICBjbGFzc05hbWU9J2J0bidcbiAgICAgICAgb25DbGljaz17IGhhbmRsZVN0YXJ0Q2hlY2tvdXQgfT5jaGVjayBvdXQ8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKVxufTtcblxuXG4vKlxuICogQWNjb3VudCBDcmVhdGlvblxuKi9cblxuY2xhc3MgQWNjb3VudENyZWF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN1Ym1pdCA9IHRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG4gIH1cbiAgXG4gIHN1Ym1pdCggZGF0YSApIHtcbiAgICB0aGlzLnByb3BzLnNlbmRQcm9ncmVzcygnL2YxJywgZGF0YSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5uZXh0KCkgXG4gICAgfSlcbiAgICBcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj4gQWNjb3VudCBDcmVhdGlvbiA8L2gyPlxuXG4gICAgICAgIDxGb3JtIHN1Ym1pdD17IHRoaXMuc3VibWl0IH0gcmVuZGVyPXsoZm9ybSkgPT4gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cIm5hbWVcIj4gTmFtZTogPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGlkPVwibmFtZVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBvbktleVVwPXtmb3JtLnRyYWNrZXJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZW1haWxcIj4gRW1haWw6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCI+IFBhc3N3b3JkOiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPENoZWNrb3V0Q29udHJvbHMgbmV4dD17c2VsZi5wcm9wcy5uZXh0fSBwcmV2PXsgc2VsZi5wcm9wcy5wcmV2IH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX0gLz5cbiAgICAgICAgXG5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG4vKlxuICogQWRkcmVzc1xuKi9cblxuY2xhc3MgQWRkcmVzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdWJtaXQgPSB0aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuICB9XG4gIFxuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5wcm9wcy5uZXh0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj4gQWRkcmVzcyBJbmZvIDwvaDI+XG5cbiAgICAgICAgPEZvcm0gc3VibWl0PXsgdGhpcy5zdWJtaXQgfSByZW5kZXI9eyhmb3JtKSA9PiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibGluZTFcIj4gYWRkcmVzcyAxOiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJsaW5lMVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxpbmUxXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImxpbmUyXCI+IGFkZHJlc3MgMjogPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGlkPVwibGluZTJcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJsaW5lMlwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJjaXR5XCI+IENpdHk6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNpdHlcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjaXR5XCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInN0YXRlXCI+IFN0YXRlOiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJzdGF0ZVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInN0YXRlXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInppcENvZGVcIj4gWmlwIGNvZGU6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cInppcENvZGVcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJ6aXBDb2RlXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cIm51bWJlclwiPiBQaG9uZSBudW1iZXI6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cIm51bWJlclwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm51bWJlclwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPENoZWNrb3V0Q29udHJvbHMgcHJldj17IHRoaXMucHJvcHMucHJldiB9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9IC8+XG5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cbi8qXG4gKiBQYXltZW50XG4qL1xuXG5jbGFzcyBQYXltZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN1Ym1pdCA9IHRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG4gIH1cbiAgXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLnByb3BzLm5leHQoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyPiBQYXltZW50IEluZm8gPC9oMj5cblxuICAgICAgICA8Rm9ybSBzdWJtaXQ9eyB0aGlzLnN1Ym1pdCB9IHJlbmRlcj17KGZvcm0pID0+IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJjYXJkTnVtYmVyXCI+IENhcmQgbnVtYmVyOiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjYXJkTnVtYmVyXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiY2FyZE51bWJlclwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJleHBpcnlEYXRlXCI+IEV4cGlyeSBkYXRlOiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJleHBpcnlEYXRlXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiZXhwaXJ5RGF0ZVwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJjdnZcIj4gY3Z2OiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJjdnZcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjdnZcIiBvbktleVVwPXtmb3JtLnRyYWNrZXJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiYmlsbGluZ1ppcENvZGVcIj4gQmlsbGluZyB6aXAgY29kZTogPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGlkPVwiYmlsbGluZ1ppcENvZGVcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJiaWxsaW5nWmlwQ29kZVwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPENoZWNrb3V0Q29udHJvbHMgcHJldj17IHRoaXMucHJvcHMucHJldiB9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9IC8+XG5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG4vKlxuICogQ2hlY2sgT3V0IENvbnRyb2xzXG4qL1xuXG52YXIgQ2hlY2tvdXRDb250cm9scyA9IChwcm9wcykgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT0nY2hlY2tvdXQtY29udGludWF0aW9uJz5cbiAgICA8YnV0dG9uIHR5cGU9J2J1dHRvbicgb25DbGljaz17IHByb3BzLnByZXYgfT4gcHJlIDwvYnV0dG9uPlxuICAgIDxpbnB1dCB0eXBlPSdzdWJtaXQnIHZhbHVlPXsgKHByb3BzLm5leHRUaXRsZSB8fCAnbmV4dCcpIH0gLz5cbiAgPC9kaXY+XG4pXG5cblxuLypcbiAqIEZvcm1cbiovXG5cbmNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7fTtcblxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRyYWNrZXIgPSB0aGlzLnRyYWNrZXIuYmluZCh0aGlzKTtcbiAgfVxuICBcbiAgaGFuZGxlU3VibWl0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMucHJvcHMuc3VibWl0KCB0aGlzLnN0YXRlICk7XG4gIH1cblxuICB0cmFja2VyKGV2ZW50KSB7XG4gICAgdmFyIHtuYW1lLCB2YWx1ZX0gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgdmFyIG5ld1N0YXRlID0ge307XG4gICAgbmV3U3RhdGVbIG5hbWUgXSA9IHZhbHVlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxmb3JtIG9uU3VibWl0PXsgdGhpcy5oYW5kbGVTdWJtaXQgfT5cbiAgICAgICAge3RoaXMucHJvcHMucmVuZGVyKHRoaXMpfVxuICAgICAgPC9mb3JtPlxuICAgIClcbiAgfVxufVxuXG5cbi8qXG4gKiBIZWxwZXIgRnVuY3Rpb25zXG4qL1xuXG5SZWFjdERPTS5yZW5kZXIoIDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSApO1xuXG4iXX0=