<template>
	<Button class="icon-button">
		<Icon :icon="icon"></Icon>
	</Button>
</template>

<script setup lang="ts">
import type { IconProps } from "./icon.type";
import Button from "../button/button.vue";
import Icon from "./icon.vue";

const { icon } = defineProps<IconProps>();
</script>

<style scoped>
.icon-button {
	--icon-button-size: 48px;
	--button-border-color: transparent;
	--button-padding: 0;
	--button-font-color: var(--main-color);
	--button-hover-font-color: var(--main-color);
}
.icon-button.theme-outline {
	--button-bg-color: transparent;
}
.icon-button.theme-solid {
	--button-hover-bg-color: var(--main-color);
	--button-hover-font-color: var(--white-color);
}

.theme-dark .icon-button {
	--button-bg-color: var(--main-bg-color);
	--button-font-color: var(--main-font-color);
	--button-hover-font-color: var(--main-font-color);
}

.icon-button {
	width: var(--icon-button-size);
	height: var(--icon-button-size);
	font-size: inherit;
}
</style>
