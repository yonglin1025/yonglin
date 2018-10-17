var Page = require("../fcad_sdk.min.js").Page;
Page({
	data: {},
	onShow: function() {
		this.setData({
			webviewUrl: decodeURIComponent(this.options.u)
		})
	}
})
