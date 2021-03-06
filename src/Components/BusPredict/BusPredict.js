import { Component } from 'preact';
import HandleBusPredictions from './HandleBusPredictions';
import PredictionView from './PredictionView';

export default class BusPredictor extends Component {

	fetchBusPredictions() {
		let handler = new HandleBusPredictions();
		handler.fetchBusPredictions().then((value) => {
			this.setState({
				buses: [this.state.buses, <PredictionView buses={value} />]
			});
		});
	}

	constructor() {
		super();
		// set initial time:
		this.state.time = Date.now();
		this.state.buses = [];

		// This syntax ensures `this` is bound within functions
		this.fetchBusPredictions = this.fetchBusPredictions.bind(this);
	}

	componentDidMount() {
		// update time every second
		this.timer = setInterval(() => {
			this.setState({ time: Date.now() });
		}, 1000);
	}

	componentWillUnmount() {
		// stop when not renderable
		clearInterval(this.timer);
	}

	render(props, state) {
		let time = new Date(state.time).toLocaleTimeString();
		return (
			<div>
				<span>{time}</span>
				<button onClick={this.fetchBusPredictions}>Component 1</button>
				{state.buses}
			</div>
		);
	}
}