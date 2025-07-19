import React from 'react'
import { Metadata } from "next";
import Hero from '@/components/Hero';
export const metadata: Metadata = {
  title: "Property NextJs",
};

export default function Home() {
  return (
    <main>
  
  <Hero />  
    </main>
  )
}
