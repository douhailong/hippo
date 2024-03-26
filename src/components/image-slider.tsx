'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SwiperType from 'swiper';
import { cn } from '@/lib/utils';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

type ImageSliderProps = {
  urls: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ urls }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType>();

  return (
    <div className='group relative aspect-square overflow-hidden rounded-xl bg-zinc-100'>
      <div className='absolute inset-0 z-10 transition'>
        <button>
          <ChevronRight className='h-4 w-4 text-zinc-700' />
        </button>
      </div>
      <Swiper className='h-full w-full'>
        <SwiperSlide className='h-full w-full'>
          <Image
            src='/nav/icons/picks.jpg'
            alt='Product image'
            loading='eager'
            fill
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
