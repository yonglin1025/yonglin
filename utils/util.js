// 获取首页数据
export const getdata = (lastid, fn) => {
	lastid = lastid || 0;
	fn = fn || function (r) {};
	wx.request({
		url: "https://mini.fcadx.cn/xxwj/api/search?lastid=" + lastid,
		success: function (r) {
			r.data.data.forEach(function (v, k) {
				var islike = wx.getStorageSync("like_" + getNowFormatDate() + "_" + v.id) ? true : false;
				r.data.data[k].islike = islike;
			})
			if (r.data.data.length == 0) {
				showToast("没有更多啦")
			}
			fn(r.data.data)
		},
		fail: function (r) {
			showToast("服务器繁忙，请稍后重试")
			console.log(r);
		}
	});
}

export const viewReport = (id, fn) => {
	fn = fn || function () {};
	wx.request({
		url: "https://mini.fcadx.cn/xxwj/api/read?id=" + id,
		success: function (r) {
			fn(r)
		},
		fail: function (r) {
			showToast("服务器繁忙，请稍后重试")
			console.log(r);
		}
	});
}

export const likeReport = (id, fn) => {
	fn = fn || function () {};
	wx.request({
		url: "https://mini.fcadx.cn/xxwj/api/like?id=" + id,
		success: function (r) {
			fn(r)
		},
		fail: function (r) {
			showToast("服务器繁忙，请稍后重试")
			console.log(r);
		}
	});
}

export const showToast = (msg) => {
	wx.showToast({
		icon: "none",
		title: msg,
		success: function () {
			setTimeout(function () {
				wx.hideToast()
			}, 2000);
		}
	});
}

export const getNowFormatDate = () => {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}