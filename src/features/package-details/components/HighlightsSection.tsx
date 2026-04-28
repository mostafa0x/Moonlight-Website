import { getTranslations } from "next-intl/server";
import AccordionItem from "./AccordionItem";

/**
 * HighlightsSection — Server Component (with client AccordionItem children)
 *
 * Displays "Why Choose Us", "Cancellation Policy", and "What You Should Know"
 * as expandable accordion items matching the Figma design.
 */
export default async function HighlightsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "packageDetails" });

  const highlights = [
    {
      title: t("highlights.whyChooseUs.title"),
      content: t("highlights.whyChooseUs.content"),
    },
    {
      title: t("highlights.cancellationPolicy.title"),
      content: t("highlights.cancellationPolicy.content"),
    },
    {
      title: t("highlights.whatYouShouldKnow.title"),
      content: t("highlights.whatYouShouldKnow.content"),
    },
  ];

  return (
    <section aria-labelledby="highlights-heading">
      <h2
        id="highlights-heading"
        className="text-xl md:text-3xl font-bold text-orange-300 font-cairo mb-4 md:mb-6"
      >
        {t("highlightsTitle")}
      </h2>

      <div className="space-y-4">
        {highlights.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            defaultOpen={index === 0}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}
