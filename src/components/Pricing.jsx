import { motion } from 'framer-motion'
import { DEADLINE, PRICES } from '../config'
import { CheckIcon, ClockIcon } from './Icons'
import { Counter, Reveal } from './Motion'

const plans = [
  {
    key: 'student',
    title: 'الطلبة',
    tag: 'سعر خاص للطلبة',
    price: PRICES.student,
    featured: true,
  },
  {
    key: 'worker',
    title: 'العمال',
    tag: 'الموظفون وغير الطلبة',
    price: PRICES.worker,
  },
]

const perks = ['تذكرة الطائرة ذهاب وإياب', 'الفيزا ورسومها', 'الإقامة في الجامعة', 'الأنشطة والنقل والمرافقة', 'شهادة المشاركة']

export default function Pricing() {
  return (
    <section className="purple-bg" id="prices">
      <div className="container">
        <Reveal className="section-head">
          <h2>
            <span className="hl">الأسعار</span> والتواريخ
          </h2>
          <p>من 17 ديسمبر 2026 إلى 1 جانفي 2027 — سعر واحد يشمل الطيران، الفيزا والإقامة.</p>
        </Reveal>

        <div className="plans">
          {plans.map((p, i) => (
            <motion.div
              key={p.key}
              className={`plan${p.featured ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 60, rotate: i ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15, delay: i * 0.15 }}
            >
              <span className={`pill ${p.featured ? 'pill-yellow' : 'pill-white'}`}>{p.tag}</span>
              <h3>{p.title}</h3>
              <div className="plan-price">
                <Counter from={Math.round(p.price * 0.6)} to={p.price} duration={1.4} className="amount" format={(v) => v.toLocaleString('en-US')} />
                <span className="cur">دج</span>
              </div>
              <ul>
                {perks.map((perk) => (
                  <li key={perk}>
                    <span className="tick">
                      <CheckIcon width={14} height={14} />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a href="#register" className={`btn ${p.featured ? 'btn-yellow' : 'btn-ghost'}`}>
                سجّل الآن
              </a>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2} className="deadline">
          <ClockIcon width={26} height={26} />
          <span>
            آخر أجل لإيداع الملف: <b>{DEADLINE}</b>
          </span>
        </Reveal>
        <p className="program-note">الأكل والمصاريف الشخصية غير مشمولة في السعر.</p>
      </div>
    </section>
  )
}
