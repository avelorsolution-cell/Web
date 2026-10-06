import { useNavigate } from 'react-router-dom'
import LanguageToggle from '../components/layout/LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'
import { useBi } from '../i18n/useBi'

interface EdgeCase {
  title: string
  titleAr: string
  problem: string
  problemAr: string
  message: string
  messageAr: string
  action: string
  actionAr: string
}

const cases: EdgeCase[] = [
  { title: 'Payment Failed', titleAr: 'فشل الدفع', problem: 'Card declined during checkout.', problemAr: 'تم رفض البطاقة أثناء الدفع.', message: 'Your card was declined. Please try another payment method.', messageAr: 'تم رفض بطاقتك. جرّب طريقة دفع أخرى.', action: 'Retry Payment / Choose Another Method', actionAr: 'إعادة المحاولة / اختيار طريقة أخرى' },
  { title: 'Booking Slot Taken', titleAr: 'الموعد محجوز', problem: 'Two subscribers select the same slot simultaneously.', problemAr: 'يختار مشتركان نفس الموعد في نفس الوقت.', message: 'This time slot was just booked. Please choose another.', messageAr: 'تم حجز هذا الموعد للتو. يرجى اختيار موعد آخر.', action: 'Return to Time Selection', actionAr: 'العودة لاختيار الوقت' },
  { title: 'No Availability', titleAr: 'لا يوجد توفر', problem: 'Trainer has no open slots this week.', problemAr: 'لا يملك المدرب مواعيد متاحة هذا الأسبوع.', message: 'No availability found. Try another trainer or date range.', messageAr: 'لم يتم العثور على مواعيد متاحة. جرّب مدربًا أو تاريخًا آخر.', action: 'Browse Other Trainers', actionAr: 'تصفح مدربين آخرين' },
  { title: 'Trainer Cancelled', titleAr: 'ألغى المدرب', problem: 'Trainer cancels a confirmed session.', problemAr: 'يلغي المدرب حصة مؤكدة.', message: 'Your trainer had to cancel this session. You will be refunded or rescheduled.', messageAr: 'اضطر مدربك لإلغاء هذه الحصة. سيتم استرداد المبلغ أو إعادة الجدولة.', action: 'View Refund / Reschedule', actionAr: 'عرض الاسترداد / إعادة الجدولة' },
  { title: 'Subscriber Cancelled', titleAr: 'ألغى المشترك', problem: 'Subscriber cancels within policy window.', problemAr: 'يلغي المشترك ضمن نافذة السياسة.', message: 'Your session has been cancelled per the cancellation policy.', messageAr: 'تم إلغاء حصتك وفقًا لسياسة الإلغاء.', action: 'View Cancellation Policy', actionAr: 'عرض سياسة الإلغاء' },
  { title: 'Refund Pending', titleAr: 'الاسترداد قيد المعالجة', problem: 'Refund approved but not yet settled.', problemAr: 'تمت الموافقة على الاسترداد لكنه لم يُسوَّ بعد.', message: 'Your refund is being processed and should arrive within 5-7 business days.', messageAr: 'يتم معالجة استردادك وسيصل خلال 5-7 أيام عمل.', action: 'View Refund Status', actionAr: 'عرض حالة الاسترداد' },
  { title: 'Verification Failed', titleAr: 'فشل التحقق', problem: 'Trainer application rejected.', problemAr: 'تم رفض طلب المدرب.', message: 'Your application was not approved. See notes for details.', messageAr: 'لم تتم الموافقة على طلبك. راجع الملاحظات للتفاصيل.', action: 'View Rejection Notes', actionAr: 'عرض ملاحظات الرفض' },
  { title: 'Certificate Expired', titleAr: 'انتهت صلاحية الشهادة', problem: 'A trainer certificate passes its expiry date.', problemAr: 'تنتهي صلاحية شهادة المدرب.', message: 'One of your certifications has expired. Please upload a renewed copy.', messageAr: 'انتهت صلاحية إحدى شهاداتك. يرجى رفع نسخة محدثة.', action: 'Upload Renewed Certificate', actionAr: 'رفع الشهادة المحدثة' },
  { title: 'Trainer Suspended', titleAr: 'المدرب موقوف', problem: 'A trainer is suspended by admin.', problemAr: 'يقوم المشرف بإيقاف مدرب.', message: 'This trainer is temporarily unavailable on HEMMA.', messageAr: 'هذا المدرب غير متاح مؤقتًا على هِمَّة.', action: 'Browse Other Trainers', actionAr: 'تصفح مدربين آخرين' },
  { title: 'Package Expired', titleAr: 'انتهت صلاحية الباقة', problem: 'Sessions remain unused past validity period.', problemAr: 'حصص متبقية بعد انتهاء فترة الصلاحية.', message: 'Your package has expired with 2 sessions remaining.', messageAr: 'انتهت صلاحية باقتك مع بقاء حصتين.', action: 'Purchase New Package', actionAr: 'شراء باقة جديدة' },
  { title: 'Package Complete', titleAr: 'اكتملت الباقة', problem: 'All sessions in a package have been used.', problemAr: 'تم استخدام جميع حصص الباقة.', message: "You've completed all sessions in this package. Great work!", messageAr: 'لقد أكملت جميع حصص هذه الباقة. عمل رائع!', action: 'Book Another Package', actionAr: 'حجز باقة أخرى' },
  { title: 'Review Locked', titleAr: 'التقييم مقفل', problem: 'Subscriber has no eligible completed service.', problemAr: 'لا يملك المشترك خدمة مكتملة مؤهلة.', message: 'Complete an eligible HEMMA training service before reviewing.', messageAr: 'أكمل خدمة تدريبية مؤهلة في هِمَّة قبل إضافة تقييم.', action: 'View My Training', actionAr: 'عرض تدريبي' },
  { title: 'No Training Plan', titleAr: 'لا توجد خطة تدريبية', problem: 'Trainer has not yet published a program.', problemAr: 'لم ينشر المدرب برنامجًا بعد.', message: 'Your trainer has not published a training plan yet.', messageAr: 'لم ينشر مدربك خطة تدريبية بعد.', action: 'Message Trainer', actionAr: 'مراسلة المدرب' },
  { title: 'Check-In Overdue', titleAr: 'المتابعة الأسبوعية متأخرة', problem: 'Subscriber misses the weekly check-in window.', problemAr: 'يفوّت المشترك نافذة المتابعة الأسبوعية.', message: "You haven't submitted this week's check-in yet.", messageAr: 'لم ترسل متابعة هذا الأسبوع بعد.', action: 'Submit Check-In', actionAr: 'إرسال المتابعة' },
  { title: 'Body Report Failed', titleAr: 'فشل تقرير الجسم', problem: 'Uploaded file cannot be processed.', problemAr: 'تعذّرت معالجة الملف المرفوع.', message: 'We could not process this report. Try another file or enter measurements manually.', messageAr: 'تعذّرت معالجة هذا التقرير. جرّب ملفًا آخر أو أدخل القياسات يدويًا.', action: 'Try Again / Enter Manually', actionAr: 'إعادة المحاولة / إدخال يدوي' },
  { title: 'Body Report Unreadable', titleAr: 'تقرير الجسم غير مقروء', problem: 'Report format or image quality prevents reading.', problemAr: 'صيغة التقرير أو جودة الصورة تمنع القراءة.', message: 'This file appears unreadable. Please upload a clearer copy.', messageAr: 'يبدو هذا الملف غير قابل للقراءة. يرجى رفع نسخة أوضح.', action: 'Upload Different File', actionAr: 'رفع ملف مختلف' },
  { title: 'Manual Measurements Incomplete', titleAr: 'القياسات اليدوية غير مكتملة', problem: 'Subscriber saves without required weight field.', problemAr: 'يحفظ المشترك دون إدخال حقل الوزن المطلوب.', message: 'Please enter at least your weight to save this assessment.', messageAr: 'يرجى إدخال وزنك على الأقل لحفظ هذا التقييم.', action: 'Complete Required Fields', actionAr: 'إكمال الحقول المطلوبة' },
  { title: 'Progress Consent Required', titleAr: 'موافقة متابعة التقدم مطلوبة', problem: 'Subscriber has not agreed to progress tracking.', problemAr: 'لم يوافق المشترك على متابعة التقدم.', message: 'Please review and accept progress tracking consent to continue.', messageAr: 'يرجى مراجعة والموافقة على متابعة التقدم للمتابعة.', action: 'Review Consent', actionAr: 'مراجعة الموافقة' },
  { title: 'Parent Consent Required', titleAr: 'موافقة ولي الأمر مطلوبة', problem: 'Kids Training selected without guardian approval.', problemAr: 'تم اختيار تدريب الأطفال دون موافقة ولي الأمر.', message: 'Parent or guardian approval is required for kids training.', messageAr: 'موافقة ولي الأمر مطلوبة لتدريب الأطفال.', action: 'Concept Only — Not Collected', actionAr: 'مفهوم فقط — لا يتم الجمع' },
]

export default function EdgeCases() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const bi = useBi()

  return (
    <div className="min-h-screen bg-bg px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-sm font-semibold text-muted hover:text-navy">
            ← {t.common.backToPresentation}
          </button>
          <LanguageToggle compact />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-navy">{t.edgeCasesPage.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">{t.edgeCasesPage.subtitle}</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-white p-4 shadow-card">
              <h3 className="font-bold text-navy">{language === 'ar' ? c.titleAr : c.title}</h3>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">{t.edgeCasesPage.problem}</p>
              <p className="text-sm text-navy">{bi(c.problem, c.problemAr)}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">{t.edgeCasesPage.userMessage}</p>
              <p className="rounded-lg bg-black/5 p-2 text-sm text-navy">{bi(c.message, c.messageAr)}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">{t.edgeCasesPage.action}</p>
              <p className="text-sm font-semibold text-teal-dark">{bi(c.action, c.actionAr)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
