import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      bio: "",
      cookingType: "",
      deviceType: "Arduino Uno",
      deviceId: "0694A0D0-A5B8-47C4-A7D1-F77E18D03A1E",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      bio: this.state.bio,
      cookingType: this.state.cookingType,
      deviceType: this.state.deviceType,
      deviceId: this.state.deviceId
    };

    //console.log("deviceType: " + this.state.deviceType);
    //console.group("handle: " + this.state.handle);

    //everytime you call a redux action it is in the props
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information about you, your device and your
                preferred cooking equipment
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile. It could be your full name, nick name, company name, etc."
                />
                <TextAreaFieldGroup
                  placeholder="Short Biography..."
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Give us a short description of what you like to cook"
                />
                <TextFieldGroup
                  placeholder="What kind of cooking equipment do you have?"
                  name="cookingType"
                  value={this.state.cookingType}
                  onChange={this.onChange}
                  error={errors.cookingType}
                  info="Please use comma separated values. Ex. GMG, Weber Kettle Grill, Big Green Egg, Le Creuset Dutch Oven..."
                />
                <TextFieldGroup
                  placeholder="Device Type"
                  name="deviceType"
                  value={this.state.deviceType}
                  onChange={this.onChange}
                  error={errors.deviceType}
                  info="Ex. Arduino Uno, Raspberry Pi, etc. "
                />
                <TextFieldGroup
                  placeholder="Device ID"
                  name="deviceId"
                  value={this.state.deviceId}
                  onChange={this.onChange}
                  error={errors.deviceId}
                  info="The Unique ID for your device... "
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
