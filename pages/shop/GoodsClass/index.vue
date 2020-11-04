<style lang="less">
	page {
		background: #fff;
	}

	.productSort {
		height: 100%;

		.header {
			background-color: #EFEDEB;
		}

		.index .header .search {
			background-color: white;
		}
	}

	.productSort .conter .list .item .picture image {
		border-radius: 10rpx;
	}

	.productSort .aside .item.on {
		color: #00C65D;
		border-left: 4rpx solid #00C65D;
	}

	.productSort .index .header {
		background-color: white;

		.search {
			background-color: #EEEEEE;
			border: 0px solid #fe565f;
			border-radius: 50rpx;
			overflow: hidden;
		}

		.icon-search {
			width: 34rpx;
		}

		.search-button {
			box-sizing: border-box;
			border: none;
			background-color: #00C65D;
			height: 100%;
			border-radius: 50rpx 0 0 50rpx;
			line-height: 1;
			padding: 0 40rpx;
			border-radius: 50rpx;
			color: white;
			position: absolute;
			right: 0;
			top: 0;
		}
	}
</style>
<template>
	<view class="productSort">
		<div class="index">
			<view class="header acea-row row-center-wrapper">
				<view @click="goGoodSearch()" class="search flex-main-start relative">
					<view class="acea-row row-middle">
						<image class="icon-search" src="http://qj5wtf3w8.hn-bkt.clouddn.com/icon-search.png" mode="widthFix"></image>
						<text class="left-10">搜索商品</text>
					</view>
					<view class="search-button flex-main-center">搜索</view>
				</view>
			</view>
		</div>
		<view class="aside">
			<view class="item acea-row row-center-wrapper" :class="categoryDivindex === navActive ? 'on' : ''" v-for="(item, categoryDivindex) in category"
			 :key="categoryDivindex" @click="asideTap(categoryDivindex)">
				<text>{{ item.cateName }}</text>
			</view>
		</view>
		<view class="conter">
			<view v-for="(item, eq) in category" :key="eq">
				<view class="listw" v-if="eq === navActive">
					<view class="title acea-row row-center-wrapper" ref="title">
						<view class="line"></view>
						<view class="name">{{ item.cateName }}</view>
						<view class="line"></view>
					</view>
					<view class="list acea-row">
						<view class="item acea-row row-column row-middle" v-for="(child, categoryIndex) in item.children" :key="categoryIndex"
						 @click="goGoodsList(child)">
							<view class="picture">
								<image :src="child.pic" />
							</view>
							<view class="name line1">{{ child.cateName }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height:100rpx;"></view>
	</view>
</template>
<script>
	import {
		getCategory
	} from "@/api/store";
	import {
		trim
	} from "@/utils";

	export default {
		name: "GoodsClass",
		components: {},
		props: {},
		data: function() {
			return {
				category: [],
				navActive: 0,
				search: "",
				lock: false
			};
		},
		watch: {
			"$yroute.query.id": function(n) {
				if (n) {
					this.activeCateId(n);
				}
			}
		},
		mounted: function() {
			// document.addEventListener("scroll", this.onScroll, false);
			this.loadCategoryData();
		},
		methods: {
			goGoodSearch() {
				this.$yrouter.push("/pages/shop/GoodSearch/index");
			},
			goGoodsList(child) {
				this.$yrouter.push({
					path: "/pages/shop/GoodsList/index",
					query: {
						id: child.id,
						title: child.cateName
					}
				});
			},
			activeCateId(n) {
				let index = 0;
				n = parseInt(n);
				if (!n) return;
				this.category.forEach((cate, i) => {
					if (cate.id === n) index = i;
				});

				if (index !== this.navActive) {
					this.asideTap(index);
				}
			},
			loadCategoryData() {
				getCategory().then(res => {
					this.category = res.data;
					this.$nextTick(() => {
						if (this.$yroute.query.id) {
							this.activeCateId(this.$yroute.query.id);
						}
					});
				});
			},
			submitForm: function() {
				var val = trim(this.search);
				if (val) {
					this.$yrouter.push({
						path: "/pages/shop/GoodsList/index",
						query: {
							s: val
						}
					});
					setTimeout(() => (this.search = ""), 500);
				}
			},
			asideTap(index) {
				this.navActive = index;
			}
		},
		beforeDestroy: function() {
			// document.removeEventListener("scroll", this.onScroll, false);
		}
	};
</script>
