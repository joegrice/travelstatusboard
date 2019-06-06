import './style';
import { Component } from 'preact';
import BusPredict from './Components/BusPredict/BusPredict';

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Component 1</h1>
				<BusPredict />
			</div>
		);
	}
}
