import { motion } from 'framer-motion'
import gate from '../assets/university.jpg'
import { Reveal } from './Motion'

const sparkles = [
  { top: '12%', left: '14%', d: 0 },
  { top: '20%', right: '12%', d: 0.6 },
  { bottom: '22%', left: '20%', d: 1.1 },
  { bottom: '16%', right: '18%', d: 0.3 },
]

export default function Certificate() {
  return (
    <section className="purple-bg" id="certificate">
      <div className="container">
        <Reveal className="section-head">
          <span className="pill pill-yellow">وختامها</span>
          <h2 style={{ marginTop: 18 }}>
            شهادة <span className="hl">المشاركة</span>
          </h2>
          <p>يُختتم المخيم بشهادة المشاركة في المخيم الشتوي بجامعة خبي للدراسات الدولية. (غيابان غير مبرّرين عن الأنشطة يُسقطان الحق في الشهادة)</p>
        </Reveal>

        <motion.div
          className="cert-stage"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <img src={gate} alt="بوابة جامعية في الصين" loading="lazy" />

          <motion.div
            className="certificate"
            initial={{ opacity: 0, y: 140, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 90, damping: 13, delay: 0.4 }}
          >
            <h3>شهادة</h3>
            <p>جامعة خبي للدراسات الدولية</p>
            <div className="lines">
              <span style={{ width: '80%' }} />
              <span style={{ width: '65%' }} />
              <span style={{ width: '50%' }} />
            </div>
            <motion.div
              className="stamp"
              initial={{ scale: 3, opacity: 0, rotate: -40 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -12 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 1.2 }}
            >
              大学
            </motion.div>
          </motion.div>

          {sparkles.map((s, i) => (
            <motion.span
              key={i}
              className="sparkle"
              style={{ ...s, zIndex: 3 }}
              animate={{ scale: [0, 1.2, 0], rotate: [0, 90, 180] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 + s.d }}
              aria-hidden="true"
            >
              ✦
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
