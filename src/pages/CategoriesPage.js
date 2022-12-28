import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import style from "styled-components";

import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import CategoryModal from "components/modal/categoryModal";
import {
  getSubCategoriesByCategoryID,
  getAllCategory
} from "store/categorySlice";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import _ from "lodash";

const Card = tw.div`m-12 p-2 sm:m-8`;
const CardImage = style.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-20 sm:h-56 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`sm:px-0 sm:py-4`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;
const Description = tw.p`text-sm leading-loose`;

//get all category data from redux
const CategoriesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const data = useSelector((state) => state?.category?.getdata);

  const handleDrawer = (id) => {
    // dispatch(getSubCategoriesByCategoryID(id));
    // navigate(`/category/${id}`);
    return id;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={4}>
          {data.map((i) => {
            return (
              <>
                <Grid item xs={4}>
                  <Paper className="categoriesPaper">
                    <Card>
                      <CardImage imageSrc={i?.image} />
                      <TextInfo onClick={handleDrawer(i._id)}>
                        <TitleReviewContainer>
                          <Title>{i?.title}</Title>
                          <StarIcon />
                        </TitleReviewContainer>
                        <Description>{i?.description}</Description>
                        <Description className="categoriesDescription">
                          View more...
                        </Description>
                      </TextInfo>
                    </Card>
                  </Paper>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
