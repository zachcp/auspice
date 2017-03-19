import React from "react";
import Radium from "radium";
import ChooseFilter from "./choose-filter";
import { connect } from "react-redux";

/*
 * this component implements a series of selectors to filter to tips
*/
@Radium
@connect((state) => ({metadata: state.metadata}))
class AllFilters extends React.Component {
  static propTypes = {
    metadata: React.PropTypes.object.isRequired // should use shape here
  }
  render() {
    const filters = [];
    if (this.props.metadata.metadata) {
      for (let key in this.props.metadata.metadata.filter_options) {
        filters.push(
          <ChooseFilter
            key={key}
            filterOptions={this.props.metadata.metadata.filter_options[key]}
            filterName={key}
          />
        );
      }
    }
    return (
      <div>
        {filters}
      </div>
    );
  }
}

export default AllFilters;
