import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";
import { getMyCookEvents } from "../../actions/cookEventActions";
import Spinner from "../common/Spinner";
//import ProfileActions from "./ProfileActions";
import CookEventsGrid from "../get-myCookEvents/CookEventsGrid";

//import CookEventRecipeItem from "../get-myRecipes/CookEventRecipeItem";
//import EditCookEvent from "../edit-cookEvent/EditCookEvent";

class CookEventsScreen extends Component {
  componentDidMount() {
    //need to call this right away
    this.props.getCurrentProfile();
    this.props.getMyCookEvents();
  }

  /*onDeleteClick(e) {
    this.props.deleteAccount();
  }*/

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { cookEvents } = this.props.cookEvents;

    let cookEventScreenContent;

    //if(profile === null || loading )
    if (cookEvents === null || loading) {
      cookEventScreenContent = <Spinner />;
    } else {
      //check if logged in user has profile data
      if (Object.keys(cookEvents).length > 0) {
        //console.log("CookEvents: ", cookEvents);
        cookEventScreenContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              , it looks like you have cook active events
            </p>
            <CookEventsGrid cookEvents={cookEvents} />
            <p />
          </div>
        );
      } else {
        //user is logged in but has no profile
        cookEventScreenContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>It does not look like you have any active cooks in process</p>
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
                <h1 className="display-4">
                  Staging / Activate Cook Log Screen
                </h1>
                {cookEventScreenContent}
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

CookEventsScreen.propTypes = {
  getMyCookEvents: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  cookEvents: PropTypes.object.isRequired
  //recipes: PropTypes.object.isRequired
};

//bring in profile and auth state
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  cookEvents: state.cookEvents
  //recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getMyCookEvents, getCurrentProfile }
)(CookEventsScreen);
