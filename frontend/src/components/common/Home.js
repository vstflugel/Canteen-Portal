import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    localStorage.clear();
    setName("Dass TAs");
  }, []);

  return <div style={{ textAlign: "center" }}>Happy Coding - {name}</div>;
};

export default Home;
