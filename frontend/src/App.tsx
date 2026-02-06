import { useEffect, useState } from "react";
import "./App.css";

type Building = {
  id: number;
  name: string;
  address: string;
  architect: string;
  owner: string;
  year: number;
  levels: number;
  webpage: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/buildings")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBuildings(data);
      });
  }, []);

  return (
    <div>
      <h1>Buildings</h1>
      <ul>
        {buildings.map((property) => (
          <li key={property.id}>
            <strong>{property.name}</strong>
            <p>Address: {property.address}</p>
            <p>Architect: {property.architect}</p>
            <p>Owner: {property.owner}</p>
            <p>Year: {property.year}</p>
            <p>Levels: {property.levels}</p>
            <p>Webpage: {property.webpage}</p>
            <p>Email: {property.email}</p>
            <p>Phone: {property.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
