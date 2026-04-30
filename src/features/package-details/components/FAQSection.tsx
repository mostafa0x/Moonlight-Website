import { getTranslations } from "next-intl/server";
import AccordionItem from "./AccordionItem";

/**
 * FAQSection — Server Component (with client AccordionItem children)
 *
 * Displays Frequently Asked Questions as expandable accordion items.
 * Questions and answers are loaded from translation files for full i18n support.
 */
export default async function FAQSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "packageDetails" });

  const faqs = [
    {
      question: t("faq.customItinerary.question"),
      answer: t("faq.customItinerary.answer"),
    },
    {
      question: t("faq.deposit.question"),
      answer: t("faq.deposit.answer"),
    },
    {
      question: t("faq.whatToBring.question"),
      answer: t("faq.whatToBring.answer"),
    },
  ];

  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-xl md:text-3xl font-bold text-[#F2C975] font-cairo mb-4 md:mb-6"
      >
        {t("faqTitle")}
      </h2>

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <AccordionItem key={index} title={item.question}>
            {item.answer}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}
