import type { App } from "vue";
import "virtual:uno.css";
// import "@unocss/reset/normalize.css";

import "./withInstall.css";

import { myColorDir } from "@/directive/color";

const withInstall = {
	install(app: App) {
		app.directive("color", myColorDir);
	}
};

export default withInstall;
