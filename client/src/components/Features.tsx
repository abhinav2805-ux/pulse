/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import FeaturedCard from './FeaturedCard'

function Features() {
  return (
      
      <div className='space-y-8 py-4 px-4'>
          <div className="hero bg-transparent  rounded-lg">
          <div className="hero-content flex-col lg:flex-row-reverse justify-between">
            <img
              src="/img/price.png"
              className="max-w-lg h-96  rounded-lg shadow-2xl w-[50%]" />
            <div className='w-[50%]'>
              <h1 className="text-5xl font-bold">Forecasting the Future of India&apos;s Food Prices
              </h1>
              <p className="py-6">
              Introducing Harvestra&apos;s revolutionary price prediction engine, powered by the cutting-edge NBEATSx neural network. Our advanced algorithms analyze a wealth of data, from historical trends to real-time market signals, to deliver uncannily accurate forecasts that empower policymakers to stay ahead of the curve. Witness the future of food price stability unfolding in our dynamic, AI-driven visualizations.
              </p>
            </div>
          </div>
        </div>
        <div className="hero bg-transparent  rounded-lg">
          <div className="hero-content flex-col lg:flex-row justify-between">
            <img
              src="/img/price.png"
              className="max-w-lg h-96  rounded-lg shadow-2xl w-[50%]" />
            <div className='w-[50%]'>
              <h1 className="text-5xl font-bold">Balancing Act: Demand Meets Supply in Real-Time

              </h1>
              <p className="py-6">
              Witness the dynamic interplay between market demands and our strategic buffer stocks, all at a glance. Harvestra&apos;s state-of-the-art visualization brings to life the pulse of India&apos;s food economy, tracking the ebb and flow of essential commodities against our carefully managed reserves. This real-time graph is more than just data – it&apos;s a window into our nation&apos;s food security, enabling policymakers to orchestrate timely interventions and ensure stability in even the most volatile markets. See how we&apos;re turning information into action, safeguarding affordability and availability with every data point
              </p>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default Features