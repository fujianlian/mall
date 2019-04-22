const DB = require("../utils/db.js")

module.exports = {
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let product_id = ctx.request.body.productId
    let content = ctx.request.body.content || null
    if (!isNaN(product_id)) {
      await DB.query('INSERT INTO comment(user, username, avatar, content, product_id) VALUES (?, ?, ?, ?, ?)', [user, username, avatar, content, product_id])
    }

    ctx.state.data = {}
  }
}