"use strict";

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
    key: "startProcess",
    value: function startProcess() {
      this.setState({ start: true });
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
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

    return _this2;
  }

  _createClass(CheckOut, [{
    key: "next",
    value: function next() {
      var newIndex = this.state.index + 1;

      if (newIndex > 2) {
        newIndex = 2;
      }

      this.setState({ index: newIndex });
    }
  }, {
    key: "prev",
    value: function prev() {
      var newIndex = this.state.index - 1;

      if (newIndex < 0) {
        newIndex = 0;
      }

      this.setState({ index: newIndex });
    }
  }, {
    key: "render",
    value: function render() {
      var sections = [CheckOutHome, AccountCreation, Address, Payment];
      var Section = sections[this.state.index];

      return React.createElement(
        "div",
        null,
        React.createElement(Section, { next: this.next, prev: this.prev })
      );
    }
  }]);

  return CheckOut;
}(React.Component);

var CheckOutHome = function CheckOutHome(props) {
  var handleStartCheckout = function handleStartCheckout() {
    props.next();
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "h2",
      null,
      " Ready to checkout? "
    ),
    React.createElement(
      "button",
      {
        className: "btn",
        onClick: handleStartCheckout },
      "check out"
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
    key: "submit",
    value: function submit(data) {
      this.props.next();
    }
  }, {
    key: "render",
    value: function render() {
      var self = this;
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          " Account Creation "
        ),
        React.createElement(Form, { submit: this.submit, render: function render(form) {
            return React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "name" },
                  " Name: "
                ),
                React.createElement("input", { id: "name", type: "text", name: "name", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "email" },
                  " Email: "
                ),
                React.createElement("input", { id: "email", type: "email", name: "email", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "password" },
                  " Password: "
                ),
                React.createElement("input", { id: "password", type: "password", name: "password", onKeyUp: form.tracker })
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

    var _this4 = _possibleConstructorReturn(this, (Address.__proto__ || Object.getPrototypeOf(Address)).call(this, props));

    _this4.submit = _this4.submit.bind(_this4);
    return _this4;
  }

  _createClass(Address, [{
    key: "submit",
    value: function submit() {
      this.props.next();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          " Address Info "
        ),
        React.createElement(Form, { submit: this.submit, render: function render(form) {
            return React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "line1" },
                  " address 1: "
                ),
                React.createElement("input", { id: "line1", type: "text", name: "line1", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "line2" },
                  " address 2: "
                ),
                React.createElement("input", { id: "line2", type: "text", name: "line2", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "city" },
                  " City: "
                ),
                React.createElement("input", { id: "city", type: "text", name: "city", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "state" },
                  " State: "
                ),
                React.createElement("input", { id: "state", type: "text", name: "state", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "zipCode" },
                  " Zip code: "
                ),
                React.createElement("input", { id: "zipCode", type: "text", name: "zipCode", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "number" },
                  " Phone number: "
                ),
                React.createElement("input", { id: "number", type: "text", name: "number", onKeyUp: form.tracker })
              ),
              React.createElement(CheckoutControls, { prev: _this5.props.prev })
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

    var _this6 = _possibleConstructorReturn(this, (Payment.__proto__ || Object.getPrototypeOf(Payment)).call(this, props));

    _this6.submit = _this6.submit.bind(_this6);
    return _this6;
  }

  _createClass(Payment, [{
    key: "submit",
    value: function submit() {
      this.props.next();
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          " Payment Info "
        ),
        React.createElement(Form, { submit: this.submit, render: function render(form) {
            return React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "cardNumber" },
                  " Card number: "
                ),
                React.createElement("input", { id: "cardNumber", type: "text", name: "cardNumber", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "expiryDate" },
                  " Expiry date: "
                ),
                React.createElement("input", { id: "expiryDate", type: "text", name: "expiryDate", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "cvv" },
                  " cvv: "
                ),
                React.createElement("input", { id: "cvv", type: "text", name: "cvv", onKeyUp: form.tracker })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  { htmlFor: "billingZipCode" },
                  " Billing zip code: "
                ),
                React.createElement("input", { id: "billingZipCode", type: "text", name: "billingZipCode", onKeyUp: form.tracker })
              ),
              React.createElement(CheckoutControls, { prev: _this7.props.prev })
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
    "div",
    { className: "checkout-continuation" },
    React.createElement(
      "button",
      { type: "button", onClick: props.prev },
      " pre "
    ),
    React.createElement("input", { type: "submit", value: props.nextTitle || 'next' })
  );
};

/*
 * Form
*/

var Form = function (_React$Component6) {
  _inherits(Form, _React$Component6);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this8 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this8.state = {};

    _this8.handleSubmit = _this8.handleSubmit.bind(_this8);
    _this8.tracker = _this8.tracker.bind(_this8);
    return _this8;
  }

  _createClass(Form, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();

      this.props.submit(this.state);
    }
  }, {
    key: "tracker",
    value: function tracker(event) {
      var _event$currentTarget = event.currentTarget,
          name = _event$currentTarget.name,
          value = _event$currentTarget.value;


      var newState = {};
      newState[name] = value;

      this.setState(newState);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        this.props.render(this)
      );
    }
  }]);

  return Form;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9hcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJzdGFydCIsInN0YXJ0UHJvY2VzcyIsImJpbmQiLCJzZXRTdGF0ZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiQ2hlY2tPdXQiLCJpbmRleCIsInByZXYiLCJuZXh0IiwibmV3SW5kZXgiLCJzZWN0aW9ucyIsIkNoZWNrT3V0SG9tZSIsIkFjY291bnRDcmVhdGlvbiIsIkFkZHJlc3MiLCJQYXltZW50IiwiU2VjdGlvbiIsImhhbmRsZVN0YXJ0Q2hlY2tvdXQiLCJzdWJtaXQiLCJkYXRhIiwic2VsZiIsImZvcm0iLCJ0cmFja2VyIiwiQ2hlY2tvdXRDb250cm9scyIsIm5leHRUaXRsZSIsIkZvcm0iLCJoYW5kbGVTdWJtaXQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudFRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsIm5ld1N0YXRlIiwicmVuZGVyIiwiUmVhY3RET00iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0E7Ozs7SUFJTUEsRzs7O0FBQ0osZUFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDBHQUNYQSxLQURXOztBQUdqQixVQUFLQyxLQUFMLEdBQWE7QUFDWEMsYUFBTztBQURJLEtBQWI7O0FBS0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCQyxJQUFsQixPQUFwQjtBQVJpQjtBQVNsQjs7OzttQ0FHYztBQUNiLFdBQUtDLFFBQUwsQ0FBYyxFQUFFSCxPQUFPLElBQVQsRUFBZDtBQUNEOzs7NkJBRVE7O0FBRVAsYUFDRTtBQUFBO0FBQUE7QUFDRSw0QkFBQyxRQUFEO0FBREYsT0FERjtBQUtEOzs7O0VBeEJlSSxNQUFNQyxTOztBQTRCeEI7Ozs7SUFJTUMsUTs7O0FBRUosb0JBQVlSLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxSEFDWEEsS0FEVzs7QUFHakIsV0FBS0MsS0FB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QXZCOztBQVFBOzs7O0lBSU1DLEk7OztBQUNKLGdCQUFZM0IsS0FBWixFQUFtQjtBQUFBOztBQUFBLDZHQUNYQSxLQURXOztBQUdqQixXQUFLQyxLQUFMLEdBQWEsRUFBYjs7QUFFQSxXQUFLMkIsWUFBTCxHQUFvQixPQUFLQSxZQUFMLENBQWtCeEIsSUFBbEIsUUFBcEI7QUFDQSxXQUFLb0IsT0FBTCxHQUFlLE9BQUtBLE9BQUwsQ0FBYXBCLElBQWIsUUFBZjtBQU5pQjtBQU9sQjs7OztpQ0FFWXlCLEssRUFBTztBQUNsQkEsWUFBTUMsY0FBTjs7QUFFQSxXQUFLOUIsS0FBTCxDQUFXb0IsTUFBWCxDQUFtQixLQUFLbkIsS0FBeEI7QUFDRDs7OzRCQUVPNEIsSyxFQUFPO0FBQUEsaUNBQ09BLE1BQU1FLGFBRGI7QUFBQSxVQUNSQyxJQURRLHdCQUNSQSxJQURRO0FBQUEsVUFDRkMsS0FERSx3QkFDRkEsS0FERTs7O0FBR2IsVUFBSUMsV0FBVyxFQUFmO0FBQ0FBLGVBQVVGLElBQVYsSUFBbUJDLEtBQW5COztBQUVBLFdBQUs1QixRQUFMLENBQWM2QixRQUFkO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQ0U7QUFBQTtBQUFBLFVBQU0sVUFBVyxLQUFLTixZQUF0QjtBQUNHLGFBQUs1QixLQUFMLENBQVdtQyxNQUFYLENBQWtCLElBQWxCO0FBREgsT0FERjtBQUtEOzs7O0VBL0JnQjdCLE1BQU1DLFM7O0FBa0N6QjZCLFNBQVNELE1BQVQsQ0FBaUIsb0JBQUMsR0FBRCxPQUFqQixFQUEwQkUsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUExQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4vKlxuICogQXBwXG4qL1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGFydDogZmFsc2VcbiAgICB9XG5cblxuICAgIHRoaXMuc3RhcnRQcm9jZXNzID0gdGhpcy5zdGFydFByb2Nlc3MuYmluZCh0aGlzKTtcbiAgfVxuXG5cbiAgc3RhcnRQcm9jZXNzKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzdGFydDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8Q2hlY2tPdXQgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5cbi8qXG4gKiBDaGVjayBPdXRcbiovXG5cbmNsYXNzIENoZWNrT3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGluZGV4OiAwXG4gICAgfVxuXG4gICAgdGhpcy5wcmV2ID0gdGhpcy5wcmV2LmJpbmQodGhpcyk7XG4gICAgdGhpcy5uZXh0ID0gdGhpcy5uZXh0LmJpbmQodGhpcyk7XG5cbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgdmFyIG5ld0luZGV4ID0gdGhpcy5zdGF0ZS5pbmRleCArIDE7XG4gICAgXG4gICAgaWYgKG5ld0luZGV4ID4gMil7IG5ld0luZGV4ID0gMjsgfSBcblxuICAgIHRoaXMuc2V0U3RhdGUoeyBpbmRleDogbmV3SW5kZXggfSk7XG4gIH1cblxuICBwcmV2KCkge1xuICAgIHZhciBuZXdJbmRleCA9IHRoaXMuc3RhdGUuaW5kZXggLSAxO1xuICAgIFxuICAgIGlmIChuZXdJbmRleCA8IDApeyBuZXdJbmRleCA9IDA7IH0gXG5cbiAgICB0aGlzLnNldFN0YXRlKHsgaW5kZXg6IG5ld0luZGV4IH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzZWN0aW9ucyA9IFtDaGVja091dEhvbWUsIEFjY291bnRDcmVhdGlvbiwgQWRkcmVzcywgUGF5bWVudCBdO1xuICAgIHZhciBTZWN0aW9uID0gc2VjdGlvbnNbIHRoaXMuc3RhdGUuaW5kZXggXTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8U2VjdGlvbiBuZXh0PXsgdGhpcy5uZXh0IH0gcHJldj17IHRoaXMucHJldiB9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxudmFyIENoZWNrT3V0SG9tZSA9IChwcm9wcykgPT4ge1xuICB2YXIgaGFuZGxlU3RhcnRDaGVja291dCA9ICgpID0+IHtcbiAgICBwcm9wcy5uZXh0KCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgyPiBSZWFkeSB0byBjaGVja291dD8gPC9oMj5cbiAgICAgIDxidXR0b24gXG4gICAgICAgIGNsYXNzTmFtZT0nYnRuJ1xuICAgICAgICBvbkNsaWNrPXsgaGFuZGxlU3RhcnRDaGVja291dCB9PmNoZWNrIG91dDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApXG59O1xuXG5cbi8qXG4gKiBBY2NvdW50IENyZWF0aW9uXG4qL1xuXG5jbGFzcyBBY2NvdW50Q3JlYXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3VibWl0ID0gdGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuICBcbiAgc3VibWl0KCBkYXRhICkge1xuICAgIHRoaXMucHJvcHMubmV4dCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyPiBBY2NvdW50IENyZWF0aW9uIDwvaDI+XG5cbiAgICAgICAgPEZvcm0gc3VibWl0PXsgdGhpcy5zdWJtaXQgfSByZW5kZXI9eyhmb3JtKSA9PiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibmFtZVwiPiBOYW1lOiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYW1lXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJlbWFpbFwiPiBFbWFpbDogPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiBuYW1lPVwiZW1haWxcIiBvbktleVVwPXtmb3JtLnRyYWNrZXJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGFzc3dvcmRcIj4gUGFzc3dvcmQ6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Q2hlY2tvdXRDb250cm9scyBuZXh0PXtzZWxmLnByb3BzLm5leHR9IHByZXY9eyBzZWxmLnByb3BzLnByZXYgfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfSAvPlxuICAgICAgICBcblxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbi8qXG4gKiBBZGRyZXNzXG4qL1xuXG5jbGFzcyBBZGRyZXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN1Ym1pdCA9IHRoaXMuc3VibWl0LmJpbmQodGhpcyk7XG4gIH1cbiAgXG4gIHN1Ym1pdCgpIHtcbiAgICB0aGlzLnByb3BzLm5leHQoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyPiBBZGRyZXNzIEluZm8gPC9oMj5cblxuICAgICAgICA8Rm9ybSBzdWJtaXQ9eyB0aGlzLnN1Ym1pdCB9IHJlbmRlcj17KGZvcm0pID0+IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJsaW5lMVwiPiBhZGRyZXNzIDE6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cImxpbmUxXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibGluZTFcIiBvbktleVVwPXtmb3JtLnRyYWNrZXJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibGluZTJcIj4gYWRkcmVzcyAyOiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJsaW5lMlwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxpbmUyXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNpdHlcIj4gQ2l0eTogPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGlkPVwiY2l0eVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNpdHlcIiBvbktleVVwPXtmb3JtLnRyYWNrZXJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwic3RhdGVcIj4gU3RhdGU6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cInN0YXRlXCIgdHlwZT1cInRleHRcIiBuYW1lPVwic3RhdGVcIiBvbktleVVwPXtmb3JtLnRyYWNrZXJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiemlwQ29kZVwiPiBaaXAgY29kZTogPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGlkPVwiemlwQ29kZVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInppcENvZGVcIiBvbktleVVwPXtmb3JtLnRyYWNrZXJ9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwibnVtYmVyXCI+IFBob25lIG51bWJlcjogPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IGlkPVwibnVtYmVyXCIgdHlwZT1cInRleHRcIiBuYW1lPVwibnVtYmVyXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Q2hlY2tvdXRDb250cm9scyBwcmV2PXsgdGhpcy5wcm9wcy5wcmV2IH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX0gLz5cblxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cblxuLypcbiAqIFBheW1lbnRcbiovXG5cbmNsYXNzIFBheW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3VibWl0ID0gdGhpcy5zdWJtaXQuYmluZCh0aGlzKTtcbiAgfVxuICBcbiAgc3VibWl0KCkge1xuICAgIHRoaXMucHJvcHMubmV4dCgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8aDI+IFBheW1lbnQgSW5mbyA8L2gyPlxuXG4gICAgICAgIDxGb3JtIHN1Ym1pdD17IHRoaXMuc3VibWl0IH0gcmVuZGVyPXsoZm9ybSkgPT4gKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNhcmROdW1iZXJcIj4gQ2FyZCBudW1iZXI6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cImNhcmROdW1iZXJcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJjYXJkTnVtYmVyXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImV4cGlyeURhdGVcIj4gRXhwaXJ5IGRhdGU6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cImV4cGlyeURhdGVcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJleHBpcnlEYXRlXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImN2dlwiPiBjdnY6IDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCBpZD1cImN2dlwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImN2dlwiIG9uS2V5VXA9e2Zvcm0udHJhY2tlcn0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJiaWxsaW5nWmlwQ29kZVwiPiBCaWxsaW5nIHppcCBjb2RlOiA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJiaWxsaW5nWmlwQ29kZVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImJpbGxpbmdaaXBDb2RlXCIgb25LZXlVcD17Zm9ybS50cmFja2VyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Q2hlY2tvdXRDb250cm9scyBwcmV2PXsgdGhpcy5wcm9wcy5wcmV2IH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX0gLz5cblxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbi8qXG4gKiBDaGVjayBPdXQgQ29udHJvbHNcbiovXG5cbnZhciBDaGVja291dENvbnRyb2xzID0gKHByb3BzKSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPSdjaGVja291dC1jb250aW51YXRpb24nPlxuICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJyBvbkNsaWNrPXsgcHJvcHMucHJldiB9PiBwcmUgPC9idXR0b24+XG4gICAgPGlucHV0IHR5cGU9J3N1Ym1pdCcgdmFsdWU9eyAocHJvcHMubmV4dFRpdGxlIHx8ICduZXh0JykgfSAvPlxuICA8L2Rpdj5cbilcblxuXG4vKlxuICogRm9ybVxuKi9cblxuY2xhc3MgRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMudHJhY2tlciA9IHRoaXMudHJhY2tlci5iaW5kKHRoaXMpO1xuICB9XG4gIFxuICBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5wcm9wcy5zdWJtaXQoIHRoaXMuc3RhdGUgKTtcbiAgfVxuXG4gIHRyYWNrZXIoZXZlbnQpIHtcbiAgICB2YXIge25hbWUsIHZhbHVlfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICB2YXIgbmV3U3RhdGUgPSB7fTtcbiAgICBuZXdTdGF0ZVsgbmFtZSBdID0gdmFsdWU7XG5cbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGZvcm0gb25TdWJtaXQ9eyB0aGlzLmhhbmRsZVN1Ym1pdCB9PlxuICAgICAgICB7dGhpcy5wcm9wcy5yZW5kZXIodGhpcyl9XG4gICAgICA8L2Zvcm0+XG4gICAgKVxuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlciggPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpICk7XG5cbiJdfQ==