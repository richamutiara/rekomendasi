import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { detailCard, detail } from "./DetailPage.module.css";
import { db } from "../../../firebase";
import vespaImg from "../../assets/vespa.jpg";

function DetailPage() {
  const { id } = useParams();
  const [rentalData, setRentalData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDetailById() {
      const docRef = doc(db, "rental", id);
      try {
        const docSnap = await getDoc(docRef);
        setRentalData(docSnap.data());
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getDetailById();
  }, [id]);

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className={detailCard}>
      <h1>{rentalData?.name}</h1>
      <Carousel fade>
        {rentalData?.images ? (
          rentalData.images.map((image) => (
            <CarouselItem key={image}>
              <div style={{ margin: "10px", height: "260px" }}>
                <Card.Img
                  variant="top"
                  src={image}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <div style={{ margin: "10px", height: "260px" }}>
              <Card.Img
                variant="top"
                src={vespaImg}
                style={{ objectFit: "cover" }}
              />
            </div>
          </CarouselItem>
        )}
      </Carousel>

      <section className={detail}>
        <address>Lokasi: {rentalData.location}</address>
        <address>{rentalData.address}</address>
        <p>Rata-rata harga: {rentalData.price}</p>
        <p>Fasilitas: {rentalData.facility}</p>
        <p>Kelengkapan: {rentalData.amenities}</p>
        <p>No telepon: {rentalData.phone}</p>
      </section>
    </div>
  );
}

export default DetailPage;
