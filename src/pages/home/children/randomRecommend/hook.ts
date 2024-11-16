import type { ListHotRecommends } from "./type";
import { ref } from "vue";
import { getListHotRecommends } from "./api";

const list = ref<ListHotRecommends[]>([]);
const finished = ref(false);

export const useList = () => {
	getListHotRecommends().then((res) => {
		list.value = res.data;
		finished.value = true;
	});

	return {
		list,
		finished
	};
};
