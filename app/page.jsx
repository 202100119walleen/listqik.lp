"use client";

import { useRef, useState } from "react";

const avatarSampleVideo =
  "https://res.cloudinary.com/dowcybzve/video/upload/f_auto,q_auto,w_720/v1776868318/avatar_2_ekxnl4.mp4";

export default function HomePage() {
  const avatarVideoRef = useRef(null);
  const [avatarMuted, setAvatarMuted] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

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
          <span>ListQik</span>
        </a>
        <button
          type="button"
          className="navToggle"
          aria-label="Toggle navigation menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav aria-label="Primary navigation" className={navOpen ? "open" : ""}>
          <a href="#compare" onClick={() => setNavOpen(false)}>Pricing</a>
          <a href="#seller" onClick={() => setNavOpen(false)}>Sell</a>
          <a href="#compare" onClick={() => setNavOpen(false)}>Compare</a>
          <a href="#seller" onClick={() => setNavOpen(false)}>Start</a>
        </nav>
        <div className="navActions">
          <a href="#compare" className="btn btnSecondary">
            View Packages
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
                <a href="#compare" className="btn btnSecondary">
                  Compare Packages
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
                <li className="heroStatHighlight">
                  <strong>$9,000</strong> seller savings
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
              <h3>Subsonic</h3>
              <p className="planCopy">
                Everything you need to list on the MLS and sell on your terms.
              </p>
              <p className="planPrice">$99</p>
              <p className="planSub">One-time listing fee</p>
              <a href="#seller" className="btn btnPrimary wide">
                Get Subsonic
              </a>
              <ul>
                <li>Listed on MLS and major portals</li>
                <li>All required listing paperwork support</li>
                <li>Unlimited listing changes</li>
                <li>Showing and inquiry forwarding</li>
              </ul>
            </article>

            <article className="pricingCard">
              <p className="planBadge isDark">Growth Package</p>
              <h3>Supersonic</h3>
              <p className="planCopy">
                Stand out with premium media and stronger listing visibility.
              </p>
              <p className="planPrice">$299</p>
              <p className="planSub">One-time listing fee</p>
              <a href="#seller" className="btn btnSecondary wide">
                Get Supersonic
              </a>
              <ul>
                <li>Everything in Subsonic</li>
                <li>Professional photography package</li>
                <li>Priority listing optimization</li>
                <li>Enhanced social ad placement</li>
              </ul>
            </article>

            <article className="pricingCard">
              <p className="planBadge isDark">Performance Package</p>
              <h3>Hypersonic</h3>
              <p className="planCopy">
                Maximum exposure package for high-urgency, high-impact listings.
              </p>
              <p className="planPrice">$599</p>
              <p className="planSub">One-time listing fee</p>
              <a href="#seller" className="btn btnSecondary wide">
                Get Hypersonic
              </a>
              <ul>
                <li>Everything in Supersonic</li>
                <li>Premium listing placement boosts</li>
                <li>Priority seller support workflow</li>
                <li>Expanded campaign distribution</li>
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

        <section id="seller" className="section sellerCta reveal">
          <h2>Ready to list with confidence?</h2>
          <p>
            Select your package and launch a listing strategy that attracts
            high-intent buyers.
          </p>
          <div className="heroActions">
            <a href="#compare" className="btn btnPrimary">
              List Now for $99
            </a>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="footerGrid">
          <div>
            <a href="#" className="brand">
              <span className="brandMark">LQ</span>
              <span>ListQik</span>
            </a>
            <p className="footerBlurb">
              Fast, modern real estate listing support designed to help sellers
              price right, attract qualified buyers, and close confidently.
            </p>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#seller">Why ListQik</a>
            <a href="#compare">Pricing Plans</a>
            <a href="#seller">Get Started</a>
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
            © {new Date().getFullYear()} ListQik. All rights reserved.
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
