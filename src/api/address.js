import request from '@/utils/request'

// 设置默认地址
export const setDefaultAddress = () => {
  return request.post('/address/add', {
    addressId: '10012',
    form: {
      name: '小红',
      phone: '18999992929',
      region: [
        {
          label: '上海',
          value: 782
        },
        {
          label: '上海市',
          value: 783
        },
        {
          label: '徐汇区',
          value: 785
        }
      ],
      detail: '北京路1号楼8888室'
    }
  })
}
