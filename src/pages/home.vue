<template>
	<MyHeader></MyHeader>
	<main
		class="my-2 mx-auto"
		:style="{
			width: `min(${positionStore.xVar}, ${positionStore.xPercentVar})`
		}"
	>
		<RouterView />
	</main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MyHeader from "./homeComponents/header.vue";
import { usePositionStore } from "@/stores/position";

const positionStore = usePositionStore();
</script>

<style scoped></style>
