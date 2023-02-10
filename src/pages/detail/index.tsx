import { Button, Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import './index.scss';

const imgSrc = 'https://img0.baidu.com/it/u=69894174,1653858544&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711'
interface IState{
  width: string;
  height: string;
}

export default class Detail extends Component<any,IState>{
  constructor(props:any){
    super(props)
    this.state = {
      width: '',
      height: ''
    }
  }
  componentDidMount(): void {
    // 初始化获取手机窗口长宽
    Taro.getSystemInfo({
      success: (res:any)=>{
        this.setState({
          width: res.windowWidth + 'px',
          height: res.windowHeight + 'px',
        })
      }
    })
  }

  gotoHome = () => {
    //返回上一页
    Taro.navigateBack();
    // 返回首页
    Taro.navigateTo({url:'/pages/index/index'});
  }

  onAddToFavorites (res) {
    // webview 页面返回 webviewUrl
    console.log('WebviewUrl: ', res?.webviewUrl)
    return {
      title: '自定义收藏',
      imageUrl: imgSrc,
      query: 'id?=1',
    }
  }

  onLoad = () => {
    // Taro.saveImageToPhotosAlbum({
    //   success: (res:any) => {

    //    }
    // })
  }

  // 分享给好友
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '分享给好友的内容',
      imageUrl: imgSrc,
      query: '/page/detail/index?id=123',// 分享的图片地址
    }
  }

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '分享给好友的内容',
      imageUrl: imgSrc,
      query: 'id?=1',
    }
  }

  download = () => {
    // if (process.env.TARO_ENV === 'weapp') {
    //   const id = getCurrentInstance().router.params.id
    //   //下载
    //   try {
    //     const token = Taro.getStorageSync('token')
    //     Taro.request({
    //       url: `https://api.eveadmin.com/api/user/img/${id}/1`,
    //       method: 'post',
    //       header: {
    //         "Authorization": token
    //       }
    //     })
    //   } catch (e) {
    //     console.log(e)
    //   }

    //   Taro.getSetting({
    //     success: () => {
    //       Taro.authorize({
    //         scope: 'scope.writePhotosAlbum',
    //         success: () => {
    //           Taro.showToast({
    //             title: '开始下载',
    //             icon: 'loading'
    //           })
    //           Taro.downloadFile({
    //             url: this.state?.img.url,
    //             fail: (res) => {
    //               Taro.showToast({
    //                 title: res.tempFilePath,
    //                 icon: 'success'
    //               })
    //             },
    //             success: (res) => {
    //               if (res.statusCode === 200) {
    //                 Taro.playVoice({
    //                   filePath: ''
    //                 })
    //               }
    //               Taro.saveImageToPhotosAlbum({
    //                 filePath: res.tempFilePath, //返回的临时文件路径，下载后的文件会存储到一个临时文件
    //                 success: () => {
    //                   Taro.showToast({
    //                     title: '成功保存到相册',
    //                     icon: 'success'
    //                   })
    //                 },
    //                 fail: (res) => {
    //                   Taro.showToast({
    //                     title: res.errMsg,
    //                     icon: 'none'
    //                   })
    //                 }
    //               })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   })
    // }
  }
  
  render(): React.ReactNode {
    const {width, height} = this.state;
    return (
      <View>
        <Image mode='aspectFill' style={{width: width, height: height}} src={imgSrc}/>
        <View id="btn-list">
          <Button plain className='btn' onClick={this.gotoHome}> <View className='at-icon at-icon-chevron-left'></View>返回</Button>
          <Button plain className='btn'> <View className='at-icon at-icon-heart'></View>收藏</Button>
          <Button plain className='btn' onClick={this.download}> <View className='at-icon at-icon-download'></View>下载</Button>
          <Button plain className='btn' openType='share'> <View className='at-icon at-icon-share'></View>分享</Button>
        </View>
      </View>
    )
  }
}