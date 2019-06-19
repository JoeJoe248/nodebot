import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/myrecipes" className="btn btn-light">
        <i className="fas fa-folder-plus text-info mr-1" />
        My Recipes
      </Link>
      <Link to="/create-recipe" className="btn btn-light">
        <i className="fas fa-folder-plus text-info mr-1" />
        Add Recipe
      </Link>
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/cookHistory" className="btn btn-light">
        <i className="fab fa-leanpub text-info mr-1" />
        My Cook History
      </Link>
      <Link to="/create-cookEvent" className="btn btn-light">
        <i className="fas fa-calendar-check text-info mr-1" />
        Add A Cook Event
      </Link>
      <Link to="/analytics-cookEvent" className="btn btn-light">
        <i className="fas fa-poll mr-1" />
        Cook Event Analytics
      </Link>
      <Link to="/analytics-chart" className="btn btn-light">
        <i className="fas fa-poll mr-1" />
        Chart
      </Link>
      <Link to="/staging" className="btn btn-light">
        <i className="fas fa-thumbtack" />
        Staging
      </Link>
    </div>
  );
};

export default ProfileActions;
