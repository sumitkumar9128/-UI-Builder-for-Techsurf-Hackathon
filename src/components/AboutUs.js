import React, { useEffect, useState } from 'react';
import Stack from '../contentstackConfig'; 

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const Query = Stack.ContentType('about_us').Entry('blt50f9172bcecac511');
    Query.fetch()
      .then((result) => {
        setAboutData(result.toJSON());
      })
      .catch((error) => {
        console.log('Error fetching About Us data:', error);
      });
  }, []);

  if (!aboutData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{aboutData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: aboutData.mission_and_vision }} />
      <div dangerouslySetInnerHTML={{ __html: aboutData.history }} />
    </div>
  );
};

export default AboutUs;
