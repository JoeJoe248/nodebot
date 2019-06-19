var Checkbox2 = React.createClass({
  getInitialState: function() {
    return { checked: true };
  },
  handleCheck: function() {
    this.setState({ checked: !this.state.checked });
  },
  render: function() {
    var msg;
    if (this.state.checked) {
      msg = "checked";
    } else {
      msg = "unchecked";
    }
    return (
      <div>
        <input
          type="checkbox"
          onChange={this.handleCheck}
          defaultChecked={this.state.checked}
        />
        <p>this box is {msg}.</p>
      </div>
    );
  }
});

React.render(<Checkbox2 />, document.getElementById("react-container"));
