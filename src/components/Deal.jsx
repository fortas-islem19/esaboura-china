import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SeatIcon } from './Icons'
import { Reveal } from './Motion'

const TOTAL = 20
const LEFT = 3
const GREEN = '#22c55e'
const RED = '#dc240c'

// Star-burst sticker like the "% تخفيض خاص" badge in the video
function burstPath(points = 16, outer = 50, inner = 42) {
  const step = Math.PI / points
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = i * step - Math.PI / 2
    d += `${i ? 'L' : 'M'}${50 + r * Math.cos(a)} ${50 + r * Math.sin(a)}`
  }
  return d + 'Z'
}

function Seats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [booked, setBooked] = useState(0)

  // Seats fill up one by one until only a few are left
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setBooked((b) => {
        if (b >= TOTAL - LEFT) {
          clearInterval(id)
          return b
        }
        return b + 1
      })
    }, 110)
    return () => clearInterval(id)
  }, [inView])

  return (
    <div className="seats-card" ref={ref}>
      <h3>المقاعد محدودة جداً!</h3>
      <div className="seats">
        {Array.from({ length: TOTAL }, (_, i) => {
          const taken = i < booked
          return (
            <motion.div
              key={i}
              className="seat"
              animate={taken ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SeatIcon color={taken ? RED : GREEN} />
            </motion.div>
          )
        })}
      </div>
      <div className="seats-legend">
        <span>
          <i style={{ background: RED }} /> محجوز
        </span>
        <span>
          <i style={{ background: GREEN }} /> متاح
        </span>
      </div>
    </div>
  )
}

export default function Deal() {
  return (
    <section className="purple-bg" id="deal">
      <div className="container">
        <Reveal className="section-head">
          <h2>
            مع <span className="hl">تخفيض خاص</span> للطلبة
          </h2>
          <p>والمقاعد محدودة جداً — سارع بالتسجيل قبل نفاد الأماكن.</p>
        </Reveal>

        <div className="deal-grid">
          <motion.div
            className="burst"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          >
            <motion.svg
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              <path d={burstPath()} fill="#fcd31c" />
            </motion.svg>
            <div className="inner">
              <motion.div
                className="pct"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                %
              </motion.div>
              <div className="lbl">تخفيض خاص</div>
            </div>
          </motion.div>

          <Seats />
        </div>
      </div>
    </section>
  )
}
