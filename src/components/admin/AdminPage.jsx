import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";
import {
  formControl,
  form,
  radioControl,
  radio,
  submitButton,
} from "./AdminPage.module.css";

function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [amenities, setAmenities] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [priceTopsis, setPriceTopsis] = useState(0);
  const [facilityTopsis, setFacilityTopsis] = useState(0);
  const [locationTopsis, setLocationTopsis] = useState(0);
  const [facility, setFacility] = useState("");

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleFacilityChange(e) {
    setFacility(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await addDoc(collection(db, "rental"), {
      name,
      price,
      location,
      address,
      amenities,
      owner,
      phone,
      facility,
      topsis_price: priceTopsis,
      topsis_facility: facilityTopsis,
      topsis_location: locationTopsis,
    });

    alert("data added");
  }
  return (
    <form onSubmit={handleSubmit} className={form}>
      <div className={formControl}>
        <label htmlFor="name">Nama Rental:</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={formControl}>
        <label htmlFor="price">Harga (Rp):</label>
        <input
          required
          value={price}
          type="number"
          name="price"
          id="price"
          min={10000}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
        />
      </div>
      <fieldset>
        <legend>Lokasi</legend>
        <div className={radioControl}>
          <div className={radio}>
            <input
              required
              type="radio"
              name="location"
              id="Kuta"
              value="Kuta"
              onChange={handleLocationChange}
            />
            <label htmlFor="Kuta">Kuta</label>
          </div>
          <div className={radio}>
            <input
              type="radio"
              name="location"
              id="Kuta Selatan"
              value="Kuta Selatan"
              onChange={handleLocationChange}
            />
            <label htmlFor="Kuta Selatan">Kuta Selatan</label>
          </div>
          <div className={radio}>
            <input
              type="radio"
              name="location"
              id="Kuta Utara"
              value="Kuta Utara"
              onChange={handleLocationChange}
            />
            <label htmlFor="Kuta Utara">Kuta Utara</label>
          </div>
          <div className={radio}>
            <input
              type="radio"
              name="location"
              id="Mengwi"
              value="Mengwi"
              onChange={handleLocationChange}
            />
            <label htmlFor="Mengwi">Mengwi</label>
          </div>
        </div>
      </fieldset>
      <div className={formControl}>
        <label htmlFor="address">Alamat Rental:</label>
        <input
          required
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={formControl}>
        <label htmlFor="amenities">Perlengkapan:</label>
        <input
          required
          type="text"
          name="amenities"
          id="amenities"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />
      </div>
      <div className={formControl}>
        <label htmlFor="owner">Owner:</label>
        <input
          required
          type="text"
          name="owner"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>
      <div className={formControl}>
        <label htmlFor="phone">No Telepon:</label>
        <input
          required
          type="tel"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className={formControl}>
        <label htmlFor="topsis_price">Topsis Harga:</label>
        <input
          required
          type="number"
          name="topsis_price"
          id="topsis_price"
          value={priceTopsis}
          onChange={(e) => setPriceTopsis(e.target.valueAsNumber)}
        />
      </div>
      <div className={formControl}>
        <label htmlFor="topsis_facility">Topsis Fasilitas:</label>
        <input
          required
          type="number"
          name="topsis_facility"
          id="topsis_facility"
          value={facilityTopsis}
          onChange={(e) => setFacilityTopsis(e.target.valueAsNumber)}
        />
      </div>
      <div className={formControl}>
        <label htmlFor="topsis_location">Topsis Lokasi:</label>
        <input
          required
          type="number"
          name="topsis_location"
          id="topsis_location"
          value={locationTopsis}
          onChange={(e) => setLocationTopsis(e.target.valueAsNumber)}
        />
      </div>
      <fieldset>
        <legend>Fasilitas</legend>
        <div className={radioControl}>
          <div className={radio}>
            <input
              required
              type="radio"
              name="facility"
              id="SL"
              onChange={handleFacilityChange}
              value="SL"
            />
            <label htmlFor="SL">Sangat Lengkap</label>
          </div>
          <div className={radio}>
            <input
              type="radio"
              name="facility"
              id="L"
              value="L"
              onChange={handleFacilityChange}
            />
            <label htmlFor="L">Lengkap</label>
          </div>
          <div className={radio}>
            <input
              type="radio"
              name="facility"
              id="TL"
              value="TL"
              onChange={handleFacilityChange}
            />
            <label htmlFor="TL">Tidak Lengkap</label>
          </div>
        </div>
      </fieldset>
      <button className={submitButton} type="submit">
        Tambah Data
      </button>
    </form>
  );
}

export default AdminPage;
