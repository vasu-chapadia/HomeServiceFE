import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";

import imgs from "../../images/2.jpg";

import {
  getAllCategory,
  getSubCategoriesByCategoryID
} from "store/categorySlice";

import Autocomplete from "../../helpers/useAutoComplete";
import CategorySearch from "../../helpers/categorySearch";

import _ from "lodash";

import "../../styles/index.css";

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10`;

const RightColumn = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`
]);

const Content = tw.div`mt-12 lg:mt-12 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700 ml-5 mb-5`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500 `}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

/**
 * Landing Page
 * Use autoComplete and CategorySearch component
 * Dispatch getAllCategory api and getSubCategoriesByCategoryID
 * Apply category filter on getAllData and pass it on categorySearch component
 */

const FullWidthWithImage = ({
  heading = (
    <>
      Home services, on demand.
      <wbr />
      <br />
    </>
  ),
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
  primaryActionUrl = "/signup",
  primaryActionText = "Sign Up",
  secondaryActionUrl = "/login",
  secondaryActionText = "Login"
}) => {
  const dispatch = useDispatch();

  const [uniqData, setUniqData] = useState([]);

  const dataCategory = useSelector((state) => state?.category?.getdata);
  const filterData = useSelector(
    (state) => state?.category?.selectedCatgory?.data
  );

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  useEffect(() => {
    dispatch(getSubCategoriesByCategoryID(filterData?._id));
  }, [filterData]);

  let arr = [];

  useEffect(() => {
    dataCategory &&
      dataCategory.map((data) => {
        return arr.push(...data?.mainTitleId);
      });
    setUniqData(_.uniqBy(arr, "title"));
  }, [dataCategory]);

  // const categoryFilter =
  //   dataCategory.length > 0 &&
  //   dataCategory.map((item) => {
  //     return { label: item.title };
  //   });

  const categoryFilter =
    dataCategory.length > 0 &&
    dataCategory.map((item) => {
      return { label: item.title, data: [item] };
    });

  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <Content>
            <div className="search">
              <div className="countrySearch">
                <Autocomplete />
              </div>
              <div className="categorySearch">
                <CategorySearch />
              </div>
            </div>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <a href={primaryActionUrl} className="action primaryAction">
                {primaryActionText}
              </a>
              <a href={secondaryActionUrl} className="action primaryAction">
                {secondaryActionText}
              </a>
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn imageSrc={imgs}></RightColumn>
      </TwoColumn>
    </Container>
  );
};

export default FullWidthWithImage;
