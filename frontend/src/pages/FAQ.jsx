import { useState, useEffect } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What types of agricultural products do you supply?",
      answer:
        "We supply fertilizers, pesticides, farming tools, irrigation equipment, and other agricultural inputs.",
    },
    {
      question: "Do you provide bulk order discounts?",
      answer:
        "Yes, we provide special pricing for bulk and wholesale orders. Please contact us for details.",
    },
    {
      question: "Do you deliver to nearby villages?",
      answer:
        "Yes, we provide delivery services within nearby areas based on order quantity.",
    },
    {
      question: "Are your products certified?",
      answer:
        "All our products are sourced from trusted and certified agricultural brands.",
    },
    {
      question: "How can I contact your support team?",
      answer:
        "You can contact us via phone, WhatsApp, or through our contact page form.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    document.title = "FAQ | Pavishna Pannai Service";

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Frequently asked questions about our agricultural products and services.",
      );
    }
  }, []);

  return (
    <section className="faq-section">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our services and products.</p>
      </div>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>

            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
