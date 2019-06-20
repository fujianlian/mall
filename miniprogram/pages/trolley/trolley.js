// pages/trolley/trolley.js

const db = require('../../utils/db.js')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    trolleyList: [], // 购物车商品列表
    trolleyCheckMap: [], // 购物车中选中的id哈希表
    trolleyAccount: 0, // 购物车结算总价
    isTrolleyEdit: false, // 购物车是否处于编辑状态
    isTrolleyTotalCheck: false, // 购物车中商品是否全选
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
      this.getList()
    }).catch(err => {
      console.log("请先登录");
    })
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  /**
   * 获取购物车列表
   */
  getList() {
    let self = this
    wx.showLoading({
      title: '刷新购物车数据...',
    })

    db.getTrolleyList().then(result => {
      wx.hideLoading()

      const data = result.result
      console.log(data)
      if (data.length) {
        // update the total price for cart
        this.setData({
          trolleyAccount: util.formatPrice(0),
          trolleyList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
      wx.showToast({
        icon: 'none',
        title: '刷新数据失败'
      })
    })
  },

  onTapCheckSingle(event) {
    let checkId = event.currentTarget.dataset.id
    let trolleyCheckMap = this.data.trolleyCheckMap
    let trolleyList = this.data.trolleyList
    let isTrolleyTotalCheck = this.data.isTrolleyTotalCheck
    let numTotalProduct
    let numCheckedProduct = 0
    let trolleyAccount = this.data.trolleyAccount

    // 单项商品被选中/取消
    trolleyCheckMap[checkId] = !trolleyCheckMap[checkId]

    // 判断选中的商品个数是否需商品总数相等
    numTotalProduct = trolleyList.length
    trolleyCheckMap.forEach(checked => {
      numCheckedProduct = checked ? numCheckedProduct + 1 : numCheckedProduct
    })

    isTrolleyTotalCheck = (numTotalProduct === numCheckedProduct) ? true : false
    trolleyAccount = this.calcAccount(trolleyList, trolleyCheckMap)

    this.setData({
      trolleyCheckMap,
      isTrolleyTotalCheck,
      trolleyAccount
    })
  },

  onTapCheckTotal() {
    let trolleyCheckMap = this.data.trolleyCheckMap
    let trolleyList = this.data.trolleyList
    let isTrolleyTotalCheck = this.data.isTrolleyTotalCheck
    let trolleyAccount = this.data.trolleyAccount

    // 全选按钮被选中/取消
    isTrolleyTotalCheck = !isTrolleyTotalCheck

    // 遍历并修改所有商品的状态
    trolleyList.forEach(product => {
      trolleyCheckMap[product.id] = isTrolleyTotalCheck
    })
    trolleyAccount = this.calcAccount(trolleyList, trolleyCheckMap)
    this.setData({
      isTrolleyTotalCheck,
      trolleyCheckMap,
      trolleyAccount
    })

  },

  calcAccount(trolleyList, trolleyCheckMap) {
    let account = 0
    trolleyList.forEach(product => {
      account = trolleyCheckMap[product.id] ? account + product.price * product.count : account
    })

    return account
  },

  onTapEdit() {
    let isTrolleyEdit = this.data.isTrolleyEdit

    if (isTrolleyEdit) {
      this.updateTrolley()
    } else {
      this.setData({
        isTrolleyEdit: !isTrolleyEdit
      })
    }
  },

  adjustTrolleyCount(event) {
    let trolleyCheckMap = this.data.trolleyCheckMap
    let trolleyList = this.data.trolleyList
    let dataset = event.currentTarget.dataset
    let adjustType = dataset.type
    let productId = dataset.id
    let product
    let index

    for (index = 0; index < trolleyList.length; index++) {
      if (productId === trolleyList[index].id) {
        product = trolleyList[index]
        break
      }
    }

    if (product) {
      if (adjustType === "add") {
        product.count++
      } else {
        if (product.count <= 1) {
          // 商品数量不超过1，点击减号相当于删除
          delete trolleyCheckMap[productId]
          trolleyList.splice(index, 1)
        } else {
          // 商品数量大于1
          product.count--
        }
      }
    }

    // 调整结算总价
    let trolleyAccount = this.calcAccount(trolleyList, trolleyCheckMap)

    this.setData({
      trolleyAccount,
      trolleyList,
      trolleyCheckMap
    })

  },

  updateTrolley() {
    wx.showLoading({
      title: '更新购物车数据...',
    })

    let trolleyList = this.data.trolleyList
    qcloud.request({
      url: config.service.updateTrolley,
      method: 'POST',
      login: true,
      data: {
        list: trolleyList
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          this.setData({
            isTrolleyEdit: false
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '更新购物车失败'
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '更新购物车失败'
        })
      }
    })
  },

  onTapPay() {

    if (!this.data.trolleyAccount) return

    wx.showLoading({
      title: '结算中...',
    })

    let self = this
    let trolleyCheckMap = this.data.trolleyCheckMap
    let trolleyList = this.data.trolleyList

    let needToPayProductList = trolleyList.filter(product => {
      return !!trolleyCheckMap[product.id]
    })

    qcloud.request({
      url: config.service.addOrder,
      login: true,
      method: 'POST',
      data: {
        list: needToPayProductList,
        isInstantBuy: false
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '结算成功',
          })
          self.getList()
        } else {
          wx.showToast({
            icon: 'none',
            title: '结算失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '结算失败',
        })
      }
    })
  },
})