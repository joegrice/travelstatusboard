import './style';
import { Component } from 'preact';
import BusPrediction from './Components/BusPredict/BusPredict';

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello, World!</h1>
				<h1><BusPrediction /></h1>
			</div>
		);
	}
}
