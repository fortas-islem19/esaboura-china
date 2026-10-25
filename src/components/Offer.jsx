import { motion } from 'framer-motion'
import airport from '../assets/airport.jpg'
import { BedIcon, CheckIcon, PassportIcon, PlaneIcon } from './Icons'
import { Counter, Pop, Reveal } from './Motion'

const items = [
  { label: 'تذكرة الطائرة', Icon: PlaneIcon },
  { label: 'الفيزا', Icon: PassportIcon },
  { label: 'الإقامة', Icon: BedIcon },
]

export default function Offer() {
  return (
    <section className="purple-bg" id="offer">
      <div className="container offer-grid">
        <div>
          <Reveal className="section-head" style={{ textAlign: 'start', marginBottom: 32 }}>
            <h2 className="hl">العرض يشمل</h2>
            <p style={{ marginInline: 0 }}>كل ما تحتاجه للسفر في باقة واحدة — أنت فقط احضر شغفك للتعلم.</p>
          </Reveal>

          <div className="offer-list">
            {items.map(({ label, Icon }, i) => (
              <motion.div
                key={label}
                className="offer-item"
                initial={{ opacity: 0, x: 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18, delay: i * 0.25 }}
              >
                <span className="ico">
                  <Icon />
                </span>
                {label}
                <motion.span
                  className="check"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.5 + i * 0.25 }}
                >
                  <CheckIcon width={18} height={18} />
                </motion.span>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.4} className="days-count" style={{ textAlign: 'start', marginTop: 28 }}>
            <Counter from={9} to={16} duration={1.2} className="num" />
            يوماً
          </Reveal>
        </div>

        <Pop rotate={-3} className="offer-photo">
          <img src={airport} alt="مطار في الصين" loading="lazy" />
          <span className="pill pill-yellow">والعرض يشمل</span>
        </Pop>
      </div>
    </section>
  )
}
