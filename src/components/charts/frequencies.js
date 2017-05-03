import React from "react";
import { connect } from "react-redux";
import * as globals from "../../util/globals";
import Card from "../framework/card";
import computeResponsive from "../../util/computeResponsive";
import _ from "lodash";

@connect(state => {
  return {
    nodes: state.tree.nodes,
    visibility: state.tree.visibility,
    nodeColors: state.tree.nodeColors,
    browserDimensions: state.browserDimensions.browserDimensions,
    colorBy: state.controls.colorBy
  };
})

class Frequencies extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        nodes: null,
        visibility: false,
        nodeColors: null,
        browserDimensions: null,
        colorBy: null
      };
    }

  componentDidMount(props) {
    // console.log('initial props', this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.getCounts(nextProps)
    // console.log('new props', nextProps)
    // this.maybeComputeResponive(nextProps);
    // this.maybeRemoveAllDemesAndTransmissions(nextProps); /* dataset or colorby just changed, this change is upstream of maybeDraw */
  }

  componentDidUpdate(prevProps, prevState) {
    // this.maybeCreateLeafletMap(); /* puts leaflet in the DOM, only done once */
    // this.maybeSetupD3DOMNode(); /* attaches the D3 SVG DOM node to the Leaflet DOM node, only done once */
    // this.maybeDrawDemesAndTransmissions(prevProps); /* it's the first time, or they were just removed because we changed dataset or colorby or resolution */
    // this.maybeUpdateDemesAndTransmissions(); /* every time we change something like colorBy */
    // this.maybeAnimateDemesAndTransmissions();
  }

  getCounts(props) {
    let all_states = [];
    let all_xvals = [];
      for (let n in props.visibility){
        if (props.visibility[n] === "visible"){
          all_states.push(props.nodes[n].attr[props.colorBy])
          all_xvals.push(props.nodes[n].x)
        };

    let denominator = all_states.length
    let unique = all_states.filter((x, i, a) => a.indexOf(x) == i)
    console.log(unique)
      };
  }


  getChartGeom(props) {
    const responsive = computeResponsive({
      horizontal: 1,
      vertical: .3333333,
      browserDimensions: this.props.browserDimensions,
      sidebar: this.props.sidebar
    });
    return {
      responsive,
      width: responsive.width,
      height: 300,
      padBottom: 50,
      padLeft: 15,
      padRight: 12
    };
  }

  drawFrequencies() {
    const frequencyChartWidth = 900;
    const frequencyChartHeight = 300;
    const bottomPadding = 45;
    const leftPadding = 80;
    const rightPadding = 80;
    const x = d3.scale.linear()
                    .domain([pivots[0], pivots[pivots.length-1]]) // original array, since the x values are still mapped to that
                    .range([leftPadding, frequencyChartWidth - rightPadding]);

    const y = d3.scale.linear()
                    .domain([0, 1.05]) // original array, since the x values are still mapped to that
                    .range([frequencyChartHeight-bottomPadding, 0]);
  }

  render() {
    const chartGeom = this.getChartGeom();
    return (
      <Card>
        <svg
          style={{pointerEvents: "auto"}}
          width={chartGeom.responsive.width}
          height={chartGeom.height}
          >
          <g ref="d3freq" id="d3freq"/>
        </svg>
      </Card>
    );
  }
}

export default Frequencies;
