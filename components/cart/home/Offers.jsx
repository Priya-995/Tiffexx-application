"use client";

import { useEffect, useState } from "react";

function pad(n) {
  return String(n).padStart(2, "0");
}

function Countdown({ seconds }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => {
      setLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown" aria-live="off">
      <b data-h="">{pad(Math.floor(left / 3600))}</b>
      <small>hour</small> <b data-m="">{pad(Math.floor((left % 3600) / 60))}</b>
      <small>min</small> <b data-s="">{pad(left % 60)}</b>
      <small>sec</small>
    </div>
  );
}

export default function Offers() {
  return (
    <section className="offers" aria-label="Meal windows">
      <article className="offer" data-seconds="2989">
        <div className="offer__meal">
          <div className="offer__meal-head">
            <span className="offer__icon">
              <img src="/assets/icon-lunch.svg" alt="" width="18" height="18" />
            </span>
            <div>
              <h3>Lunch</h3>
              <p>Order by 1:30pm</p>
            </div>
          </div>
          <p className="offer__status">
            <i></i>Opens soon
          </p>
        </div>

        <div className="offer__timer">
          <div className="offer__slots">
            <span>Opens in</span>
            <ul>
              <li>12:30 – 1:00 pm</li>
              <li>1:00 – 1:30 pm</li>
            </ul>
          </div>
          <Countdown seconds={2989} />
          <div className="offer__bar">
            <div className="offer__track"></div>
            <div className="offer__times">
              <span>11am</span>
              <span>1:30pm</span>
            </div>
          </div>
        </div>

        <div className="offer__cta">
          <button type="button">Order Now</button>
          <p>Opens at 11am</p>
        </div>
      </article>

      <article className="offer offer--divided" data-seconds="28189">
        <div className="offer__meal">
          <div className="offer__meal-head">
            <span className="offer__icon">
              <img src="/assets/icon-dinner.svg" alt="" width="18" height="18" />
            </span>
            <div>
              <h3>Dinner</h3>
              <p>Order by 8:30pm</p>
            </div>
          </div>
          <p className="offer__status">
            <i></i>Opens soon
          </p>
        </div>

        <div className="offer__timer">
          <div className="offer__slots">
            <span>Opens in</span>
            <ul>
              <li>7:00 – 7:30 pm</li>
              <li>7:30 – 8:00 pm</li>
            </ul>
          </div>
          <Countdown seconds={28189} />
          <div className="offer__bar">
            <div className="offer__track"></div>
            <div className="offer__times">
              <span>6pm</span>
              <span>8:30pm</span>
            </div>
          </div>
        </div>

        <div className="offer__cta">
          <button type="button" disabled>
            Not open yet
          </button>
          <p>Opens at 6pm</p>
        </div>
      </article>
    </section>
  );
}
