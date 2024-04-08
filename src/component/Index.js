import React from "react";
import PoolBanner from "./PoolBanner";
import Category from "./Category";
import About from "./About";
import List from "./List";
import AutoplaySlider from "./AutoplaySlider";
import Services from "./Services";

const Index = () => {
  return (
    <>
      <PoolBanner></PoolBanner>
      <Category></Category>
      <About></About>
      <Services />
      <List></List>
      <AutoplaySlider />
    </>
  );
};

export default Index;
