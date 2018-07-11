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
        React.createElement(CheckOut, { start: this.state.start }),
        React.createElement(
          'div',
          null,
          React.createElement(
            'button',
            {
              className: 'btn',
              onClick: this.startProcess },
            'check out'
          )
        )
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
    key: 'render',
    value: function render() {
      var sections = [AccountCreation, Address, Payment];
      var Section = sections[this.state.index];

      return React.createElement(
        'div',
        { className: this.props.start ? '' : 'hide' },
        React.createElement(Section, { next: this.next, prev: this.prev })
      );
    }
  }]);

  return CheckOut;
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
      { onClick: props.prev },
      ' pre '
    ),
    React.createElement('input', { type: 'submit', onClick: props.next, value: props.nextTitle || 'next' })
  );
};

/*
 * Form
*/

var Form = function (_React$Component3) {
  _inherits(Form, _React$Component3);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this3 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this3.state = {};

    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    _this3.tracker = _this3.tracker.bind(_this3);
    return _this3;
  }

  _createClass(Form, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      console.log('form submitting is now working');
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
 * Account Creation
*/

var AccountCreation = function (_React$Component4) {
  _inherits(AccountCreation, _React$Component4);

  function AccountCreation(props) {
    _classCallCheck(this, AccountCreation);

    var _this4 = _possibleConstructorReturn(this, (AccountCreation.__proto__ || Object.getPrototypeOf(AccountCreation)).call(this, props));

    _this4.submit = _this4.submit.bind(_this4);

    _this4.state = {};
    return _this4;
  }

  _createClass(AccountCreation, [{
    key: 'submit',
    value: function submit(data) {
      console.log(data);
      this.props.next();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

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
              React.createElement('input', { type: 'text', name: 'name', onKeyUp: form.tracker }),
              React.createElement('input', { type: 'email', name: 'email', onKeyUp: form.tracker }),
              React.createElement('input', { type: 'password', name: 'password', onKeyUp: form.tracker }),
              React.createElement(CheckoutControls, { next: _this5.submit, prev: _this5.props.prev })
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

var Address = function (_React$Component5) {
  _inherits(Address, _React$Component5);

  function Address(props) {
    _classCallCheck(this, Address);

    var _this6 = _possibleConstructorReturn(this, (Address.__proto__ || Object.getPrototypeOf(Address)).call(this, props));

    _this6.submit = _this6.submit.bind(_this6);
    return _this6;
  }

  _createClass(Address, [{
    key: 'submit',
    value: function submit() {
      this.props.next();
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          ' Address Info '
        ),
        React.createElement(CheckoutControls, { next: this.submit, prev: this.props.prev })
      );
    }
  }]);

  return Address;
}(React.Component);

/*
 * Payment
*/

var Payment = function (_React$Component6) {
  _inherits(Payment, _React$Component6);

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
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          ' Payment Info '
        ),
        React.createElement(CheckoutControls, { next: this.submit, prev: this.props.prev, nextTitle: 'Purchase' })
      );
    }
  }]);

  return Payment;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJzdGFydCIsInN0YXJ0UHJvY2VzcyIsImJpbmQiLCJzZXRTdGF0ZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2hlY2tPdXQiLCJpbmRleCIsInByZXYiLCJuZXh0IiwibmV3SW5kZXgiLCJzZWN0aW9ucyIsIkFjY291bnRDcmVhdGlvbiIsIkFkZHJlc3MiLCJQYXltZW50IiwiU2VjdGlvbiIsIkNoZWNrb3V0Q29udHJvbHMiLCJuZXh0VGl0bGUiLCJGb3JtIiwiaGFuZGxlU3VibWl0IiwidHJhY2tlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjb25zb2xlIiwibG9nIiwic3VibWl0IiwiY3VycmVudFRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsIm5ld1N0YXRlIiwicmVuZGVyIiwiZGF0YSIsImZvcm0iLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQTs7OztJQUlNQSxHOzs7QUFDSixlQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEdBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxhQUFPO0FBREksS0FBYjs7QUFLQSxVQUFLQyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JDLElBQWxCLE9BQXBCO0FBUmlCO0FBU2xCOzs7O21DQUdjO0FBQ2IsV0FBS0MsUUFBTCxDQUFjLEVBQUVILE9BQU8sSUFBVCxFQUFkO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsNEJBQUMsUUFBRCxJQUFVLE9BQVEsS0FBS0QsS0FBTCxDQUFXQyxLQUE3QixHQURGO0FBRUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0UseUJBQVUsS0FEWjtBQUVFLHVCQUFVLEtBQUtDLFlBRmpCO0FBQUE7QUFBQTtBQURGO0FBRkYsT0FERjtBQVVEOzs7O0VBNUJl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QUtnQixNQUE3QixFQUFxQyxNQUFPLEtBQUszQixLQUFMLENBQVdVLElBQXZEO0FBRkYsT0FERjtBQU1EOzs7O0VBbEJtQkosTUFBTUMsUzs7QUFzQjVCOzs7O0lBSU1TLE87OztBQUNKLG1CQUFZaEIsS0FBWixFQUFtQjtBQUFBOztBQUFBLG1IQUNYQSxLQURXOztBQUdqQixXQUFLMkIsTUFBTCxHQUFjLE9BQUtBLE1BQUwsQ0FBWXZCLElBQVosUUFBZDtBQUhpQjtBQUlsQjs7Ozs2QkFFUTtBQUNQLFdBQUtKLEtBQUwsQ0FBV1csSUFBWDtBQUNEOzs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLDRCQUFDLGdCQUFELElBQWtCLE1BQU0sS0FBS2dCLE1BQTdCLEVBQXFDLE1BQU8sS0FBSzNCLEtBQUwsQ0FBV1UsSUFBdkQsRUFBOEQsV0FBVSxVQUF4RTtBQUZGLE9BREY7QUFNRDs7OztFQWxCbUJKLE1BQU1DLFM7O0FBdUI1QjRCLFNBQVNILE1BQVQsQ0FBaUIsb0JBQUMsR0FBRCxPQUFqQixFQUEwQkksU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUExQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4vKlxuICogQXBwXG4qL1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGFydDogZmFsc2VcbiAgICB9XG5cblxuICAgIHRoaXMuc3RhcnRQcm9jZXNzID0gdGhpcy5zdGFydFByb2Nlc3MuYmluZCh0aGlzKTtcbiAgfVxuXG5cbiAgc3RhcnRQcm9jZXNzKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzdGFydDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPENoZWNrT3V0IHN0YXJ0PXsgdGhpcy5zdGF0ZS5zdGFydCB9IC8+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0blwiXG4gICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5zdGFydFByb2Nlc3MgfT5jaGVjayBvdXQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuXG4vKlxuICogQ2hlY2sgT3V0XG4qL1xuXG5jbGFzcyBDaGVja091dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIFxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbmRleDogMFxuICAgIH1cblxuICAgIHRoaXMucHJldiA9IHRoaXMucHJldi5iaW5kKHRoaXMpO1xuICAgIHRoaXMubmV4dCA9IHRoaXMubmV4dC5iaW5kKHRoaXMpO1xuXG4gIH1cblxuICBuZXh0KCkge1xuICAgIHZhciBuZXdJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggKyAxO1xuICAgIFxuICAgIGlmIChuZXdJbmRleCA+IDIpeyBuZXdJbmRleCA9IDI7IH0gXG5cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5kZXg6IG5ld0luZGV4IH0pO1xuICB9XG5cbiAgcHJldigpIHtcbiAgICB2YXIgbmV3SW5kZXggPSB0aGlzLnN0YXRlLmluZGV4IC0gMTtcbiAgICBcbiAgICBpZiAobmV3SW5kZXggPCAwKXsgbmV3SW5kZXggPSAwOyB9IFxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGluZGV4OiBuZXdJbmRleCB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgc2VjdGlvbnMgPSBbQWNjb3VudENyZWF0aW9uLCBBZGRyZXNzLCBQYXltZW50IF07XG4gICAgdmFyIFNlY3Rpb24gPSBzZWN0aW9uc1sgdGhpcy5zdGF0ZS5pbmRleCBdO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5zdGFydCA/ICcnIDogJ2hpZGUnIH0+XG4gICAgICAgIDxTZWN0aW9uIG5leHQ9eyB0aGlzLm5leHQgfSBwcmV2PXsgdGhpcy5wcmV2IH0gLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG4vKlxuICogQ2hlY2sgT3V0IENvbnRyb2xzXG4qL1xuXG52YXIgQ2hlY2tvdXRDb250cm9scyA9IChwcm9wcykgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT0nY2hlY2tvdXQtY29udGludWF0aW9uJz5cbiAgICA8YnV0dG9uIG9uQ2xpY2s9eyBwcm9wcy5wcmV2IH0+IHByZSA8L2J1dHRvbj5cbiAgICA8aW5wdXQgdHlwZT0nc3VibWl0JyBvbkNsaWNrPXsgcHJvcHMubmV4dCB9IHZhbHVlPXsgKHByb3BzLm5leHRUaXRsZSB8fCAnbmV4dCcpIH0gLz5cbiAgPC9kaXY+XG4pXG5cblxuLypcbiAqIEZvcm1cbiovXG5cbmNsYXNzIEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7fTtcblxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRyYWNrZXIgPSB0aGlzLnRyYWNrZXIuYmluZCh0aGlzKTtcbiAgfVxuICBcbiAgaGFuZGxlU3VibWl0KGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZygnZm9ybSBzdWJtaXR0aW5nIGlzIG5vdyB3b3JraW5nJylcbiAgICB0aGlzLnByb3BzLnN1Ym1pdCggdGhpcy5zdGF0ZSApO1xuICB9XG5cbiAgdHJhY2tlcihldmVudCkge1xuICAgIHZhciB7bmFtZSwgdmFsdWV9ID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgIHZhciBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlWyBuYW1lIF0gPSB2YWx1ZTtcblxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17IHRoaXMuaGFuZGxlU3VibWl0IH0+XG4gICAgICAgIHt0aGlzLnByb3BzLnJlbmRlcih0aGlzKX1cbiAgICAgIDwvZm9ybT5cbiAgICApXG4gIH1cbn1cblxuXG4vKlxuICogQWNjb3VudCBDcmVhdGlvblxuKi9cblxuY2xhc3MgQWNjb3VudENyZWF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN1Ym1pdCA9IHRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cbiAgXG4gIHN1Ym1pdCggZGF0YSApIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIHRoaXMucHJvcHMubmV4dCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+IEFjY291bnQgQ3JlYXRpb24gPC9oMj5cblxuICAgICAgICA8Rm9ybSBzdWJtaXQ9eyB0aGlzLnN1Ym1pdCB9IHJlbmRlcj17KGZvcm0pID0+IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIiBvbktleVVwPXtmb3JtLnRyYWNrZXJ9IC8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIHsvKjxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJzdWJtaXRcIi8+Ki99XG4gICAgICAgICAgICA8Q2hlY2tvdXRDb250cm9scyBuZXh0PXt0aGlzLnN1Ym1pdH0gcHJldj17IHRoaXMucHJvcHMucHJldiB9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9IC8+XG4gICAgICAgIFxuXG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuLypcbiAqIEFkZHJlc3NcbiovXG5cbmNsYXNzIEFkZHJlc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3VibWl0ID0gdGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuICBcbiAgc3VibWl0KCkge1xuICAgIHRoaXMucHJvcHMubmV4dCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+IEFkZHJlc3MgSW5mbyA8L2gyPlxuICAgICAgICA8Q2hlY2tvdXRDb250cm9scyBuZXh0PXt0aGlzLnN1Ym1pdH0gcHJldj17IHRoaXMucHJvcHMucHJldiB9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuXG4vKlxuICogUGF5bWVudFxuKi9cblxuY2xhc3MgUGF5bWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdWJtaXQgPSB0aGlzLnN1Ym1pdC5iaW5kKHRoaXMpO1xuICB9XG4gIFxuICBzdWJtaXQoKSB7XG4gICAgdGhpcy5wcm9wcy5uZXh0KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMj4gUGF5bWVudCBJbmZvIDwvaDI+XG4gICAgICAgIDxDaGVja291dENvbnRyb2xzIG5leHQ9e3RoaXMuc3VibWl0fSBwcmV2PXsgdGhpcy5wcm9wcy5wcmV2IH0gbmV4dFRpdGxlPSdQdXJjaGFzZScgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cblxuUmVhY3RET00ucmVuZGVyKCA8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykgKTtcblxuIl19