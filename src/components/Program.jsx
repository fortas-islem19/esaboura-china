import { motion } from 'framer-motion'
import { Reveal } from './Motion'

// Daily schedule from the camp programme (Google Drive › China)
const days = [
  { date: '18 ديسمبر', items: ['الوصول إلى مطار بكين الدولي', 'الانتقال إلى جامعة خبي للدراسات الدولية'] },
  { date: '19 ديسمبر', items: ['حفل افتتاح المخيم الشتوي', 'تجربة صناعة الفخار الصيني'] },
  { date: '20 ديسمبر', items: ['زيارة متحف خبي وتاريخ ثقافة يان وتشاو', 'تجربة فن الشاي الصيني'] },
  { date: '21 ديسمبر', items: ['زيارة جامعة خبي للدراسات الدولية', 'لقاء تبادل مع طلبة وأساتذة صينيين ودوليين'] },
  { date: '22 ديسمبر', items: ['ارتداء الزي التقليدي «هانفو»', 'زيارة مدينة تشنغدينغ العتيقة'] },
  { date: '23 ديسمبر', items: ['زيارة شركة صينية للتكنولوجيا المتقدمة', 'فن قص الورق الصيني'] },
  { date: '24 ديسمبر', items: ['نشاط الحياة الشعبية والثقافة المحلية', 'غناء أغنية صينية جماعية'] },
  { date: '25 ديسمبر', items: ['تجربة الطائرات المسيّرة (الدرون)', 'تقنيات البث المباشر والتجارة الإلكترونية'] },
  { date: '26 ديسمبر', items: ['ساحة نصب التحرير في شيجياتشوانغ', 'جولة في شارع معبد وانلي للمشاة'] },
  { date: '27 ديسمبر', items: ['زيارة معالم تاريخية', 'بلدة دامينغ العتيقة'] },
  { date: '28 ديسمبر', items: ['رقصات الأقليات العرقية الصينية', 'رسم أقنعة الأوبرا الصينية'] },
  { date: '29 ديسمبر', items: ['تجربة الفن الصناعي', 'سوق هوايو للزهور والطيور'] },
  { date: '30 ديسمبر', items: ['جولة في منطقة تجارية حضرية', 'عروض فنية وحفل الاختتام'] },
  { date: '31 ديسمبر', items: ['رحلة العودة'] },
]

export default function Program() {
  return (
    <section className="purple-bg" id="program">
      <div className="container">
        <Reveal className="section-head">
          <span className="pill pill-yellow">البرنامج اليومي</span>
          <h2 style={{ marginTop: 18 }}>
            كل يوم <span className="hl">تجربة جديدة</span>
          </h2>
          <p>أنشطة ثقافية داخلية وخارجية، زيارات وتجربة حقيقية لحياة الطالب في الصين.</p>
        </Reveal>

        <ol className="program">
          {days.map((d, i) => (
            <motion.li
              key={d.date}
              className="day"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <div className="day-head">
                <span className="day-num">اليوم {i + 1}</span>
                <span className="day-date">{d.date}</span>
              </div>
              <ul>
                {d.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
        <p className="program-note">* قد يتم تعديل البرنامج حسب الظروف الفعلية.</p>
      </div>
    </section>
  )
}
