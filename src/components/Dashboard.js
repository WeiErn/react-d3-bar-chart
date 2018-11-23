import React, { Component } from 'react';
import * as d3 from 'd3';
import './Dashboard.css';

const margin = 100;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

class Dashboard extends Component {
    state = {
        type: "",
        bars: [],
        xScale: d3.scaleBand().range([0, width]).padding(0.4),
        yScale: d3.scaleLinear().range([height, 0])
    };

    xAxis = () => d3.axisBottom().scale(this.state.xScale);
    yAxis = () => d3.axisLeft().scale(this.state.yScale);

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.chosenData) return null;
        const {type, data} = nextProps.chosenData;
        const {xScale, yScale} = prevState;

        const yMax = d3.max(data, d => d['total_docs']);
        xScale.domain(data.map(s => s.name));
        yScale.domain([0, yMax + 0.05 * yMax]);

        const bars = data.map(d => ({
            name: d.name,
            totalDocs: d['total_docs'],
            x: xScale(d.name),
            y: yScale(d['total_docs']),
            height: height - yScale(d['total_docs']),
            width: xScale.bandwidth()
        }));

        return {bars, type};
    }

    mouseOverGroup = event => {
        const rect = event.currentTarget.children[0];
        d3.select(rect)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
            .attr('x', this.state.xScale(rect.getAttribute('name')) - 5)
            .attr('width', this.state.xScale.bandwidth() + 10);

        const text = event.currentTarget.children[1];
        d3.select(text)
            .transition()
            .duration(300)
            .attr("style", "opacity: 1");
    };

    mouseOutGroup = event => {
        const rect = event.currentTarget.children[0];
        d3.select(rect)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', this.state.xScale(rect.getAttribute('name')))
            .attr('width', this.state.xScale.bandwidth());

        const text = event.currentTarget.children[1];
        d3.select(text)
            .transition()
            .duration(300)
            .attr("style", "opacity: 0");
    };

    componentDidMount() {
        d3.select(this.refs.xAxis).call(this.xAxis());
        d3.select(this.refs.yAxis).call(this.yAxis());
        d3.select(this.refs.xLines).call(this.xAxis()
            .tickSize(-height, 0, 0)
            .tickFormat(''));
        d3.select(this.refs.yLines).call(this.yAxis()
            .tickSize(-width, 0, 0)
            .tickFormat(''));
    }

    componentDidUpdate() {
        d3.select(this.refs.xAxis).call(this.xAxis());
        d3.select(this.refs.yAxis).call(this.yAxis());
        d3.select(this.refs.xLines).call(this.xAxis()
            .tickSize(-height, 0, 0)
            .tickFormat(''));
        d3.select(this.refs.yLines).call(this.yAxis()
            .tickSize(-width, 0, 0)
            .tickFormat(''));
    }

    render(){

        return (
            <div id="container" >
                <svg width={width} height={height} style={{border:'solid 1px #eee',borderBottom:'solid 1px #ccc'}}>
                    <g ref='chart' transform={`translate(${margin+15}, ${margin})`}>
                        <g ref='barGroup'>
                            {this.state.bars.map((d, i) =>
                                (
                                    <g className='barValueGroup' key={`${i}-group`}
                                       onMouseOver={this.mouseOverGroup}
                                       onMouseOut={this.mouseOutGroup}
                                    >
                                        <rect className='bar' key={`${i}-bar`}
                                            name={d.name}
                                            x={d.x} y={d.y}
                                            height={d.height} width={d.width}
                                        />
                                        <text ref='value' className='value' key={`${i}-value`}
                                            x={this.state.xScale(d.name) + this.state.xScale.bandwidth() / 2}
                                            y={this.state.yScale(d.totalDocs) - 10}
                                            textAnchor='middle'
                                            style={{opacity: 0}}
                                        >
                                            {d.totalDocs}
                                        </text>
                                    </g>
                                ))}
                        </g>
                        <g ref='xAxis' className='xAxis' transform={`translate(0, ${height})`} />
                        <g ref='yAxis' className='yAxis' />
                        <g ref='xLines' className='grid' transform={`translate(0, ${height})`} />
                        <g ref='yLines' className='grid' />
                    </g>
                    <text className='label'
                          x={`${width / 2 + margin}`}
                          y={`${height + margin * 1.7}`}
                          textAnchor='middle'>
                        {this.state.type}
                    </text>
                    <text className='label'
                          x={`${-(height / 2) - margin}`}
                          y={`${margin / 2.4}`}
                          transform='rotate(-90)'
                          textAnchor='middle'>
                        Total Documents
                    </text>
                </svg>
            </div>
        )
    }
}

export default Dashboard;