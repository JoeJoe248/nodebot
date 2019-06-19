import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
//import { Link } from "react-router-dom";
//import TextFieldGroup from "../common/TextFieldGroup";

import { getMyRecipe } from "../../actions/recipeActions";
import { getMyCookEvent } from "../../actions/cookEventActions";
import CookEventRecipeItem from "../get-myRecipes/CookEventRecipeItem";
import CookEventEditItem from "../get-myCookEvents/CookEventEditItem";
import CookEventCookLogActivity from "../get-myCookEvents/CookEventCookLogActivity";
import CookEventArchive from "../save-myCookEvents/CookEventArchive";
//import CookEventCookLogActivity from "../get-myCookEvents/"
import CookEventChart from "../../components/charts/CookEventChart";

class CookEventsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeName: "",
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      activeInd: true,
      cookEvents: {},
      cookEvent: [],
      recipes: {},
      recipe: [],
      selectedCookEvent: [],
      errors: {}
    };

    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  /*componentDidMount() {
    this.setState({
      cookEvents: this.props.getMyCookEvents()
    });
  }*/

  componentWillReceiveProps(nextProps) {
    console.log("inside componentWillReceiveProps");

    const recipe = nextProps.recipe ? nextProps.recipe : {};
    this.setState({
      recipe: recipe
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

  onRowSelect(row, isSelected, e) {
    //here is a warehouse of stuff we can do whatever is selected.  We just need the row object and isSelected
    if (isSelected) {
      this.state = {
        selectedCookEvent: []
      };
      this.state.selectedCookEvent.push(row); //add row.equipmentName or row._id
    } else {
      //if the selected cook event array if this element already exists, then let's remove it and stuff no longer selected.  We are forcing the array to only hold one record or one cookEvent
      var index = this.state.selectedCookEvent.indexOf(row);
      if (index >= 0) {
        this.state.selectedCookEvent.splice(index, 1);
      }
    }

    /*console.log("row: ", row);
    console.log("row.meatType: ", row.meatType);
    //stringify converts all data to a string
    console.log("selected is: ", JSON.stringify(this.state.selectedCookEvent));
    //const meatType = this.state.selected[0].meatType;
    console.log("type of meat: ", this.state.selectedCookEvent[0].meatType);
    console.log("cookEvent id: ", this.state.selectedCookEvent[0]._id);*/

    //this.props.getMyCookEvent(this.state.selectedCookEvent[0]._id);

    //console.log("recipeId: ", this.state.selectedCookEvent[0].recipeId);
    //console.log("recipeName: ", this.state.selectedCookEvent[0].recipeName);
    //console.log("cookState: ", this.state.selectedCookEvent[0].cookState);
    this.props.getMyRecipe(this.state.selectedCookEvent[0].recipeId);
    //now get myCookEvent
    this.props.getMyCookEvent(this.state.selectedCookEvent[0]._id);
  }

  render() {
    const { cookEvents } = this.state;
    const { errors } = this.state;
    const { cookEvent } = this.state;
    const { recipe } = this.state;

    const options = {
      //afterDeleteRow: this.handleDeletedRow.bind(this)
    };

    const selectRowProp = {
      mode: "radio",
      clickToSelect: true,
      onSelect: this.onRowSelect.bind(this),
      //onSelectAll: this.onSelectAll,
      //onUnselectAll: this.onUnselectAll,
      selected: this.selected
    };

    //add code here to call CookEventRecipeItem based on recipe
    let cookEventRecipeContent;

    if (recipe === null) {
      console.log("inside if recipe");
      cookEventRecipeContent = (
        <div>
          <p className="lead text-muted">No Recipe To Display</p>
        </div>
      );
    } else {
      //check if logged in user has profile data
      //console.log("inside if recipe else");
      //console.log("Recipe1: ", recipe);
      if (Object.keys(recipe).length > 0) {
        //console.log("Recipe2: ", recipe);
        cookEventRecipeContent = (
          <div>
            <CookEventRecipeItem recipe={recipe} />
          </div>
        );
      }

      //add code here to call CookEventEditItem based on cookEvent
      let cookEventEditContent;

      if (cookEvent === null) {
        console.log("inside of cookEvent edit content");
        cookEventEditContent = (
          <div>
            <p className="tead text-muted">No CookEvent To Display</p>
          </div>
        );
      } else {
        //check if logged in user has profile data
        //console.log("inside of cookEvent edit content else");
        if (Object.keys(cookEvent).length > 0) {
          //console.log("CookEvent in content edit else: ", cookEvent);
          cookEventEditContent = (
            <div>
              <div>
                <CookEventEditItem cookEvent={cookEvent} />
              </div>
              <br />
            </div>
          );
        }
      }

      let chartContent;

      if (cookEvent === null) {
        console.log("inside of cookEvent edit content");
        chartContent = (
          <div>
            <p className="tead text-muted">No Chart To Display</p>
          </div>
        );
      } else {
        //check if logged in user has profile data
        //console.log("inside of cookEvent edit content else");
        if (Object.keys(cookEvent).length > 0) {
          //console.log("CookEvent in content edit else: ", cookEvent);
          chartContent = (
            <div>
              <CookEventChart cookEvent={cookEvent} />
            </div>
          );
        }
      }

      let archiveContent;

      if (cookEvent.archiveInd === true) {
        console.log("inside of cookEvent edit content");
        archiveContent = (
          <div>
            <p className="tead text-muted">This cook event has been archived</p>
            <CookEventArchive cookEvent={cookEvent} />
          </div>
        );
      } else {
        //check if logged in user has profile data
        //console.log("inside of cookEvent edit content else");
        if (cookEvent.archiveInd === false) {
          //console.log("CookEvent in content edit else: ", cookEvent);
          archiveContent = (
            <div>
              <div>
                <p className="tead text-muted">
                  This cook event has been NOT been archived
                </p>
                <CookEventArchive cookEvent={cookEvent} />
              </div>
            </div>
          );
        }
      }

      return (
        <div>
          {" "}
          {/*outer div */}
          <div className="container">
            {" "}
            {/*container div */}
            <div className="row">
              <div className="col">
                {" "}
                {/*1st col div */}
                <h4 className="display-6 text-center">
                  Select Your Active Cook Events
                </h4>
                <BootstrapTable
                  data={this.props.cookEvents.cookEvents}
                  striped
                  hover
                  condensed
                  version="4"
                  deleteRow={false}
                  selectRow={selectRowProp}
                  options={options}
                >
                  <TableHeaderColumn
                    dataField="recipeId"
                    isKey={true}
                    width="20"
                    hidden
                  >
                    Recipe Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="recipeName"
                    isKey={false}
                    width="20"
                  >
                    Recipe Name
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>{" "}
              {/*1st col div */}
              <div className="col">
                <h4 className="display-6 text-center">Activate Meat Probe</h4>
                <CookEventCookLogActivity cookEvent={this.state.cookEvent} />
              </div>
            </div>{" "}
            {/*end first row div */}
            <br />
            <div className="row">
              {" "}
              {/*2nd row div */}
              <div className="col">
                <h4 className="display-6 text-center">Edit Your Cook Event</h4>
                {cookEventEditContent}
                <br />
                {archiveContent}
              </div>
              <div className="col">
                <h4 className="display-6 text-center">Your Recipe</h4>
                {cookEventRecipeContent}
              </div>
            </div>
            <br />
            <div className="row">
              {" "}
              {/*3rd row div */}
              <div className="col">
                <h4 className="display-6 text-center">Cook Event Chart</h4>
                {chartContent}
              </div>
            </div>
            {/*end 3rd row div */}
          </div>{" "}
          {/*container div */}
        </div>
      );
    }
  }
}

CookEventsGrid.propTypes = {
  //getMyCookEvents: PropTypes.func.isRequired,
  //createCookEvent: PropTypes.func.isRequired,
  getMyRecipe: PropTypes.func.isRequired,
  getMyCookEvent: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  cookEvent: PropTypes.object.isRequired,
  cookEvents: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired
};

//bring in profile and auth state
const mapStateToProps = state => ({
  cookEvents: state.cookEvents,
  cookEvent: state.cookEvents.cookEvent,
  recipes: state.recipes,
  recipe: state.recipes.recipe,
  errors: state.errors,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { getMyRecipe, getMyCookEvent }
)(CookEventsGrid);
