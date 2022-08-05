// 处理多次点击
function noMultipleClicks(methods,...args) {
    let that = this;
    
    if (that.noClick) {
		console.log("进入方法")
        that.noClick= false;
        methods(...args);
        setTimeout(function () {
            that.noClick= true;
        }, 2000)
    } else {
        console.log("请稍后点击")
    }
}

//导出
export default noMultipleClicks
