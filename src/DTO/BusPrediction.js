export default class BusPrediction {
	constructor(lineName, destinationName, expectedArrival, timeDiff) {
		this.lineName = lineName;
		this.destinationName = destinationName;
		this.expectedArrival = expectedArrival;
		this.timeDiff = timeDiff;
	}
}