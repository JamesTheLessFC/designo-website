import styles from "../styles/LocationList.module.scss";
import Location from "./Location";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const locations = [
  {
    name: "Canada",
    address: {
      name: "Designo Central Office",
      street: "3886 Wellington Street",
      city: "Toronto",
      stateOrProvince: "Ontario",
      postalCode: "M9C 3J5",
    },
    contact: {
      phone: "+1 253-863-8967",
      email: "contact@designo.co",
    },
    coordinates: {
      lat: 43.64422590229812,
      lng: -79.39456085992396,
    },
  },
  {
    name: "Australia",
    address: {
      name: "Designo AU Office",
      street: "19 Balonne Street",
      city: "Narrabri",
      stateOrProvince: "NSW",
      postalCode: "2443",
    },
    contact: {
      phone: "(02) 6720 9092",
      email: "contact@designo.au",
    },
    coordinates: {
      lat: -30.329359124851685,
      lng: 149.78873342404262,
    },
  },
  {
    name: "United Kingdom",
    address: {
      name: "Designo UK Office",
      street: "Wheldon Rd",
      city: "Castleford",
      stateOrProvince: null,
      postalCode: "WF10 3UA",
    },
    contact: {
      phone: "078 3115 1400",
      email: "contact@designo.uk",
    },
    coordinates: {
      lat: 53.73238708220275,
      lng: -1.3279358018992884,
    },
  },
];

export default function LocationList() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <ul className={styles.root}>
        {locations.map((location) => (
          <Location key={location.name} data={location} />
        ))}
      </ul>
    </LoadScript>
  );
}
