import { motion } from 'framer-motion'
import airport from '../assets/airport.jpg'
import { BedIcon, BusIcon, CheckIcon, PassportIcon, PlaneIcon, SparkIcon, UsersIcon, XIcon } from './Icons'
import { Counter, Pop, Reveal } from './Motion'

const included = [
  { label: 'تذكرة الطائرة ذهاب وإياب', sub: 'الجزائر ⇄ الصين', Icon: PlaneIcon },
  { label: 'الفيزا', sub: 'مرافقة في ملف التأشيرة + رسوم الفيزا', Icon: PassportIcon },
  { label: 'الإقامة', sub: 'في الحرم الجامعي، غرفة لشخصين', Icon: BedIcon },
  { label: 'مرافقة الفوج', sub: 'مرافق طوال البرنامج', Icon: UsersIcon },
  { label: 'النقل', sub: 'خلال الأنشطة الرسمية', Icon: BusIcon },
  { label: 'الأنشطة', sub: 'ثقافية وجامعية، داخلية وخارجية', Icon: SparkIcon },
]

const excluded = [
  { label: 'الأكل والوجبات', sub: 'يمكن استعمال مطعم الجامعة' },
  { label: 'المصاريف الشخصية', sub: 'التسوق، الهدايا، التنقلات الشخصية' },
]

export default function Offer() {
  return (
    <section className="purple-bg" id="offer">
      <div className="container offer-grid">
        <div>
          <Reveal className="section-head" style={{ textAlign: 'start', marginBottom: 28 }}>
            <h2 className="hl">العرض يشمل</h2>
            <p style={{ marginInline: 0 }}>كل ما تحتاجه للسفر في باقة واحدة — أنت فقط احضر شغفك للتعلم.</p>
          </Reveal>

          <div className="offer-list">
            {included.map(({ label, sub, Icon }, i) => (
              <motion.div
                key={label}
                className="offer-item"
                initial={{ opacity: 0, x: 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18, delay: i * 0.12 }}
              >
                <span className="ico">
                  <Icon />
                </span>
                <span className="offer-text">
                  {label}
                  <small>{sub}</small>
                </span>
                <motion.span
                  className="check"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.4 + i * 0.12 }}
                >
                  <CheckIcon width={18} height={18} />
                </motion.span>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.2} className="not-included">
            <h3>غير مشمول في السعر</h3>
            {excluded.map((x) => (
              <div key={x.label} className="not-item">
                <span className="x">
                  <XIcon width={14} height={14} />
                </span>
                <span>
                  <b>{x.label}</b> — {x.sub}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <div>
          <Pop rotate={-3} className="offer-photo">
            <img src={airport} alt="مطار في الصين" loading="lazy" />
            <span className="pill pill-yellow">والعرض يشمل</span>
          </Pop>
          <Reveal delay={0.4} className="days-count">
            <Counter from={9} to={16} duration={1.2} className="num" />
            يوماً
          </Reveal>
        </div>
      </div>
    </section>
  )
}
