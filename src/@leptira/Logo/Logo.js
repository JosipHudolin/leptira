import React from "react";
import { StyledLogo } from "../styles/Logo.style";
import LogoPng from "../assets/logo.png";

const Logo = () => {
  return (
    <StyledLogo src={LogoPng} />
  )

  // Ne koristi takav path. Mora bit relativan s obzirom na datoteku. Pogledaj gore kako sam importao
  // Obriši ovo kad pročitaš
  return (
    <StyledLogo src="C:\Users\josip\Documents\Faks\6. semestar\Završni rad\Leptira 2\leptira\src\@leptira\assets\logo.png" />
  );
};

export default Logo;
