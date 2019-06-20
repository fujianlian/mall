// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'mall-7vt8m',
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  console.log(user)

  // Order List
  const orderRes = await db.collection('order').where({
    user,
  }).get()
  const orderList = orderRes.data

  return orderList
}