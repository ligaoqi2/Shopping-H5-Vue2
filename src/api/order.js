import request from '@/utils/request'

// 订单结算确认
// mode:cart => obj cartIds
// mode:bugNow => { goodsId goodsNum goodsSkuId }
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // cart bugNow
      delivery: 10, // 10 快递配送 20 门店自提
      couponId: 0, // 优惠卷ID 传 0 不使用优惠券
      isUserPoints: 0, // 积分 传 0 表示不使用积分
      ...obj
    }
  })
}

// 提交订单
// mode:cart => obj { cartIds, remark }
// mode:bugNow => obj { goodsId goodsNum goodsSkuId remark }
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 10 快递配送
    couponId: 0, // 优惠卷ID 传 0 不使用优惠券
    isUserPoints: 0, // 积分 传 0 表示不使用积分
    payType: 10, // 余额支付
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
