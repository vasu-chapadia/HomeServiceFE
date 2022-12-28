import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";

import { getAllCategory } from "store/categorySlice";
import { useNavigate } from "react-router-dom";

import CardSlider from "./CardSlider";
import _ from "lodash";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

//Use CartSlider component and filter mainTitle
const ThreeColSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [drawer, setDrawer] = useState(false);
  const [title, settitle] = useState([]);

  const data = useSelector((state) => state?.category?.getdata);

  const filterData = useSelector(
    (state) => state?.category?.selectedCatgory?.data
  );

  let arr = [];

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  useEffect(() => {
    data?.length &&
      data.map((data) => {
        return arr.push(...data?.mainTitleId);
      });

    // settitle(filterData);
    !filterData && settitle(_.uniqBy(arr, "title"));
  }, [data]);

  useEffect(() => {
    filterData && navigate(`/category/${filterData._id}`);
  }, [filterData]);

  return (
    <Container>
      <Content>
        {title &&
          title?.map((card1) => (
            <CardSlider card={card1} data={data} drawer={drawer} />
          ))}
      </Content>
    </Container>
  );
};

export default ThreeColSlider;
