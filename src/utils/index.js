import { SAVE_SETTINGS } from "../contants";

export const setStyleRoot = (settings) => {
  const root = document.documentElement;
  for (let key in settings) {
    root.style.setProperty(key, settings[key]);
  }
};

export const getDataLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const setSettingsLocalStorage = (key, value) => {
  const settings = getDataLocalStorage(SAVE_SETTINGS);
  const newSettings = {
    ...settings,
    [key]: value,
  };
  localStorage.setItem(SAVE_SETTINGS, JSON.stringify(newSettings));
};

export const getData = (keyLocalStorage, key, defaultValue) => {
  const settings = getDataLocalStorage(keyLocalStorage);
  return (settings && settings[key]) ?? defaultValue;
};
