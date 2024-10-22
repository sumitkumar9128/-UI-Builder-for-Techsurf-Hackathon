import React, { useEffect, useState } from 'react';
import Stack from '../contentstackConfig'; 

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const Query = Stack.ContentType('blog_news').Query(); 
    Query.find()
      .then((result) => {
        setBlogData(result[0].toJSON());
      })
      .catch((error) => {
        console.log('Error fetching Blog data:', error);
      });
  }, []);

  if (!blogData.length) return <div>Loading...</div>;

  return (
    <div>
      <h1>Latest Blog Posts</h1>
      {blogData.map(post => (
        <div key={post.uid}>
          <h2>{post.title}</h2>
          <p>By: {post.author}</p>
          <p>{post.publication_date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <img src={post.featured_image.url} alt={post.title} />
        </div>
      ))}
    </div>
  );
};

export default Blog;
