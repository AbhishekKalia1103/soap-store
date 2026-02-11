import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-olive-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h1>
            <p className="text-lg text-gray-600">
              Where earth meets bloom - crafting natural soaps with love and tradition
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/soap-recipe.jpg"
                alt="Handwritten soap recipe"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Born from Friendship &amp; Nature
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Mitti &amp; Bloom was born from childhood friendship, slow living, and a deep
                love for nature. Each soap is handcrafted in small batches using time-honoured
                ingredients, earthy botanicals, and gentle oils that respect your skin and the planet.
              </p>
              <div className="space-y-1 text-gray-700 font-medium">
                <p>No mass production.</p>
                <p>No harsh chemicals.</p>
                <p>Just honest, mindful skincare — made with patience and heart.</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our name reflects our philosophy — &quot;Mitti&quot; (earth) represents our commitment
                to natural, earthy ingredients, while &quot;Bloom&quot; symbolizes the transformation
                and radiance that comes from nurturing your skin with nature&apos;s best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 bg-olive-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
            <p className="text-gray-600 text-lg">
              We believe skincare should be simple, honest, and rooted in nature.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Gentle on Skin", desc: "Formulated to care, never irritate" },
              { title: "Rooted in Tradition", desc: "Time-honoured ingredients & recipes" },
              { title: "Thoughtfully Made", desc: "Small batches, big attention to detail" },
              { title: "Beautifully Simple", desc: "No unnecessary additives, ever" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-12 h-12 mx-auto bg-olive-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8 max-w-2xl mx-auto">
            Every bar is cured, packed, and handled with care — because your skin deserves nothing rushed.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
              <ul className="space-y-4">
                {[
                  "Handmade with care",
                  "No harsh chemicals",
                  "Skin-friendly formulations",
                  "Made in small batches for quality",
                  "Suitable for men & women",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-olive-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 leading-relaxed">
                We focus on quality over quantity. Our soaps are made in small batches to ensure
                freshness, effectiveness, and attention to detail in every bar.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/made-with-love.jpg"
                alt="Handcrafted soaps by Mitti & Bloom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Process</h2>
            <p className="text-gray-600 mt-2">How we craft each bar</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Source", desc: "We carefully select organic, ethically-sourced ingredients" },
              { step: "02", title: "Blend", desc: "Traditional cold process method to preserve nutrients" },
              { step: "03", title: "Cure", desc: "4-6 weeks of natural curing for the perfect bar" },
              { step: "04", title: "Package", desc: "Eco-friendly packaging, ready for your doorstep" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-olive-200 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use / Soap Care */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* How to Use */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Wet the soap and create lather.",
                  "Apply gently on skin.",
                  "Rinse thoroughly.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-olive-100 rounded-full flex items-center justify-center flex-shrink-0 text-olive-700 font-semibold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Soap Care Tips */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Soap Care Tips</h3>
              <ul className="space-y-4">
                {[
                  "Keep soap dry after use",
                  "Use a soap dish with drainage",
                  "Avoid leaving in standing water",
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-olive-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-olive-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Natural Skincare?
          </h2>
          <p className="text-olive-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who have made the switch to natural,
            handcrafted soaps.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-olive-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Browse Our Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
