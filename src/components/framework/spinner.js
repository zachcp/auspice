import React from "react";
import Radium from "radium";
import _ from "lodash";
// import Flex from "./framework/flex";
// import { connect } from "react-redux";
// import { FOO } from "../actions";

// @connect(state => {
//   return state.FOO;
// })
@Radium
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
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

  componentDidMount() {
    setInterval(() => {
      this.setState({counter: this.state.counter + 1})
    }, 100)
  }

  componentWillUnmount() {
  }

  svgSpinner(offset) {
    const n = 35;
    const colors = [
      "#4137C2","#3F43C8","#3F50CC","#3E5DD0","#4068CF","#4274CE","#457FCB","#4988C5","#4C91BF",
      "#5199B8","#56A0AF","#5BA6A6","#61AB9C","#68AF93","#6EB389","#76B67F","#7EB876","#86BB6E",
      "#8FBC66","#98BD5E","#A1BE58","#AABD52","#B3BD4D","#BBBC49","#C4BA45","#CCB742","#D2B240",
      "#D9AE3E","#DEA73C","#E19F3A","#E59738","#E68C36","#E68033","#E67431","#E4652E"
    ];
    const pathStrings = [
      "M 259.234375 65.03125 L 236.410156 54.007812 L 253.558594 19.894531 L 284.4375 22.679688 Z M 259.234375 65.03125",
      "M 142.03125 60.804688 L 155.03125 52.34375 L 148.03125 78.789062 L 120.28125 82.898438 Z M 142.03125 60.804688",
      "M 396.949219 288.203125 L 377.472656 312.324219 L 376.855469 267.992188 L 399.660156 238.027344 L 403.679688 274.21875 Z M 396.949219 288.203125",
      "M 105.160156 270.074219 L 94.199219 258.3125 L 108.578125 285.777344 Z M 105.160156 270.074219",
      "M 267.617188 364.257812 L 252.179688 356.378906 L 236.613281 363.996094 Z M 267.617188 364.257812",
      "M 195.523438 29.949219 L 212.515625 33.730469 L 225.539062 22.183594 Z M 195.523438 29.949219",
      "M 352.238281 287.5625 L 310.957031 275.976562 L 327.269531 348.289062 L 353.992188 332.570312 Z M 352.238281 287.5625",
      "M 422.105469 185.484375 L 424.554688 169.867188 L 425.820312 200.84375 Z M 422.105469 185.484375",
      "M 212.515625 33.730469 L 195.523438 29.949219 L 167.386719 42.964844 L 155.03125 52.34375 L 148.03125 78.789062 L 184.804688 142.542969 L 227.742188 187.75 L 253.054688 195.625 L 254.308594 189.152344 L 272.851562 108.503906 L 259.234375 65.03125 L 236.410156 54.007812 Z M 212.515625 33.730469",
      "M 206.160156 358.191406 L 177.238281 347.027344 L 195.40625 343 Z M 206.160156 358.191406",
      "M 150.78125 330.863281 L 177.238281 347.027344 L 195.40625 343 L 182.78125 308.183594 L 145.910156 313.039062 Z M 150.78125 330.863281",
      "M 121.144531 166.164062 L 143.101562 149.433594 L 184.804688 142.542969 L 227.742188 187.75 L 192.183594 218.929688 L 84.964844 228.71875 L 81.179688 197.949219 L 88.152344 182.824219 Z M 121.144531 166.164062",
      "M 396.949219 288.203125 L 411.789062 260.984375 L 403.679688 274.21875 Z M 396.949219 288.203125",
      "M 327.269531 348.289062 L 310.957031 275.976562 L 271.511719 247.84375 L 274.128906 349.699219 L 298.164062 358.964844 Z M 327.269531 348.289062",
      "M 212.515625 33.730469 L 225.539062 22.183594 L 253.558594 19.894531 L 236.410156 54.007812 Z M 212.515625 33.730469",
      "M 94.199219 258.3125 L 105.160156 270.074219 L 172.207031 264.195312 L 192.183594 218.929688 L 84.964844 228.71875 Z M 94.199219 258.3125",
      "M 148.03125 78.789062 L 184.804688 142.542969 L 143.101562 149.433594 L 102.835938 108.527344 L 120.28125 82.898438 Z M 148.03125 78.789062",
      "M 388.660156 85.152344 L 395.929688 98.921875 L 405.671875 111.074219 Z M 388.660156 85.152344",
      "M 90.261719 136.863281 L 82.964844 166.996094 L 88.152344 182.824219 L 121.144531 166.164062 Z M 90.261719 136.863281",
      "M 403.679688 274.21875 L 399.660156 238.027344 L 414.878906 207.847656 L 421.519531 231.546875 L 411.789062 260.984375 Z M 403.679688 274.21875",
      "M 351.410156 58.15625 L 329.824219 127.03125 L 253.558594 192.363281 L 254.308594 189.152344 L 272.851562 108.503906 L 314.316406 30.949219 L 342.230469 44.433594 Z M 351.410156 58.15625",
      "M 105.160156 270.074219 L 172.207031 264.195312 L 182.78125 308.183594 L 145.910156 313.039062 L 127.644531 310.226562 L 108.578125 285.777344 Z M 105.160156 270.074219",
      "M 90.261719 136.863281 L 102.835938 108.527344 L 143.101562 149.433594 L 121.144531 166.164062 Z M 90.261719 136.863281",
      "M 367.28125 62.699219 L 351.410156 58.15625 L 329.824219 127.03125 L 386.207031 129.113281 L 395.929688 98.921875 L 388.660156 85.152344 Z M 367.28125 62.699219",
      "M 352.238281 287.5625 L 353.992188 332.570312 L 377.472656 312.324219 L 376.855469 267.992188 Z M 352.238281 287.5625",
      "M 155.03125 52.34375 L 142.03125 60.804688 L 167.386719 42.964844 Z M 155.03125 52.34375",
      "M 422.105469 185.484375 L 424.554688 169.867188 L 417.765625 139.617188 L 386.207031 129.113281 L 329.824219 127.03125 L 253.558594 192.363281 L 254.308594 189.152344 L 253.054688 195.625 L 271.511719 247.84375 L 310.957031 275.976562 L 352.238281 287.5625 L 376.855469 267.992188 L 399.660156 238.027344 L 414.878906 207.847656 Z M 422.105469 185.484375",
      "M 259.234375 65.03125 L 272.851562 108.503906 L 314.316406 30.949219 L 284.4375 22.679688 Z M 259.234375 65.03125",
      "M 395.929688 98.921875 L 386.207031 129.113281 L 417.765625 139.617188 L 405.671875 111.074219 Z M 395.929688 98.921875",
      "M 192.183594 218.929688 L 172.207031 264.195312 L 182.78125 308.183594 L 195.40625 343 L 206.160156 358.191406 L 236.613281 363.996094 L 252.179688 356.378906 L 274.128906 349.699219 L 271.511719 247.84375 L 253.054688 195.625 L 227.742188 187.75 Z M 192.183594 218.929688",
      "M 88.152344 182.824219 L 81.179688 197.949219 L 82.964844 166.996094 Z M 88.152344 182.824219",
      "M 422.105469 185.484375 L 425.820312 200.84375 L 421.519531 231.546875 L 414.878906 207.847656 Z M 422.105469 185.484375",
      "M 252.179688 356.378906 L 274.128906 349.699219 L 298.164062 358.964844 L 267.617188 364.257812 Z M 252.179688 356.378906",
      "M 351.410156 58.15625 L 367.28125 62.699219 L 342.230469 44.433594 Z M 351.410156 58.15625",
      "M 150.78125 330.863281 L 127.644531 310.226562 L 145.910156 313.039062 Z M 150.78125 330.863281"
    ];

    const paths = _.range(n).map((i) => {
      return (
        <path style={{fill: colors[(i+offset) % n], stroke:"#fff"}} d={pathStrings[i]}/>
      )
    })

    return (
      <svg width="360pt" height="360pt" viewBox="0 0 360 360" style={{background: "#fff"}}>
        <g id="spinner-group"  transform="matrix(1,0,0,1,-74,-13)">
          {paths}
        </g>
      </svg>
    )
  }

  getStyles() {
    return {
      base: {

      }
    };
  }
  render() {

    console.log('spinner rendered', this.state.counter)
    const styles = this.getStyles();
    return (
      <div style={[
        styles.base,
        this.props.style
      ]}>
        {this.svgSpinner(this.state.counter)}
      </div>
    );
  }
}

export default Spinner;

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
