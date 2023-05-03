import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Component } from 'react';
import './index.scss';

interface IImage {
  id: number;
  url: string;
}
interface IState{
  dataList: IImage[];
}
export default class Index extends Component<any, IState> {
  constructor(props:any){
    super(props)
    this.state = {
      dataList: []
    }
  }
  componentDidMount () {
    let imgList:IImage[] = [];
    for(let i=1; i<15;i++){
    imgList.push({
      id:i,
      url:'https://t11.baidu.com/it/u=3376781582,191357210&fm=30&app=106&f=JPEG?w=640&h=986&s=F7400BF3062336BC092D08FA0300E010'
    })
    }
    this.setState({
      dataList:imgList
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  gotoDetail= (imgItem:IImage)=> {
    Taro.navigateTo({
      url:'/pages/detail/index?id='+imgItem.id
    })

  }
  render () {
    return (
      <View>
        <View id='pic-list-container'>
        {
          this.state.dataList.map((imgItem:IImage)=>(
            <View onClick={()=>this.gotoDetail(imgItem)} className='pic-container' key={imgItem.id}>
              <Image  className='pic-img' mode='scaleToFill' src={imgItem.url}/>
            </View>
          ))
        }
        </View>
        
      </View>
    )
  }
}
