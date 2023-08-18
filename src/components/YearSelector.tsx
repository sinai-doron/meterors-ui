import React, { useState } from "react";
import { Dropdown, DropdownButton, Col, Row } from "react-bootstrap";
import "../styles/main.css";

interface YearSelectorProps {
  years: Array<number | string>;
  selectedYear:string;
  handleOnSelect:(year:string)=>void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ years, selectedYear, handleOnSelect }) => {  
  return (
    <>
      <Row>
        <Col>
          <h5 className="title">Select Year</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <DropdownButton 
            id="dropdown-basic-button" 
            title={selectedYear} 
            onSelect={(eventKey)=>{handleOnSelect(String(eventKey));}}
            className="custom-dropdown"
            >
            {years.map((year, index) => (
              <Dropdown.Item eventKey={year} key={index}>{year}</Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Row>
    </>
  );
};

export default YearSelector;
