<template>
	<div class="container">
		<div
			class="banner-item"
			v-for="(item, index) in bannerList"
			ref="bannerListEl"
			:class="{
				'banner-active': active === index
			}"
			:key="index"
			:aria-hidden="active === index ? false : true"
		>
			<Link
				:to="item.link"
				target="_blank"
				:tabindex="active === index ? 0 : -1"
				@focus="stopAnimation"
				@blur="startAnimation"
				@keyup="keyboardHandler"
			>
				<img
					class="banner-img"
					loading="lazy"
					:decoding="index === 0 ? 'auto' : 'async'"
					:src="item.image"
					:alt="item.text"
				/>
			</Link>
		</div>
		<IconButton
			@click="prevImg"
			class="prevImg"
			icon="mdiArrowLeft"
			theme="solid"
			circle
			tabindex="-1"
		></IconButton>
		<IconButton
			@click="nextImg"
			class="nextImg"
			icon="mdiArrowRight"
			theme="solid"
			circle
			tabindex="-1"
		></IconButton>
		<div class="changeImgBtnGroup">
			<span
				v-for="(_, index) in Array.from({
					length: showNo
				})"
				:key="index"
				@click="changeActiveImg(index)"
			></span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Link } from "@p/index";
import IconButton from "@/components/icon/iconButton.vue";
import { useBanner } from "../home.hook";

const { list: bannerList, showNo } = useBanner();

const active = ref(0); // 当前展示
const nextActive = ref(1); // 预计下一张展示
const bannerListEl = ref();

let timer: number;
let activating = false;

const autoAnimation = () => {
	activating = false;
	nextImg(undefined, true);
};

const stopAnimation = () => {
	clearTimeout(timer);
};
const startAnimation = () => {
	timer = window.setTimeout(autoAnimation, 6000);
};
const refreshTimeout = () => {
	stopAnimation();
	startAnimation();
};

const bannerAnimation = (className: string) => {
	const nextEl = bannerListEl.value[nextActive.value];
	stopAnimation();
	nextEl.classList.add("banner-next-active");
	nextEl.classList.add(className);

	nextEl.addEventListener(
		"animationend",
		() => {
			bannerListEl.value[active.value].classList.remove("banner-active");
			active.value = nextActive.value;
			nextEl.classList.remove(className, "banner-next-active");

			activating = false;
			refreshTimeout();
		},
		{
			once: true
		}
	);
};

const nextImg = (_?: unknown, isCenterToOutside?: boolean) => {
	if (!activating) {
		activating = true;
		nextActive.value = active.value + 1 >= bannerList.value.length ? 0 : active.value + 1;
		bannerAnimation(isCenterToOutside ? "center-outside-animation" : "right-left-animation");
	}
};
const prevImg = () => {
	if (!activating) {
		activating = true;
		nextActive.value = active.value - 1 < 0 ? bannerList.value.length - 1 : active.value - 1;
		bannerAnimation("left-right-animation");
	}
};
const changeActiveImg = (nextActiveIndex: number) => {
	if (nextActiveIndex === active.value) {
		return;
	}
	if (!activating) {
		activating = true;
		nextActive.value = nextActiveIndex;
		bannerAnimation("center-outside-animation");
	}
};

const keyboardHandler = (ev: KeyboardEvent) => {
	switch (ev.key) {
		case "ArrowRight":
			nextImg();
			break;
		case "ArrowLeft":
			prevImg();
			break;
		default:
			break;
	}
};

onMounted(() => {
	timer = window.setTimeout(autoAnimation, 5000);
});

onUnmounted(() => {
	// 在组件卸载时清理掉正在运行的定时器
	stopAnimation();
});
</script>

<style scoped>
.container {
	--banner-img-aspect-ratio: 1024 / 200;
	--banner-prev-next-btn-size: 30px;
	--banner-btn-bg-color: #333;
}
.container {
	display: flex;
	overflow: hidden;
	position: relative;
}
.container:focus-within {
	outline: thin dotted #c9d1d9;
	outline-offset: 1px;
}

/* 这里是占位框 为了更方便的将所有的 item 叠放在一起 */
.container::before {
	content: "";
	flex: 1 0 100%;
}
.banner-item {
	flex: 1 0 100%;
	margin-inline-start: -100%;
	z-index: -1;
	opacity: 0;
}
.banner-active {
	opacity: 1;
	z-index: 2;
}

.banner-img {
	width: 100%;
	aspect-ratio: var(--banner-img-aspect-ratio);
	object-fit: cover;
}
.nextImg,
.prevImg {
	--icon-button-size: var(--banner-prev-next-btn-size);
	--button-primary-bg-color: var(--banner-btn-bg-color);
	--button-primary-hover-bg-color: var(--banner-btn-bg-color);
	position: absolute;
	top: calc(50% - var(--banner-prev-next-btn-size) / 2);
	left: 90%;
	z-index: 3;
	opacity: 0;
	font-size: 24px;
}
.prevImg {
	left: 10%;
}

.changeImgBtnGroup {
	display: inline-flex;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 16px;
	z-index: 3;
	justify-content: center;
	column-gap: 8px;
	opacity: 0;
}
.changeImgBtnGroup span {
	display: inline-block;
	width: 24px;
	height: 24px;
	background-color: var(--banner-btn-bg-color);
	border-radius: 50%;
	cursor: pointer;
	transition: width 0.3s;
}
.changeImgBtnGroup span:hover {
	width: 48px;
	border-radius: 10px;
}
.container:hover :is(.nextImg, .prevImg, .changeImgBtnGroup) {
	opacity: 0.6;
	transition: opacity 0.5s;
}

.banner-next-active.right-left-animation {
	opacity: 1;
	z-index: 3;
	animation: right-left-animation 1s linear;
}

@keyframes right-left-animation {
	0% {
		clip-path: polygon(110% 0, 100% 50%, 110% 100%, 210% 100%, 210% 0);
	}
	100% {
		clip-path: polygon(0 0, -10% 50%, 0 100%, 100% 100%, 100% 0);
	}
}

.banner-next-active.left-right-animation {
	opacity: 1;
	z-index: 3;
	animation: left-right-animation 1s linear;
}
@keyframes left-right-animation {
	0% {
		clip-path: polygon(-10% 0, 0 50%, -10% 100%, -110% 100%, -110% 0);
	}
	100% {
		clip-path: polygon(100% 0, 110% 50%, 100% 100%, 0 100%, 0 0);
	}
}

.banner-next-active.center-outside-animation {
	opacity: 1;
	z-index: 3;
	animation: center-outside-animation 1s linear;
}
@keyframes center-outside-animation {
	0% {
		clip-path: inset(0 50% 0 50%);
	}
	100% {
		clip-path: inset(0 0 0 0);
	}
}
</style>
