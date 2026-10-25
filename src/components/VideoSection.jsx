import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Motion'

const VIDEO_SRC = `${import.meta.env.BASE_URL}video/china-trip.mp4`
const POSTER_SRC = `${import.meta.env.BASE_URL}video/china-trip-thumbnail.jpg`

// Timestamps (seconds) of each topic in the video
const chapters = [
  { t: 0, label: 'المقدمة' },
  { t: 7, label: 'الرحلة السياحية الثقافية' },
  { t: 11, label: 'تواريخ عطلة الشتاء' },
  { t: 16, label: 'الوجهة: خبي قرب بكين' },
  { t: 20, label: 'ماذا يشمل العرض' },
  { t: 26, label: 'شهادة من جامعة صينية' },
  { t: 29, label: 'تخفيض خاص للطلبة' },
  { t: 32, label: 'المقاعد المحدودة' },
]

const fmt = (s) => `0:${String(s).padStart(2, '0')}`

export default function VideoSection() {
  const videoRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)

  const play = (t) => {
    const v = videoRef.current
    if (!v) return
    if (typeof t === 'number') {
      // With preload="none" the video may not have metadata yet, so seek once it does
      if (v.readyState >= 1) v.currentTime = t
      else v.addEventListener('loadedmetadata', () => (v.currentTime = t), { once: true })
    }
    setStarted(true)
    v.play().catch(() => {})
  }

  const onTimeUpdate = () => {
    const now = videoRef.current?.currentTime ?? 0
    let idx = 0
    chapters.forEach((c, i) => {
      if (now >= c.t) idx = i
    })
    setCurrent(idx)
  }

  return (
    <section className="video-section purple-bg" id="video">
      <div className="glow" style={{ width: 380, height: 380, background: '#dc240c', top: '20%', right: '-6%', opacity: 0.3 }} />

      <div className="container video-grid">
        <div className="video-copy">
          <Reveal>
            <span className="pill pill-red">
              <span className="dot">▶</span>
              شاهد الفيديو
            </span>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            كل التفاصيل في <span className="hl">40 ثانية</span>
          </Reveal>
          <Reveal delay={0.2} as="p" className="video-lead">
            شاهد الفيديو لتعرف كل شيء عن الرحلة: الوجهة، التواريخ، ما يشمله العرض والشهادة. اضغط على أي موضوع للانتقال إليه مباشرة.
          </Reveal>

          <ol className="chapters">
            {chapters.map((c, i) => (
              <motion.li
                key={c.t}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2 + i * 0.07 }}
              >
                <button
                  type="button"
                  className={`chapter${started && i === current ? ' active' : ''}`}
                  onClick={() => play(c.t)}
                >
                  <span className="chapter-time">{fmt(c.t)}</span>
                  {c.label}
                </button>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          className="phone"
          initial={{ opacity: 0, y: 80, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 90, damping: 14 }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            preload="none"
            playsInline
            controls={started}
            onTimeUpdate={onTimeUpdate}
            onPlay={() => setStarted(true)}
          />

          <AnimatePresence>
            {!started && (
              <motion.button
                type="button"
                className="video-cover"
                onClick={() => play()}
                aria-label="تشغيل الفيديو"
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img src={POSTER_SRC} alt="" />
                <motion.span
                  className="play-pulse"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
