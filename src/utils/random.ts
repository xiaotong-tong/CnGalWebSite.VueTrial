const getRandom = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffle = <T>(list: T[]): T[] => {
	for (let i = list.length - 1; i >= 0; i--) {
		const r = getRandom(0, i);
		const temp = list[r];
		list[r] = list[i];
		list[i] = temp;
	}
	return list;
};

export const nonRepeatRandomList = (min: number, max: number, size: number, initList?: number[]): Set<number> => {
	let set = new Set(initList);
	if (max - min < size) {
		return set;
	}
	while (set.size < size) {
		set.add(getRandom(min, max));
	}
	return set;
};

export const getNonRepeatRandomList = <T>(data: T[], wantLength: number): T[] => {
	if (data.length <= wantLength) {
		return shuffle(data);
	} else {
		let list: T[] = [];
		// 在列表中随机选取 wantLength 项
		const set = nonRepeatRandomList(0, data.length - 1, wantLength);
		set.forEach((i) => {
			list.push(data[i]);
		});
		return list;
	}
};
