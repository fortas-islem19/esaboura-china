import { motion } from 'framer-motion'
import planetImg from '../assets/forbidden-city.jpg'
import { spring } from './Motion'
import { PRICES, formatDA } from '../config'

const headline = ['اطلبوا', 'العلم', 'ولو', 'في', 'الصين']

export default function Hero() {
  return (
    <section className="hero purple-bg" id="top">
      <div className="glow" style={{ width: 420, height: 420, background: '#8a0bd6', top: '8%', left: '-8%' }} />
      <div className="glow" style={{ width: 360, height: 360, background: '#dc240c', bottom: '-10%', right: '30%', opacity: 0.35 }} />

      <div className="container hero-grid">
        <div>
          <div className="hero-han" aria-hidden="true">
            {['中', '国'].map((ch, i) => (
              <motion.span
                key={ch}
                initial={{ opacity: 0, y: -60, scale: 1.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...spring, delay: 0.2 + i * 0.15 }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          <h1>
            {headline.map((w, i) => (
              <motion.span
                key={w}
                className={`word${w === 'الصين' ? ' hl' : ''}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            مخيم شتوي سياحي ثقافي في مدينة شيجياتشوانغ الصينية، مع الإقامة في جامعة خبي للدراسات الدولية. يشمل تذكرة الطائرة والفيزا والإقامة، ويُختتم بشهادة مشاركة.
          </motion.p>

          <motion.div
            className="hero-chips"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.5 } } }}
          >
            {[
              { cls: 'pill-red', text: '17 ديسمبر ← 1 جانفي' },
              { cls: 'pill-white', text: '16 يوماً' },
              { cls: 'pill-yellow', text: `للطلبة ${formatDA(PRICES.student)}` },
            ].map((c) => (
              <motion.span
                key={c.text}
                className={`pill ${c.cls}`}
                variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: spring } }}
              >
                {c.text}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
          >
            <a href="#register" className="btn btn-yellow">
              احجز مقعدك الآن
            </a>
            <a href="#offer" className="btn btn-ghost">
              تفاصيل العرض
            </a>
          </motion.div>
        </div>

        <motion.div
          className="planet-wrap"
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ring back" />
          <motion.div
            className="planet"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img src={planetImg} alt="المدينة المحرمة في بكين تحت الثلج" />
          </motion.div>
          <motion.div
            className="ring"
            animate={{ rotate: [-16, -10, -16] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="floating-tag pill pill-purple"
            style={{ top: '6%', right: '2%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{ scale: { ...spring, delay: 1.4 }, opacity: { delay: 1.4 }, y: { duration: 4, repeat: Infinity, delay: 2 } }}
          >
            رحلة إلى كوكب آخر
          </motion.span>
        </motion.div>
      </div>

      <motion.a
        href="#video"
        className="scroll-hint"
        aria-label="انزل للأسفل"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <motion.span animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
      </motion.a>
    </section>
  )
}
