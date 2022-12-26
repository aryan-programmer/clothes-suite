function* generator () {
	let i = 0;
	while (true) {
		yield "0x" +
		(++i).toString(16).padStart(2, "0") +
		Math.random().toString(16).slice(2, 10);
	}
	// noinspection UnreachableCodeJS
	return ""; // eslint-disable-line no-unreachable
}

const knowObjects                         = new Map<any, string>();
const refsRec: Record<string, any>        = {};
const generate: Generator<string, string> = generator();

export function randomAddress () {
	return generate.next().value;
}

export const addresses: Readonly<Record<string, any>> = refsRec;

export function getAddress (object: object) {
	let address: string;
	if (knowObjects.has(object)) {
		address = knowObjects.get(object)!;
	} else {
		address = generate.next().value;
		knowObjects.set(object, address);
		refsRec[address] = object;
	}
	return address;
}
