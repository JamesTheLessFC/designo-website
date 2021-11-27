import styles from "../styles/Location.module.scss";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function Location({ data }) {
  return (
    <li className={styles.root}>
      <div className={styles.map}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={data.coordinates}
          zoom={14}
        >
          <Marker position={data.coordinates} title={data.address.name} />
        </GoogleMap>
      </div>
      <div className={styles.text_container}>
        <h1>{data.name}</h1>
        <div className={styles.location_info}>
          <div className={styles.address}>
            <p>{data.address.name}</p>
            <p>{data.address.street}</p>
            <p>
              {data.address.city}
              {data.address.stateOrProvince
                ? `, ${data.address.stateOrProvince} `
                : " "}
              {data.address.postalCode}
            </p>
          </div>
          <div className={styles.contact}>
            <p>Contact</p>
            <p>P: {data.contact.phone}</p>
            <p>M: {data.contact.email}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
