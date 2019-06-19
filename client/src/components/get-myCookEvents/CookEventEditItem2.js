import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import Checkbox from "../common/Checkbox";
import { getActiveCookEventLabel } from "../../actions/checkBoxValueLabelActions";
import { createCookEvent } from "../../actions/cookEventActions";
import { getMyCookEvent } from "../../actions/cookEventActions";

import isEmpty from "../../validation/is-empty";

//const items = ["Active Indicator"];

class CookEventEditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeId: "",
      recipeName: "",
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      cookState: "",
      activeInd: true,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  componentWillMount = () => {
    //console.log("value of cook event id is: ", this.props.cookEvent._id);
    this.props.getMyCookEvent(this.props.cookEvent._id);
    this.props.getActiveCookEventLabel();
    //this.selectedCheckboxes = new Set();
  };

  onCheckboxChange(e) {
    console.log("Checkbox checked:", e.target.checked);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  //createCheckboxes = (checkBoxValueLabelData) => this.checkBoxValueLabelData.map(this.createCheckbox);

  createCheckBoxes(checkBoxValueLabelData) {
    if (checkBoxValueLabelData.checkBoxValueLabels === null) {
      console.log("checkBoxValueLabelData is null");
    } else {
      let tempValuesArray = [];

      for (
        var i = 0;
        i <= checkBoxValueLabelData.checkBoxValueLabels.length - 1;
        i++
      ) {
        let tempObj = {};
        let tempObjValues = "";
        tempObj = checkBoxValueLabelData.checkBoxValueLabels[i];
        tempObjValues = tempObj.valueLabelItem;
        //console.log("tempObjTemp: ", tempObjTemp);
        tempValuesArray.push(tempObjValues);
        this.tempValuesArray.map(this.createCheckbox);
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    //console.log("edit create cook event");
    //console.log("recipe name of cook event: ", this.props.cookEvent.recipeName);
    //console.log("cook state is: ", this.state.cookState);
    //console.log("activeInd is: ", this.state.activeInd);

    const cookEventData = {
      recipeId: this.state.recipeId,
      recipeName: this.state.recipeName,
      meatType: this.state.meatType,
      meatWeight: this.state.meatWeight,
      totalCookTime: this.state.totalCookTime,
      cookRating: this.state.cookRating,
      ovenTemp: this.state.ovenTemp,
      cookState: this.state.cookState,
      activeInd: this.state.activeInd
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

  componentWillReceiveProps(nextProps) {
    const checkBoxValueLabels = nextProps.checkBoxValueLabels
      ? nextProps.checkBoxValueLabels
      : {};
    console.log(
      "the checkBoxValueLabels from comp will receive props: ",
      checkBoxValueLabels
    );
    this.setState({
      checkBoxValueLabels: checkBoxValueLabels
    });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      //we are pushing errors to component state so we don't have to change how errors work in the HTML form below
    }

    /*if(nextProps.checkBoxValueLabels){
      this.setState({ checkBoxValueLabels: nextProps.checkBoxValueLabels})
      console.log("cook log: ", JSON.stringify(myCookLog));
    }*/

    if (nextProps.cookEvent) {
      const cookEvent = nextProps.cookEvent;

      cookEvent.recipeId = !isEmpty(cookEvent.recipeId)
        ? cookEvent.recipeId
        : "";
      cookEvent.recipeName = !isEmpty(cookEvent.recipeName)
        ? cookEvent.recipeName
        : "";
      cookEvent.meatType = !isEmpty(cookEvent.meatType)
        ? cookEvent.meatType
        : "";
      cookEvent.meatWeight = !isEmpty(cookEvent.recipeId)
        ? cookEvent.recipeId
        : "";
      cookEvent.totalCookTime = !isEmpty(cookEvent.totalCookTime)
        ? cookEvent.totalCookTime
        : "";
      cookEvent.cookRating = !isEmpty(cookEvent.cookRating)
        ? cookEvent.cookRating
        : "";
      cookEvent.ovenTemp = !isEmpty(cookEvent.ovenTemp)
        ? cookEvent.ovenTemp
        : "";
      cookEvent.cookState = !isEmpty(cookEvent.cookState)
        ? cookEvent.cookState
        : "";
      cookEvent.activeInd = !isEmpty(cookEvent.activeInd)
        ? cookEvent.activeInd
        : "";

      //set component fields state
      this.setState({
        recipeId: cookEvent.recipeId,
        recipeName: cookEvent.recipeName,
        meatType: cookEvent.meatType,
        meatWeight: cookEvent.meatWeight,
        totalCookTime: cookEvent.totalCookTime,
        cookRating: cookEvent.cookRating,
        ovenTemp: cookEvent.ovenTemp,
        cookState: cookEvent.cookState,
        activeInd: cookEvent.activeInd
      });
    }
  }

  render() {
    const { cookEvent } = this.props;
    const { errors } = this.state;
    //const [isChecked, setIsChecked] = useState(true);
    //const items = ["Active Indicator"];

    return (
      <div className="edit-cook-event">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className="lead text-center">
                Edit The Cook Event You Just Selected
              </p>
              <small className="d-blok pb-3">* = required fields</small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Recipe Name"
                  name="recipeName"
                  value={this.state.recipeName}
                  onChange={this.onChange}
                  error={errors.recipeName}
                />
                <TextFieldGroup
                  placeholder="Type of Meat"
                  name="meatType"
                  value={this.state.meatType}
                  onChange={this.onChange}
                  error={errors.meatType}
                />
                <TextFieldGroup
                  placeholder="Weight of Meat"
                  name="meatWeight"
                  value={this.state.meatWeight}
                  onChange={this.onChange}
                  error={errors.meatWeight}
                />
                <TextFieldGroup
                  placeholder="Total Cook Time"
                  name="totalCookTime"
                  value={this.state.totalCookTime}
                  onChange={this.onChange}
                  error={errors.totalCookTime}
                />
                <TextFieldGroup
                  placeholder="Cook Rating"
                  name="cookRating"
                  value={this.state.cookRating}
                  onChange={this.onChange}
                  error={errors.cookRating}
                />
                <TextFieldGroup
                  placeholder="Oven Temperature"
                  name="ovenTemp"
                  value={this.state.ovenTemp}
                  onChange={this.onChange}
                  error={errors.ovenTemp}
                />
                <TextFieldGroup
                  placeholder="Cook State"
                  name="cookState"
                  value={this.state.cookState}
                  onChange={this.onChange}
                  error={errors.cookState}
                />
                <div className="form-check mb-4">
                  <Checkbox>
                    {this.createCheckboxes(this.props.checkBoxValueLabels)}
                  </Checkbox>
                </div>
                <input
                  type="submit"
                  onSubmit={this.onSubmit}
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

CookEventEditItem.propTypes = {
  createCookEvent: PropTypes.func.isRequired,
  getMyCookEvent: PropTypes.func.isRequired,
  getActiveCookEventLabel: PropTypes.func.isRequired,
  cookEvent: PropTypes.object.isRequired,
  checkBoxValueLabels: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cookEvents: state.cookEvents,
  cookEvent: state.cookEvents.cookEvent,
  checkBoxValueLabels: state.checkBoxValueLabels,
  //cookEvent: state.cookEvent,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createCookEvent, getMyCookEvent, getActiveCookEventLabel }
)(withRouter(CookEventEditItem));
