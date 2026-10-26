import { motion } from 'framer-motion'
import { PinIcon, PlaneIcon } from './Icons'
import { Reveal } from './Motion'

const route = 'M60 330 C 150 120, 300 60, 400 150'

const points = [
  { title: 'مدينة شيجياتشوانغ', latin: 'Shijiazhuang · 石家庄', text: 'عاصمة مقاطعة خبي في شمال الصين، بالقرب من بكين' },
  {
    title: 'جامعة خبي للدراسات الدولية',
    latin: 'Hebei International Studies University · 河北外国语学院',
    text: 'أكبر حرم جامعي في خبي — مكان الإقامة والأنشطة',
  },
  { title: 'الوصول عبر مطار بكين الدولي', latin: 'Beijing · 北京', text: 'ثم الانتقال إلى الجامعة في نفس اليوم' },
]

export default function Location() {
  return (
    <section className="purple-bg" id="where">
      <div className="container">
        <Reveal className="section-head">
          <h2>
            في <span className="hl">شيجياتشوانغ</span>
          </h2>
          <p>عاصمة مقاطعة خبي، بالقرب من العاصمة الصينية بكين</p>
        </Reveal>

        <div className="location-grid">
          <div className="map-card">
            <svg viewBox="0 0 460 420" role="img" aria-label="مسار الرحلة من الجزائر إلى شيجياتشوانغ">
              <defs>
                <radialGradient id="globe" cx="40%" cy="35%">
                  <stop offset="0" stopColor="#8a0bd6" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#26043f" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="230" cy="210" r="200" fill="url(#globe)" />
              {[60, 110, 160, 200].map((r) => (
                <circle key={r} cx="230" cy="210" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeDasharray="2 8" />
              ))}

              <path d={route} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="3" strokeDasharray="6 10" />
              <motion.path
                d={route}
                fill="none"
                stroke="#fcd31c"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />

              {/* Plane flying along the route; the icon points up, so rotate it to face the path direction */}
              <g aria-hidden="true">
                <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto" path={route} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.55 1" />
                <g transform="rotate(90) translate(-17 -17)" fill="#fff">
                  <PlaneIcon width={34} height={34} />
                </g>
              </g>

              {/* Origin */}
              <g>
                <circle cx="60" cy="330" r="9" fill="#fff" />
                <text x="60" y="370" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700">
                  الجزائر
                </text>
              </g>

              {/* Destination with pulsing ring */}
              <g>
                <motion.circle
                  cx="400"
                  cy="150"
                  r="14"
                  fill="none"
                  stroke="#dc240c"
                  strokeWidth="3"
                  animate={{ r: [14, 40], opacity: [0.9, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <circle cx="400" cy="150" r="12" fill="#dc240c" stroke="#fff" strokeWidth="3" />
              </g>
            </svg>

            <motion.span
              className="pill pill-red"
              style={{ position: 'absolute', top: '14%', right: '-2%' }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 2 }}
            >
              <span className="dot">
                <PinIcon width={16} height={16} />
              </span>
              شيجياتشوانغ · 石家庄
            </motion.span>
          </div>

          <div className="loc-points">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                className="loc-item"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <span className="ico">
                  <PinIcon width={26} height={26} />
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p className="latin">{p.latin}</p>
                  <p>{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
