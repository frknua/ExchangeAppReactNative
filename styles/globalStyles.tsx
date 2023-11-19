import { StyleSheet } from 'react-native';
const backButtonWidth = 75;
export const openWidth = backButtonWidth * 2;
const fontSize = 16;
const assetFullNameFontSize = 13;
const borderRadius = 20;
const padding = 18;

export const colorWhite = '#ffffff';
export const colorBlack = '#000000';
export const colorHighlight = '#e5e5e5';
export const tabBarActiveTintColor = '#1cb96a';
export const tabBarInactiveTintColor = 'gray';
const colorDanger = '#e91e63';
const colorInfo = '#2196f3';
const colorWarning = '#ffeb3b';
const colorSuccess = '#4caf50';
const colorDangerText = '#660000';
const colorInfoText = '#0000cc';
const colorWarningText = '#8e5500';
const colorSuccessText = '#004c45';
const fontFamily = "MarkPro";

export const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    linearGradient: {
      flex: 1,
      position: "absolute",
      height: 170,
      top: 0,
      width: "100%",
      // borderRadius: borderRadius
    },
    balanceMainContainer:{
      padding: 10,
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    balanceTitleContainer: {
      marginLeft: 10,
      marginBottom: 10
    },
    balanceTitle:{
      color: colorWhite,
      fontFamily: fontFamily,
      marginBottom: 10,
      fontSize: 13,
      fontWeight: "700"
    },
    balanceContainer: {
      margin: 10, 
      display: "flex", 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center"
    },
    balanceValue: {
      fontSize: 24,
      fontWeight: "800",
      fontFamily: fontFamily,
      color: colorWhite
    },
    assetItem: {
      justifyContent: 'center',
      padding: padding,
      margin: 10,
      backgroundColor: colorWhite,
      marginVertical: 5,
      borderRadius: borderRadius
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
      color: colorBlack,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fontWeight: "500"
    },
    assetFullName: {
      fontSize: assetFullNameFontSize,
      marginTop: 5,
      color: "gray",
      fontFamily: fontFamily
    },
    assetValue: {
      color: colorBlack,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fontWeight: "500"
    },
    actionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: "transparent",
      flexDirection: 'row',
      paddingHorizontal: padding,
      marginVertical: 5,
      margin: 10,
      borderRadius: borderRadius
    },
    actionBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: backButtonWidth,
      borderRadius: borderRadius
    },
    deleteBtn: {
      backgroundColor: colorDanger,
      right: 0,
      borderRadius: borderRadius
    },
    editBtn: {
      backgroundColor: colorInfo,
      right: backButtonWidth,
      borderRadius: borderRadius
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
        backgroundColor: colorWhite,
        color: colorBlack,
        padding: 8,
        fontSize: 16,
        borderRadius: 20,
        fontFamily: fontFamily,
        fontWeight: "500"
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
        color: colorWhite,
        fontFamily: fontFamily,
        fontWeight: "500"
    },
    modalContainer: {
        backgroundColor: "#e0e0e0", 
        marginTop: 400
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
      position:"absolute", 
      right: 15
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
    tabBarLabelStyle:{
      fontFamily: fontFamily, 
      fontWeight: "700"
    },
    successMessageTitle: {
      fontFamily: fontFamily, 
      fontSize: fontSize,
      fontWeight: "500"
    }
  });