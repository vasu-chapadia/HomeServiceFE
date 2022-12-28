import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Card } from "primereact/card";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {
  SectionHeading,
  Subheading as SubheadingBase
} from "../components/misc/Headings";

import _ from "lodash";

import "../styles/index.css";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-10 lg:py-10`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;

const Subheading = tw(SubheadingBase)`mb-4`;
const HeadingTitle = tw(SectionHeading)`lg:text-left leading-tight`;

//get subCategory data from redux and dispaly all data
const SingleCategoryPage = () => {
  const data = useSelector((state) => state?.category?.getDataBySubCategory);

  return (
    <Container>
      <Content>
        <Box>
          <Card
            className="singleCategoryTitle"
            title={data[0]?.categoryID?.[0].title}
          >
            <div className="singleCategoryImg">
              <img
                alt="Card"
                src={data[0]?.categoryID?.[0].image}
                width="300px"
                height="300px"
              />
              <p>{data[0]?.categoryID?.[0].description}</p>
            </div>
          </Card>
          <Divider />
          <HeadingInfo tw="hidden lg:block" subheading="SubCategory" />
          <div className="singleCategoryMain">
            {data.map((i) => {
              return (
                <Paper className="title" title={i.title}>
                  <img alt="Card" src={i.image} />
                  <p>{i.title}</p>
                </Paper>
              );
            })}
          </div>
          <Divider />
          {data.map((i) => {
            return (
              <>
                <Paper>
                  <div className="subcategory">
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "800",
                        fontSize: "30px",
                        margin: "20px"
                      }}
                    >
                      <p>{i.title}</p>
                      <p className="price">
                        <i class="fa fa-rupee"></i> {i.price}
                      </p>
                    </Typography>
                    <div className="btn">
                      <div
                        className="addBtn"
                        onClick={() => console.log("Click")}
                      >
                        Add
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <div className="subCategoryDescription">
                    <p>{i.description}</p>
                  </div>
                </Paper>
              </>
            );
          })}
        </Box>
      </Content>
    </Container>
  );
};
export default SingleCategoryPage;

const HeadingInfo = ({ subheading, heading, description, ...props }) => (
  <div>
    {subheading ? <Subheading>{subheading}</Subheading> : null}
    <HeadingTitle>{heading}</HeadingTitle>
    <Description>{description}</Description>
  </div>
);
