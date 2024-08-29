import './Banner.css';

interface BannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

const Banner = ({ title, description, buttonText, buttonLink, image }: BannerProps) => {
  return (
    <div className='full-width-banner'>
      <div className='banner-content'>
        <h2 className='banner-title'>{title}</h2>
        <p className='banner-description'>{description}</p>
        <a href={buttonLink} className='banner-button'>
          {buttonText}
        </a>
      </div>
      <img src={image} alt={title} className='banner-image' />
    </div>
  );
};

export default Banner;
