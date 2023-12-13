import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'Is my information secure?',
      answer:
        'The only information available to other optometrists is your anonymous salary data that you provide. This data will not be associated with your identity as I will not even have any information relating to your indentify. Keeping your identity anonymous is a top priority of mine and I will not ask for any identifiying information.',
    },
    // {
    //   question: 'Why are you doing this?',
    //   answer:
    //     'As you know, sharing OD salaries is not thought of very highly. ',
    // },
    // {
    //   question: 'But isn’t insider trading illegal?',
    //   answer:
    //     'Here’s the thing: you’re the one doing the insider trading, not us. We’re just giving you the tips and some tools to make trades. We’re not doing anything wrong here.',
    // },
  ],
  [
    {
      question: 'Why should I use this platform?',
      answer:
        "I believe this is the best way to share job salaries anonymously and to have access to accurate data. Not only will you be able to share important details of your compensation package, but I will provide other normalized statistics that will make it easier to compare with other compensation packages."
    },
    // {
    //   question: 'Where is Pocket based?',
    //   answer:
    //     'Let’s just say it’s not somewhere where the SEC is going to find us.',
    // },
    // {
    //   question: 'Is there any age limit to trading on Pocket?',
    //   answer:
    //     'For our free plan, the age limit is based on the minimum age to trade in your country of residence. Our VIP plan uses advanced transaction anonymization though, so you can use that plan even if you’re 9 years old. Or a dog.',
    // },
  ],
  [
    {
      question: 'Why are you doing this?',
      answer:
        "As you may know, not only is it difficult to share salaries anonymously, but it is also frowned upon. Due to these hurdles, fair OD compensation is difficult to determine, which leads to a disadvantage when negotiating your salary. With transparency in salaries, you are more likely to earn a fair wage and be happy with your career."
    },
    // {
    //   question: 'How do I explain the money I withdraw from Pocket to the IRS?',
    //   answer:
    //     'This feels like one-hundred percent a you problem. Pocket is not responsible in any way for your tax returns.',
    // },
    // {
    //   question: 'How do I become an insider?',
    //   answer:
    //     'Contact us with some details about your industry and the type of access you have to apply for an insider account. Once approved, we’ll send you a guide on collecting insider information without being detected at work.',
    // },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">If you have anything else you want to ask,{' '}
            <a
              href="mailto:AnthonyVuOD@gmail.com"
              className="text-gray-900 underline"
            >
              reach out to me
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
