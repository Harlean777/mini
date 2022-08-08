export function isIphoneX() {
	let info = wx.getSystemInfoSync().model;
	if (/iPhone X/i.test(info)) {
		return true;
	} else if (/iPhone 1[1-9]/i.test(info)) {
		return true;
	} else if (
		/iphone\sx/i.test(info) ||
		(/iphone/i.test(info) && /unknown/.test(info)) ||
		/iphone\s11/i.test(info)
	) {
		return true;
	} else {
		return false;
	}
}

export default {
	isIphoneX
}