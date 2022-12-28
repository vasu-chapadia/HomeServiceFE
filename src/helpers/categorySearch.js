import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  selectCategory,
  searchCategory,
  clearSearch
} from "store/categorySlice";

import "../styles/index.css";

// const filter = createFilterOptions();

//Use MUI Autocomplete for category search and store selected category data on redux
const CategorySearch = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.category?.search);

  const [value, setValue] = useState(null);
  const [option, setOption] = useState("");

  useEffect(() => {
    if (option !== "") dispatch(selectCategory(option));
  }, [dispatch, option]);

  const handleOnChange = (e, value) => {
    if (e.target.value.length > 2)
      dispatch(searchCategory({ title: e.target.value }));
    else dispatch(clearSearch());

    setOption(
      data
        ? data.map((i) => {
            return { label: i.title, data: i };
          })
        : ""
    );

    setValue({ label: value });
  };

  // const handleFilter = (options, params) => {
  //   let filtered = filter(options, params);
  //   const { inputValue } = params;
  //   const isExisting = options.some((option) => inputValue === option.label);
  //   if (inputValue !== "" && !isExisting) {
  //     filtered = [
  //       ...filtered,
  //       {
  //         inputValue,
  //         label: "No Option"
  //       }
  //     ];
  //   }
  //   return filtered;
  // };

  return (
    <Autocomplete
      className="categorySearch"
      onInputChange={handleOnChange}
      // filterOptions={handleFilter}
      onChange={(e, i) => setOption(i)}
      value={value}
      options={option && data ? option : []}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Category"
          InputProps={{
            ...params.InputProps,
            type: "search"
          }}
        />
      )}
      fullWidth
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      disableClearable
    />
  );
};

export default CategorySearch;
