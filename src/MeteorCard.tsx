// MeteorCard.js

import React from "react";
import {Accordion } from "react-bootstrap";
import Meteor from "./interfaces/Meteor";

interface MeteorCardProps {
    meteor:Meteor
}

function MeteorCard({ meteor }:MeteorCardProps) {
  return (
    <Accordion.Item key={meteor.id} eventKey={String(meteor.id)}>
      <Accordion.Header>{meteor.name}</Accordion.Header>
      <Accordion.Body>
        Year: {meteor.year || "Unknown"} <br />
        Mass: {meteor.mass || "Unknown"} <br />
        Geolocation: {`${meteor.reclat}, ${meteor.reclong}`} <br />
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default MeteorCard;
