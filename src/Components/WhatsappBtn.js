import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WhatsappBtn = () => {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=03221609471";

  const iconStyle = {
    color: "#25d366",
    position: "fixed",
    bottom: "20px", // Adjust the distance from the bottom as needed
    right: "20px", // Adjust the distance from the right as needed
    zIndex: 1000, // Ensure it's above other content
    cursor: "pointer",
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={iconStyle}
    >
      <FontAwesomeIcon color="#25d366" icon={faWhatsapp} size="2x" />
    </a>
  );
};

export default WhatsappBtn;
