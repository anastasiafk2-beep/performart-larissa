import type { Interview } from "@/components/content/interviews";

type Props = {
  interview: Pick<Interview, "introduction" | "body" | "questions" | "quote">;
  bodyClassName?: string;
  headingClassName?: string;
};

export default function InterviewWrittenContent({
  interview,
  bodyClassName = "",
  headingClassName = "",
}: Props) {
  const introduction = interview.introduction?.trim();
  const body = interview.body?.trim();
  const quote = interview.quote?.trim();
  const questions = interview.questions?.filter(
    (item) => item.question?.trim() && item.answer?.trim()
  );

  if (!introduction && !body && !questions?.length && !quote) return null;

  return (
    <section className="interview-qa mt-10 w-full lg:mt-16">
      {introduction && (
        <p className={`${bodyClassName} mb-10 whitespace-pre-line text-[16px] leading-[1.7] text-black/75 lg:mb-14 lg:text-[18px]`}>
          {introduction}
        </p>
      )}

      {body ? (
        <div className={`${bodyClassName} whitespace-pre-line break-words text-[16px] leading-[1.7] text-black/75 lg:text-[18px]`}>
          {body}
        </div>
      ) : (
        <div className="space-y-10 lg:space-y-14">
          {questions?.map((item, index) => (
            <div key={`${item.question}-${index}`} className="interview-qa-item">
              <h2 className={`${headingClassName} text-[19px] leading-[1.35] text-black lg:text-[22px]`}>
                {item.question}
              </h2>
              <p className={`${bodyClassName} mt-4 whitespace-pre-line break-words text-[16px] leading-[1.7] text-black/75 lg:mt-5 lg:text-[18px]`}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      )}

      {quote && (
        <blockquote className={`${bodyClassName} mt-8 border-l-2 border-[#C13B3A] pl-4 text-[16px] leading-[1.7] text-black/75 lg:mt-10 lg:pl-5 lg:text-[18px]`}>
          <p className="whitespace-pre-line break-words">{quote}</p>
        </blockquote>
      )}
    </section>
  );
}
