/* eslint-disable no-nested-ternary */
import { Form, Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { useState, useReducer, useMemo } from "react";
import produce from "immer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import vespaImage from "../../assets/vespa.jpg";
import { db } from "../../../firebase";

const SET_FIRST = "SET_PRICE";
const SET_SECOND = "SET_FACILITY";
const SET_THIRD = "SET_LOCATION";

const initialPriorityState = {
  first: "",
  second: "",
  third: "",
};

function priorityReducer(draft, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_FIRST: {
      if (draft.second === payload) {
        draft.second = "";
      }
      if (draft.third === payload) {
        draft.third = "";
      }
      draft.first = payload;
      break;
    }
    case SET_SECOND: {
      if (draft.first === payload) {
        draft.first = "";
      }
      if (draft.third === payload) {
        draft.third = "";
      }
      draft.second = payload;
      break;
    }
    case SET_THIRD: {
      if (draft.first === payload) {
        draft.first = "";
      }
      if (draft.second === payload) {
        draft.second = "";
      }
      draft.third = payload;
      break;
    }
    default: {
      throw Error("Action not found.");
    }
  }
}

const curriedReducer = produce(priorityReducer);

async function getRentalData({ priceLimit, location, facility }) {
  try {
    const q = query(
      collection(db, "rental"),
      where("price", "<=", priceLimit),
      where("facility", "==", facility),
      where("location", "==", location)
    );
    const snapshots = await getDocs(q);
    const resArray = [];
    snapshots.forEach((rentalSnap) => {
      const data = rentalSnap.data();
      const dataWithId = {
        ...data,
        id: rentalSnap.id,
      };
      resArray.push(dataWithId);
    });
    return resArray;
  } catch (error) {
    return error;
  }
}

function countCriteria(priorities) {
  let ahpPrice;
  let ahpFacility;
  let ahpLocation;

  if (priorities.first === "Harga") {
    ahpPrice = 9;
  }
  if (priorities.first === "Fasilitas") {
    ahpFacility = 9;
  }
  if (priorities.first === "Lokasi") {
    ahpLocation = 9;
  }

  if (priorities.second === "Harga") {
    ahpPrice = 5;
  }
  if (priorities.second === "Fasilitas") {
    ahpFacility = 5;
  }
  if (priorities.second === "Lokasi") {
    ahpLocation = 5;
  }

  if (priorities.third === "Harga") {
    ahpPrice = 3;
  }
  if (priorities.third === "Fasilitas") {
    ahpFacility = 3;
  }
  if (priorities.third === "Lokasi") {
    ahpLocation = 3;
  }

  const matrix = [
    [1, ahpPrice / ahpFacility, ahpPrice / ahpLocation],
    [ahpFacility / ahpPrice, 1, ahpFacility / ahpLocation],
    [ahpLocation / ahpPrice, ahpLocation / ahpFacility, 1],
  ];

  // pushing the total into the matrix;
  matrix.push([
    matrix[0][0] + matrix[1][0] + matrix[2][0],
    matrix[0][1] + matrix[1][1] + matrix[2][1],
    matrix[0][2] + matrix[1][2] + matrix[2][2],
  ]);

  const totalCriteria = matrix[3];

  const vektorEigen = [
    [
      (matrix[0][0] / totalCriteria[0] +
        matrix[0][1] / totalCriteria[1] +
        matrix[0][2] / totalCriteria[2]) /
        3,
    ],
    [
      (matrix[1][0] / totalCriteria[0] +
        matrix[1][1] / totalCriteria[1] +
        matrix[1][2] / totalCriteria[2]) /
        3,
    ],
    [
      (matrix[2][0] / totalCriteria[0] +
        matrix[2][1] / totalCriteria[1] +
        matrix[2][2] / totalCriteria[2]) /
        3,
    ],
  ];

  return {
    priceVector: vektorEigen[0],
    facilityVector: vektorEigen[1],
    locationVector: vektorEigen[2],
  };
}

function addWeightToRental(vektorEigen, rentalData) {
  const priceWeight = vektorEigen.priceVector * rentalData.topsis_price;
  const facilityWeight =
    vektorEigen.facilityVector * rentalData.topsis_facility;
  const locationWeight =
    vektorEigen.locationVector * rentalData.topsis_location;

  return {
    ...rentalData,
    priceWeight,
    facilityWeight,
    locationWeight,
  };
}

function addRankingWeight(attributes, rentalData) {
  const pricePositive =
    (rentalData.priceWeight - attributes.pricePositive) ** 2;
  const priceNegative =
    (rentalData.priceWeight - attributes.priceNegative) ** 2;
  const facilityPositive =
    (rentalData.facilityWeight - attributes.facilityPositive) ** 2;
  const facilityNegative =
    (rentalData.facilityWeight - attributes.facilityNegative) ** 2;
  const locationPositive =
    (rentalData.locationWeight - attributes.locationPositive) ** 2;
  const locationNegative =
    (rentalData.locationWeight - attributes.locationNegative) ** 2;

  const positiveIdeal = Math.sqrt(
    pricePositive + facilityPositive + locationPositive
  );

  const negativeIdeal = Math.sqrt(
    priceNegative + facilityNegative + locationNegative
  );

  const rankingWeight = negativeIdeal / (positiveIdeal + negativeIdeal);

  return {
    ...rentalData,
    rankingWeight,
  };
}

function OptionPage() {
  const [price, setPrice] = useState(0);
  const [facility, setFacility] = useState("SL");
  const [location, setLocation] = useState("Kuta");
  const [priorities, dispatch] = useReducer(
    curriedReducer,
    initialPriorityState
  );

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !priorities.first ||
      !priorities.second ||
      !priorities.third ||
      !price
    ) {
      // eslint-disable-next-line no-alert
      alert("Tolong isikan data dengan benar");
      return;
    }
    const vektorEigen = countCriteria(priorities);

    const data = await getRentalData({
      priceLimit: price,
      location,
      facility,
    });

    const attributes = {
      /* nilai awal infinity karena kita akan mencari nilai maximal dan minimal atribut positif dan negatif */
      pricePositive: Infinity,
      priceNegative: -Infinity,
      facilityPositive: -Infinity,
      facilityNegative: Infinity,
      locationPositive: -Infinity,
      locationNegative: Infinity,
    };

    const weightedData = data.map((rentalData) => {
      const weightedRental = addWeightToRental(vektorEigen, rentalData);

      // getting the positive and negative attribute.

      attributes.pricePositive = Math.min(
        attributes.pricePositive,
        weightedRental.priceWeight
      );
      attributes.priceNegative = Math.max(
        attributes.priceNegative,
        weightedRental.priceWeight
      );
      attributes.facilityPositive = Math.max(
        attributes.facilityPositive,
        weightedRental.facilityWeight
      );
      attributes.facilityNegative = Math.min(
        attributes.facilityNegative,
        weightedRental.facilityWeight
      );
      attributes.locationPositive = Math.max(
        attributes.locationPositive,
        weightedRental.locationWeight
      );
      attributes.locationNegative = Math.min(
        attributes.locationNegative,
        weightedRental.locationWeight
      );

      return weightedRental;
    });

    const finalData = weightedData.map((rentalData) =>
      addRankingWeight(attributes, rentalData)
    );

    finalData.sort((dataA, dataB) => dataB.rankingWeight - dataA.rankingWeight);

    navigate("search-results", {
      state: finalData,
    });
  };

  const priorityList = useMemo(() => ["Harga", "Fasilitas", "Lokasi"], []);

  const handleFirstPrio = (e) => {
    dispatch({
      type: SET_FIRST,
      payload: e?.target.value,
    });
  };
  const handleSecondPrio = (e) => {
    dispatch({
      type: SET_SECOND,
      payload: e?.target.value,
    });
  };
  const handleThirdPrio = (e) => {
    dispatch({
      type: SET_THIRD,
      payload: e?.target.value,
    });
  };

  return (
    <Container className="min-vh-100">
      <Row>
        <div className="p-5 gap-4 d-flex justify-content-center">
          <Form.Group className="mb-2">
            <Form.Label>Prioritas Utama</Form.Label>
            <Form.Select
              aria-label="Nilai Harga"
              onChange={handleFirstPrio}
              value={priorities.one}
            >
              <option value="">Pilih Prioritas Utama</option>
              {priorityList.map((priority) => (
                <option value={priority} key={priority}>
                  {priority}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Prioritas Kedua</Form.Label>
            <Form.Select
              aria-label="Nilai Fasilitas"
              onChange={handleSecondPrio}
              value={priorities.two}
            >
              <option value="">Pilih Prioritas Kedua</option>
              {priorityList
                .filter((priority) => priority !== priorities.first)
                .map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Prioritas Terakhir</Form.Label>
            <Form.Select
              value={priorities.three}
              aria-label="Nilai Lokasi"
              onChange={handleThirdPrio}
            >
              <option value="">Pilih Prioritas Terakhir</option>
              {priorityList
                .filter(
                  (priority) =>
                    priority !== priorities.first &&
                    priority !== priorities.second
                )
                .map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </div>
        <Col>
          <div className="d-flex align-items-center ">
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={vespaImage}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={vespaImage}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={vespaImage}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
        <Col md={{ span: 5, offset: 1 }}>
          <div className="d-flex align-items-center">
            <div>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label>Harga Maksimal</Form.Label>
                  <div className="d-flex flex-row mb-3">
                    <Form.Control
                      size="sm"
                      type="tel"
                      min={0}
                      max={1000000}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </div>
                </Form.Group>
                <Form.Label>Fasilitas</Form.Label>
                <Form.Check
                  type="radio"
                  id="sangat-lengkap"
                  name="amenities"
                  label="Sangat Lengkap"
                  value="SL"
                  defaultChecked
                  onChange={(e) => setFacility(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  id="lengkap"
                  name="amenities"
                  label="Lengkap"
                  value="L"
                  onChange={(e) => setFacility(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  id="tidak-lengkap"
                  name="amenities"
                  label="Tidak Lengkap"
                  value="TL"
                  onChange={(e) => setFacility(e.target.value)}
                />
                <Form.Group className="mb-2">
                  <Form.Label>Lokasi</Form.Label>
                  <Form.Select
                    aria-label="Lokasi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="Kuta">Kuta</option>
                    <option value="Kuta Selatan">Kuta Selatan</option>
                    <option value="Kuta Utara">Kuta Utara</option>
                    <option value="Mengwi">Mengwi</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" variant="primary" size="sm">
                  Cari
                </Button>
                <Button
                  as="input"
                  type="reset"
                  value="Reset"
                  size="sm"
                  variant="danger"
                />
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OptionPage;
