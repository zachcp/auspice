import React from "react";
import Radium from "radium";
import Select from "react-select";
import SelectLabel from "../framework/select-label";
import { controlsWidth } from "../../util/globals";
import { connect } from "react-redux";
import { applyFilterQuery } from "../../actions/treeProperties"
import { analyticsControlsEvent } from "../../util/googleAnalytics";

/*
 * this component implements a multiselect filter for a particular tip attr
*/
@Radium
@connect((state) => ({selections: state.controls.filters}))
class ChooseFilter extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    filterName: React.PropTypes.string.isRequired,
    filterOptions: React.PropTypes.object.isRequired
  }

  parseFilterQuery(query) {
    if (query===""){
      return {fields:[], filters:[]}
    } else {
      const tmp = query.split("-").map((d) => d.split("."));
      return {"fields": tmp.map( (d) => d[0] ), "filters": tmp.map( (d) => d[d.length - 1] )};
    }
  }

  setFilterQuery(e) {
    /* the variables of interest:
    this.props.filterName: e.g. authors || country
    values: list of selected values, e.g [brazil, usa, ...]
    */
    const values = e.map((d) => d["value"]);
    analyticsControlsEvent(`filter-${this.props.filterName.replace(/\s/gi, "-")}`);
    this.props.dispatch(
      applyFilterQuery(this.props.filterName, values)
    );
  }

  render() {
    const options = Object.keys(this.props.filterOptions);
    const counts = Object.values(this.props.filterOptions);
    const selectOptions = [];
    for (let i = 0; i < options.length; i++) {
      selectOptions.push({
        value: options[i],
        label: options[i] + (counts[i] ? " (" + counts[i] + ")" : "")
      });
    }
    return (
      <div style={{marginBottom: 10}}>
        <SelectLabel text={this.props.filterName}/>
        <Select
          style={{width: controlsWidth}}
          name="form-field-name"
          value={this.props.selections[this.props.filterName]}
          multi={true}
          options={selectOptions}
          onChange={(e) => this.setFilterQuery(e)}
        />
      </div>
    );
  }
}

export default ChooseFilter;
