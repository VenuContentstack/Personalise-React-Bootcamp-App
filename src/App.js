import './App.css';
import Banner from './components/Banner/Banner';
import Header from './components/Header/Header';


function App() {



  return (
    <div className="App">
      <Header/>
      <Banner
        title="Welcome to Our Website"
        description="Discover amazing products and services."
        buttonText="Learn More"
        buttonLink="/about"
        image="https://dev11-images.csnonprod.com/v3/assets/bltea7bdc3a9471a122/blt75fd0f20cb739021/66502ee071da6c0f78303a3f/Tokyo_Tower.webp?auto=webp&format=pjpg" // Replace with your image URL
      />
    </div>
  );
}

export default App;
