import Heading1 from "@/components/custom/heading1"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fleeti - Frequently Asked Questions",
  description: "Find answers to common questions about using fleeti, managing expiration rules, privacy features, and more.",
  keywords: "fleeti FAQ, fleeti help, expiration rules, privacy, content sharing, self-destructing messages, support"
}

const faqs = [
  {
    id: 1,
    question: "What is Fleeti?",
    answer: "Fleeti is a platform designed for sharing self-destructing content like messages, files, or links. It allows you to set expiration rules based on time, view counts, or events, ensuring that your content is only accessible when needed."
  },
  {
    id: 2,
    question: "How do I get started with Fleeti?",
    answer: "Getting started is easy! Simply create an account, set up your content expiration rules, and share the generated link. You can track your shared content from your dashboard."
  },
  {
    id: 3,
    question: "Do I need an account to use Fleeti?",
    answer: "Yes, an account is required to share content with custom expiration rules. It allows you to manage your shared items, update settings, and track expiration statuses securely."
  },
  {
    id: 4,
    question: "Do I need to have an account to view shared content?",
    answer: "No, recipients do not need an account to view the content you share with them. They can access the content directly through the link you provide, as long as it hasn’t expired."
  },
  {
    id: 5,
    question: "What types of content can I share?",
    answer: "You can share text messages, files, and links. Fleeti supports a range of file types and ensures your content remains secure until it expires."
  },
  {
    id: 6,
    question: "How do expiration rules work?",
    answer: "You can set content to expire based on a specific time or date, or after a certain number of views. More options are coming soon!"
  },
  {
    id: 7,
    question: "Is my data secure with Fleeti?",
    answer: "Yes, we take security seriously. All files are stored using AWS S3, and user data is encrypted. Your content is only accessible until it reaches the expiration criteria you've set."
  },
  {
    id: 8,
    question: "What happens when my content expires?",
    answer: "Once your content reaches its expiration criteria, it is automatically deleted from our servers. Any links or files you shared will no longer be accessible."
  },
  {
    id: 9,
    question: "Can I update the expiration settings after sharing content?",
    answer: "You can adjust expiration settings as long as you are logged into your account and the content hasn’t expired yet."
  },
  {
    id: 10,
    question: "Does Fleeti support notifications for expiring content?",
    answer: "Yes, you'll receive notifications when your content is nearing expiration or when it has expired. This helps you stay informed about the status of your shared items."
  },
  {
    id: 11,
    question: "What if I need more advanced features?",
    answer: "We are continually adding new features, including event-based and location-based expiration rules. Stay tuned for updates or reach out to us with feature requests!"
  },
  // {
  //   id: 12,
  //   question: "Is Fleeti free to use?",
  //   answer: "We offer a free tier that includes basic features like time-based and view-based expiration. For more advanced features, we offer premium plans with added capabilities."
  // },
  {
    id: 13,
    question: "How do I contact support?",
    answer: "If you have any issues or questions, you can reach out to us through the contact form on our website or email us directly at support@Fleeti.com. We're here to help!"
  }
];

export default function Faq() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl divide-y divide-gray-900/10 px-6 pt-16 sm:pt-28 lg:px-8 lg:pt-36 pb-10">
        <Heading1 className="text-center">Frequently Asked Questions</Heading1>
        <dl className="mt-24 space-y-8 divide-y divide-gray-900/10">
          { faqs.map((faq) => (
            <div key={ faq.id } className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">{ faq.question }</dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base leading-7 text-gray-600">{ faq.answer }</p>
              </dd>
            </div>
          )) }
        </dl>
      </div>
    </section>
  )
}
