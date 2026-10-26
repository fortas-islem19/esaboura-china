import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { submitRegistration } from '../lib/submit'
import { WILAYAS } from '../lib/wilayas'
import { DEADLINE, PHONES, PRICES, formatDA } from '../config'
import { PhoneIcon } from './Icons'
import { Reveal } from './Motion'

const initial = {
  fullName: '',
  phone: '',
  email: '',
  age: '',
  wilaya: '',
  status: '',
  field: '',
  passport: '',
  notes: '',
  consent: false,
}

const STATUSES = ['طالب جامعي', 'تلميذ', 'عامل / موظف', 'أخرى']

// Students pay the student price; workers (and anyone not studying) pay the worker price
const priceFor = (status) => {
  if (status === 'طالب جامعي' || status === 'تلميذ') return PRICES.student
  if (status === 'عامل / موظف' || status === 'أخرى') return PRICES.worker
  return null
}
const PASSPORT = ['نعم، ساري المفعول', 'قيد الإنجاز', 'لا']

function validate(v) {
  const e = {}
  if (v.fullName.trim().length < 3) e.fullName = 'يرجى إدخال الاسم الكامل'
  if (!/^\+?[0-9\s-]{9,16}$/.test(v.phone.trim())) e.phone = 'رقم هاتف غير صالح'
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'بريد إلكتروني غير صالح'
  const age = Number(v.age)
  if (!age || age < 15 || age > 80) e.age = 'يرجى إدخال عمر صحيح'
  if (!v.wilaya) e.wilaya = 'يرجى اختيار الولاية'
  if (!v.status) e.status = 'يرجى اختيار الصفة'
  if (!v.passport) e.passport = 'يرجى الإجابة'
  if (!v.consent) e.consent = 'يجب الموافقة للمتابعة'
  return e
}

function Field({ label, name, error, required, full, children }) {
  return (
    <div className={`field${full ? ' full' : ''}${error ? ' invalid' : ''}`}>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="req">*</span>}
        </label>
      )}
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            className="err"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function Choices({ name, options, value, onChange }) {
  return (
    <div className="choice-row" role="radiogroup" id={name}>
      {options.map((o) => (
        <label key={o} className="choice">
          <input type="radio" name={name} value={o} checked={value === o} onChange={onChange} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  )
}

function Success({ name, onReset }) {
  return (
    <motion.div
      className="success"
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <svg className="tick" viewBox="0 0 100 100" aria-hidden="true">
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="#22c55e"
          strokeWidth="7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path
          d="M30 52 L45 66 L71 37"
          fill="none"
          stroke="#22c55e"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        />
      </svg>
      {Array.from({ length: 14 }, (_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '22%',
            left: '50%',
            width: 10,
            height: 10,
            borderRadius: i % 2 ? 2 : '50%',
            background: ['#fcd31c', '#8a0bd6', '#dc240c', '#22c55e'][i % 4],
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((i / 14) * Math.PI * 2) * 140,
            y: Math.sin((i / 14) * Math.PI * 2) * 110,
            opacity: 0,
            rotate: 180,
          }}
          transition={{ duration: 1.1, delay: 0.6, ease: 'easeOut' }}
        />
      ))}
      <h3>
        شكراً <bdi>{name.split(' ')[0]}</bdi>!
      </h3>
      <p>تم استلام طلب تسجيلك بنجاح. سيتواصل معك فريق السبورة قريباً لتأكيد مقعدك وتزويدك بباقي التفاصيل.</p>
      <button type="button" className="btn btn-ghost" style={{ marginTop: 12 }} onClick={onReset}>
        تسجيل شخص آخر
      </button>
    </motion.div>
  )
}

export default function RegisterForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | done | error

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    setState('sending')
    try {
      const price = priceFor(values.status)
      await submitRegistration({ ...values, price: price ? formatDA(price) : '' })
      setState('done')
    } catch (err) {
      console.error(err)
      setState('error')
    }
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setState('idle')
  }

  return (
    <section className="form-section" id="register">
      <div className="container form-wrap">
        <Reveal className="form-aside">
          <span className="pill pill-yellow">التفاصيل في الرابط</span>
          <h2 style={{ marginTop: 18 }}>
            احجز <span className="hl">مقعدك</span> الآن
          </h2>
          <p>املأ الاستمارة وسيتواصل معك فريق السبورة لتأكيد التسجيل وتزويدك بباقي تفاصيل الرحلة.</p>
          <ul>
            {[
              'تذكرة الطائرة والفيزا والإقامة',
              '17 ديسمبر ← 1 جانفي في شيجياتشوانغ',
              'الإقامة في جامعة خبي للدراسات الدولية',
              `الطلبة ${formatDA(PRICES.student)} — العمال ${formatDA(PRICES.worker)}`,
              `آخر أجل لإيداع الملف: ${DEADLINE}`,
            ].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <b>✓</b>
                {t}
              </motion.li>
            ))}
          </ul>
          <div className="aside-contact">
            <p>للاستفسار اتصل بمدرسة السبورة:</p>
            {PHONES.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="aside-phone">
                <PhoneIcon width={20} height={20} />
                <span dir="ltr">{p.display}</span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="form-card">
          <AnimatePresence mode="wait">
            {state === 'done' ? (
              <Success name={values.fullName} onReset={reset} />
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -20 }}>
                <div className="form-grid">
                  <Field label="الاسم الكامل" name="fullName" error={errors.fullName} required full>
                    <input id="fullName" name="fullName" value={values.fullName} onChange={onChange} autoComplete="name" placeholder="الاسم واللقب" />
                  </Field>

                  <Field label="رقم الهاتف (واتساب)" name="phone" error={errors.phone} required>
                    <input id="phone" name="phone" type="tel" inputMode="tel" value={values.phone} onChange={onChange} autoComplete="tel" placeholder="0X XX XX XX XX" />
                  </Field>

                  <Field label="البريد الإلكتروني" name="email" error={errors.email}>
                    <input id="email" name="email" type="email" value={values.email} onChange={onChange} autoComplete="email" placeholder="name@example.com" />
                  </Field>

                  <Field label="العمر" name="age" error={errors.age} required>
                    <input id="age" name="age" type="number" min="15" max="80" inputMode="numeric" value={values.age} onChange={onChange} />
                  </Field>

                  <Field label="الولاية" name="wilaya" error={errors.wilaya} required>
                    <select id="wilaya" name="wilaya" value={values.wilaya} onChange={onChange}>
                      <option value="">اختر الولاية</option>
                      {WILAYAS.map((w, i) => (
                        <option key={w} value={w}>
                          {String(i + 1).padStart(2, '0')} - {w}
                        </option>
                      ))}
                      <option value="خارج الجزائر">خارج الجزائر</option>
                    </select>
                  </Field>

                  <Field label="الصفة" name="status" error={errors.status} required full>
                    <Choices name="status" options={STATUSES} value={values.status} onChange={onChange} />
                    <AnimatePresence mode="wait">
                      {priceFor(values.status) && (
                        <motion.span
                          key={values.status}
                          className="price-hint"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          السعر المطبّق: <b>{formatDA(priceFor(values.status))}</b>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Field>

                  <Field label="التخصص / المؤسسة" name="field" full>
                    <input id="field" name="field" value={values.field} onChange={onChange} placeholder="مثال: إعلام آلي — جامعة الجزائر 1" />
                  </Field>

                  <Field label="هل لديك جواز سفر؟" name="passport" error={errors.passport} required full>
                    <Choices name="passport" options={PASSPORT} value={values.passport} onChange={onChange} />
                  </Field>

                  <Field label="ملاحظات أو أسئلة" name="notes" full>
                    <textarea id="notes" name="notes" value={values.notes} onChange={onChange} placeholder="اكتب أي سؤال تريد طرحه..." />
                  </Field>

                  <Field label="" name="consent" error={errors.consent} full>
                    <label className="choice-consent" style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
                      <input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={onChange} style={{ width: 20, height: 20, accentColor: '#8a0bd6' }} />
                      أوافق على أن يتواصل معي فريق السبورة بخصوص الرحلة
                    </label>
                  </Field>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-yellow"
                  disabled={state === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {state === 'sending' ? (
                    <>
                      <span className="spinner" /> جارٍ الإرسال...
                    </>
                  ) : (
                    'أرسل طلب التسجيل'
                  )}
                </motion.button>

                {state === 'error' && (
                  <motion.div className="form-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="alert">
                    تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى.
                  </motion.div>
                )}
                <p className="form-note">المقاعد محدودة — الأولوية حسب ترتيب التسجيل.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
