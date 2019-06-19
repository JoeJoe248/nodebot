import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "react-switch";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
//import Checkbox from "../common/Checkbox";
//import { getActiveCookEventLabel } from "../../actions/checkBoxValueLabelActions";
import { editCookEvent } from "../../actions/cookEventActions";
import { getMyCookEvent } from "../../actions/cookEventActions";
//import SwitchExample from "../edit-cookEvent/SwitchExample";

import isEmpty from "../../validation/is-empty";

//const items = ["Active Indicator"];

class CookEventEditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeId: "",
      recipeName: "",
      deviceBoards: [],
      meatType: "",
      meatWeight: "",
      totalCookTime: "",
      minutesPerPound: "",
      cookRating: "",
      ovenTemp: "",
      cookState: "",
      activeInd: true,
      cookNotes: "",
      purchasePlace: "",
      purchasePrice: "",
      checked: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  componentWillMount = () => {
    //console.log("value of cook event id is: ", this.props.cookEvent._id);
    this.props.getMyCookEvent(this.props.cookEvent._id);
    //this.props.getActiveCookEventLabel();
    //this.selectedCheckboxes = new Set();
  };

  /*onCheckboxChange(e) {
    console.log("Checkbox checked:", e.target.checked);
  }*/

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(checked) {
    this.setState({ checked });
    if (checked) {
      this.state.activeInd = true;
    } else {
      this.state.activeInd = false;
    }
    /*console.log(
      "inside handle change. value of active ind is: ",
      this.state.activeInd
    );*/
  }

  /*toggleCheckbox = label => {
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
  }*/

  onSubmit(e) {
    e.preventDefault();
    //console.log("edit create cook event");
    //console.log("recipe name of cook event: ", this.props.cookEvent.recipeName);
    //console.log("cook state is: ", this.state.cookState);
    //console.log("activeInd is: ", this.state.activeInd);
    const arrDeviceBoards = [];
    arrDeviceBoards.push(this.state.deviceBoards);

    const cookEventData = {
      _id: this.props.cookEvent._id,
      recipeId: this.state.recipeId,
      recipeName: this.state.recipeName,
      deviceBoards: arrDeviceBoards,
      meatType: this.state.meatType,
      meatWeight: this.state.meatWeight,
      totalCookTime: this.state.totalCookTime,
      minutesPerPound: this.state.minutesPerPound,
      cookRating: this.state.cookRating,
      ovenTemp: this.state.ovenTemp,
      cookState: this.state.cookState,
      activeInd: this.state.activeInd,
      cookNotes: this.state.cookNotes,
      purchasePlace: this.state.purchasePlace,
      purchasePrice: this.state.purchasePrice
    };

    //console.log("cookEventData: ", cookEventData);
    //console.log("activeInd: ", this.state.activeInd);

    this.props.editCookEvent(cookEventData, this.props.history); //this.props.history requires withRouter

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
    /*const checkBoxValueLabels = nextProps.checkBoxValueLabels
      ? nextProps.checkBoxValueLabels
      : {};
    console.log(
      "the checkBoxValueLabels from comp will receive props: ",
      checkBoxValueLabels
    );
    this.setState({
      checkBoxValueLabels: checkBoxValueLabels
    });*/

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

      console.log("cookEvent.deviceBoards1: ", cookEvent.deviceBoards);

      cookEvent.recipeId = !isEmpty(cookEvent.recipeId)
        ? cookEvent.recipeId
        : "";
      cookEvent.recipeName = !isEmpty(cookEvent.recipeName)
        ? cookEvent.recipeName
        : "";
      cookEvent.deviceBoards = !isEmpty(cookEvent.deviceBoards)
        ? cookEvent.deviceBoards
        : [];
      cookEvent.meatType = !isEmpty(cookEvent.meatType)
        ? cookEvent.meatType
        : "";
      cookEvent.meatWeight = !isEmpty(cookEvent.meatWeight)
        ? cookEvent.meatWeight
        : "";
      cookEvent.totalCookTime = !isEmpty(cookEvent.totalCookTime)
        ? cookEvent.totalCookTime
        : "";
      cookEvent.minutesPerPound = !isEmpty(cookEvent.minutesPerPound)
        ? cookEvent.minutesPerPound
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
      cookEvent.cookNotes = !isEmpty(cookEvent.cookNotes)
        ? cookEvent.cookNotes
        : "";
      cookEvent.purchasePlace = !isEmpty(cookEvent.purchasePlace)
        ? cookEvent.purchasePlace
        : "";
      cookEvent.purchasePrice = !isEmpty(cookEvent.purchasePrice)
        ? cookEvent.purchasePrice
        : "";

      console.log("cookEvent.deviceBoards2: ", cookEvent.deviceBoards);

      //set component fields state
      this.setState({
        recipeId: cookEvent.recipeId,
        recipeName: cookEvent.recipeName,
        deviceBoards: cookEvent.deviceBoards,
        meatType: cookEvent.meatType,
        meatWeight: cookEvent.meatWeight,
        totalCookTime: cookEvent.totalCookTime,
        minutesPerPound: cookEvent.minutesPerPound,
        cookRating: cookEvent.cookRating,
        ovenTemp: cookEvent.ovenTemp,
        cookState: cookEvent.cookState,
        activeInd: cookEvent.activeInd,
        cookNotes: cookEvent.cookNotes,
        purchasePlace: cookEvent.purchasePlace,
        purchasePrice: cookEvent.purchasePrice
      });
      if (this.state.activeInd === true) {
        this.setState({ checked: true });
      } else {
        this.setState({ checked: false });
      }
      console.log(
        "inside comp will receive props.  value of active ind is: ",
        this.state.activeInd
      );
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
                  placeholder="Device Boards"
                  name="deviceBoards"
                  value={this.state.deviceBoards}
                  onChange={this.onChange}
                  error={errors.deviceBoards}
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
                  placeholder="Minutes Per Pound"
                  name="minutesPerPound"
                  value={this.state.minutesPerPound}
                  onChange={this.onChange}
                  error={errors.minutesPerPound}
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

                <div className="example">
                  <label htmlFor="normal-switch">
                    <span>Active Cook Event</span>{" "}
                    <Switch
                      onChange={this.handleChange}
                      checked={this.state.checked}
                      className="react-switch"
                      id="normal-switch"
                    />
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Cook Notes"
                  name="cookNotes"
                  value={this.state.cookNotes}
                  onChange={this.onChange}
                  error={errors.cookNotes}
                />
                <TextFieldGroup
                  placeholder="Purcase Place"
                  name="purchasePlace"
                  value={this.state.purchasePlace}
                  onChange={this.onChange}
                  error={errors.purchasePlace}
                />
                <TextFieldGroup
                  placeholder="Purchase Price"
                  name="purchasePrice"
                  value={this.state.purchasePrice}
                  onChange={this.onChange}
                  error={errors.purchasePrice}
                />

                <input
                  type="submit"
                  onSubmit={this.onSubmit}
                  className="btn btn-info btn-block mt-4"
                  value="Update Cook Event"
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
  editCookEvent: PropTypes.func.isRequired,
  getMyCookEvent: PropTypes.func.isRequired,
  //getActiveCookEventLabel: PropTypes.func.isRequired,
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
  { editCookEvent, getMyCookEvent }
)(withRouter(CookEventEditItem));
