import {
	getdata,
	showToast,
	likeReport,
	getNowFormatDate
} from '../../utils/util'
var Page = require("../../fcad_sdk/fcad_sdk.min.js").Page;

Page({
	data: {
		lastid: 0,
		list: [],
		showbottom: false, //显示加载更多
	},
	onLoad: function () {
		// 分享按钮
		wx.showShareMenu();
		var that = this;
		getdata(that.data.lastid, function (data) {
			if (data.length > 0) {
				that.setData({
					list: data,
					lastid: data[data.length - 1].id,
				});
			}
		})
	},
	onShow: function () {
		this.loadAd()
	},
	// 下拉刷新
	onPullDownRefresh: function () {
		var that = this;
		wx.showLoading({
			title: '加载中',
		})
		getdata(0, function (data) {
			if (data.length > 0) {
				wx.stopPullDownRefresh(); //停止刷新
				// 隐藏加载框
				wx.hideLoading();
				that.setData({
					list: data,
					lastid: data[data.length - 1].id
				});
			}
		})
	},
	// 上拉加载
	onReachBottom: function () {
		var that = this;
		wx.showLoading({
			title: '加载中',
		})
		getdata(that.data.lastid, function (data) {
			// 隐藏加载框
			wx.hideLoading();
			if (data.length > 0) {
				that.setData({
					list: that.data.list.concat(data),
					lastid: data[data.length - 1].id
				});
			} else {
				// 数据加载完毕
				that.setData({
					showbottom: true
				});
			}
		})
	},
	// 跳转
	view: function (e) {
		wx.navigateTo({
			url: '/pages/detail/index?data=' + JSON.stringify(e.currentTarget.dataset.viewdata),
			fail: function (e) {
				showToast(e.errMsg);
			}
		});
	},
	// 点赞
	like: function (e) {
		var that = this;
		var data = e.target.dataset.viewdata;
		//已经点赞
		if (data.islike) {
			showToast("今天对该作品的点赞机会已用完，请明天再来");
			return
		}
		// 未点赞
		likeReport(data.id, () => {
			showToast("+1");
			// 存储
			wx.setStorageSync("like_" + getNowFormatDate() + "_" + data.id, true)
			that.data.list.forEach(function (v, k) {
				if (v.id != data.id) {
					return
				}
				that.data.list[k].islike = true
				that.data.list[k].like += 1
			})
			that.setData({
				list: that.data.list
			})
		});
	},
	// 加载广告
	loadAd: function () {
		this.fcad.load("bannerad", "MTAwMHZl", {
			success: function () {
				console.log("load success")
			},
			fail: function () {
				console.log("load fail")
			},
			complete: function () {
				console.log("load complete")
			}
		})
	}
})