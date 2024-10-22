import React, { useEffect, useState } from 'react';
import Stack from '../contentstackConfig'; 
import '../styles/Home.css';  

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const Query = Stack.ContentType('home_page').Entry(''); // removed
    Query.fetch()
      .then((result) => {
        setHomeData(result.toJSON());
      })
      .catch((error) => {
        console.log('Error fetching home data:', error);
      });
  }, []);

  if (!homeData) return <div className="loader">Loading...</div>;

  return (
    <div className="home-page">
      <h1 className="home-title">{homeData.title || 'Title not available'}</h1> 
      {homeData.banner_image ? (
        <img src={homeData.banner_image.url} alt="Banner" className="home-banner" />
      ) : (
        <p className="no-banner">No banner image available</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: homeData.overview || 'Overview not available' }} />
    </div>
  );
};

export default Home;
