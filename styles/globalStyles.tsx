import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';
export const fontFamily = "MarkPro";

export const styles = StyleSheet.create({
    darkbg:{
      backgroundColor: Colors.dark.background
    },
    lightbg:{
      backgroundColor: Colors.light.background
    },
    assetItemLight:{
      backgroundColor: Colors.light.assetItem,
    },
    assetItemDark:{
      backgroundColor: Colors.dark.assetItem,
    },
    mainContainer: {
      flex: 1,
    },
    linearGradient: {
      borderRadius: Dimensions.borderRadius,
      paddingTop: 20,
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 10,
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      marginBottom: 5
    },
    linearGradientDark:
    {
      borderColor: Colors.light.balanceBackgroundPrimary,
      borderWidth: 1
    },
    linearGradientLight:{

    },
    balanceMainContainer:{
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
    },
    balanceTitle:{
      color: Colors.light.textSecondary,
      fontFamily: fontFamily,
      marginBottom: 10,
      fontSize: 13,
      fontWeight: "700"
    },
    balanceContainer: {
      flex: 1
    },
    balanceValue: {
      fontSize: 24,
      fontWeight: "800",
      fontFamily: fontFamily,
      color: Colors.light.textSecondary
    },
    assetItem: {
      justifyContent: 'center',
      padding: Dimensions.padding,
      margin: 10,
      marginVertical: 5,
      borderRadius: Dimensions.borderRadius
    },
    assetItemView:{
      display: "flex", 
      flexDirection: "row", 
      alignItems: "center"
    },
    assetItemNameView:{
      flexGrow: 1
    },
    assetSymbol: {
      fontSize: Dimensions.fontSize,
      fontFamily: fontFamily,
      fontWeight: "500",
      marginTop: 3,
    },
    assetSymbolDark:{
      color: Colors.dark.text,
    },
    assetSymbolLight:{
      color: Colors.light.text,
    },
    assetFullName: {
      fontSize: Dimensions.assetFullNameFontSize,
      fontFamily: fontFamily
    },
    assetFullNameDark:{
      color: Colors.dark.assetFullName
    },
    assetFullNameLight:{
      color: Colors.light.assetFullName
    },
    assetValue: {
      fontSize: Dimensions.fontSize,
      fontFamily: fontFamily,
      fontWeight: "500"
    },
    assetValueDark:{
      color: Colors.dark.text,
    },
    assetValueLight:{
      color: Colors.light.text,
    },
    actionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: "transparent",
      flexDirection: 'row',
      paddingHorizontal: Dimensions.padding,
      marginVertical: 5,
      margin: 10,
      borderRadius: Dimensions.borderRadius
    },
    actionBtn: {
      alignItems: 'center',
      bottom: 1,
      justifyContent: 'center',
      position: 'absolute',
      top: 1,
      width: Dimensions.backButtonWidth,
      borderRadius: Dimensions.borderRadius
    },
    deleteBtn: {
      backgroundColor: Colors.colorDanger,
      right: 1,
      borderRadius: Dimensions.borderRadius
    },
    editBtn: {
      backgroundColor: Colors.colorEdit,
      right: Dimensions.backButtonWidth,
      borderRadius: Dimensions.borderRadius,
      marginRight: 10
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.00,
      elevation: 1
    },
    input: {
        height: 45,
        marginBottom: 10,
        color: Colors.light.inputFontColor,
        padding: 8,
        fontSize: 16,
        borderRadius: 20,
        fontFamily: fontFamily,
        fontWeight: "500"
    },
    inputDark:{
      backgroundColor: Colors.dark.assetItem,
      borderColor: Colors.light.balanceBackgroundPrimary,
      borderWidth: 1,
      color: Colors.dark.text
    },
    inputLight:{
      backgroundColor: Colors.light.textSecondary,
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#1cb96a",
        padding: 12,
        borderRadius: 20,
        marginTop: 10
    },
    buttonText: {
        fontSize: 16,
        color: Colors.light.textSecondary,
        fontFamily: fontFamily,
        fontWeight: "500"
    },
    modalContainer: {
        marginTop: 400
    },
    modalContainerDark:{
      backgroundColor: Colors.dark.background
    },
    modalContainerLight:{
      backgroundColor: Colors.light.background
    },
    modalMainView: {
        display: "flex", 
        flexDirection: "column", 
        margin: 15,
        marginTop: 20
    },
    swipeList: {

    },
    addButtonView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end"
    },
    absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    tabBarStyle: {
      paddingBottom: 20,
      paddingTop: 10,
      height: 80
    },
    tabBarStyleDark:{
      backgroundColor: Colors.dark.background
    },
    tabBarStyleLight:{
      backgroundColor: Colors.light.background
    },
    tabBarLabelStyle:{
      fontFamily: fontFamily, 
      fontWeight: "700"
    },
    successMessageTitle: {
      fontFamily: fontFamily, 
      fontSize: Dimensions.fontSize,
      fontWeight: "500"
    },
    currencyMain:{
      padding: 18,
      borderRadius: Dimensions.borderRadius,
      margin: 10,
      backgroundColor: Colors.light.textSecondary,
      marginVertical: 5,
    },
    currencyRenderItem: {
      display:"flex", 
      flexDirection:"row", 
      alignContent: "space-between",
      
    },
    currencyNameView: {
      flex: 1
    },
    currencyValueViewMain:{
      display: "flex", 
      flex: 1, 
      flexDirection: "row", 
      alignItems:"center", 
      alignContent: "space-between"
    },
    currencyValueView: {
      flex: 1, 
      alignItems:"flex-end"
    },
    currencySymbol: {
      color: Colors.light.text,
      fontSize: 15,
      fontFamily: fontFamily,
      fontWeight: "500"
    },
    currencyName: {
      fontSize: Dimensions.assetFullNameFontSize,
      color: "gray",
      fontFamily: fontFamily,
      marginBottom: 3
    },
    currencyValueTitle:{
      fontSize: Dimensions.assetFullNameFontSize,
      color: "gray",
      fontFamily: fontFamily,
      marginBottom: 3,
    },
    currencyValue: {
      fontSize: 15,
      fontFamily: fontFamily,
      fontWeight: "500",
      color: Colors.light.text
    },
    currencyLinearGradient: {
      display: "flex",
      height: "10%",
      marginBottom: 5
    },
    assetPickerDark:{
      backgroundColor: Colors.dark.assetItem,
      borderColor: Colors.light.balanceBackgroundPrimary,
      borderWidth: 1,
      color: Colors.dark.text
    },
    assetPickerLight:{

    }
  });