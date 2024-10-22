import React, { useEffect, useState } from 'react';
import StackInstance from '../contentstackConfig';
import '../styles/HomePage.css';  

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await StackInstance.ContentType('home_page')
          .Query()
          .toJSON()
          .find();

        if (response && response.length > 0) {
          setData(response[0]);
        } else {
          setError('No data found for the home page.');
        }
      } catch (err) {
        console.error('Error details:', err, err.response);
        setError('Error fetching home page data: ' + (err.message || 'Unknown error'));
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!data) return <div className="spinner">Loading...</div>;

  return (
    <div className="home-page">
      <h1>{data.title || 'Title not available'}</h1>
      {data.banner_image ? (
        <img src={data.banner_image.url} alt={data.title || 'Banner'} className="banner" />
      ) : (
        <p className="no-banner">No banner image available</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: data.overview || 'Overview not available' }} />
    </div>
  );
};

export default HomePage;
