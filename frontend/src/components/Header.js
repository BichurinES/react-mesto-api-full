import React from 'react'; 
import { Link } from 'react-router-dom'; 

function Header(props) {
  return (
    <header className="header page__header">
      <Link to="/" className="header__logo" />
      {props.children}
    </header>
  );
}

export default Header;