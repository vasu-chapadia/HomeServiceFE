import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";

import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { SectionHeading } from "components/misc/Headings";
import CategoryModal from "components/modal/categoryModal";

import { getSubCategoriesByCategoryID } from "store/categorySlice";

import "../../styles/index.css";

const HeadingWithControl = tw.div`flex mt-5 flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const SliderCard = styled(Slider)`
  ${tw`mt-16`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-64 flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full w-1/4 flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`sm:px-10 sm:py-4`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;
const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

//Use react-slick for Slider and display all data according category
const CardSlider = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [drawer, setDrawer] = useState(false);
  const [sliderRef, setSliderRef] = useState(null);

  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const handleDrawer = (id) => {
    dispatch(getSubCategoriesByCategoryID(id));
    setDrawer(!drawer);
    navigate(`/category/${id}`);
    return id;
  };

  return (
    <div className="slider-container">
      <button className="view-all-btn" onClick={() => navigate("/categories")}>
        View All
      </button>
      {/* {drawer && <CategoryModal setDrawer={setDrawer} drawer={drawer} />} */}
      <HeadingWithControl>
        <Heading>{props.card?.title}</Heading>
        <Controls>
          <PrevButton onClick={sliderRef?.slickPrev}>
            <ChevronLeftIcon />
          </PrevButton>
          <NextButton onClick={sliderRef?.slickNext}>
            <ChevronRightIcon />
          </NextButton>
        </Controls>
      </HeadingWithControl>
      <SliderCard ref={setSliderRef} {...sliderSettings}>
        {props.data?.map(
          (card) =>
            card?.mainTitleId[0]._id === props.card?._id && (
              <Card onClick={() => handleDrawer(card?._id)}>
                <CardImage imageSrc={card?.image} />
                <TextInfo>
                  <TitleReviewContainer>
                    <Title>{card?.title}</Title>
                    <RatingsInfo>
                      <StarIcon />
                      <Rating>{card?.rating}</Rating>
                    </RatingsInfo>
                  </TitleReviewContainer>
                  <Description>{card?.description}</Description>
                  <Description className="view-more-text">
                    View more...
                  </Description>
                </TextInfo>
              </Card>
            )
        )}
      </SliderCard>
    </div>
  );
};

export default CardSlider;
