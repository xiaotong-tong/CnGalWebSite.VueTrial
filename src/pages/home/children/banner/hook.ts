import type { HomeCarouselsView } from "./type";
import { ref, watch } from "vue";
import { nonRepeatRandomList } from "@/utils/random";
import { getHomeCarouselsView } from "./api";

const list = ref<HomeCarouselsView[]>([]);
const allList = ref<HomeCarouselsView[]>([]);
const showNo = ref(6);

const sliceBannerList = () => {
	const allLength = allList.value.length;

	if (allLength <= showNo.value) {
		list.value = allList.value;
	} else {
		// 选取列表中前三项，以及在其它项中随机选取三项
		const set = nonRepeatRandomList(3, allLength - 1, showNo.value, [0, 1, 2]);
		const temp: HomeCarouselsView[] = [];
		set.forEach((value) => {
			temp.push(allList.value[value]);
		});
		list.value = temp;
	}
};

watch(showNo, () => {
	sliceBannerList();
});

export const useBanner = () => {
	getHomeCarouselsView().then((res) => {
		allList.value = res.data;
		sliceBannerList();
	});

	return {
		list,
		showNo,
		allList
	};
};
