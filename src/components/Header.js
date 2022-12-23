import logoMesto from '../images/Logo_mesto.svg';

function Header() {
  return (
    <header className="header">
    <img className="header__logo" src={logoMesto} alt="логотип место россия" />
  </header>
  );
}

export default Header;
