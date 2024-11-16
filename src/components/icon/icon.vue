<template>
	<i class="icon">
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<path :d="reflectIcon(icon)"></path>
		</svg>
	</i>
</template>

<script setup lang="ts">
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";
import type { IconProps } from "./icon.type";

const { icon = "mdiArrowLeft" } = defineProps<IconProps>();

const reflectIcon = (icon: IconProps["icon"]) => {
	const mdiMap = {
		mdiArrowLeft,
		mdiArrowRight
	};

	return mdiMap[icon];
};
</script>

<style scoped>
.icon {
	display: inline-block;
	width: 1em;
	height: 1em;
	fill: currentColor;
}
</style>
