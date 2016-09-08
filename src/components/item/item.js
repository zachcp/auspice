import React from "react";
import Radium from "radium";
// import _ from "lodash";
// import Flex from "./framework/flex";
import { connect } from "react-redux";
// import { FOO } from "../actions";
import d3 from "d3";
import * as globals from "../../util/globals";
import { processNodes } from "../../util/processNodes";
import toTitleCase from "title-case";


const returnStateNeeded = (fullStateTree) => {
  return {
    tree: fullStateTree.tree
  };
};

@connect(returnStateNeeded)
@Radium
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  drawItemIfData() {
    const p = this.props;
    let markup = "";
    if (
      p.tree.tree
    ) {
    //  markup = (<Tree {...this.props.location}/>);
      const item = this.getItem();
      const itemPageFields = ["strain", "date", "region", "authors", "accession"];
      markup = itemPageFields.map( (field,i) => {
        return this.getFieldMarkup(item, field, i);
      })
    }
    return markup;
  }
  getFieldMarkup(item, field, i) {
    const fieldNameMarkup = toTitleCase(field);
    if (item[field]) {
      let fieldValueMarkup = "Unknown";
      if (field === "accession") {
        if (item["url"]) {
          fieldValueMarkup = (<a href={item["url"]}>{item[field]}</a>);
        } else {
          fieldValueMarkup = (<a href={"http://www.ncbi.nlm.nih.gov/nuccore/"+item["accession"]}>{item[field]}</a>);
        }
      } else if (field === "region") {
          fieldValueMarkup = toTitleCase(item[field]);
      } else {
        fieldValueMarkup = item[field];
      }
      return (
        <p key={i}>
        {fieldNameMarkup}: {fieldValueMarkup}
        </p>
      )
    }
    return null;
  }
  getItem() {
    const test_sample_string = "V17271";
    const d3tree = d3.layout.tree()
      .size([this.treePlotHeight(globals.width), globals.width]);
    const nodes = processNodes(d3tree.nodes(this.props.tree.tree));
    let found = null;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.hasOwnProperty('strain')){
        if (node.strain === test_sample_string){
          found = node;
          break;
        }
      }
    }
    return found;
  }
  treePlotHeight(width) {
    return 400 + 0.30 * width;
  }
  static propTypes = {
    /* react */
    // dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object,
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  getStyles() {
    return {
      base: {

      }
    };
  }
  render() {
    const styles = this.getStyles();
    return (
      <div style={[
        styles.base,
        this.props.style
      ]}>
        {this.drawItemIfData()}
      </div>
    );
  }
}

export default Item;

/*

propTypes: {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // Anything that can be rendered: numbers, strings, elements or an array
    // (or fragment) containing these types.
    optionalNode: React.PropTypes.node,

    // A React element.
    optionalElement: React.PropTypes.element,

    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalMessage: React.PropTypes.instanceOf(Message),

    // You can ensure that your prop is limited to specific values by treating
    // it as an enum.
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // An object that could be one of many types
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // An array of a certain type
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // An object with property values of a certain type
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: React.PropTypes.func.isRequired,

    // A value of any data type
    requiredAny: React.PropTypes.any.isRequired,

*/
