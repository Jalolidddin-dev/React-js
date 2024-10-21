import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import "./App.css";

let API = "https://jsonplaceholder.typicode.com/photos";
function App() {
  const [users, setUsers] = useState([]);
  const [isEror, setIsEror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUsersHandler = async () => {
    try {
      setIsLoading(true);
      const responese = await fetch(API);

      const data = await responese.json();

      setUsers(data);
      setIsEror(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsEror(true);
      setIsLoading(false);
    }
  };

  // hooks
  useEffect(() => {
    getUsersHandler();
  }, []);

  return (
    <div className="users_box">
      {isEror ? (
        <h1>User topilmadi</h1>
      ) : (
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              {users.map((user) => (
                <div key={user.id}>
                  <img src={user.url} alt={user.title} />
                  <p>Title: {user.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
