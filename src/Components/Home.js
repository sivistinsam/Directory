import { useEffect, useState } from "react";

import "../App.css";
import {Link} from "react-router-dom";

const Test = () => {
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);

  const fetchApi = async () => {
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const userData = await userResponse.json();
    const postData = await postResponse.json();

    if (userData) {
      setUser(userData);
      console.log(userData);
    }
    if (postData) {
      setPost(postData);
      console.log(postData);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
   
      <div className="Main">
        <h1>Directory</h1>
        <div className="submain">
          <div className="userDiv">
            {user.map((userItem) => {
              const userPosts = post.filter(
                (postItem) => postItem.userId === userItem.id
              );
              return (
                <Link
                  to={{ pathname: "/UserInfo", state: { userItem } }}
                  key={userItem.id} user = {user} post ={post}
                >
                  <div className="usersDiv">
                    <span>{`Name: ${userItem.name}`}</span>
                    <span>{`Posts: ${userPosts.length}`}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
  
  );
};

export default Test;
