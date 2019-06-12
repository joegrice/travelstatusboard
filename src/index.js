import './style';
import { Component } from 'preact';
import BusPredict from './Components/BusPredict/BusPredict';

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Travel Status Board</h1>
				<div><BusPredict /></div>
			</div>
		);
	}
}
