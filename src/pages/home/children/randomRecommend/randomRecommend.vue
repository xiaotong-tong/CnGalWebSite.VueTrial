<template>
	<div class="overflow-hidden" ref="container">
		<div>
			<Panel><span v-color>随机推荐</span></Panel>
		</div>
		<div
			class="h-300px flex"
			ref="scrollContent"
			:style="{
				columnGap: gapX + 'px'
			}"
		>
			<FieldsetCard
				class="item box-border h-full flex-none"
				v-for="item in list"
				:key="item.url"
				:style="{
					width: itemWidth + 'px'
				}"
			>
				<div>
					<img :src="item.image" :alt="item.name" class="w-full" />
				</div>
				<div>{{ item.name }}</div>
				<div class="line-clamp-3">
					{{ item.briefIntroduction }}
				</div>
			</FieldsetCard>
			<!-- 复制内容块以实现首尾相连 -->
			<FieldsetCard
				class="item box-border h-full flex-none"
				v-for="item in list"
				:key="item.url"
				:style="{
					width: itemWidth + 'px'
				}"
			>
				<div>{{ item.name }}</div>
			</FieldsetCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { Panel, FieldsetCard } from "@p/index";
import { useList } from "./hook";
import { gsap } from "gsap";
import { useElementSize } from "@vueuse/core";

const { list, finished } = useList();

const gapX = ref(8);

const container = ref();
const scrollContent = ref();

const { width } = useElementSize(container);

const itemWidth = computed(() => (width.value - gapX.value * 3) / 4);

watch(finished, (value) => {
	if (value) {
		nextTick(() => {
			// 需要 list 渲染完成后才能获取到正确的 scrollContent 的宽度
			const contentWidth = scrollContent.value.scrollWidth / 2; // 修改为一半的宽度

			const timeline = gsap.timeline({ repeat: -1 });

			timeline.to(scrollContent.value, {
				x: -contentWidth,
				duration: 10 * list.value.length - 5 * list.value.length,
				ease: "none",
				modifiers: {
					x: gsap.utils.unitize((x) => parseFloat(x) % contentWidth)
				}
			});

			// 每滚动 5秒后，暂停 5秒
			function toggleAnime(pause: boolean) {
				if (pause) {
					timeline.pause();
				} else {
					timeline.play();
				}
				setTimeout(() => {
					toggleAnime(!pause);
				}, 5000);
			}
			toggleAnime(true);
		});
	}
});
</script>

<style scoped></style>
