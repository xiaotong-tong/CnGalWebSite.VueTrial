import { defineStore } from "pinia";
import { useLocalStorage, useCssVar } from "@vueuse/core";

const defaultColorSettingsConfig = {
	default: "#F06292"
};

export const useColorStore = defineStore("color", () => {
	const colorSettings = useLocalStorage("color-settings", defaultColorSettingsConfig);

	const defaultColor = useCssVar("--d-color", undefined, {
		initialValue: colorSettings.value.default
	});

	return {
		defaultColor
	};
});
