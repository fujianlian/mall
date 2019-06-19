//app.js

App({

  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'mall-7vt8m',
      })
    }

    this.globalData = {}
  },

  checkSession({
    success,
    error
  }) {
    wx.checkSession({
      success: () => {
        this.getUserInfo({
          success,
          error
        })
      },
      fail: () => {
        error && error()
      }
    })
  },
})
