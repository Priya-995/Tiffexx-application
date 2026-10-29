"use client";

import Link from "next/link";
import "./homepage.css";
import Header from "@/components/layout/Header";

export default function HomePage() {
  const notchsLeft = [15, 33, 51, 69, 87, 105, 123, 141, 159];

  return (
    <div className="homepage-wrapper">
      <div className="page">
        {/* Header */}
        <Header />

        {/* Hero */}
        <section className="hero">
          <div className="hero-img" style={{ backgroundImage: "url('/assets/hero.png')" }}></div>
          <div className="hero-dots">
            <i className="on"></i>
            <i></i>
            <i></i>
          </div>
        </section>

        {/* Offers */}
        <section className="offers">
          <div className="offer o1">
            <div className="offer-l">
              <div className="offer-h">
                <div className="offer-ic">
                  <div className="offer-ic-i">
                    <img src="/assets/offer-icon-2.png" alt="" />
                  </div>
                </div>
                <div className="offer-t">
                  <div className="offer-title">Lunch</div>
                  <div className="offer-sub">Order by 1:30pm</div>
                </div>
              </div>
              <div className="offer-st">
                <i></i>
                <span>Opens soon</span>
              </div>
            </div>
            <div className="offer-m">
              <div className="offer-r1">
                <span className="lbl">Opens in</span>
                <div className="pills">
                  <span className="pill">12:30 – 1:00 pm</span>
                  <span className="pill">1:00 – 1:30 pm</span>
                </div>
              </div>
              <div className="timer">
                <span className="num" style={{ left: "-7px", top: "3.5px" }}>00</span>
                <span className="unit" style={{ left: "50.41px", top: "24px" }}>hour</span>
                <span className="num" style={{ left: "92.08px", top: "0px" }}>49</span>
                <span className="unit" style={{ left: "142.48px", top: "24px" }}>min</span>
                <span className="num" style={{ left: "179.02px", top: "0px" }}>49</span>
                <span className="unit" style={{ left: "229.42px", top: "24px" }}>sec</span>
              </div>
              <div className="prog">
                <div className="bar"></div>
                <div className="ends">
                  <span>11am</span>
                  <span>1:30pm</span>
                </div>
              </div>
            </div>
            <div className="offer-cta">
              <div className="btn">Order Now</div>
              <div className="cap">Opens at 11am</div>
            </div>
          </div>

          <div className="offer o2">
            <div className="offer-l">
              <div className="offer-h">
                <div className="offer-ic">
                  <div className="offer-ic-i">
                    <img src="/assets/offer-icon-2.png" alt="" />
                  </div>
                </div>
                <div className="offer-t">
                  <div className="offer-title">Dinner</div>
                  <div className="offer-sub">Order by 8:30pm</div>
                </div>
              </div>
              <div className="offer-st">
                <i></i>
                <span>Opens soon</span>
              </div>
            </div>
            <div className="offer-m">
              <div className="offer-r1">
                <span className="lbl">Opens in</span>
                <div className="pills">
                  <span className="pill">7:00 – 7:30 pm</span>
                  <span className="pill">7:30 – 8:00 pm</span>
                </div>
              </div>
              <div className="timer">
                <span className="num" style={{ left: "0px", top: "0px" }}>07</span>
                <span className="unit" style={{ left: "50.41px", top: "24px" }}>hour</span>
                <span className="num" style={{ left: "92.08px", top: "0px" }}>49</span>
                <span className="unit" style={{ left: "142.48px", top: "24px" }}>min</span>
                <span className="num" style={{ left: "179.02px", top: "0px" }}>49</span>
                <span className="unit" style={{ left: "229.42px", top: "24px" }}>sec</span>
              </div>
              <div className="prog">
                <div className="bar"></div>
                <div className="ends">
                  <span>6pm</span>
                  <span>8:30pm</span>
                </div>
              </div>
            </div>
            <div className="offer-cta">
              <div className="btn">Not open yet</div>
              <div className="cap">Opens at 6pm</div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="partners">
          <div className="p-h">
            <div>
              <h2>Tiffin partners near you</h2>
              <p>Home kitchens delivering fresh, every day</p>
            </div>
            <Link href="/kitchens" className="va">View all &nbsp;→</Link>
          </div>
          <div className="p-f">
            <div className="p-fl">
              <span className="fbtn filter">
                <img src="/assets/filter.svg" alt="" />
                <span>Filter </span>
              </span>
              <span className="fdiv"></span>
              <div className="chipsrow">
                <span className="fbtn near">
                  <img src="/assets/nearest.svg" alt="" />
                  Nearest
                </span>
                <span className="fbtn">Open Now</span>
                <span className="fbtn">Favorites</span>
                <span className="fbtn">Rated 4+</span>
                <span className="fbtn r4">Less than 60</span>
                <span className="fbtn r4">Price</span>
              </div>
            </div>
            <div className="veg">
              <span>Veg </span>
              <i><b></b></i>
            </div>
          </div>
          <div className="pgrid">
            <article className="pc" style={{ height: "317px" }}>
              <div className="pc-img" style={{ backgroundImage: "url('/assets/card-bg.png'), linear-gradient(150.21deg, #f1d9a8 0%, #d8a15c 100%)" }}>
                <span className="vb veg"><i></i></span>
                <span className="tag">Best value</span>
                <div className="dots"><i className="on"></i><i></i><i></i></div>
              </div>
              <div className="pc-b">
                <div className="pc-r1">
                  <h4>Amma's Kitchen</h4>
                  <span className="rate">
                    <img src="/assets/star.svg" alt="" />
                    <b>4.5</b>
                  </span>
                </div>
                <p className="cu">South Indian · (312)</p>
                <p className="pr">From ₹99/meal</p>
                <div className="pc-btns">
                  <span className="ord">Order now</span>
                  <span className="sub">Subscribe</span>
                </div>
              </div>
            </article>

            <article className="pc" style={{ height: "317px" }}>
              <div className="pc-img" style={{ backgroundImage: "url('/assets/card-bg.png'), linear-gradient(150.21deg, #f1d9a8 0%, #d8a15c 100%)" }}>
                <span className="vb nonveg">
                  <i style={{ WebkitMaskImage: "url('/assets/nonveg-mask.svg')", maskImage: "url('/assets/nonveg-mask.svg')" }}></i>
                </span>
                <div className="dots"><i className="on"></i><i></i><i></i></div>
              </div>
              <div className="pc-b">
                <div className="pc-r1">
                  <h4>Punjab Rasoi</h4>
                  <span className="rate jk">
                    <img src="/assets/star.svg" alt="" />
                    <b>4.3</b>
                  </span>
                </div>
                <p className="cu">North Indian · (208)</p>
                <p className="pr">From ₹129/meal</p>
                <div className="pc-btns">
                  <span className="ord">Order now</span>
                  <span className="sub">Subscribe</span>
                </div>
              </div>
            </article>

            <article className="pc closed" style={{ height: "317px" }}>
              <div className="pc-img" style={{ backgroundImage: "url('/assets/card-bg.png'), linear-gradient(150.21deg, #f1d9a8 0%, #d8a15c 100%)" }}>
                <span className="vb nonveg">
                  <i style={{ WebkitMaskImage: "url('/assets/nonveg-mask.svg')", maskImage: "url('/assets/nonveg-mask.svg')" }}></i>
                </span>
                <div className="closed-ov">Closed · opens 6:00 PM</div>
                <div className="dots"><i className="on"></i><i></i><i></i></div>
              </div>
              <div className="pc-b">
                <div className="pc-r1">
                  <h4>Dragon Wok Express</h4>
                  <span className="rate">
                    <img src="/assets/star.svg" alt="" />
                    <b>4.1</b>
                  </span>
                </div>
                <p className="cu">Chinese · (96)</p>
                <p className="pr">From ₹149/meal</p>
                <div className="pc-btns">
                  <span className="ord">Order now</span>
                  <span className="sub">Subscribe</span>
                </div>
              </div>
            </article>

            <article className="pc" style={{ height: "317px" }}>
              <div className="pc-img" style={{ backgroundImage: "url('/assets/card-bg.png'), linear-gradient(150.21deg, #f1d9a8 0%, #d8a15c 100%)" }}>
                <span className="vb veg"><i></i></span>
                <span className="tag">Top rated</span>
                <div className="dots"><i className="on"></i><i></i><i></i></div>
              </div>
              <div className="pc-b">
                <div className="pc-r1">
                  <h4>Ghar Ka Swaad</h4>
                  <span className="rate">
                    <img src="/assets/star.svg" alt="" />
                    <b>4.6</b>
                  </span>
                </div>
                <p className="cu">North Indian · (450)</p>
                <p className="pr">From ₹105/meal</p>
                <div className="pc-btns">
                  <span className="ord">Order now</span>
                  <span className="sub">Subscribe</span>
                </div>
              </div>
            </article>

            <article className="pc" style={{ height: "334px" }}>
              <div className="pc-img tint" style={{ backgroundImage: "url('/assets/card-bg.png'), linear-gradient(150.21deg, #f1d9a8 0%, #d8a15c 100%)" }}>
                <span className="vb veg"><i></i></span>
                <div className="dots"><i className="on"></i><i></i><i></i></div>
              </div>
              <div className="pc-b">
                <div className="pc-r1">
                  <h4>Annapurna Cloud<br />Kitchen</h4>
                  <span className="rate">
                    <img src="/assets/star2.svg" alt="" />
                    <b>4.2</b>
                  </span>
                </div>
                <p className="cu">Multi-cuisine · (167)</p>
                <p className="pr">From ₹114/meal</p>
                <div className="pc-btns">
                  <span className="ord">Order now</span>
                  <span className="sub">Subscribe</span>
                </div>
              </div>
            </article>

            <article className="pc" style={{ height: "334px" }}>
              <div className="pc-img tint" style={{ backgroundImage: "url('/assets/card-bg.png'), linear-gradient(150.21deg, #f1d9a8 0%, #d8a15c 100%)" }}>
                <span className="vb nonveg">
                  <i style={{ WebkitMaskImage: "url('/assets/nonveg-mask.svg')", maskImage: "url('/assets/nonveg-mask.svg')" }}></i>
                </span>
                <div className="dots"><i className="on"></i><i></i><i></i></div>
              </div>
              <div className="pc-b">
                <div className="pc-r1">
                  <h4>Bong Bhoj</h4>
                  <span className="rate">
                    <img src="/assets/star2.svg" alt="" />
                    <b>4.4</b>
                  </span>
                </div>
                <p className="cu">Bengali · (140)</p>
                <p className="pr low">From ₹135/meal</p>
                <div className="pc-btns">
                  <span className="ord">Order now</span>
                  <span className="sub">Subscribe</span>
                </div>
              </div>
            </article>

            <article className="pc" style={{ height: "334px" }}>
              <div className="pc-img tint" style={{ backgroundImage: "url('/assets/card-bg.png'), linear-gradient(150.21deg, #f1d9a8 0%, #d8a15c 100%)" }}>
                <span className="vb veg"><i></i></span>
                <span className="tag">New</span>
                <div className="dots"><i className="on"></i><i></i><i></i></div>
              </div>
              <div className="pc-b">
                <div className="pc-r1">
                  <h4>Gujarat Rasoi</h4>
                  <span className="rate">
                    <img src="/assets/star2.svg" alt="" />
                    <b>4.7</b>
                  </span>
                </div>
                <p className="cu">Gujarati · (58)</p>
                <p className="pr low">From ₹110/meal</p>
                <div className="pc-btns">
                  <span className="ord">Order now</span>
                  <span className="sub">Subscribe</span>
                </div>
              </div>
            </article>

            <article className="pc" style={{ height: "334px" }}>
              <div className="pc-img tint" style={{ backgroundImage: "url('/assets/card-bg.png'), linear-gradient(150.21deg, #f1d9a8 0%, #d8a15c 100%)" }}>
                <span className="vb veg"><i></i></span>
                <div className="dots"><i className="on"></i><i></i><i></i></div>
              </div>
              <div className="pc-b">
                <div className="pc-r1">
                  <h4>Continental Bites</h4>
                  <span className="rate">
                    <img src="/assets/star2.svg" alt="" />
                    <b>4.1</b>
                  </span>
                </div>
                <p className="cu">Continental · (74)</p>
                <p className="pr low">From ₹159/meal</p>
                <div className="pc-btns">
                  <span className="ord">Order now</span>
                  <span className="sub">Subscribe</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Deals */}
        <section className="deals">
          <div className="d-h">
            <div className="d-hb">
              <p className="d-t">Biggest Deals on Meals</p>
              <p className="d-s">Daily tiffin on autopilot, picked from kitchens you've ordered from</p>
            </div>
            <a className="d-a">See all →</a>
          </div>
          <div className="d-row">
            {[0, 338, 676, 1014, 1352].map((leftPos, idx) => (
              <div className="ticket" style={{ left: `${leftPos}px` }} key={idx}>
                {notchsLeft.map((top, i) => (
                  <img key={`nl-${i}`} className="nt" style={{ left: "-5px", top: `${top}px` }} src="/assets/notch-s.svg" alt="" />
                ))}
                {notchsLeft.map((top, i) => (
                  <img key={`nr-${i}`} className="nt" style={{ left: "315px", top: `${top}px` }} src="/assets/notch-s.svg" alt="" />
                ))}
                <img className="nt big" style={{ left: "64px", top: "-10px" }} src="/assets/notch-l.svg" alt="" />
                <img className="nt big" style={{ left: "64px", top: "170px" }} src="/assets/notch-l.svg" alt="" />
                <div className="stub">
                  <div className="cap-ic">
                    <img src="/assets/deal-icon.png" alt="" />
                  </div>
                </div>
                <div className="tline">
                  <img src="/assets/deal-line.png" alt="" />
                </div>
                <div className="tmain">
                  <div className="tin">
                    <div className="tstack">
                      <p className="tk">Ananya's Kitchen</p>
                      <div className="deco">
                        <img src="/assets/deco-line.svg" alt="" />
                        <img className="dd" src="/assets/deco-dot.svg" alt="" />
                        <img src="/assets/deco-line.svg" alt="" />
                      </div>
                      <p className="tv">Upto 50% OFF</p>
                      <div className="chips">
                        <span className="chip">
                          <img src="/assets/wallet.svg" alt="" />
                          <b>Best value</b>
                        </span>
                        <span className="chip">
                          <img src="/assets/heart-sm.svg" alt="" />
                          <b>Fan favorite</b>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cuisines */}
        <section className="cuis">
          <h2>Shop by cuisine</h2>
          <div className="cu-row">
            <div className="cu-i">
              <div className="cu-c">
                <img className="ct" src="/assets/cuisine-1.png" alt="" />
              </div>
              <span>South Indian</span>
            </div>
            <div className="cu-i">
              <div className="cu-c">
                <img src="/assets/cuisine-2.png" alt="" />
              </div>
              <span>North Indian</span>
            </div>
            <div className="cu-i">
              <div className="cu-c">
                <img src="/assets/cuisine-3.png" alt="" />
              </div>
              <span className="big">Chinese</span>
            </div>
            <div className="cu-i">
              <div className="cu-c">
                <img src="/assets/cuisine-4.png" alt="" />
              </div>
              <span>Gujarati</span>
            </div>
            <div className="cu-i">
              <div className="cu-c">
                <img src="/assets/cuisine-5.png" alt="" />
              </div>
              <span>Continental</span>
            </div>
            <div className="cu-i">
              <div className="cu-c">
                <img src="/assets/cuisine-6.png" alt="" />
              </div>
              <span>Bengali</span>
            </div>
          </div>
        </section>

        {/* Restaurants (Figma node 1670:51) */}
        <section className="rest">
          <div className="rc" style={{ left: "0px" }}>
            <div className="rb">
              <div className="rl1">
                <div className="rimg"><img className="img1" src="/assets/rest-1.png" alt="" /></div>
                <div className="rdeal"><img src="/assets/walkin.png" alt="" /><span>Flat <b>20% OFF</b></span></div>
              </div>
              <div className="rl2">
                <div className="rh4">Hello Kitchen</div>
                <div className="rrate"><span>4.4</span><img src="/assets/rating-arrow.svg" alt="" /></div>
                <div className="rcu">South&nbsp; Indian</div>
                <div className="rpr">₹100 for two</div>
                <div className="rloc">Sector 62, Noida</div>
                <div className="rkm">2.7 km</div>
              </div>
            </div>
          </div>

          <div className="rc" style={{ left: "368px" }}>
            <div className="rb">
              <div className="rl1">
                <div className="rimg"><img className="img2" src="/assets/rest-2.png" alt="" /></div>
                <div className="rdeal"><img src="/assets/walkin.png" alt="" /><span>Flat <b>15% OFF</b></span></div>
                <div className="promo"><span>Promoted</span></div>
              </div>
              <div className="rl2">
                <div className="rh4 hv">Mood Light Cafe &amp; Restaurant</div>
                <div className="rrate"><span>3.6</span><img src="/assets/rating-arrow.svg" alt="" /></div>
                <div className="rcu">South&nbsp; Indian</div>
                <div className="rpr">₹100 for two</div>
                <div className="rloc">Sector 62, Noida</div>
                <div className="rkm">2.7 km</div>
              </div>
            </div>
          </div>

          <div className="rc" style={{ left: "736px" }}>
            <div className="rb">
              <div className="rl1">
                <div className="rimg"><img className="img2" src="/assets/rest-2.png" alt="" /></div>
                <div className="rdeal"><img src="/assets/walkin.png" alt="" /><span>Flat <b>15% OFF</b></span></div>
                <div className="promo"><span>Promoted</span></div>
              </div>
              <div className="rl2">
                <div className="rh4 hv">Mood Light Cafe &amp; Restaurant</div>
                <div className="rrate"><span>3.6</span><img src="/assets/rating-arrow.svg" alt="" /></div>
                <div className="rcu">South&nbsp; Indian</div>
                <div className="rpr">₹100 for two</div>
                <div className="rloc">Sector 62, Noida</div>
                <div className="rkm">2.7 km</div>
              </div>
            </div>
          </div>

          <div className="rc" style={{ left: "1104px" }}>
            <div className="rb tall">
              <div className="rl1">
                <div className="rimg"><img className="img4" src="/assets/rest-4.png" alt="" /></div>
                <div className="rdeal"><img src="/assets/walkin.png" alt="" /><span>Flat <b>10% OFF</b></span></div>
                <div className="promo"><span>Promoted</span></div>
              </div>
              <div className="rl2">
                <div className="rh4 hv">The Grindhouse By Cafe 13</div>
                <div className="rrate"><span>4.2</span><img src="/assets/rating-arrow.svg" alt="" /></div>
                <div className="rcu">South&nbsp; Indian</div>
                <div className="rpr">₹100 for two</div>
                <div className="rloc">Sector 62, Noida</div>
                <div className="ropen">Opens in 18 minutes</div>
                <div className="rkm k2">2.1 km</div>
              </div>
            </div>
          </div>

          <div className="rc" style={{ left: "1472px" }}>
            <div className="rb tall">
              <div className="rl1">
                <div className="rimg"><img className="img4" src="/assets/rest-4.png" alt="" /></div>
                <div className="rdeal"><img src="/assets/walkin.png" alt="" /><span>Flat <b>10% OFF</b></span></div>
                <div className="promo"><span>Promoted</span></div>
              </div>
              <div className="rl2">
                <div className="rh4 hv">The Grindhouse By Cafe 13</div>
                <div className="rrate"><span>4.2</span><img src="/assets/rating-arrow.svg" alt="" /></div>
                <div className="rcu">South&nbsp; Indian</div>
                <div className="rpr">₹100 for two</div>
                <div className="rloc">Sector 62, Noida</div>
                <div className="ropen">Opens in 18 minutes</div>
                <div className="rkm k2">2.1 km</div>
              </div>
            </div>
          </div>

          <div className="rc" style={{ left: "1840px" }}>
            <div className="rb tall">
              <div className="rl1">
                <div className="rimg"><img className="img4" src="/assets/rest-4.png" alt="" /></div>
                <div className="rdeal"><img src="/assets/walkin.png" alt="" /><span>Flat <b>10% OFF</b></span></div>
                <div className="promo"><span>Promoted</span></div>
              </div>
              <div className="rl2">
                <div className="rh4 hv">The Grindhouse By Cafe 13</div>
                <div className="rrate"><span>4.2</span><img src="/assets/rating-arrow.svg" alt="" /></div>
                <div className="rcu">South&nbsp; Indian</div>
                <div className="rpr">₹100 for two</div>
                <div className="rloc">Sector 62, Noida</div>
                <div className="ropen">Opens in 18 minutes</div>
                <div className="rkm k2">2.1 km</div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscriptions */}
        <section className="subs">
          <div className="s-hd">
            <div className="s-hl">
              <h2>Subscription plans for you</h2>
              <p>Daily tiffin on autopilot, picked from kitchens you've ordered from</p>
            </div>
            <a className="s-a">See all →</a>
          </div>
          <div className="s-row">
            <div className="sc">
              <div className="sc-img">
                <img className="bgi" src="/assets/sub-img.png" alt="" />
                <span className="pl" style={{ top: "11px", width: "90px" }}>Top Rated</span>
                <span className="pl" style={{ top: "44px", width: "62px" }}>Lunch</span>
                <img className="fv" src="/assets/fav-a.svg" alt="" />
              </div>
              <div className="sc-c">
                <div className="sc-info">
                  <div className="sc-r1">
                    <span className="sc-t">Veg Lunch Plan (30 Days)</span>
                    <span className="sc-rt"><img src="/assets/star-sm.svg" alt="" /><b>4.2</b></span>
                  </div>
                  <span className="sc-k">Perfect Kitchen</span>
                  <div className="sc-d">
                    <span className="sc-dt"><span className="m">Special Thali  (</span><span className="rg">Dali ,Sabji &amp; 4 Roti )</span></span>
                    <span className="sv"><i></i></span>
                  </div>
                  <div className="sc-p"><b>₹89</b><em>/day</em><s>₹109</s></div>
                </div>
                <div className="sc-btn">Subscribe</div>
              </div>
            </div>

            <div className="sc">
              <div className="sc-img">
                <img className="bgi" src="/assets/sub-img.png" alt="" />
                <span className="pl" style={{ top: "11px", width: "90px" }}>Top Rated</span>
                <span className="pl" style={{ top: "44px", width: "62px" }}>Lunch</span>
                <img className="fv" src="/assets/fav-a.svg" alt="" />
              </div>
              <div className="sc-c">
                <div className="sc-info">
                  <div className="sc-r1">
                    <span className="sc-t">Non - Veg Lunch Plan (30 Days)</span>
                    <span className="sc-rt"><img src="/assets/star-sm.svg" alt="" /><b>4.2</b></span>
                  </div>
                  <span className="sc-k">Perfect Kitchen</span>
                  <div className="sc-d">
                    <span className="sc-dt"><span className="m">Special Thali  (</span><span className="rg">Dali ,Sabji &amp; 4 Roti )</span></span>
                    <span className="sn"><i></i></span>
                  </div>
                  <div className="sc-p"><b>₹89</b><em>/day</em><s>₹109</s></div>
                </div>
                <div className="sc-btn">Subscribe</div>
              </div>
            </div>

            <div className="sc">
              <div className="sc-img">
                <img className="bgi" src="/assets/sub-img.png" alt="" />
                <span className="pl" style={{ top: "11px", width: "90px" }}>Top Rated</span>
                <span className="pl" style={{ top: "44px", width: "62px" }}>Lunch</span>
                <img className="fv" src="/assets/fav-a.svg" alt="" />
              </div>
              <div className="sc-c">
                <div className="sc-info">
                  <div className="sc-r1">
                    <span className="sc-t">Veg Lunch Plan (30 Days)</span>
                    <span className="sc-rt"><img src="/assets/star-sm.svg" alt="" /><b>4.2</b></span>
                  </div>
                  <span className="sc-k">Perfect Kitchen</span>
                  <div className="sc-d">
                    <span className="sc-dt"><span className="m">Special Thali  (</span><span className="rg">Dali ,Sabji &amp; 4 Roti )</span></span>
                    <span className="sv"><i></i></span>
                  </div>
                  <div className="sc-p"><b>₹89</b><em>/day</em><s>₹109</s></div>
                </div>
                <div className="sc-btn">Subscribe</div>
              </div>
            </div>

            <div className="sc">
              <div className="sc-img">
                <img className="bgi" src="/assets/sub-img.png" alt="" />
                <span className="pl" style={{ top: "11px", width: "90px" }}>Top Rated</span>
                <span className="pl" style={{ top: "44px", width: "62px" }}>Lunch</span>
                <img className="fv" src="/assets/fav-a.svg" alt="" />
              </div>
              <div className="sc-c">
                <div className="sc-info">
                  <div className="sc-r1">
                    <span className="sc-t">Non - Veg Lunch Plan (30 Days)</span>
                    <span className="sc-rt"><img src="/assets/star-sm.svg" alt="" /><b>4.2</b></span>
                  </div>
                  <span className="sc-k">Perfect Kitchen</span>
                  <div className="sc-d">
                    <span className="sc-dt"><span className="m">Special Thali  (</span><span className="rg">Dali ,Sabji &amp; 4 Roti )</span></span>
                    <span className="sn"><i></i></span>
                  </div>
                  <div className="sc-p"><b>₹89</b><em>/day</em><s>₹109</s></div>
                </div>
                <div className="sc-btn">Subscribe</div>
              </div>
            </div>

            <div className="sc">
              <div className="sc-img">
                <img className="bgi" src="/assets/sub-img.png" alt="" />
                <span className="pl" style={{ top: "11px", width: "90px" }}>Top Rated</span>
                <span className="pl" style={{ top: "44px", width: "62px" }}>Lunch</span>
                <img className="fv" src="/assets/fav-a.svg" alt="" />
              </div>
              <div className="sc-c">
                <div className="sc-info">
                  <div className="sc-r1">
                    <span className="sc-t">Veg Lunch Plan (30 Days)</span>
                    <span className="sc-rt"><img src="/assets/star-sm.svg" alt="" /><b>4.2</b></span>
                  </div>
                  <span className="sc-k">Perfect Kitchen</span>
                  <div className="sc-d">
                    <span className="sc-dt"><span className="m">Special Thali  (</span><span className="rg">Dali ,Sabji &amp; 4 Roti )</span></span>
                    <span className="sv"><i></i></span>
                  </div>
                  <div className="sc-p"><b>₹89</b><em>/day</em><s>₹109</s></div>
                </div>
                <div className="sc-btn">Subscribe</div>
              </div>
            </div>

            <div className="mcard" style={{ background: "#5a3a2a", zIndex: 1 }}>
              <div className="mimg">
                <img src="/assets/meal-dinner.png" alt="" />
                <i className="ov15"></i>
                <img className="mf" src="/assets/meal-fav-b.svg" alt="" />
              </div>
              <div className="mbody">
                <div className="mr1">
                  <p className="mn">Butter Chicken + Rice</p>
                  <div className="mrt">
                    <b>★</b>
                    <span style={{ color: "#4a4848" }}>8.7</span>
                  </div>
                </div>
                <p className="mk">Meena's Tiffin</p>
                <div className="mpr">
                  <p style={{ color: "#2e0c09" }}>₹120</p>
                  <span className="add" style={{ background: "#2e0c09" }}>
                    <img src="/assets/add-plus.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mcard" style={{ background: "#5a3a2a", zIndex: 1 }}>
              <div className="mimg">
                <img src="/assets/meal-dinner.png" alt="" />
                <i className="ov15"></i>
              </div>
              <div className="mbody">
                <div className="mr1">
                  <p className="mn">Butter Chicken + Rice</p>
                  <div className="mrt">
                    <b>★</b>
                    <span style={{ color: "#4a4848" }}>8.7</span>
                  </div>
                </div>
                <p className="mk">Meena's Tiffin</p>
                <div className="mpr">
                  <p style={{ color: "#591a11" }}>₹120</p>
                  <span className="add" style={{ background: "#2e0c09" }}>
                    <img src="/assets/add-plus.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mcard" style={{ background: "#4a3a1a", zIndex: 1 }}>
              <div className="mimg">
                <img src="/assets/meal-card-4.png" alt="" />
              </div>
              <div className="mbody">
                <div className="mr1">
                  <p className="mn">Thali Special</p>
                  <div className="mrt">
                    <b>★</b>
                    <span style={{ color: "#fff" }}>8.7</span>
                  </div>
                </div>
                <p className="mk">Meena's Tiffin</p>
                <div className="mpr">
                  <p style={{ color: "#591a11" }}>₹85</p>
                  <span className="add" style={{ background: "rgba(255, 255, 255, 0.18)" }}>
                    <img src="/assets/add-plus.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by meal */}
        <section className="meal">
          <h2>Browse by meal</h2>
          <div className="m-btns">
            <div className="mbtn">
              <img src="/assets/meal-lunch.png" alt="" />
              <div>
                <b>Lunch</b>
                <span>Closes 12:45 PM</span>
              </div>
            </div>
            <div className="mbtn">
              <img src="/assets/meal-dinner.png" alt="" />
              <div>
                <b>Dinner</b>
                <span>Opens 6:00 PM</span>
              </div>
            </div>
          </div>
          <div className="m-row">
            <div className="mcard" style={{ background: "#2e0c09", zIndex: 5 }}>
              <div className="mimg">
                <img src="/assets/meal-card-1.png" alt="" />
              </div>
              <div className="mbody">
                <div className="mr1">
                  <p className="mn">Aloo Parantha + Dahi</p>
                  <div className="mrt">
                    <b>★</b>
                    <span style={{ color: "#4a4848" }}>8.7</span>
                  </div>
                </div>
                <p className="mk">Meena's Tiffin</p>
                <div className="mpr">
                  <p style={{ color: "#591a11" }}>₹35</p>
                  <span className="add" style={{ background: "#2e0c09" }}>
                    <img src="/assets/add-plus.svg" alt="" />
                  </span>
                </div>
              </div>
              <img className="mf" src="/assets/meal-fav-a.svg" alt="" />
            </div>

            <div className="mcard" style={{ background: "#3b5a3a", zIndex: 4 }}>
              <div className="mimg">
                <img src="/assets/meal-lunch.png" alt="" />
                <i className="ov15"></i>
              </div>
              <div className="mbody">
                <div className="mr1">
                  <p className="mn">Dal Makhani + Naan</p>
                  <div className="mrt">
                    <b>★</b>
                    <span style={{ color: "#4a4848" }}>8.7</span>
                  </div>
                </div>
                <p className="mk">Meena's Tiffin</p>
                <div className="mpr">
                  <p style={{ color: "#591a11" }}>₹65</p>
                  <span className="add" style={{ background: "#2e0c09" }}>
                    <img src="/assets/add-plus.svg" alt="" />
                  </span>
                </div>
              </div>
              <img className="mf" src="/assets/meal-fav-a.svg" alt="" />
            </div>

            <div className="mcard" style={{ background: "#5a3a2a", zIndex: 3 }}>
              <div className="mimg">
                <img src="/assets/meal-dinner.png" alt="" />
                <i className="ov15"></i>
                <img className="mf" src="/assets/meal-fav-b.svg" alt="" />
              </div>
              <div className="mbody">
                <div className="mr1">
                  <p className="mn">Butter Chicken + Rice</p>
                  <div className="mrt">
                    <b>★</b>
                    <span style={{ color: "#4a4848" }}>8.7</span>
                  </div>
                </div>
                <p className="mk">Meena's Tiffin</p>
                <div className="mpr">
                  <p style={{ color: "#2e0c09" }}>₹120</p>
                  <span className="add" style={{ background: "#2e0c09" }}>
                    <img src="/assets/add-plus.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mcard" style={{ background: "#5a3a2a", zIndex: 2 }}>
              <div className="mimg">
                <img src="/assets/meal-dinner.png" alt="" />
                <i className="ov15"></i>
              </div>
              <div className="mbody">
                <div className="mr1">
                  <p className="mn">Butter Chicken + Rice</p>
                  <div className="mrt">
                    <b>★</b>
                    <span style={{ color: "#4a4848" }}>8.7</span>
                  </div>
                </div>
                <p className="mk">Meena's Tiffin</p>
                <div className="mpr">
                  <p style={{ color: "#591a11" }}>₹120</p>
                  <span className="add" style={{ background: "#2e0c09" }}>
                    <img src="/assets/add-plus.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mcard" style={{ background: "#4a3a1a", zIndex: 1 }}>
              <div className="mimg">
                <img src="/assets/meal-card-4.png" alt="" />
              </div>
              <div className="mbody">
                <div className="mr1">
                  <p className="mn">Thali Special</p>
                  <div className="mrt">
                    <b>★</b>
                    <span style={{ color: "#fff" }}>8.7</span>
                  </div>
                </div>
                <p className="mk">Meena's Tiffin</p>
                <div className="mpr">
                  <p style={{ color: "#591a11" }}>₹85</p>
                  <span className="add" style={{ background: "rgba(255, 255, 255, 0.18)" }}>
                    <img src="/assets/add-plus.svg" alt="" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular picks (Figma node 1670:51) */}
        <section className="picks">
          <div className="s-hd">
            <div className="s-hl">
              <h2>Your Popular Picks</h2>
              <p>Daily tiffin on autopilot, picked from kitchens you've ordered from</p>
            </div>
            <a className="s-a">See all →</a>
          </div>
          <div className="pk-row">
            <div className="pk">
              <div className="pk-i">
                <img src="/assets/meal-card-1.png" alt="" />
                <i></i>
                <span className="pk-r"><b>★</b><u>4.6</u></span>
              </div>
              <div className="pk-c">
                <span className="pk-cu">South Indian</span>
                <span className="pk-k">Ananya's Kitchen</span>
                <span className="pk-d">Regular Thali</span>
                <div className="pk-p"><b>₹89</b></div>
                <div className="pk-b">Reorder</div>
              </div>
            </div>

            <div className="pk">
              <div className="pk-i">
                <img src="/assets/meal-card-1.png" alt="" />
                <i></i>
                <span className="pk-r"><b>★</b><u>4.6</u></span>
              </div>
              <div className="pk-c">
                <span className="pk-cu">North Indian</span>
                <span className="pk-k">Meena's Tiffin</span>
                <span className="pk-d">Dahi BHalla</span>
                <div className="pk-p"><b>₹99</b></div>
                <div className="pk-b">Reorder</div>
              </div>
            </div>

            <div className="pk">
              <div className="pk-i">
                <img src="/assets/meal-card-1.png" alt="" />
                <i></i>
                <span className="pk-r"><b>★</b><u>4.6</u></span>
              </div>
              <div className="pk-c">
                <span className="pk-cu">North Indian</span>
                <span className="pk-k">Meena's Tiffin</span>
                <span className="pk-d">Dahi BHalla</span>
                <div className="pk-p"><b>₹99</b></div>
                <div className="pk-b">Reorder</div>
              </div>
            </div>

            <div className="pk short">
              <div className="pk-i">
                <img src="/assets/meal-card-1.png" alt="" />
                <i></i>
                <span className="pk-r"><b>★</b><u>4.6</u></span>
              </div>
              <div className="pk-c">
                <span className="pk-cu">South Indian</span>
                <span className="pk-k">Ananya's Kitchen</span>
                <span className="pk-d">Rajma Chawal</span>
                <div className="pk-p"><b>₹89</b><em>/day</em></div>
                <div className="pk-b">Reorder</div>
              </div>
            </div>

            <div className="pk short">
              <div className="pk-i">
                <img src="/assets/meal-card-1.png" alt="" />
                <i></i>
                <span className="pk-r"><b>★</b><u>4.6</u></span>
              </div>
              <div className="pk-c">
                <span className="pk-cu">South Indian</span>
                <span className="pk-k">Ananya's Kitchen</span>
                <span className="pk-d">Rajma Chawal</span>
                <div className="pk-p"><b>₹89</b><em>/day</em></div>
                <div className="pk-b">Reorder</div>
              </div>
            </div>

            <div className="pk">
              <div className="pk-i">
                <img src="/assets/meal-card-1.png" alt="" />
                <i></i>
                <span className="pk-r"><b>★</b><u>4.6</u></span>
              </div>
              <div className="pk-c">
                <span className="pk-cu">North Indian</span>
                <span className="pk-k">Meena's Tiffin</span>
                <span className="pk-d">Deluxe Thali</span>
                <div className="pk-p"><b>₹99</b></div>
                <div className="pk-b">Reorder</div>
              </div>
            </div>

            <div className="pk">
              <div className="pk-i">
                <img src="/assets/meal-card-1.png" alt="" />
                <i></i>
                <span className="pk-r"><b>★</b><u>4.6</u></span>
              </div>
              <div className="pk-c">
                <span className="pk-cu">North Indian</span>
                <span className="pk-k">Meena's Tiffin</span>
                <span className="pk-d">Deluxe Thali</span>
                <div className="pk-p"><b>₹99</b></div>
                <div className="pk-b">Reorder</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="ftr">
          <div className="f-top">
            <div className="fcol f1">
              <img src="/assets/footer-logo.png" alt="Tiffexx" />
              <p>Fresh, home-style tiffins delivered<br />daily — order once or subscribe<br />and let mealtime run on autopilot.</p>
            </div>
            <div className="fcol">
              <h6>Company</h6>
              <ul>
                <li className="w">About us</li>
                <li className="w">Blog</li>
                <li className="w">Careers</li>
                <li className="w">Press</li>
              </ul>
            </div>
            <div className="fcol">
              <h6>For kitchens</h6>
              <ul>
                <li className="p">Partner with us</li>
                <li className="p">Kitchen dashboard</li>
                <li className="p">Partner terms</li>
              </ul>
            </div>
            <div className="fcol">
              <h6>Support</h6>
              <ul>
                <li className="p">FAQ</li>
                <li className="w">Contact us</li>
                <li className="w">Privacy policy</li>
                <li className="w">Terms</li>
              </ul>
            </div>
          </div>
          <div className="f-bot">
            <span>© 2026 Tiffexx Technologies Pvt. Ltd. All rights reserved.</span>
            <span>Bengaluru · Mumbai · Pune · Hyderabad</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
