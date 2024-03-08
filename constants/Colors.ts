const tintColorLight = '#2f95dc';
const tintColorDark = '#ffffff';
const colorBlack = '#000000';
const colorHighlight = '#e5e5e5';
const colorHighlightDark = '#232323';
const tabBarActiveTintColor = '#1cb96a';
const tabBarInactiveTintColor = 'gray';


const greenPrimaryLight = "#28ac49";
const greenSecondaryLight = "#1cb96a";

const greenPrimaryDark = "#171717";
const greenSecondaryDark = "#171717";


const colorDanger = '#e91e63';
const colorEdit = '#2196f3';
const fontColorLight = "#383a50";
const fontColorDark = "#fff";
const fontColorWhite = "#ffffff";
const bgLight = "#f2f2f2";
const bgDark = "#121212";
const bgLightItem = "#ffffff";
const bgDarkItem = "#171717";
const assetFullNameLight = "gray";
const assetFullNameDark = "#a2a2a2";

export default {
  colorDanger: colorDanger,
  colorEdit: colorEdit,
  light: {
    text: fontColorLight,
    textSecondary: fontColorWhite,
    background: bgLight,
    tint: tintColorLight,
    highlight: colorHighlight,
    inputFontColor: colorBlack,
    tabBarActiveTintColor: tabBarActiveTintColor,
    tabBarInactiveTintColor: tabBarInactiveTintColor,
    balanceBackgroundPrimary: greenPrimaryLight,
    balanceBackgroundSecondary: greenSecondaryLight,
    assetItem: bgLightItem,
    assetFullName: assetFullNameLight
  },
  dark: {
    text: fontColorDark,
    textSecondary: fontColorWhite,
    background: bgDark,
    tint: tintColorDark,
    highlight: colorHighlightDark,
    inputFontColor: fontColorWhite,
    tabBarActiveTintColor: tabBarActiveTintColor,
    tabBarInactiveTintColor: tabBarInactiveTintColor,
    balanceBackgroundPrimary: greenPrimaryDark,
    balanceBackgroundSecondary: greenSecondaryDark,
    assetItem: bgDarkItem,
    assetFullName: assetFullNameDark
  },
};