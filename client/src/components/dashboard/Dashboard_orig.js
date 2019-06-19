import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getMyCookEvents } from "../../actions/cookEventActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import CookEventsGrid from "../get-myCookEvents/CookEventsGrid";
//import EditCookEvent from "../edit-cookEvent/EditCookEvent";

class Dashboard extends Component {
  componentDidMount() {
    //need to call this right away
    this.props.getCurrentProfile();
    this.props.getMyCookEvents();
  }

  componentWillReceiveProps(nextProps) {
    console.log("inside componentWillReceiveProps");

    const profile = nextProps.profile ? nextProps.profile : {};
    this.setState({
      profile: profile
    });

    const cookEvent = nextProps.cookEvent ? nextProps.cookEvent : {};
    this.setState({
      cookEvent: cookEvent
    });

    console.log("the cookEvent from props: ", cookEvent);

    //test for errors property
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      //we are pushing errors to component state so we don't have to change how errors work in the HTML form below
    }
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { cookEvents } = this.props.cookEvents;
    //const { recipes } = this.props.recipes;
    //let handle = this.props.profile.profile.handle;
    //console.log("handle: ", handle);

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <CookEventsGrid cookEvents={cookEvents} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        //user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4">Dashboard</h1>
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <small>
                  Handle:{" "}
                  {this.props.profile.profile
                    ? this.props.profile.profile.handle
                    : ""}
                </small>
              </div>
              <div className="col-md-8">
                <small>
                  DeviceId:{" "}
                  {this.props.profile.profile
                    ? this.props.profile.profile.deviceId
                    : ""}
                </small>
              </div>
              <div className="col-md-8">
                <small>
                  Bio:{" "}
                  {this.props.profile.profile
                    ? this.props.profile.profile.bio
                    : ""}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getMyCookEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  cookEvents: PropTypes.object.isRequired
};

//bring in profile and auth state
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  cookEvents: state.cookEvents
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getMyCookEvents }
)(Dashboard);
