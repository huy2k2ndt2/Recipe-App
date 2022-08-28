import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import {
  getData,
  getDataLocalStorage,
  setSettingsLocalStorage,
  setStyleRoot,
} from "../utils";
import {
  animationSpeeds,
  defaultSetttings,
  fontSizes,
  primaryColors,
  SAVE_SETTINGS,
  SAVE_STYLES,
  themes,
} from "../contants";

export default function Settings() {
  const [settings, setSettings] = useState(() => {
    return getDataLocalStorage(SAVE_STYLES) || defaultSetttings;
  });

  const [theme, setTheme] = useState(() =>
    getData(SAVE_SETTINGS, "theme", "light")
  );

  const [primaryColor, setPrimaryColor] = useState(() =>
    getData(SAVE_SETTINGS, "primaryColor", 0)
  );
  const [fontSize, setFontSize] = useState(() =>
    getData(SAVE_SETTINGS, "fontSize", 1)
  );
  const [animationSpeed, setAnimationSpeed] = useState(() =>
    getData(SAVE_SETTINGS, "animationSpeed", 1)
  );

  console.log({ fontSize });

  useEffect(() => {
    setStyleRoot(settings);
    localStorage.setItem(SAVE_STYLES, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const options = [
      { key: "primaryColor", value: primaryColor },
      { key: "theme", value: theme },
      { key: "fontSize", value: fontSize },
      { key: "animationSpeed", value: animationSpeed },
    ];

    options.forEach((option) => {
      setSettingsLocalStorage(option.key, option.value);
    });
  }, [primaryColor, theme, fontSize, animationSpeed]);

  function changeTheme(i) {
    const _theme = { ...themes[i] };
    setTheme(i === 0 ? "light" : "dark");
    let _settings = { ...settings };
    for (let key in _theme) {
      _settings[key] = _theme[key];
    }
    setSettingsLocalStorage("theme", i === 0 ? "light" : "dark");
    setSettings(_settings);
  }

  function changeColor(i) {
    const _color = primaryColors[i];
    let _settings = { ...settings };
    _settings["--primary-color"] = _color;
    setPrimaryColor(i);
    setSettings(_settings);
  }

  function changeFontSize(i) {
    const _size = fontSizes[i];
    let _settings = { ...settings };
    _settings["--font-size"] = _size.value;
    setFontSize(i);
    setSettings(_settings);
  }

  function changeAnimationSpeed(i) {
    let _speed = animationSpeeds[i];
    let _settings = { ...settings };
    _settings["--animation-speed"] = _speed.value;
    setAnimationSpeed(i);
    setSettings(_settings);
  }

  return (
    <div>
      <div className="section d-block">
        <h2>Primary Theme</h2>
        <div className="options-container">
          <div className="option light" onClick={() => changeTheme(0)}>
            {theme === "light" && (
              <div className="check">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            )}
          </div>
          <div className="option dark" onClick={() => changeTheme(1)}>
            {theme === "dark" && (
              <div className="check">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="section d-block">
        <h2>Preferred color</h2>
        <div className="options-container">
          {primaryColors.map((color, index) => (
            <div
              key={index}
              className="option light"
              style={{ backgroundColor: color }}
              onClick={() => changeColor(index)}
            >
              {primaryColor === index && (
                <div className="check">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="section d-block">
        <h2>Font size</h2>
        <div className="options-container">
          {fontSizes.map((size, index) => (
            <button
              key={index}
              className="btn"
              onClick={() => changeFontSize(index)}
            >
              {size.title}
              {fontSize === index && (
                <span>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="section d-block">
        <h2>Animation speed</h2>
        <div className="options-container">
          {animationSpeeds.map((speed, index) => (
            <button
              key={index}
              className="btn"
              onClick={() => changeAnimationSpeed(index)}
            >
              {speed.title}
              {animationSpeed === index && (
                <span>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
