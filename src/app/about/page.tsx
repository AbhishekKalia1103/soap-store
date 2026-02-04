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
                From Kitchen to Your Bathroom
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Mitti & Bloom was born from a simple belief - that what we put on our skin
                should be as pure as what we put in our bodies. Our journey began in a small
                kitchen, experimenting with traditional recipes passed down through generations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to handcraft each bar of soap with the same love and attention
                to detail. We source the finest organic ingredients, blend them with care, and
                allow each bar to cure naturally for 4-6 weeks to ensure perfection.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our name reflects our philosophy - &quot;Mitti&quot; (earth) represents our commitment
                to natural, earthy ingredients, while &quot;Bloom&quot; symbolizes the transformation
                and radiance that comes from nurturing your skin with nature&apos;s best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="text-gray-600 mt-2">What we stand for</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "100% Natural",
                description: "We use only organic, plant-based ingredients. No synthetic chemicals, no artificial fragrances, no harmful additives.",
                icon: "leaf",
              },
              {
                title: "Handcrafted with Love",
                description: "Every bar is made by hand in small batches, ensuring quality and attention to detail that mass production can't match.",
                icon: "heart",
              },
              {
                title: "Eco-Friendly",
                description: "From biodegradable packaging to sustainable sourcing, we're committed to minimizing our environmental footprint.",
                icon: "globe",
              },
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 mx-auto bg-olive-100 rounded-full flex items-center justify-center mb-4">
                  {value.icon === "leaf" && (
                    <svg className="w-8 h-8 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )}
                  {value.icon === "heart" && (
                    <svg className="w-8 h-8 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                  {value.icon === "globe" && (
                    <svg className="w-8 h-8 text-olive-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
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

      {/* Image Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Made with Patience & Love
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Each bar of Mitti & Bloom soap takes weeks to create. We don&apos;t rush
                the process because we believe good things take time. Our soaps are cured
                naturally, allowing the ingredients to mature and create a gentle,
                long-lasting bar.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We never test on animals, and our products are free from parabens,
                sulfates, and synthetic fragrances. Just pure, natural goodness for
                your skin.
              </p>
              <Link
                href="/products"
                className="inline-block bg-olive-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-olive-700 transition-colors"
              >
                Shop Our Products
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/made-with-love.jpg"
                alt="Made with patience and love"
                fill
                className="object-cover"
              />
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
