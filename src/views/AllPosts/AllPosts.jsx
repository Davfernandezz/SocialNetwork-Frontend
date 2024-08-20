import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getAllPosts } from '../../services/postApiCalls';

export const AllPosts = () => {

    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
  
    const { passport } = useAuth();
  
    useEffect(() => {
      const bringAllPosts = async () => {
        try {
          const response = await getAllPosts();
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };
  
      bringAllPosts();
    }, []);

  return (
    <div>
      <h1>Posts</h1>
      {services.map((posts) => (
        <div key={posts.id}>
          <CCard description={posts.description} />
        </div>
      ))}
    </div>
);
};