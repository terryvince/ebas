// 获取节点信息
const querySelector = (selector) => new Promise((resolve, reject) => {
	const query = uni.createSelectorQuery();
	query.select(selector).boundingClientRect(data => {
		resolve(data)
	}).exec();
})

/** 转换对象的key
 * @param origin {object} -原始对象
 * @param map {object} -映射关系对象 {oldKey:newKey}
 * @param isKeepOldKey {boolean} -是否保留原有的key和值,默认保留原有的key
 * @example objectMap({a:1,b:2,c:3},{b:'映射b'}) => {a:1,b:2,映射b:2,c:3}
 * @return {object}
 */
const objectMap = (origin, map, isKeepOldKey = true) => {
	let target = JSON.parse(JSON.stringify(origin))
	let keys = Object.keys(target);
	keys.map(key => {
		let newKey = map[key]
		if (map[key]) {
			target[newKey] = target[key]
		}
		if (!isKeepOldKey) { // 没有指定关系映射key将默认保留
			delete target[key]
		}
	})
	return target
}

export {
	querySelector,
	objectMap
}
