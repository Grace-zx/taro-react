import { Button, Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";

const Pic = () => {
  const [isAuth, setIsAuth] = useState(false);
  const obj = {
    category: 'avatar',
    src: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1205%2Fb4ea7437j00r3myyi0022c000hs00vmc.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
  }

  const onDownLoad = () => {
    Taro.getSetting({
      success: (res:any)=>{
       if(!res.authSetting['scope.writePhotosAlbum']){
        setIsAuth(false);
       }else{
        setIsAuth(true);
       }
      },
      fail: ()=>{
        setIsAuth(false);
      }
    })
  }
  return (
    <View>
      <Image 
        mode='scaleToFill' 
        style={{width: '100%', height: '500px', position: 'relative', textAlign: 'center'}} 
        src={obj.src}
        onClick={()=>{
          Taro.previewImage({
            urls: [obj.src]
          })
        }}
        />
        {!isAuth && <Button onClick={()=>{
          Taro.openSetting({
            success: (res:any)=>{
              if(res.authSetting['scope.writePhotosAlbum']){
                setIsAuth(true);
              }
            }

          })
        }}>打开权限</Button>}
        <Button type='primary' onClick={onDownLoad}>下载</Button>
    </View>
  )
}

export default Pic;