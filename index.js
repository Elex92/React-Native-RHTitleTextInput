import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

import styles from './style';

class TitleTextInput extends Component {
   /* props定义 */
   static defaultProps = {
    title : '',  //标题
    value : '',  //输入框已输入文字
    maxLength : 50 , //支持最大输入文字
    placeholder:'',   //输入框占位文字
    keyboardType:'default', //键盘类型
    isLine : true, //是否显示分割线 
    onChangeText (){}, //输入框改变
    titleWidth : 80 ,//标题宽度
    /*          新增         */
    lineAlign : 'left',//分割线位置
    textAlign : 'right',//输入框文字位置
    secureTextEntry : false,//是否密文
    eyeShow : false,//是否显示眼睛
    TitleFontSize:16,//标题文字大小
    InputFontSize:14,//输入框文字大小
    onClickEye(){},//点击眼睛回调
    lineColor:"#ededed",//分割线颜色

 }
 /* 构造函数 */
 constructor (props) {
    super(props);
    let secure ;
    if(this.props.eyeShow){
        secure=this.props.eyeShow;
    }else{
        secure= this.props.secureTextEntry;
    }
    this.state={
        secureTextEntry:secure,
        selectEye:!this.props.eyeShow
    }
}
 /**
  * 接受到props发送改变时
  * 
  * @param {any} nextProps 
  * @memberof TitleTextInput
  */
 componentWillReceiveProps(nextProps){
     if(nextProps.secureTextEntry!=this.props.secureTextEntry){
         this.setState({
             secureTextEntry:nextProps.secureTextEntry
         });
     }
 }
 
 /* 页面布局 */
 render() {
    
     return(
         <View>
             {this.renderView()}
         </View>           
 );
 }
  
 /**
  * Android视图
  */
 renderView(){
     return <View style={[{backgroundColor:'#ffffff'},this.props.style]}>
             <View style={[styles.parentStyle]}>
                 <Text style={[styles.textStyle,{width:this.props.titleWidth,fontSize:this.props.TitleFontSize}]}>{this.props.title}</Text>
                 <TextInput {...this.props}
                     style={[styles.textInputStyle,{flex:1,height: 40},this.props.value.length==0?{ marginRight:15}:{ marginRight:0}]}                      
                     placeholder={this.props.placeholder}
                     fontSize={this.props.InputFontSize}
                     maxLength={this.props.maxLength}
                     placeholderTextColor='#cccccc'
                     value={this.props.value}
                     underlineColorAndroid='transparent'
                     keyboardType={this.props.keyboardType}
                     textAlign={this.props.textAlign}
                     secureTextEntry={this.state.secureTextEntry}
                     clearButtonMode='while-editing'
                     onChangeText={(text)=>{
                     
                         this.props.onChangeText(text);

                     }}
                     />
                 {Platform.OS=='android'?this.props.value.length==0?null:<TouchableOpacity onPress={this.clearBtn.bind(this)}  style={styles.clearBtnStle}><Image style={{width:15,height:15}} source={require('./TextInput-ClearBtn.png')}/></TouchableOpacity>:null}
                 {this.props.eyeShow?
                     <TouchableOpacity activeOpacity={0.8} onPress={this.onClick.bind(this)} style={{width:22}}>
                         <Image  source={this.state.selectEye?require('./Register-eye-open.png'):require('./Register-eye-close.png')}></Image>
                     </TouchableOpacity>:null}
             </View>
             {this.props.isLine?  <View style={[{backgroundColor:this.props.lineColor,height:0.5},this.props.lineAlign=='left'?{marginLeft:15}:this.props.lineAlign=='center'?{marginHorizontal:15}:{marginRight:15}]}></View>:null}
           
         </View> 
 }

 

 /**
  * 点击清空按键
  * 
  * @memberof TitleTextInput
  */
 clearBtn(){
     this.setState({
         text:''
     });
     this.props.onChangeText('');
 }

 /**
  * 点击眼睛
  * 
  * @memberof TitleTextInput
  */
 onClick(){
     if (this.state.selectEye) {
         this.setState({
             selectEye:false,
             secureTextEntry:true
         });
         this.props.onClickEye(1);
     } else {
         this.setState({
             selectEye:true,
             secureTextEntry:false
         });
         this.props.onClickEye(0);
     }
    
 }
}



export default TitleTextInput;
