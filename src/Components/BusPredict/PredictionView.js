import { Component } from 'preact';

export default class PredictionView extends Component {
	render() {
		return <div> {this.props.buses.map(item => <div> {item.lineName} {item.destinationName} {item.timeDiff} </div>)} </div>;
	}
}