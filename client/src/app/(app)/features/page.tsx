"use client"

import React from 'react'
import Link from 'next/link'
import RealTimeGraph from '../../../components/lineGraph'
import { Separator } from '@/components/ui/separator'
import Dropdown from '../dashboard/page'

function Features() {
  return (
    <div className='w-full min-h-screen py-8 px-8 space-y-8'>
      <h1 className='font-semibold text-center scroll-m-20 text-4xl mb-8'>F.E.A.T.U.R.E.S</h1>
     <Dropdown/>
     
      <Separator />

      <div className='mt-12 text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Comprehensive Price Monitoring Network</h2>
        <p className='mb-6 text-lg'>
          Retail and wholesale prices of 22 commodities from 550 centers are received daily 
          from the State Civil Supplies Departments of the respective State Governments 
        </p>
        <Link href="/data-centers" className='inline-block'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'>
            View Data Reporting Centers
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Features