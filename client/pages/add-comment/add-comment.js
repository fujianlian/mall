// pages/add-comment/add-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: null,
    commentValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let product = this.data.product
    product = JSON.parse(options.data)
    this.setData({
      product
    })
  },

  onInput(event) {
    this.setData({
      commentValue: event.detail.value.trim()
    })
  },

  addComment(event) {
    let content = this.data.commentValue
    let productId = this.data.product.product_id
    if (!content) return

    wx.showLoading({
      title: '正在发表评论'
    })

    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        content: content,
        productId: productId
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '发表评论成功'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)

        } else {
          wx.showToast({
            icon: 'none',
            title: '发表评论失败'
          })
        }
      },
      fail: (err) => {
        console.log(err)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '发表评论失败'
        })
      }
    })
  },
})