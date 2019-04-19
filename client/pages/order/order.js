// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    orderList: [{
        id: 0,
        list: [{
          count: 1,
          image: 'https://product-1259058662.cos.ap-shanghai.myqcloud.com/product1.jpg',
          name: '商品1',
          price: 50.5,
        }]
      },
      {
        id: 1,
        list: [{
            count: 1,
            image: 'https://product-1259058662.cos.ap-shanghai.myqcloud.com/product1.jpg',
            name: '商品1',
            price: 50.5,
          },
          {
            count: 1,
            image: 'https://product-1259058662.cos.ap-shanghai.myqcloud.com/product1.jpg',
            name: '商品2',
            price: 50.5,
          }
        ]
      },
      {
        id: 2,
        list: [{
          count: 1,
          image: 'https://product-1259058662.cos.ap-shanghai.myqcloud.com/product1.jpg',
          name: '商品2',
          price: 50.5,
        }]
      }
    ], // 订单列表
  },

  onTapLogin: function() {
    app.login({
      success: ({
        userInfo
      }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 同步授权状态
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({
        userInfo
      }) => {
        this.setData({
          userInfo
        })
      }
    })
  },
})