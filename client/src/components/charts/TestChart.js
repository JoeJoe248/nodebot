import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyCookLog } from "../../actions/cookLogActions";

class TestChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true,
    diplayLegend: true,
    legendPosition: "right"
  };

  /*componentDidMount() {
    this.props.getMyCookLog();
    //this.setState({ recipeName: recipe.recipeName });
    //console.log("recipe: ", recipe);
  }

  componentWillReceiveProps(nextProps) {
    const myCookLog = nextProps.myCookLog ? nextProps.myCookLog : {};
    this.setState({
      myCookLog: myCookLog
    });

    console.log("cook log: ", JSON.stringify(myCookLog));
    //const recipeName = this.state.recipes.recipe.recipeName;
    //console.log("recipeName: ", recipeName);

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }*/

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Cook Log Data",
              fontSize: 25
            },
            legend: {
              display: this.props.diplayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

TestChart.propTypes = {
  getMyCookLog: PropTypes.func.isRequired,
  //profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  //auth: PropTypes.object.isRequired,
  cookLog: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    //profile: state.profile,
    //auth: state.auth,
    //recipe: state.recipes.recipe,
    cookLog: state.cookLog,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getMyCookLog }
)(TestChart);
