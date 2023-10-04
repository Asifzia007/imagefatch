import { useRef, useState} from 'react';
import './App.css';
import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const Image_per_page = 20;

function App() {
  console.log('key', process.env.REACT_APP_)
  const searchInput = useRef(null);

  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

 
  const fetchImages = async () => {
    try{
      
      const {data} = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=1&per_page=${Image_per_page}&client_id=${process.env.REACT_APP_}`);
     setImages(data.results);
     console.log(data, "data")
     setTotalPages(data.total_pages);
  } catch (error){
   console.log(error);
  }
  };

  const handleSearch = (event) => {
   event.preventDefault();
   console.log(searchInput.current.value);
   fetchImages();
  };

 const handleSelection = (Selection) => {
searchInput.current.value = Selection;
fetchImages();
 }

  return (
   <>
     <div className='container' >
      <h1 className='title'>search image</h1>
      <div className='search-section'>
        <form onSubmit={handleSearch}> 
      <input type="search" placeholder="search images..." className='search-input' ref={searchInput}/>
      </form>
      </div>
      <div className='filters'>
        <button onClick={()=> handleSelection('nature')}>Nature</button>
        <button onClick={()=> handleSelection('birds')}>Birds</button>
        <button onClick={()=> handleSelection('cars')}>cars</button>
        <button onClick={()=> handleSelection('bikes')}>bikes</button>
      </div>
      <div className='images'>
        {images.map((image) =>{
           
          <img key={image.id} src={image.urls.small} alt={image.alt_description} className='image' />
          
      
        })}

      </div>
     </div>
   </>
  );
}

export default App;
