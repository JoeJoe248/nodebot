import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMyCookLog } from "../../actions/cookLogActions";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "Boston",
          "Worchester",
          "Springfield",
          "Lowell",
          "Cambridge",
          "New Bedford"
        ],
        dataSets: [
          {
            label: "Population",
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,236,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(153,102,255,0.6)",
              "rgba(255,159,64,0.6)"
            ]
          }
        ]
      }
    };
  }

  componentDidMount() {
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
  }
  render() {
    return (
      <div className="chart">
        <Line data={this.state.chartData} options={{}} />
      </div>
    );
  }
}

Chart.propTypes = {
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
)(Chart);
