import { useMemo } from 'react'
import { motion } from 'framer-motion'
import bg from '../assets/forbidden-city.jpg'
import { SnowIcon } from './Icons'
import { Counter, Pop, Reveal } from './Motion'

function Snow({ count = 60 }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        duration: 7 + Math.random() * 9,
        delay: -Math.random() * 16,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count],
  )

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((f) => (
        <motion.span
          key={f.id}
          className="flake"
          style={{ left: `${f.left}%`, width: f.size, height: f.size }}
          animate={{ y: ['0vh', '120vh'], x: [0, f.drift] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

function CalendarCard({ month, day, year, delay }) {
  return (
    <motion.div
      className="cal"
      initial={{ opacity: 0, y: 60, rotateX: -70 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 140, damping: 14, delay }}
      style={{ transformPerspective: 800 }}
    >
      <div className="cal-top">{month}</div>
      <div className="cal-day">{day}</div>
      <div className="cal-year">{year}</div>
    </motion.div>
  )
}

export default function Winter() {
  return (
    <section className="winter" id="dates">
      <div className="container winter-card" style={{ '--bg-img': `url(${bg})` }}>
        <Snow />
        <Pop>
          <span className="pill winter-badge">
            <span className="dot">
              <SnowIcon width={16} height={16} />
            </span>
            عطلة الشتاء
          </span>
        </Pop>
        <Reveal delay={0.1} as="h2" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginTop: 18 }}>
          الرحلة ستكون <span className="hl">في عطلة الشتاء</span>
        </Reveal>

        {/* LTR row so the dates read chronologically: 17 Dec → 1 Jan */}
        <div className="dates">
          <CalendarCard month="ديسمبر" day="17" year="2026" delay={0.2} />
          <motion.span
            className="arrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: [0, 10, 0] }}
            viewport={{ once: true }}
            transition={{ x: { duration: 1.4, repeat: Infinity, delay: 1 }, opacity: { delay: 0.6 } }}
          >
            ➜
          </motion.span>
          <CalendarCard month="جانفي" day="1" year="2027" delay={0.5} />
        </div>

        <Reveal delay={0.3} className="days-count">
          <Counter from={1} to={16} className="num" />
          يوماً
        </Reveal>
      </div>
    </section>
  )
}
