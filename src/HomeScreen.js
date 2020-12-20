import React, { useState, useEffect } from "react";
import { Navbar, FormControl, Form, Row, Dropdown } from "react-bootstrap";
import News from "./News";
import Comment from "./Comment";
import useFetchData from "./useFetchData.js";
import DataPagination from "./DataPagination";

function HomeScreen() {
  const [params, setParams] = useState("");
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetchData(params, page, url);
  const [name, setName] = useState("All");
  const [count, setCount] = useState("");
  const [date, setDate] = useState("Popularity");
  useEffect(() => {
    if (data) {
      var number = data.nbHits || 0;
      var res = number.toLocaleString("en-IN");
      setCount(res);
    }
  }, [params, count, data]);
  const dateHandler = (e) => {
    if (e.target.name === "date") {
      setUrl("https://hn.algolia.com/api/v1/search_by_date?tags=story");
      setDate("Date");
    } else {
      setDate("Popularity");
      setUrl("");
    }
  };
  const handler = (e) => {
    e.preventDefault();
    let value = String(e.target.value);
    setParams((prev) => {
      return {
        ...prev,
        query: value,
      };
    });
  };
  const tagHandler = (e) => {
    let value = String(e.target.name);
    if (value !== "All") {
      setParams((prev) => {
        return {
          ...prev,
          tags: value,
        };
      });
      setName(e.target.name);
    } else {
      setParams((prev) => {
        return {
          ...prev,
          tags: "story",
        };
      });

      setName(e.target.name);
    }
  };
  return (
    <div
      style={{
        width: "85%",
        padding: "0px",
        margin: "0px auto",
        backgroundColor: "#F6F6EF",
      }}
      className="pb-3"
    >
      <Navbar
        expand="lg"
        className="py-1 navbar mx-0"
        style={{ backgroundColor: "#ff742b" }}
      >
        {" "}
        <img
          alt="search"
          src="//d3nb9u6x572n0.cloudfront.net/packs/media/images/logo-hn-search-a822432b.png"
          className="img"
        ></img>
        <Navbar.Brand className="bold-content-title">
          {localStorage.getItem("name")}{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form
            inline
            style={{ backgroundColor: "#F7F7F9", width: "89%", height: "45px" }}
          >
            <span className="SearchIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <FormControl
              type="text"
              placeholder="Search stories by title, url or author "
              style={{ width: "59%", height: "20px", marginLeft: "2px" }}
              className="form-control"
              onChange={handler}
            />
            <div className="PoweredBy">
              <span
                style={{ marginRight: "2px", textTransform: "Capitalize" }}
                className="bold-content"
              >
                Search by
              </span>
              <a
                className="se"
                href="https://www.algolia.com/?utm_source=hn_search&amp;amp;utm_medium=link&amp;amp;utm_term=logo&amp;amp;utm_campaign=hn_algolia"
                title="Realtime Search Engine"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="//d3nb9u6x572n0.cloudfront.net/packs/media/images/logo-algolia-blue-35c461b6.svg"
                  alt="Algolia Logo"
                />
              </a>
            </div>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Row className="drop">
        <div className="a mr-2">Search</div>
        <Dropdown className="mr-4 my-2">
          <Dropdown.Toggle size="sm" variant="light " id="dropdown-basic">
            {name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={tagHandler} name="All">
              All
            </Dropdown.Item>
            <Dropdown.Item name="story" onClick={tagHandler}>
              Stories
            </Dropdown.Item>
            <Dropdown.Item name="comment" onClick={tagHandler}>
              Comments
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="a mr-2">by</div>
        <Dropdown className="mr-4 my-2">
          <Dropdown.Toggle
            style={{ fontFamily: "Verdana" }}
            size="sm"
            variant="light"
            id="dropdown-basic"
          >
            {date}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item name="date" onClick={dateHandler}>
              Date
            </Dropdown.Item>
            <Dropdown.Item name="Popularity" onClick={dateHandler}>
              Popularity
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="a mr-2">for</div>
        <Dropdown style={{ marginRight: "42%" }}>
          <Dropdown.Toggle size="sm" variant="light" id="dropdown-basic">
            All time
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item name="date" onClick={dateHandler}>
              Last 24h
            </Dropdown.Item>
            <Dropdown.Item name="story" onClick={tagHandler}>
              Past Week
            </Dropdown.Item>
            <Dropdown.Item>Past Month</Dropdown.Item>
            <Dropdown.Item>Custom Range</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="bold-text">
          {count} results ({(data.nbHits / 100000000).toFixed(3)} seconds)
        </div>
      </Row>
      {error && <h1 className>{error}</h1>}
      {loading ? (
        <div
          style={{
            width: "100%",
            padding: "0px",
            height: "90vh",
          }}
        ></div>
      ) : (
        name !== "comment" &&
        data.hits.map((data) => {
          return (
            data.title && (
              <News
                key={data.created_at}
                time={data.created_at}
                title={data.title}
                url={data.url}
                points={data.points}
                author={data.author}
                numComments={data.num_comments}
                storyText={data.story_text}
              />
            )
          );
        })
      )}
      {name === "comment" &&
        data.hits &&
        data.hits.map((data) => {
          return (
            <Comment
              key={data.created_at}
              author={data.author}
              comment_text={data.comment_text}
              points={data.points}
              time={data.created_at}
              story_title={data.story_title}
            />
          );
        })}
      <div style={{ paddingLeft: "35%", width: "100%" }}>
        <DataPagination
          className=""
          page={page}
          setPage={setPage}
          hasNextPage={data.nbPages - 1 > page}
        />
      </div>
    </div>
  );
}

export default HomeScreen;
