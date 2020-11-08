
const heapify =  (array, size, currentIndex) => {
	let largest = currentIndex;

	let leftChild = 2 * currentIndex + 1;
	let rightChild = 2 * currentIndex + 2;

	if (
		leftChild < size &&
		array[currentIndex].priority < array[leftChild].priority
	) {
		largest = leftChild;
	}

	if (
		rightChild < size &&
		array[largest].priority < array[rightChild].priority
	) {
		largest = rightChild;
	}

	if (largest !== currentIndex) {
		swap(array, currentIndex, largest);
		heapify(array, size, currentIndex);
	}		
}

const insert = (array, element) => {
	let size = array.length;
	if (size == 0) {
		array.push(element);
	} else {
		if (size > 0) {
			array.push(element);
			for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
				heapify(array, size, i);
			}
		}
	}
}

const swap =  (array, currentIndex, largest) =>  {
	const temp = array[currentIndex];
	array[currentIndex] = array[largest];
	array[largest] = temp;
}

const prioritise = (waitlist, currentReservation) => {
	let lastCustomerPriority =
		waitlist.reservation[waitlist.reservation.length - 1].priority;
	let incomingCustomerPriority = lastCustomerPriority += 1;

	let newWaitlistPayload = {
		id: currentReservation.id,
		priority: incomingCustomerPriority
	};

	waitlist.reservation.push(newWaitlistPayload);

	console.log(waitlist.reservation);
	
	let priorityQueue = [];

	for (let i = 0; i < waitlist.reservation.length; i++) {
		insert(priorityQueue, waitlist.reservation[i]);
	}

	console.log(priorityQueue); process.exit();


	return priorityQueue;

}

module.exports = {
	heapify, insert, swap, prioritise
}

