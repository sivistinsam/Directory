import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";


const UserInfo = (props) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [time, setTime] = useState("");
   const [user, setUser] = useState([]);
   const [post, setPost] = useState([]);
  
const fetchApiUserPost = async () => {
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

  const fetchApi = async () => {
    try {
      const countryResponse = await fetch(
        "http://worldtimeapi.org/api/timezone"
      );
      const countryData = await countryResponse.json();
      setCountries(countryData);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchTime = async (selectedCountry) => {
    try {
      const timeResponse = await fetch(
        `http://worldtimeapi.org/api/timezone/${selectedCountry}`
      );
      const timeData = await timeResponse.json();
      setTime(timeData.utc_datetime);
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };

  useEffect(() => {
    fetchApi();
    fetchApiUserPost();
  }, []);

  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    fetchTime(selectedValue);
  };

  return (
    <div className="mainUserInforPage">
      <div className="userInfoPage">
        <div>
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
        <label>Country:</label>
        <div>
          <select onChange={handleCountryChange} value={selectedCountry}>
            <option value="select">Select</option>
            {countries.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>{time && <div>Current time: {time}</div>}</div>
        <div>
          <button>Pause/Start</button>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>Profile Page</h1>
      </div>
      <div className="userSection">
        <div className="userDetail">
          <div>
            <p>Name</p>
            <p>Sandeep</p>
          </div>
          <div>
            <p>Address</p>
            <p>Bangalore</p>
          </div>
        </div>
        <div>
          {user.map((item)=>(
            <div key={item.id}>{item.post}</div>
          ))}
        </div>
        <div>{post.map((item)=>(
          <div key={item.id}>{item.title}</div>
        ))}</div>
      </div>
    </div>
  );
};

export default UserInfo;
