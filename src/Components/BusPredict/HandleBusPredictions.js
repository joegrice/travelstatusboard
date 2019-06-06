import BusPrediction from '../../DTO/BusPrediction';

export default class HandleBusPredictions {
	async fetchBusPredictions() {
		return await fetch('//countdown.api.tfl.gov.uk/interfaces/ura/instant_V1?StopCode1=74804&DirectionID=1&VisitNumber=1&ReturnList=StopCode1,StopPointName,LineName,DestinationText,EstimatedTime,MessageUUID,MessageText,MessagePriority,MessageType,ExpireTime')
			.then((value) => value.body.getReader().read()).then(({ value }) => {
				let string = new TextDecoder('utf-8').decode(value);
				let split = string.split(']');
				// Remove blank at end
				split.pop();
				// Remove unneeded first array
				split.splice(0, 1);
				let buses = [];
				for (let i = 0; i < split.length; i++) {
					let inS = split[i].split('[');
					split[i] = '[' + inS[1];
					split[i] = split[i] + ']';
					let splitJson = JSON.parse(split[i]);
					const expectedArrival = new Date(splitJson[5]);
					let bus = new BusPrediction(splitJson[3], splitJson[4], expectedArrival);
					buses.push(bus);
				}
				return this.sortNextBuses(buses);
			});
	}

	sortNextBuses(array) {
		  return array.sort((a, b) => new Date(a.expectedArrival) - new Date(b.expectedArrival));
	  }
}
