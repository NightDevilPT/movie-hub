import FetchApiData from '@/axiosClient';
import CarouselFrame from '@/components/CarouselFrame';
import HeroSection from '@/components/HeroSection'
import React from 'react'

const index = ({banner}) => {
  return (
    <div className='main-section home-section'>
      <HeroSection bannerImg={banner.backdrop_path} />
      <CarouselFrame title={"Popular Movie"} mediaType={"movie"} name={"popular"} />
      <CarouselFrame title={"Popular Tv Shows"} mediaType={"tv"} name={"popular"} />
      <CarouselFrame title={"Top Rated Movie"} mediaType={"movie"} name={"top_rated"} />
      <CarouselFrame title={"Top Rated Tv Shows"} mediaType={"tv"} name={"top_rated"} />
    </div>
  )
}

export default index;


export const getServerSideProps=async()=>{
  const res = await FetchApiData("movie/upcoming");
  const randomNo = Math.floor(Math.random()*19);
  const bannerData = res.data.results[randomNo];

  return{
    props:{
      banner:bannerData
    }
  }
}