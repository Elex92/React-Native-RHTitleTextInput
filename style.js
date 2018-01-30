import {StyleSheet,Platform} from 'react-native';
var size = Dimensions.get('window');
var scale = Platform.OS==='ios'?size.width/375.0:size.height/717.0;
const styles = StyleSheet.create({
  parentStyle:{
      flexDirection : 'row',
      backgroundColor : '#fff',
      alignItems:'center',
      paddingHorizontal:15*scale,
 
  },
  textInputStyle:{
      flex:1,
      color:'#373737',       
      backgroundColor:'#fff',
      textAlign: 'right',
  },
  clearBtnStle:{
      justifyContent:'center',
      alignItems:'center',
      marginRight:5*scale,
  },
  textStyle:{
      fontSize:16*scale,
      color:'#181818',
      marginLeft:0,

  }
  
})
export default styles;
