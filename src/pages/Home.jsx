import  { useEffect, useState } from "react";
import appwriteService from "../Appwrite/Conf";
import { Container, Postcard } from "../Components";

const Home = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  if (post.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                login to read posts
              </h1>
            </div>
          </div>
        </container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((posts) => {
            <div key={posts.$id} className="p-2 w-1/4">
              <Postcard {...posts} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
};

export default Home;
