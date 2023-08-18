import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  ListGroup,
  Accordion,
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Meteor from "./interfaces/Meteor";
import MeteorCard from "./MeteorCard";
import InfiniteScroll from "react-infinite-scroll-component";

const instance = axios.create({
  baseURL: "http://localhost:3001/meteors",
  timeout: 1000
});

function MeteorApp() {
  const [years, setYears] = useState<Array<number | string>>([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [mass, setMass] = useState("");
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [message, setMessage] = useState("");
  const [meteors, setMeteors] = useState<Array<Meteor>>([]);
  const [scrollHasMore, setScrollHasMore] = useState(false);
  const [scrollCurrentPage, setScrollCurrentPage] =  useState(1);

  const items: any = [];

  useEffect(() => {
    // Fetch the available years from the external endpoint when the component mounts
    async function fetchYears() {
      try {
        const response = await axios.get("http://localhost:3001/meteors/years");

        response.data.sort((a: number, b: number) => {
          if (a >= b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
        });

        const years: Array<number | string> = [
          "All",
          "Unknown",
          ...response.data
        ];

        setYears(years);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    }

    fetchYears();
  }, []);



  const fetchData = async () => {
    try {
      setMeteors([])
      let meteors: Array<Meteor> = [];
      let response;
      if (selectedYear === "All") {
        response = await instance.get(`/`);
      } else {
        response = await instance.get(`/year/${selectedYear}`, {
          params: {
            mass: mass
          }
        });
      }

      meteors = response.data.meteors;
      setTotalCount(response.data.totalElements);
      setScrollCurrentPage(response.data.pageNumber);
      if(scrollCurrentPage < response.data.totalPages){
        setScrollHasMore(true);
      } else {
        setScrollHasMore(false);
      }

      setCount(meteors.length);
      setMeteors(meteors);

      if (selectedYear !== "All") {
        if (
          meteors.length > 0 &&
          meteors[0].year &&
          String(meteors[0].year) !== selectedYear
        ) {
          setSelectedYear(String(meteors[0].year));
          setMessage(
            `No meteors found for the given mass in ${selectedYear}. Switching to year ${meteors[0].year} where meteors fit the criteria.`
          );
        } else {
          setMessage("");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMoreData = async () => {
    const response = await instance.get(`/`,{
      params:{
        page: scrollCurrentPage + 1
      }
    });

    setScrollCurrentPage(response.data.pageNumber);
    if(response.data.pageNumber < response.data.totalPages){
      setScrollHasMore(true);
    } else {
      setScrollHasMore(false);
    }
    setMeteors(meteors.concat(response.data.meteors));
    setCount(meteors.length + response.data.meteors.length);
    
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md></Col>
        <Col md="8">
          <Container>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h5>Select Year</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={selectedYear || "Select Year"}
                >
                  <Dropdown.Menu
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    {years.map((year) => (
                      <Dropdown.Item
                        key={year}
                        onClick={() => setSelectedYear(year + "")}
                      >
                        {year}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </DropdownButton>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h5>Mass</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Control
                    type="number"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                  />
                </Form>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <Button onClick={fetchData}>Submit</Button>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h5>Meteors Count: {count} / {totalCount}</h5>
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
                  dataLength={meteors.length} //This is important field to render the next data
                  next={fetchMoreData}
                  hasMore={scrollHasMore}
                  loader={<h4>Loading...</h4>}
                >
                  <Accordion defaultActiveKey="0">
                    {meteors.map((meteor) => (
                      <MeteorCard meteor={meteor} />
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
