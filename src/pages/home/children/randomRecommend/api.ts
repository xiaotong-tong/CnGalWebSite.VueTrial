import type { AxiosResponse } from "axios";
import type { ListHotRecommends } from "./type";
import axios from "@/api/axios";

// 缓存数据，减少一定时间内的重复请求
const cache = new Map();

export async function getListHotRecommends(): Promise<AxiosResponse<ListHotRecommends[]>> {
	// 如果cache中有数据，且未过期，则直接返回
	if (cache.has("ListHotRecommends")) {
		const { value, expire } = cache.get("ListHotRecommends");
		if (expire > Date.now()) {
			return value;
		}
	}

	const data: AxiosResponse<ListHotRecommends[]> = await axios.get("/api/home/ListHotRecommends");
	// 获取banner数据，将数据存入cache中，过期时间为5分钟
	cache.set("ListHotRecommends", {
		value: data,
		expire: Date.now() + 1000 * 60 * 5
	});
	return data;
}
