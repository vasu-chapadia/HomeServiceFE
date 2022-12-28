import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import tw from "twin.macro";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import _ from "lodash";

import "../../styles/index.css";

//Create category modal for subCategory and redirect to subcategory page
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-10 h-10 sm:h-10 bg-cover bg-center rounded sm:rounded-none pr-2`
]);

const CategoryModal = ({ setDrawer, drawer }) => {
  const navigate = useNavigate();

  const data = useSelector((state) => state?.category?.getDataBySubCategory);

  const toggleDrawer = (anchor, open) => (event) => {
    setDrawer(!drawer);
  };

  const handleClick = () => {
    navigate("/category");
  };

  const titleArr = [];

  data.length > 0 &&
    data.map((i) => {
      return <>{titleArr.push(i.categoryID?.[0].title)}</>;
    });

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ArrowBackIcon fontSize="bold" sx={{ m: "15px" }} />
      {_.uniq(titleArr)}
      <Divider />
      <List>
        {data.length > 0 &&
          data.map((i) => (
            <ListItem>
              <ListItemButton onClick={() => handleClick()}>
                <CardImage imageSrc={i.image} />
                <ListItemText className="listTitle" primary={i.title} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Drawer
          anchor="right"
          open={true}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default CategoryModal;
