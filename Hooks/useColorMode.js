"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    if (colorMode) {
      colorMode === "dark"
        ? bodyClass.add(className)
        : bodyClass.remove(className);
    }
  }, [colorMode]);

  useEffect(() => {
    const savedColorMode = window.localStorage.getItem("color-theme");
    if (savedColorMode) {
      setColorMode(savedColorMode);
    }
  }, []); // Load the mode on mount

  return [colorMode, setColorMode];
};

export default useColorMode;
