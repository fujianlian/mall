// pages/add-comment/add-comment.js

const db = require('../../utils/db.js')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    product: null,
    commentValue: '',
    commentImages: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
      this.setProduct(options)
    }).catch(err => {
      console.log('尚未通过身份验证')
    })
  },

  setProduct(options) {
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
    let content = this.data.commentValue;
    if (!content) return

    wx.showLoading({
      title: '正在发表评论'
    })

    this.uploadImage(images => {
      db.addComment({
        username: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        content,
        productId: this.data.product.productId,
        images,
      }).then(result => {
        wx.hideLoading()

        const data = result.result

        if (data) {
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
      }).catch(err => {
        console.error(err)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '发表评论失败'
        })
      })
    })
  },

  chooseImage() {
    let currentImages = this.data.commentImages
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        currentImages = currentImages.concat(res.tempFilePaths)
        let end = currentImages.length
        let begin = Math.max(end - 3, 0)
        currentImages = currentImages.slice(begin, end)
        this.setData({
          commentImages: currentImages
        });
      },
    })
  },

  previewImg(event) {
    let target = event.currentTarget
    let src = target.dataset.src

    wx.previewImage({
      current: src,
      urls: this.data.commentImages
    })
  },

  uploadImage(callback) {
    const commentImages = this.data.commentImages
    const images = []

    if (commentImages.length) {
      let imageCount = commentImages.length
      for (let i = 0; i < imageCount; i++) {
        db.uploadImage(commentImages[i]).then(result => {
          images.push(result.fileID)
          if (i === imageCount - 1) {
            callback && callback(images)
          }
        }).catch(err => {
          console.log('err', err)
        })
      }
    } else {
      callback && callback(images)
    }
  }
})