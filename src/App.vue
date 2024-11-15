<script setup lang="ts">
import { watch } from "vue";
import { config } from "@p/index";
import { useColorStore } from "@/stores/color";
// import { invoke } from "@tauri-apps/api/core";

const colorStore = useColorStore();

// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//   greetMsg.value = await invoke("greet", { name: name.value });
// }

watch(
	() => colorStore.defaultColor,
	() => {
		config.defaultColor.value = colorStore.defaultColor || "#F06292";
	},
	{ immediate: true }
);
</script>

<template>
	<RouterView />
</template>

<style></style>
