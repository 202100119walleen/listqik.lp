"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

const listings = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=75",
    price: "$489,000",
    address: "4812 Maple Grove Dr, Dallas, TX",
    meta: "4 bd • 3 ba • 2,450 sqft",
    badge: "New",
    daysOnMarket: "5d on market"
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=75",
    price: "$712,500",
    address: "1890 Lakeside Blvd, Austin, TX",
    meta: "5 bd • 4 ba • 3,210 sqft",
    badge: "Hot",
    daysOnMarket: "3d on market"
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=900&q=75",
    price: "$329,000",
    address: "678 Pine Ridge Ct, Houston, TX",
    meta: "3 bd • 2 ba • 1,820 sqft",
    badge: "Price Drop",
    daysOnMarket: "21d on market"
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=75",
    price: "$1,250,000",
    address: "250 Ocean Vista Pkwy, Miami, FL",
    meta: "5 bd • 5 ba • 4,100 sqft",
    badge: "Luxury",
    daysOnMarket: "7d on market"
  }
];

const testimonials = [
  {
    quote:
      "ListQik helped us attract qualified buyers in under two weeks. The process felt premium from first click to closing.",
    name: "S. Reynolds",
    detail: "Seller in Dallas"
  },
  {
    quote:
      "The valuation tool gave us confidence before listing. The team guided every decision and saved us time.",
    name: "M. Patel",
    detail: "Seller in Austin"
  },
  {
    quote:
      "Clean listings, strong buyer demand, and transparent updates made this the easiest real estate experience we have had.",
    name: "A. Walker",
    detail: "Seller in Miami"
  }
];

const avatarSampleVideo =
  "https://res.cloudinary.com/dowcybzve/video/upload/f_auto,q_auto,w_720/v1776868318/avatar_2_ekxnl4.mp4";

function formatMoney(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

export default function HomePage() {
  const carouselRef = useRef(null);
  const avatarVideoRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(2);
  const [sqft, setSqft] = useState(1800);
  const [zip, setZip] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [avatarMuted, setAvatarMuted] = useState(true);

  const estimate = useMemo(() => {
    const baseline = 120000 + sqft * 205 + beds * 18000 + baths * 14000;
    const low = baseline * 0.93;
    const high = baseline * 1.07;
    return { low, high, midpoint: baseline };
  }, [beds, baths, sqft]);

  const handleCarouselScroll = () => {
    const node = carouselRef.current;
    if (!node) return;
    const itemWidth = node.firstElementChild?.clientWidth || 1;
    const gap = 16;
    const position = Math.round(node.scrollLeft / (itemWidth + gap));
    setActiveSlide(Math.max(0, Math.min(position, listings.length - 1)));
  };

  const slideBy = (direction) => {
    const node = carouselRef.current;
    if (!node) return;
    const distance = node.clientWidth * 0.92;
    node.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const toggleAvatarSound = () => {
    const video = avatarVideoRef.current;
    if (!video) return;
    const nextMuted = !avatarMuted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
      video.play().catch(() => {});
    }
    setAvatarMuted(nextMuted);
  };

  return (
    <>
      {/* Sticky top navigation with high-conversion CTAs */}
      <header className="topNav">
        <a href="#" className="brand">
          <span className="brandMark">LQ</span>
          <span>
            ListQik
            <small>by Resolution Realty Group</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#listings">Listings</a>
          <a href="#estimate">Home Value</a>
          <a href="#compare">Compare</a>
          <a href="#trust">Why Us</a>
        </nav>
        <div className="navActions">
          <a href="#seller" className="btn btnSecondary">
            Get Estimate
          </a>
          <a href="#seller" className="btn btnPrimary">
            List Your Home
          </a>
        </div>
      </header>

      <main className="pageShell">
        <section className="hero">
          <div className="heroInner reveal">
            <div className="heroContent">
              <p className="eyebrow">Modern real estate platform</p>
              <h1>List smarter. Sell faster. Close with confidence.</h1>
              <p className="heroCopy">
                Premium listing presentation, serious buyer exposure, and local
                experts that move quickly when timing matters.
              </p>
              <div className="heroActions">
                <a href="#seller" className="btn btnPrimary">
                  Start Your Listing
                </a>
                <a href="#estimate" className="btn btnSecondary">
                  Check Home Value
                </a>
              </div>
              <ul className="heroStats" aria-label="Performance highlights">
                <li>
                  <strong>24h</strong> average response
                </li>
                <li>
                  <strong>98%</strong> client satisfaction
                </li>
                <li>
                  <strong>3.2x</strong> listing engagement
                </li>
              </ul>
            </div>

            <aside className="heroAvatarCard" aria-label="AI assistant preview">
              <p className="avatarKicker">AI Listing Assistant</p>
              <div className="avatarVideoWrap">
                <video
                  ref={avatarVideoRef}
                  className="avatarVideo"
                  src={avatarSampleVideo}
                  autoPlay
                  loop
                  muted={avatarMuted}
                  playsInline
                  preload="metadata"
                  onClick={toggleAvatarSound}
                  aria-label={avatarMuted ? "Tap to unmute video" : "Tap to mute video"}
                />
              </div>
              
            </aside>
          </div>
        </section>

        <section className="section metrics reveal" aria-label="Key service metrics">
          <article>
            <p>Homes listed</p>
            <strong>3,400+</strong>
          </article>
          <article>
            <p>Avg. days on market</p>
            <strong>11 days</strong>
          </article>
          <article>
            <p>Seller savings</p>
            <strong>$18K median</strong>
          </article>
        </section>

        <section id="listings" className="section listings reveal sectionAlt">
          <div className="sectionHeading">
            <p className="sectionKicker">Featured Properties</p>
            <h2>Homes You&apos;ll Love</h2>
            <p>Browse active homes with a manual, touch-friendly carousel.</p>
          </div>
          <div className="carouselControls" aria-label="Listing carousel controls">
            <button className="iconBtn" onClick={() => slideBy(-1)} aria-label="Previous listings">
              ←
            </button>
            <button className="iconBtn" onClick={() => slideBy(1)} aria-label="Next listings">
              →
            </button>
          </div>
          <div
            className="listingTrack"
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            aria-label="Property listings"
          >
            {listings.map((listing) => (
              <article className="card" key={listing.id}>
                <div className="media">
                  <span className="listingBadge">{listing.badge}</span>
                  <Image
                    src={listing.image}
                    alt={listing.address}
                    fill
                    sizes="(max-width: 900px) 76vw, 32vw"
                    className="listingImage"
                    quality={72}
                    priority={listing.id === 1}
                  />
                </div>
                <div className="cardBody">
                  <p className="price">{listing.price}</p>
                  <p className="address">{listing.address}</p>
                  <p className="meta">{listing.meta}</p>
                  <div className="cardFooterRow">
                    <a href="#seller" className="inlineLink">
                      View Details
                    </a>
                    <span className="marketDays">{listing.daysOnMarket}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="sliderCount">
            {activeSlide + 1} / {listings.length}
          </p>
        </section>

        <section id="compare" className="section pricing reveal">
          <div className="sectionHeading">
            <p className="sectionKicker">Pricing Plans</p>
            <h2>Choose How You Want to Sell</h2>
            <p>
              No hidden fees, no long contracts, just the tools and brokerage
              support you need to keep more equity.
            </p>
          </div>
          <p className="pricingHighlight">
            Homeowners save an average of $11,785 versus traditional listing
            paths.
          </p>

          <div className="pricingGrid">
            <article className="pricingCard isPopular">
              <p className="planBadge">Most Popular</p>
              <h3>Essentials</h3>
              <p className="planCopy">
                Everything you need to list on the MLS and sell on your terms.
              </p>
              <p className="planPrice">$95</p>
              <p className="planSub">One-time listing fee</p>
              <a href="#seller" className="btn btnPrimary wide">
                List My Home - $95
              </a>
              <ul>
                <li>Listed on MLS and major portals</li>
                <li>All required listing paperwork support</li>
                <li>Unlimited listing changes</li>
                <li>Showing and inquiry forwarding</li>
              </ul>
            </article>

            <article className="pricingCard">
              <p className="planBadge isDark">Pro Marketing</p>
              <h3>Advanced</h3>
              <p className="planCopy">
                Stand out with premium media and stronger listing visibility.
              </p>
              <p className="planPrice">$495</p>
              <p className="planSub">One-time listing fee</p>
              <a href="#seller" className="btn btnSecondary wide">
                Upgrade My Marketing
              </a>
              <ul>
                <li>Everything in Essentials</li>
                <li>Professional photography package</li>
                <li>Priority listing optimization</li>
                <li>Enhanced social ad placement</li>
              </ul>
            </article>

            <article className="pricingCard">
              <p className="planBadge isDark">Best Value</p>
              <h3>Full Service</h3>
              <p className="planCopy">
                Licensed agent support from listing to negotiation and close.
              </p>
              <p className="planPrice">1%</p>
              <p className="planSub">At settlement</p>
              <a href="#seller" className="btn btnSecondary wide">
                Talk to an Agent
              </a>
              <ul>
                <li>Dedicated licensed agent</li>
                <li>Offer review and negotiation help</li>
                <li>Buyer screening and qualification</li>
                <li>Pricing strategy to maximize sale value</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="estimate" className="section estimator reveal">
          <div className="sectionHeading">
            <h2>Home Value Estimator</h2>
            <p>Interactive pricing range based on property details.</p>
          </div>
          <div className="estimatorGrid">
            <form className="panel" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="zip">ZIP code</label>
              <input
                id="zip"
                type="text"
                placeholder="e.g. 75001"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
                inputMode="numeric"
              />

              <label htmlFor="sqft">Square feet: {sqft.toLocaleString()}</label>
              <input
                id="sqft"
                type="range"
                min="700"
                max="5000"
                step="50"
                value={sqft}
                onChange={(event) => setSqft(Number(event.target.value))}
              />

              <div className="inlineFields">
                <div>
                  <label htmlFor="beds">Bedrooms</label>
                  <input
                    id="beds"
                    type="number"
                    min="1"
                    max="8"
                    value={beds}
                    onChange={(event) => setBeds(Number(event.target.value))}
                  />
                </div>
                <div>
                  <label htmlFor="baths">Bathrooms</label>
                  <input
                    id="baths"
                    type="number"
                    min="1"
                    max="8"
                    step="0.5"
                    value={baths}
                    onChange={(event) => setBaths(Number(event.target.value))}
                  />
                </div>
              </div>
              <button className="btn btnPrimary wide">Get Detailed Report</button>
            </form>

            <aside className="panel resultPanel" aria-live="polite">
              <p className="resultLabel">Estimated range</p>
              <h3>{formatMoney(estimate.midpoint)}</h3>
              <p className="resultRange">
                {formatMoney(estimate.low)} - {formatMoney(estimate.high)}
              </p>
              <p className="resultHint">
                Enter your address details to receive a full comparative market
                analysis and listing strategy.
              </p>
            </aside>
          </div>
        </section>

        <section id="trust" className="section trust reveal sectionAlt">
          <div className="sectionHeading">
            <h2>Built for trust and conversion</h2>
            <p>Everything is optimized to turn visits into qualified leads.</p>
          </div>
          <div className="trustGrid">
            <article>
              <h3>Professional marketing</h3>
              <p>Premium visuals, compelling copy, and targeted distribution.</p>
            </article>
            <article>
              <h3>Transparent process</h3>
              <p>Clear milestones, feedback loops, and real-time updates.</p>
            </article>
            <article>
              <h3>Lead-focused journey</h3>
              <p>Strategic CTAs across each section to reduce drop-off.</p>
            </article>
          </div>
          <blockquote className="testimonial">
            <p>"{testimonials[testimonialIndex].quote}"</p>
            <footer>
              {testimonials[testimonialIndex].name} ·{" "}
              {testimonials[testimonialIndex].detail}
            </footer>
            <div className="testimonialDots" role="tablist" aria-label="Testimonials">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  className={index === testimonialIndex ? "dot active" : "dot"}
                  onClick={() => setTestimonialIndex(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </blockquote>
        </section>

        <section id="seller" className="section sellerCta reveal">
          <h2>Ready to list with confidence?</h2>
          <p>
            Get your home estimate and launch a listing strategy that attracts
            high-intent buyers.
          </p>
          <div className="heroActions">
            <a href="#estimate" className="btn btnSecondary">
              Get Estimate
            </a>
            <a href="#listings" className="btn btnPrimary">
              View Listings
            </a>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="footerGrid">
          <div>
            <a href="#" className="brand">
              <span className="brandMark">LQ</span>
              <span>
                ListQik
                <small>by Resolution Realty Group</small>
              </span>
            </a>
            <p className="footerBlurb">
              Fast, modern real estate listing support designed to help sellers
              price right, attract qualified buyers, and close confidently.
            </p>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#trust">Why ListQik</a>
            <a href="#listings">Featured Listings</a>
            <a href="#estimate">Home Value Tool</a>
          </div>

          <div>
            <h4>Contact</h4>
            <a href="tel:+18005551234">(800) 555-1234</a>
            <a href="mailto:hello@listqik.com">hello@listqik.com</a>
            <span>Mon-Fri, 9:00 AM - 6:00 PM</span>
          </div>
        </div>

        <div className="footerBottom">
          <p>
            © {new Date().getFullYear()} ListQik · Resolution Realty Group. All
            rights reserved.
          </p>
          <div className="footerLegal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Fair Housing</a>
          </div>
        </div>
      </footer>
    </>
  );
}
