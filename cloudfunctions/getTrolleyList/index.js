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

  // trolley list
  const trolleyRes = await db.collection('trolley').where({
    user,
  }).get()
  const trolleyList = trolleyRes.data

  return trolleyList
}