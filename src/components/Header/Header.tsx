import './Header.css';

import { Link } from 'react-router-dom';

export type NavLink = {
  text: string;
  link: {
    href: string;
  };
};

interface HeaderProps {
  menu: {
    link: NavLink[];
  };
}

const Header = ({ menu }: HeaderProps) => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='logo'>
        <Link to='/'> <img
            src='https://images.contentstack.io/v3/assets/blt7359e2a55efae483/blt518e5105a0686696/663e30a08f19535905e50af2/Logo.svg'
            alt='Logo'
          /></Link>
        </div>
        <nav className='nav'>
          <ul>
            {menu.link.map((item) => (
              <li key={item.text}>
                <Link to={item.link.href}> {item.text} </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
