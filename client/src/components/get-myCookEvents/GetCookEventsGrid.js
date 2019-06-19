import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { connect } from "react-redux"; //connect redux to component
//import { Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
//import EditCookEventsItem from "../edit-cookEvent/EditCookEventsItem";
import {
  getMyCookEvents,
  getMyCookEvent,
  createCookEvent
} from "../../actions/cookEventActions";
import { getMyRecipe } from "../../actions/recipeActions";
import TestChart2 from "../../components/charts/TestChart2";

class GetCookEventsGrid extends Component {
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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      cookEvents: this.props.getMyCookEvents()
    });
  }

  componentWillReceiveProps(nextProps) {
    const cookEvent = nextProps.cookEvent ? nextProps.cookEvent : {};
    this.setState({
      cookEvent: cookEvent
    });

    console.log("the cook event: ", cookEvent);

    const recipe = nextProps.recipe ? nextProps.recipe : {};
    this.setState({
      recipe: recipe
    });

    console.log("the recipe: ", recipe);

    //test for errors property
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      //we are pushing errors to component state so we don't have to change how errors work in the HTML form below
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("edit create cook event");
    console.log("recipeName: ", this.state.recipeName); //this returns nothing " "
    console.log("cookRating: ", this.state.cookRating); //this returns what was placed in the cell
    console.log("cook state: ", this.state.cookState);

    const tempCookRating = this.state.cookEvent.cookRating
      ? this.state.cookEvent.cookRating
      : this.stateCookRating;
    console.log("tempCookRating: ", tempCookRating);

    const cookEventData = {
      //this.props.recipe ? this.props.recipe.directions2 : ""
      recipeId: this.state.cookEvent.recipeId,
      recipeName: this.props.cookEvent.recipeName,
      meatType: this.state.cookEvent.meatType,
      meatWeight: this.state.cookEvent.meatWeight,
      totalCookTime: this.state.cookEvent.totalCookTime,
      cookRating: this.state.cookEvent.cookRating,
      ovenTemp: this.state.cookEvent.ovenTemp,
      cookState: this.state.cookEvent.cookState,
      activeInd: this.state.cookEvent.activeInd
    };

    console.log("cookEventData: ", cookEventData);

    this.props.createCookEvent(cookEventData, this.props.history); //this.props.history requires withRouter

    /*this.setState({
      recipeName: "",
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      activeInd: true
    });*/
  }

  onChange(e) {
    console.log("inside onChange()");
    this.setState({ [e.target.name]: e.target.value });
  }

  onRowSelect(row, isSelected, e) {
    //here is a warehouse of stuff we can do whatever is selected.  We just need the row object and isSelected
    if (isSelected) {
      this.state = {
        selectedCookEvent: []
      };
      this.state.selectedCookEvent.push(row); //add row.equipmentName or row._id
    } else {
      //if the selected cook event array if this element already exists, then let's remove it and stuff no longer selected
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
    this.props.getMyCookEvent(this.state.selectedCookEvent[0]._id);
    this.props.getMyRecipe(this.state.selectedCookEvent[0].recipeId);
    console.log("recipeId: ", this.state.selectedCookEvent[0].recipeId);
  }

  render() {
    const { cookEvents } = this.state;
    const { errors } = this.state;
    const { coookEvent } = this.state;
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

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
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
            </div>
            <div className="col">
              <p className="lead text-center">Your Recipe</p>
              <div className="card card-body bg-light mb-3">
                <div className="row">
                  <h3>{this.props.recipe ? this.props.recipe._id : ""}</h3>
                  <h3>
                    {this.props.recipe ? this.props.recipe.recipeName : ""}
                  </h3>
                  <h5>
                    {this.props.recipe ? this.props.recipe.recipeURL : ""}
                  </h5>
                  <p>
                    {this.props.recipe ? this.props.recipe.directions1 : ""}
                  </p>
                  <p>
                    {this.props.recipe ? this.props.recipe.directions2 : ""}
                  </p>
                  <p>
                    suggestd wood:{" "}
                    {this.props.recipe ? this.props.recipe.suggestedWood : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="lead text-center">
                  Edit The Cook Event You Just Selected
                </p>
                <small className="d-blok pb-3">* = required fields</small>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Recipe Name"
                    name="recipeName"
                    value={
                      this.props.cookEvent
                        ? this.props.cookEvent.recipeName
                        : ""
                    }
                    onChange={this.onChange}
                    error={errors.recipeName}
                  />
                  <TextFieldGroup
                    placeholder="Type of Meat"
                    name="meatType"
                    value={
                      this.props.cookEvent ? this.props.cookEvent.meatType : ""
                    }
                    onChange={this.onChange}
                    error={errors.meatType}
                  />
                  <TextFieldGroup
                    placeholder="Weight of Meat"
                    name="meatWeight"
                    value={
                      this.props.cookEvent
                        ? this.props.cookEvent.meatWeight
                        : ""
                    }
                    onChange={this.onChange}
                    error={errors.meatWeight}
                  />
                  <TextFieldGroup
                    placeholder="Total Cook Time"
                    name="totalCookTime"
                    value={
                      this.props.cookEvent
                        ? this.props.cookEvent.totalCookTime
                        : ""
                    }
                    onChange={this.onChange}
                    error={errors.totalCookTime}
                  />
                  <TextFieldGroup
                    placeholder="Cook Rating"
                    name="cookRating"
                    value={
                      this.props.cookEvent
                        ? this.props.cookEvent.cookRating
                        : ""
                    }
                    onChange={this.onChange}
                    error={errors.cookRating}
                  />
                  <TextFieldGroup
                    placeholder="Oven Temperature"
                    name="ovenTemp"
                    value={
                      this.state.cookEvent ? this.state.cookEvent.ovenTemp : ""
                    }
                    onChange={this.onChange}
                    error={errors.ovenTemp}
                  />
                  <TextFieldGroup
                    placeholder="Cook State"
                    name="cookState"
                    value={
                      this.props.cookEvent ? this.props.cookEvent.cookState : ""
                    }
                    onChange={this.onChange}
                    error={errors.cookState}
                  />
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="activeInd"
                      value={
                        this.props.cookEvent
                          ? this.props.cookEvent.activeInd
                          : ""
                      }
                      checked={this.state.activeInd}
                      onChange={this.onChange}
                      id="activeInd"
                    />
                    <label htmlFor="activeInd" className="form-check-label">
                      Active Cook
                    </label>
                  </div>
                  <input
                    type="submit"
                    name="Edit Cook Event"
                    onSubmit={this.onSubmit}
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
              <div className="col">
                <p className="lead text-center">Another Grid Cell</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GetCookEventsGrid.propTypes = {
  getMyCookEvents: PropTypes.func.isRequired,
  getMyCookEvent: PropTypes.func.isRequired,
  createCookEvent: PropTypes.func.isRequired,
  getMyRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  cookEvent: PropTypes.object.isRequired,
  cookEvents: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired
};

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
  { getMyCookEvents, getMyCookEvent, createCookEvent, getMyRecipe }
)(withRouter(GetCookEventsGrid));
