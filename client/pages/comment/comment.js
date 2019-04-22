// pages/comment/comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config.js')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: [], // 评论列表
    product: null
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
    this.getCommentList(this.data.product.id)
  },

  getCommentList(id) {
    qcloud.request({
      url: config.service.commentList,
      login: true,
      data: {
        product_id: id
      },
      success: result => {
        let data = result.data
        if (!data.code) {
          this.setData({
            commentList: data.data.map(item => {
              let itemDate = new Date(item.create_time)
              item.createTime = util.formatTime(itemDate)
              return item
            })
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
})