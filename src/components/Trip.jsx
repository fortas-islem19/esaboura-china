import { motion } from 'framer-motion'
import forbidden from '../assets/forbidden-city.jpg'
import airport from '../assets/airport.jpg'
import university from '../assets/university.jpg'
import { Pop, Reveal } from './Motion'

const photos = [
  { src: forbidden, caption: 'المدينة المحرمة', rotate: -6 },
  { src: university, caption: 'جامعة صينية', rotate: 3 },
  { src: airport, caption: 'مطار بكين', rotate: 7 },
]

export default function Trip() {
  return (
    <section className="purple-bg" id="trip">
      <motion.div
        className="watermark"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        旅行
      </motion.div>

      <div className="container trip-title">
        <Reveal className="pre">عندنا</Reveal>
        <Reveal delay={0.15} as="h2">
          رحلة
        </Reveal>
        <div className="tags">
          <Reveal delay={0.3} className="plain">
            سياحية
          </Reveal>
          <Pop delay={0.5} rotate={-3}>
            <span className="pill pill-yellow">ثقافية</span>
          </Pop>
        </div>

        <div className="polaroids">
          {photos.map((p, i) => (
            <motion.figure
              key={p.caption}
              className="polaroid"
              style={{ margin: 0 }}
              initial={{ opacity: 0, y: 120, rotate: p.rotate * 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 3 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.3 + i * 0.15 }}
            >
              <img src={p.src} alt={p.caption} loading="lazy" />
              <figcaption>{p.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
