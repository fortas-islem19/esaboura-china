import { motion, useScroll, useSpring } from 'framer-motion'
import Backdrop from './components/Backdrop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Trip from './components/Trip'
import Winter from './components/Winter'
import Location from './components/Location'
import Offer from './components/Offer'
import Certificate from './components/Certificate'
import Deal from './components/Deal'
import Program from './components/Program'
import Pricing from './components/Pricing'
import Documents from './components/Documents'
import RegisterForm from './components/RegisterForm'
import Footer from './components/Footer'
import CallButton from './components/CallButton'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          scaleX,
          transformOrigin: '100% 50%',
          position: 'fixed',
          top: 0,
          insetInline: 0,
          height: 4,
          background: 'linear-gradient(90deg, #fcd31c, #dc240c)',
          zIndex: 60,
        }}
      />
      <Backdrop />
      <Navbar />
      <main>
        <Hero />
        <VideoSection />
        <Trip />
        <Winter />
        <Location />
        <Program />
        <Offer />
        <Certificate />
        <Pricing />
        <Deal />
        <Documents />
        <RegisterForm />
      </main>
      <Footer />
      <CallButton />
    </>
  )
}
