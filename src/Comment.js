import React from "react";
import { Row, Col } from "react-bootstrap";
import { Markup } from "interweave";

import moment from "moment";
const Comment = ({ comment_text, author, points, story_title, time }) => {
  return (
    <div className="mt-2 mb-0 px-3">
      <Row className="px-0 py-0 pb-1 pt-1">
        <Col className="a" style={{ fontSize: "10.6667px", color: "#000" }}>
          {points} points | {author} | {moment(time).fromNow()} | parent | on:{" "}
          {story_title}
        </Col>
      </Row>
      {/* <ReactMarkdown className="bold-text pt-1" source={comment_text} /> */}
      <Markup className="bold-text pt-2" content={comment_text} />
      {/* <div>{Parser(String(comment_text))}</div> */}
    </div>
  );
};

export default Comment;
