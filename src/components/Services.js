import React, { useEffect, useState } from 'react';
import Stack from '../contentstackConfig'; 

const Services = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const Query = Stack.ContentType('services_products').Query(); 
    Query.find()
      .then((result) => {
        setServicesData(result[0].toJSON());
      })
      .catch((error) => {
        console.log('Error fetching Services data:', error);
      });
  }, []);

  if (!servicesData.length) return <div>Loading...</div>;

  return (
    <div>
      <h1>Our Services</h1>
      {servicesData.map(service => (
        <div key={service.uid}>
          <h2>{service.service_product_name}</h2>
          <div dangerouslySetInnerHTML={{ __html: service.description }} />
          <ul>
            {service.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p>Price: {service.pricing}</p>
          <img src={service.product_image.url} alt={service.service_product_name} />
        </div>
      ))}
    </div>
  );
};

export default Services;
