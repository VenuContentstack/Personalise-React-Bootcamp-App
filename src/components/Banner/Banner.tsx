import './Banner.css';
import Personalization from '@contentstack/personalization-sdk-js';
interface BannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  ab: string;
}

const Banner = ({ title, description, buttonText, buttonLink, image, ab }: BannerProps) => {
  return (
    <div className='full-width-banner'>
      <div className='banner-content'>
        <h2 className='banner-title'>{title}</h2>
        <p className='banner-description'>{description}</p>
        {ab == '1' &&
          <a  className='banner-button'
          onClick={async () => {
            await Personalization.triggerEvent('Click');
        }}>
            {buttonText} 
          </a>
        }
      </div>
      <img src={image} alt={title} className='banner-image' />
    </div>
  );
};

export default Banner;
