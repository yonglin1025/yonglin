import {
	showToast,
	likeReport,
	getNowFormatDate,
	viewReport
} from '../../utils/util'
var Page = require("../../fcad_sdk/fcad_sdk.min.js").Page;

Page({
	onLoad: function (r) {
		//wx.showShareMenu();
		try {
			var data = JSON.parse(r.data)
			this.setData({
				data: data
			})
			viewReport(data.id);
		} catch (e) {
			wx.showToast({
				icon: "none",
				title: e + "",
				success: function (e) {
					setTimeout(function () {
						wx.hideToast()
					}, 2000)
				}
			})
		}
	},
	onShow: function () {
		this.loadAd()
	},
	like: function (e) {
		var that = this;
		var data = e.currentTarget.dataset.viewdata;
		if (data.islike) {
			showToast("今天对该作品的点赞机会已用完，请明天再来");
			return
		}

		likeReport(data.id, function () {
			showToast("+1");
			wx.setStorageSync("like_" + getNowFormatDate() + "_" + data.id, true)
			data.islike = true
			data.like += 1
			that.setData({
				data: data
			})
		});

	},
	// 加载广告
	loadAd: function () {
		this.fcad.load("videoad", "MTAwMHZm", {
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