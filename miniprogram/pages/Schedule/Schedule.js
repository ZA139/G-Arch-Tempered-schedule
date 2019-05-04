// miniprogram/pages/Schedule/Schedule.js
const app = getApp()

var time = 0; //计时器
var touchDot = 0; //触摸原点
var gap = ''; //间隔
var flag = true;
var tap_flag = false;
var temp;//传入status的中介
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ani: '',
        status:0,//判断应为哪个动画
        //switch_animation1:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        //this.Reset();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        flag = true; //重置可切换形态
        clearInterval(gap);
        time = 0;
        //this.Reset();
        //this.onLoad();
        /*if (tap_flag) {
          temp = this.data.status;
          console.log("if"+temp);
            this.animation_judge(temp);
            tap_flag = false;
        }*/
    },

    touchStart: function (e) {
        touchDot = e.touches[0].pageX;
        gap = setInterval(function () {
            time++;
        }, 100);
    },

    touchFinish: function (e) {
      //console.log(this.data.status);
        //console.log("time:", time);
        //console.log("touchdot:", touchDot);
        var touchMove = e.changedTouches[0].pageX;
        //console.log("touchesmove", touchMove);
        if (touchMove - touchDot <= -30 && time > 2.5 && flag) {
            flag = false;
            //console.log("Right");
            this.Right();
            //以上为滑动页面函数，接下来创建右划动画
            //动画文档https://developers.weixin.qq.com/miniprogram/dev/api/api-animation.html#wxcreateanimationobject
        }
        if (touchMove - touchDot >= 30 && time > 2.5 && flag) {
            flag = false;
            console.log("Left");
            this.Left();
        }
        tap_flag = true;
        clearInterval(gap);
        time = 0;
        //tap_flag1 = true;
        //console.log(tap_flag);
    },
    animation_judge(x) {
        var that=this;
        /*if (x == 0) {//刷新当前页函数
          console.log("reset");
            var animation = wx.createAnimation({
                duration: 0,
                timingFunction: 'ease',
                delay: 0,
            });
            animation.opacity(1).translate(0, 0).step();
            this.setData({
                ani: animation.export(),
            })
        }*/
         if (x == 1) {//创建左划动画
            var animation = wx.createAnimation({
                duration: 1000,
                timingFunction: 'ease',
                delay: 100,
            });
            animation.opacity(0.25).translate(-500, 0).step();
            this.setData({
                ani: animation.export(),
            })
          console.log("right");
        }
        else if (x == 2) {//创建右划动画
          console.log("left");
            var animation = wx.createAnimation({
                duration: 1000,
                timingFunction: 'ease',
                delay: 100,
            });
            animation.opacity(0.25).translate(500, 0).step();
            this.setData({
                ani: animation.export(),
            })
        }
        else {
            console.warn("some wrong with status");
        }
    },
    Left() {
      var that=this;
        this.setData({
            status: 2,
        })
      temp = that.data.status;
      console.log(temp);
        this.animation_judge(temp);
        wx.switchTab({
            url: '../Profile/Profile',
        })
    },
    Right() {
      var that=this;
        this.setData({
            status: 1,
        })
      temp = that.data.status;
        this.animation_judge(temp);
        wx.switchTab({
            url:'../ToDoList/ToDoList',
        })
    },
    end(event){
      var that=this;
      console.debug("end");
      let animation=wx.createAnimation({
        duration:0,
        timingFunction:'step-start',
      });
      animation.opacity(1).translate(0,0).step();
      setTimeout((function(){this.setData({
        ani:animation.export(),})
      }).bind(this),1200);
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})