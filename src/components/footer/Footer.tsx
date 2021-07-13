import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className='footer'>
      <span>
        <a href="https://github.com/ulyana-zh">ulyana-zh</a>
      </span>
      <span>2020</span>
      <span className="logo__rsschool">
        <a href="https://rs.school/js/">
          <img
            className="logo__rsschool"
            src={"assets/images/rs_logo.png"}
            alt="rsschool"
          />
        </a>
      </span>
    </footer>
  );
};

export default Footer;
