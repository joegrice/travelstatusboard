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
					split[i] = split[i] + ']';
					let splitJson = JSON.parse(split[i]);
					const expectedArrival = new Date(splitJson[5]);
					const timeDiff = this.timeDiff(expectedArrival);
					let bus = new BusPrediction(splitJson[3], splitJson[4], expectedArrival, timeDiff);
					buses.push(bus);
				}
				return this.sortNextBuses(buses);
			});
	}

	prepareMinutes(minutes) {
		switch (minutes) {
			case 0:
				return 'Due';
			case 1:
				return minutes + ' Min';
			default:
				return minutes + ' Mins';
		}
	}

	timeDiff(dateExpected) {
		const dateNow = new Date();
		let diff = ((dateExpected.getTime() - dateNow.getTime()) / 1000) / 60;
		const minutes = Math.abs(Math.round(diff));
		return this.prepareMinutes(minutes);
	}

	sortNextBuses(array) {
		  return array.sort((a, b) => new Date(a.expectedArrival) - new Date(b.expectedArrival));
	  }
}
