import { watch } from "vue";
import { useColorStore } from "@/stores/color";

export const myColorDir = {
	beforeMount(el: HTMLElement) {
		const colorStore = useColorStore();

		watch(
			() => colorStore.defaultColor,
			() => {
				el.style.color = colorStore.defaultColor || "#F06292";
			},
			{
				immediate: true
			}
		);
	}
};
