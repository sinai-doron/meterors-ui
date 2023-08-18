import React, { useState, useEffect } from "react";
import meteorApi from "./services/meteorApi";
import {
  Button,
  Accordion,
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Meteor from "./interfaces/Meteor";
import MeteorCard from "./MeteorCard";
import InfiniteScroll from "react-infinite-scroll-component";
import YearSelector from "./components/YearSelector";
import MassInput from "./components/MassInput";

function MeteorApp() {
  const [years, setYears] = useState<Array<number | string>>([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [mass, setMass] = useState("");
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [message, setMessage] = useState("");
  const [meteors, setMeteors] = useState<Array<Meteor>>([]);
  const [scrollHasMore, setScrollHasMore] = useState(false);
  const [scrollCurrentPage, setScrollCurrentPage] = useState(1);

  const items: any = [];

  function handleYearSelection(year: string) {
    setSelectedYear(year);
  }

  function handleMassUpdate(mass: string) {
    setMass(mass);
  }

  useEffect(() => {
    // Fetch the available years from the external endpoint when the component mounts
    async function fetchYears() {
      try {
        const { data } = await meteorApi.get(
          "http://localhost:3001/meteors/years"
        );

        data.sort((a: number, b: number) => a - b);

        const years: Array<number | string> = ["All", "Unknown", ...data];

        setYears(years);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    }

    fetchYears();
  }, []);

  const updateScrollStatus = (currentPage:number, totalPageCount:number) => {
    setScrollCurrentPage(currentPage);
    setScrollHasMore(currentPage < totalPageCount);
  };

  const fetchData = async () => {
    try {
      setMeteors([]);

      const endpoint = selectedYear === "All" ? "/" : `/year/${selectedYear}`;
      const params = selectedYear !== "All" ? { mass } : {};

      const { data } = await meteorApi.get(endpoint, { params });
      const { meteors, totalElements, pageNumber, totalPages } = data;

      updateScrollStatus(pageNumber, totalPages);

      setTotalCount(totalElements);
      setCount(meteors.length);
      setMeteors(meteors);

      if (
        selectedYear !== "All" &&
        meteors.length > 0 &&
        String(meteors[0].year) !== selectedYear
      ) {
        setSelectedYear(String(meteors[0].year));
        setMessage(
          `No meteors found for the given mass in ${selectedYear}. Switching to year ${meteors[0].year} where meteors fit the criteria.`
        );
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMoreData = async () => {
    try {
        const { data } = await meteorApi.get(`/`, {
            params: {
                page: scrollCurrentPage + 1
            }
        });

        const { pageNumber, totalPages, meteors: newMeteors } = data;
        updateScrollStatus(pageNumber, totalPages);

        setMeteors(prevMeteors => [...prevMeteors, ...newMeteors]);
        setCount(prevCount => prevCount + newMeteors.length);
    } catch (error) {
        console.error("Error fetching more data:", error);
    }
};

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md></Col>
        <Col md="8">
          <Container>
            <YearSelector
              years={years}
              selectedYear={selectedYear}
              handleOnSelect={handleYearSelection}
            />
            <MassInput mass={mass} onMassChange={handleMassUpdate} />
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <Button onClick={fetchData}>Submit</Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h5>
                  Meteors Count: {count} / {totalCount}
                </h5>
              </Col>
            </Row>
            {message && (
              <Row>
                <Col>{message}</Col>
              </Row>
            )}
            <Row style={{ marginTop: "20px" }}>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <InfiniteScroll
                  height={450}
                  dataLength={meteors.length}
                  next={fetchMoreData}
                  hasMore={scrollHasMore}
                  loader={<h4>Loading...</h4>}
                >
                  <Accordion defaultActiveKey="0">
                    {meteors.map((meteor, index) => (
                      <MeteorCard key={index} meteor={meteor} />
                    ))}
                  </Accordion>
                </InfiniteScroll>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs></Col>
      </Row>
    </Container>
  );
}

export default MeteorApp;
