import { useState } from "react";
import { Box } from "@mui/material";
import IconSun from "../assets/images/icon-sun.svg";
import IconMoon from "../assets/images/icon-moon.svg";

function ToggleDarkLight() {
  console.log("render toggle dark light");
  const [isDark, setIsDark] = useState(true);

  const handleToggleDarkLightMode = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("lightMode");

    setIsDark((prev) => !prev);
  };

  return (
    <Box
      component={"div"}
      onClick={() => handleToggleDarkLightMode()}
      sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <img src={isDark ? IconSun : IconMoon} alt={`${isDark ? "IconSun" : "IconMoon"}`} />
    </Box>
  );
}

export default ToggleDarkLight;
