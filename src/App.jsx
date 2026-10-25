import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trip from './components/Trip'
import Winter from './components/Winter'
import Location from './components/Location'
import Offer from './components/Offer'
import Certificate from './components/Certificate'
import Deal from './components/Deal'
import RegisterForm from './components/RegisterForm'
import Footer from './components/Footer'

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
      <Navbar />
      <main>
        <Hero />
        <Trip />
        <Winter />
        <Location />
        <Offer />
        <Certificate />
        <Deal />
        <RegisterForm />
      </main>
      <Footer />
    </>
  )
}
