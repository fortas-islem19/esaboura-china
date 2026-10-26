import { motion } from 'framer-motion'
import { DEADLINE } from '../config'
import { DocIcon } from './Icons'
import { Reveal } from './Motion'

// "Dossier Winter Camp" checklist (Google Drive › China)
const docs = [
  'دفع مبلغ البرنامج',
  'جواز سفر ممسوح ضوئياً بشكل واضح',
  'صورة شمسية بخلفية بيضاء 48 × 33 مم',
  'شهادة الميلاد / شهادة الإقامة / البطاقة العائلية',
  'صحيفة السوابق العدلية',
  'كشف حساب بنكي أو بريدي بقيمة 2500 أورو أو 400,000 دج (شخصي للعامل، أو لأحد الوالدين للطالب)',
  'شهادة عمل (للعامل) أو شهادة عمل أحد الوالدين (للطالب)',
  'شهادة مدرسية 2026 / 2027 للطالب',
  'التأشيرة الصينية السابقة وأختام الدخول والخروج (إن وُجدت)',
]

const cases = [
  'تعهّد بالتكفل مصادق عليه للطلبة',
  'ترخيص أبوي مصادق عليه من الأب والأم للقاصرين أقل من 18 سنة، مع جوازي سفر أو بطاقتي تعريف الوالدين',
  'ترخيص بالسفر من مصالح الشرطة للقاصرين حتى 19 سنة ويوم',
]

const tips = ['تثبيت وتفعيل تطبيق Alipay', 'محوّل كهربائي صيني', 'بطارية خارجية (Power bank)', 'ميزانية كافية للأكل والمصاريف الشخصية']

export default function Documents() {
  return (
    <section className="purple-bg" id="documents">
      <div className="container">
        <Reveal className="section-head">
          <span className="pill pill-red">آخر أجل: {DEADLINE}</span>
          <h2 style={{ marginTop: 18 }}>
            الملف <span className="hl">المطلوب</span>
          </h2>
          <p>حضّر وثائقك مبكراً — المقاعد محدودة والأولوية لمن يكمل ملفه أولاً.</p>
        </Reveal>

        <div className="docs-grid">
          <ol className="docs">
            {docs.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="doc-num">{i + 1}</span>
                {d}
              </motion.li>
            ))}
          </ol>

          <div className="docs-side">
            <Reveal className="docs-card">
              <h3>
                <DocIcon width={22} height={22} /> حسب الحالة
              </h3>
              <ul>
                {cases.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="docs-card light">
              <h3>قبل السفر</h3>
              <ul>
                {tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
