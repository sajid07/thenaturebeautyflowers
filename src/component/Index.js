import React from 'react'
import PoolBanner from './PoolBanner';
import Category from './Category';
import Footer from './Footer';
import About from './About';
import List from './List';
import AutoplaySlider from './AutoplaySlider';



const Index = () => {
  
  return (
<>
<div className=''>
  <PoolBanner></PoolBanner>
  <Category></Category>
  <About></About>
  <List></List>
  <AutoplaySlider />
  {/* <Testimonials></Testimonials> */}
   <Footer></Footer>
   
   </div>
</>  )
}

export default Index