import request from '@/utils/request'

export const getListAPI = () => {
  return request({
    url: 'http://geek.itheima.net/v1_0/channels'
  })
}
