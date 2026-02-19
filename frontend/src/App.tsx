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

type Tenants = {
  id: number;
  name: string;
  building: string;
  level: number;
  number: number;
  sqm: number;
};

function App() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [tenants, setTenants] = useState<Tenants[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/buildings")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBuildings(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/tenants")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTenants(data);
      });
  });

  return (
    <div>
      <h2>Buildings</h2>
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
      <h2>Tenants</h2>
      <ul>
        {tenants.map((renter) => (
          <li key={renter.id}>
            <p>{renter.name}</p>
            <p>Building: {renter.building}</p>
            <p>Level: {renter.level}</p>
            <p>Number: {renter.number}</p>
            <p>Sqm: {renter.sqm}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
