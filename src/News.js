import React from "react";

import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { Markup } from "interweave";
const News = ({ title, url, numComments, author, points, storyText, time }) => {
  return (
    <div className="mt-2 mb-0 px-3">
      <Row>
        <Col>
          {url ? (
            <div>
              <span className="bold-content">{title}</span> (
              <a className="a" href={url}>
                {url}
              </a>
              )
            </div>
          ) : (
            <div>
              <span className="bold-content">{title}</span>
            </div>
          )}
        </Col>
      </Row>
      <Row className="px-0 py-0">
        <Col className="a" style={{ fontSize: "10.6667px" }}>
          {points} points | {author} | {moment(time).fromNow()} | {numComments}{" "}
          comments
        </Col>
      </Row>
      {storyText && (
        <Markup
          className="bold-text pt-1"
          style={{ fontSize: "10px" }}
          content={storyText}
        />
      )}
    </div>
  );
};

export default News;
