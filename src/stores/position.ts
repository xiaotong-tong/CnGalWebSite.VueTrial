import { defineStore } from "pinia";
import { useLocalStorage, useCssVar } from "@vueuse/core";
import { ref } from "vue";

const defaultPositionSettingsConfig = {
	x: 1600,
	xPercent: 0.9
};

export const usePositionStore = defineStore("position", () => {
	const positionSettings = useLocalStorage("position-settings", defaultPositionSettingsConfig);

	const x = ref(positionSettings.value.x);
	const xVar = useCssVar("--page-x", undefined, {
		initialValue: positionSettings.value.x + "px"
	});

	const xPercent = ref(positionSettings.value.xPercent);
	const xPercentVar = useCssVar("--page-x-percent", undefined, {
		initialValue: positionSettings.value.xPercent * 100 + "%"
	});

	return {
		x,
		xVar,
		xPercent,
		xPercentVar
	};
});
