import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { Reviews } from '@/components/Reviews'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import WorkWithUs from '@/components/WorkWithUs'


export default function Home() {
  return (
    <>
      <Hero />
      <WorkWithUs/>
      <CallToAction />
      {/* <Reviews /> */}
      {/* <Pricing /> */}
      {/* <Data/> */}
      <Faqs />
    </>
  )
}
