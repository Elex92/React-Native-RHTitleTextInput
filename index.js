import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  requireNativeComponent,
  Platform
} from 'react-native';

import styles from './style';

var NativeComponent = requireNativeComponent('RHTitleTextInput', TitleTextInput);

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
    titleWidth : 80*scale ,//标题宽度
    /*          新增         */
    lineAlign : 'left',//分割线位置
    textAlign : 'right',//输入框文字位置
    secureTextEntry : false,//是否密文
    eyeShow : false,//是否显示眼睛
    TitleFontSize:16*scale,//标题文字大小
    InputFontSize:14*scale,//输入框文字大小
    onClickEye(){}//点击眼睛回调

 }
 static propTypes = {
     title : PropTypes.string,
     value : PropTypes.string,
     maxLength : PropTypes.number,
     placeholder : PropTypes.string,
     keyboardType : PropTypes.string,
     isLine : PropTypes.bool,
     onChangeText : PropTypes.func,
     height : PropTypes.number,
     titleWidth : PropTypes.number,
     lineAlign : PropTypes.string,
     textAlign : PropTypes.string,
     secureTextEntry : PropTypes.bool,
     eyeShow : PropTypes.bool,
     TitleFontSize : PropTypes.number,
     InputFontSize : PropTypes.number,
     onClickEye : PropTypes.func,
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
         {Platform.OS==='ios'?this.renderiOS():this.renderAndroid()}
         </View>           
 );
 }
  
 /* 逻辑实现区 */
 /**
  * iOS视图
  */
 renderiOS(){
     return <NativeComponent {...this.props} 
                 onChange={(event)=>this.props.onChangeText(event.nativeEvent.text)} 
                 onClickEye={(event)=>this.props.onClickEye(event.nativeEvent.secureTextEntry)}
                 style={[{backgroundColor:'#ffffff'},this.props.style]}
             />
 }
 /**
  * Android视图
  */
 renderAndroid(){
     return <View style={[{backgroundColor:'#ffffff'},this.props.style]}>
             <View style={[styles.parentStyle]}>
                 <Text style={[styles.textStyle,{width:this.props.titleWidth,fontSize:this.props.TitleFontSize}]}>{this.props.title}</Text>
                 <TextInput
                     style={[styles.textInputStyle,{flex:1,height: 40},this.props.value.length==0?{ marginRight:15*scale}:{ marginRight:0}]}                      
                     placeholder={this.props.placeholder}
                     fontSize={this.props.InputFontSize}
                     maxLength={this.props.maxLength}
                     placeholderTextColor='#cccccc'
                     value={this.props.value}
                     underlineColorAndroid='transparent'
                     keyboardType={this.props.keyboardType}
                     textAlign={this.props.textAlign}
                     secureTextEntry={this.state.secureTextEntry}
                     onChangeText={(text)=>{
                     
                         this.props.onChangeText(text);

                     }}
                     />
                 {this.props.value.length==0?null:<TouchableOpacity onPress={this.clearBtn.bind(this)}  style={styles.clearBtnStle}><Image style={{width:20}} source={require('./images/TextInput-ClearBtn.png')}/></TouchableOpacity>}
                 {this.props.eyeShow?
                     <TouchableOpacity activeOpacity={0.8} onPress={this.onClick.bind(this)} style={{width:22}}>
                         <Image  source={this.state.selectEye?require('./images/Register-eye-open.png'):require('./images/Register-eye-close.png')}></Image>
                     </TouchableOpacity>:null}
             </View>
             {this.props.isLine?  <View style={[{backgroundColor:Colors.LINECOLOR,height:DeviceInfo.LineHeight()},this.props.lineAlign=='left'?{marginLeft:15*scale}:this.props.lineAlign=='center'?{marginHorizontal:15*scale}:{marginRight:15*scale}]}></View>:null}
           
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
