import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useNavigate, useParams } from "react-router-dom";
import "./TripPreview2.css";

export default function ColorsTimeline({ startDock, endDock, tripOngoing }) {
  let navigate = useNavigate();

  function calculateEcoPoints(startDock, endDock) {
    const startOccupancy = startDock.match(/[0-9]+$/);
    const endOccupancy = endDock.match(/[0-9]+$/);
    const num =
      parseFloat(startOccupancy[0]) - parseFloat(endOccupancy[0]) > 0
        ? parseFloat(startOccupancy[0]) - parseFloat(endOccupancy[0])
        : 0;
    return num;
  }
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>From: {startDock.split(",")[1]}</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="success" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          Eco_points:
          {startDock && endDock ? calculateEcoPoints(startDock, endDock) : ""}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>To: {endDock.split(",")[1]}</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
        </TimelineSeparator>
        <TimelineContent>
          <button
            onClick={() => {
              navigate("/trip/scan");
            }}
          >
            Scan a QR code to start the trip
          </button>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
