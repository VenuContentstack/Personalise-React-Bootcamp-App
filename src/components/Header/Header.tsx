import './Header.css';

import Personalization from '@contentstack/personalization-sdk-js';
import { Link } from 'react-router-dom'
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

  // const setAttribute = async (region: string) => {
  //   console.log(region)
  
  //   switch(region.toLowerCase()) {
  //   case 'europe':
  //       await personalizationSDK.set({travel_destination: 'EU'});
  //       break
    
  //   case 'asia':
  //       await personalizationSDK.set({travel_destination: 'APAC'})
  //       break
    
  //   case 'north america':
  //       await personalizationSDK.set({travel_destination: 'NA',})
  //       break
    
  //   case 'south america':
  //       await personalizationSDK.set({travel_destination: 'SA',})
  //       break    
  //   }
  
  
  
  // } 
  return (
    <header className='header'>
      <div className='container'>
        <div className='logo'>
        <Link to='/'>  <img
            src='https://images.contentstack.io/v3/assets/blt7359e2a55efae483/blt518e5105a0686696/663e30a08f19535905e50af2/Logo.svg'
            alt='Logo'
          /></Link>
        </div>
        <nav className='nav'>
          <ul>
            {menu.link.map((item) => (
              
              <li key={item.text}>
                <a href={item.link.href} 
                onClick={async () => {
                   await Personalization.set({
                    travel_destination: item.text,
                  });
              }}
                  // onClick={() => setAttribute(String(item.text))}
                > {item.text} </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
