import { Component } from 'preact';
import HandleBusPredictions from './HandleBusPredictions';

export default class BusPredictor extends Component {

	fetchBusPredictions() {
		let handler = new HandleBusPredictions();
		handler.fetchBusPredictions().then((then) => {
			for (let a of then) {
				const dateNow = new Date();
				let diff = ((a.expectedArrival.getTime() - dateNow.getTime()) / 1000) / 60;
				let diffRound =  Math.abs(Math.round(diff));
				console.log(a.lineName + ' ' + a.destinationName + ' ' + diffRound + ' Min(s)');
			}
		});
	}

	dateDiff(dateExpected) {
		const dateNow = new Date();
		let diff = ((dateExpected.getTime() - dateNow.getTime()) / 1000) / 60;
		return Math.abs(Math.round(diff));
	}

	constructor() {
		super();
		// set initial time:
		this.state.time = Date.now();
		this.state.buses = [];
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
		let buses = state.buses;
		return (
			<div>
				<span>{time}</span>
				<button onClick={this.fetchBusPredictions}>Component 1</button>
				<div> {buses.map(item =>  <div> {item.lineName} {item.destinationName} {item.dateDiffStr} </div>) } </div>
			</div>
		);
	}
}