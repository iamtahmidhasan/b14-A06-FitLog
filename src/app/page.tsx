import Hero from '@/components/Home/Hero';
import Library from '@/components/Home/Library';
import React from 'react'

export default function page() {
  return (
    <div className="space-y-12">
      <Hero/>
      <Library/>
    </div>
  )
}
