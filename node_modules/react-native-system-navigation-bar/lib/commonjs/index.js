"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const {
  NavigationBar
} = _reactNative.NativeModules;

const navigationHide = async () => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.navigationHide();
  }
};

const navigationShow = async () => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.navigationShow();
  }
};

const leanBack = async () => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.leanBack();
  }
};

const immersive = async () => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.immersive();
  }
};

const stickyImmersive = async () => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.stickyImmersive();
  }
};

const lowProfile = async () => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.lowProfile();
  }
};

const lightNavigationBar = async light => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.lightNavigationBar(light || false);
  }
};

const setNavigationColor = async (color, light) => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.setNavigationColor((0, _reactNative.processColor)(color), color === 'translucent', light || false);
  }
};

const setNavigationBarDividerColor = async color => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.setNavigationBarDividerColor((0, _reactNative.processColor)(color));
  }
};

const setNavigationBarContrastEnforced = async enforceContrast => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.setNavigationBarContrastEnforced(enforceContrast || false);
  }
};

const fullScreen = async enable => {
  if (_reactNative.Platform.OS === 'android') {
    return await NavigationBar.fullScreen(enable || false);
  }
};

var SystemNavigationBar = {
  navigationHide,
  navigationShow,
  leanBack,
  immersive,
  stickyImmersive,
  lowProfile,
  lightNavigationBar,
  setNavigationColor,
  setNavigationBarDividerColor,
  setNavigationBarContrastEnforced,
  fullScreen
};
var _default = SystemNavigationBar;
exports.default = _default;
//# sourceMappingURL=index.js.map