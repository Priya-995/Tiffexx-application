"use client";

import { useState } from "react";
import SpinModal from "./SpinModal";
import SpinWheel from "./SpinWheel";
import s from "./PlayZoneRewards.module.css";

export default function PlayZoneRewards() {
  const [toastMsg, setToastMsg] = useState("");
  const [spinModalOpen, setSpinModalOpen] = useState(false);

  const handleTicketClick = (offerTitle) => {
    setToastMsg(`Voucher copied: ${offerTitle}! Applied to your cart.`);
    setTimeout(() => setToastMsg(""), 2800);
  };

  return (
    <main className={s.main}>
      {toastMsg && (
        <div className={s.copiedToast}>
          <span>🎟</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <div className={s.wrap}>
        <div className={s.hd}>
          <div className={s.hdTitleWrap}>
            <h1>Your Rewards</h1>
            <p>Spin, join contests, and win rewards on every order.</p>
          </div>
          <button
            className={s.spinPill}
            onClick={() => setSpinModalOpen(true)}
            type="button"
          >
            <span>🎯</span>
            <span>1 Free Spin Available</span>
          </button>
        </div>

        {/* Spin & Win Promo Card */}
        <div className={s.spinBanner}>
          <span className={s.spinBannerBlob} aria-hidden="true" />
          <span className={s.spinBannerBlobLime} aria-hidden="true" />

          <div className={s.spinBannerLeft}>
            <span className={s.spinBadge}>🎯 DAILY REWARD · 1 FREE SPIN TODAY</span>
            <h2 className={s.spinTitle}>Spin the Wheel &amp; Win Rewards</h2>
            <p className={s.spinDesc}>
              Try your luck today! Win instant wallet cash up to ₹50, free meal vouchers, or 5% off discount coupons. Deposited directly to your wallet.
            </p>
            <button
              className={s.spinBtn}
              type="button"
              onClick={() => setSpinModalOpen(true)}
            >
              <span>🎰</span>
              <span>Spin the Wheel</span>
            </button>
          </div>

          <div
            className={s.spinBannerRight}
            onClick={() => setSpinModalOpen(true)}
            title="Tap to spin the wheel"
          >
            <div className={s.miniWheelStage}>
              <SpinWheel
                isSpinning={false}
                rotation={15}
                onHubClick={() => setSpinModalOpen(true)}
              />
            </div>
            <span className={s.tapHint}>Tap wheel to spin</span>
          </div>
        </div>

        <div className={s.contests}>
          <h2>Active Contests</h2>
          <div className={s.grid}>
            {/* Ticket 1: Dark (first) */}
            <div
              className={`${s.ticket} ${s.ticketDark} ${s.ticketFirst}`}
              onClick={() => handleTicketClick("20% DISCOUNT")}
              role="button"
              tabIndex={0}
              title="Click to copy voucher"
            >
              <i className={`${s.notch} ${s.tl}`}></i>
              <i className={`${s.notch} ${s.bl}`}></i>
              <i className={`${s.notch} ${s.br}`}></i>
              <div className={s.ticketIcon}>
                <img src="/assets/chef-pot.png" alt="Chef pot icon" />
              </div>
              <div className={s.ticketBody}>
                <i className={`${s.notch} ${s.tl}`}></i>
                <i className={`${s.notch} ${s.bl}`}></i>
                <div className={s.tKicker}>DISCOUNT</div>
                <div className={s.tTitle}>Voucher</div>
                <div className={s.tDesc}>
                  <p className={s.small}>
                    Get a flat discount on your next tiffin
                    <br />
                    order from any partner kitchen near you.
                  </p>
                </div>
                <div className={s.tBig}>20%</div>
                <div className={s.tPad}></div>
              </div>
              <div className={s.ticketStrip}>
                <span>VALID FROM 20 MAY – 20 JUNE 2026</span>
              </div>
              <i className={`${s.notch} ${s.tr}`}></i>
            </div>

            {/* Ticket 2: Dark */}
            <div
              className={`${s.ticket} ${s.ticketDark}`}
              onClick={() => handleTicketClick("20% DISCOUNT")}
              role="button"
              tabIndex={0}
              title="Click to copy voucher"
            >
              <i className={`${s.notch} ${s.tl}`}></i>
              <i className={`${s.notch} ${s.bl}`}></i>
              <i className={`${s.notch} ${s.br}`}></i>
              <div className={s.ticketIcon}>
                <img src="/assets/chef-pot.png" alt="Chef pot icon" />
              </div>
              <div className={s.ticketBody}>
                <i className={`${s.notch} ${s.tl}`}></i>
                <i className={`${s.notch} ${s.bl}`}></i>
                <div className={s.tKicker}>DISCOUNT</div>
                <div className={s.tTitle}>Voucher</div>
                <div className={s.tDesc}>
                  <p>
                    Get a flat discount on your next&nbsp; order from any
                    partner kitchen near you.
                  </p>
                </div>
                <div className={s.tBig}>20%</div>
              </div>
              <div className={s.ticketStrip}>
                <span>VALID FROM 20 MAY – 20 JUNE 2026</span>
              </div>
              <i className={`${s.notch} ${s.tr}`}></i>
            </div>

            {/* Ticket 3: Light */}
            <div
              className={`${s.ticket} ${s.ticketLight}`}
              onClick={() => handleTicketClick("FREE MEAL VOUCHER")}
              role="button"
              tabIndex={0}
              title="Click to copy voucher"
            >
              <i className={`${s.notch} ${s.tl}`}></i>
              <i className={`${s.notch} ${s.bl}`}></i>
              <i className={`${s.notch} ${s.br}`}></i>
              <div className={s.ticketStrip}>
                <i className={`${s.notch} ${s.tr}`}></i>
                <i className={`${s.notch} ${s.br}`}></i>
                <span>VALID FROM 20 MAY – 20 JUNE 2026</span>
              </div>
              <div className={s.ticketBody}>
                <div className={s.tKicker}>DISCOUNT</div>
                <div className={s.tTitle}>Voucher</div>
                <div className={s.tDesc}>
                  <p>
                    Redeem free delivery on your next three orders — no minimum
                    order value.
                  </p>
                </div>
                <div className={`${s.tBig} ${s.tBigSans}`}>FREE MEAL</div>
              </div>
              <div className={s.ticketIcon}>
                <img src="/assets/chef-pot.png" alt="Chef pot icon" />
              </div>
              <i className={`${s.notch} ${s.tr}`}></i>
            </div>

            {/* Ticket 4: Light */}
            <div
              className={`${s.ticket} ${s.ticketLight}`}
              onClick={() => handleTicketClick("FREE MEAL VOUCHER")}
              role="button"
              tabIndex={0}
              title="Click to copy voucher"
            >
              <i className={`${s.notch} ${s.tl}`}></i>
              <i className={`${s.notch} ${s.bl}`}></i>
              <i className={`${s.notch} ${s.br}`}></i>
              <div className={s.ticketStrip}>
                <i className={`${s.notch} ${s.tr}`}></i>
                <i className={`${s.notch} ${s.br}`}></i>
                <span>VALID FROM 20 MAY – 20 JUNE 2026</span>
              </div>
              <div className={s.ticketBody}>
                <div className={s.tKicker}>DISCOUNT</div>
                <div className={s.tTitle}>Voucher</div>
                <div className={s.tDesc}>
                  <p>
                    Redeem free delivery on your next three orders — no minimum
                    order value.
                  </p>
                </div>
                <div className={`${s.tBig} ${s.tBigSans}`}>FREE MEAL</div>
              </div>
              <div className={s.ticketIcon}>
                <img src="/assets/chef-pot.png" alt="Chef pot icon" />
              </div>
              <i className={`${s.notch} ${s.tr}`}></i>
            </div>

            {/* Ticket 5: Dark (first) */}
            <div
              className={`${s.ticket} ${s.ticketDark} ${s.ticketFirst}`}
              onClick={() => handleTicketClick("20% DISCOUNT")}
              role="button"
              tabIndex={0}
              title="Click to copy voucher"
            >
              <i className={`${s.notch} ${s.tl}`}></i>
              <i className={`${s.notch} ${s.bl}`}></i>
              <i className={`${s.notch} ${s.br}`}></i>
              <div className={s.ticketIcon}>
                <img src="/assets/chef-pot.png" alt="Chef pot icon" />
              </div>
              <div className={s.ticketBody}>
                <i className={`${s.notch} ${s.tl}`}></i>
                <i className={`${s.notch} ${s.bl}`}></i>
                <div className={s.tKicker}>DISCOUNT</div>
                <div className={s.tTitle}>Voucher</div>
                <div className={s.tDesc}>
                  <p className={s.small}>
                    Get a flat discount on your next tiffin
                    <br />
                    order from any partner kitchen near you.
                  </p>
                </div>
                <div className={s.tBig}>20%</div>
                <div className={s.tPad}></div>
              </div>
              <div className={s.ticketStrip}>
                <span>VALID FROM 20 MAY – 20 JUNE 2026</span>
              </div>
              <i className={`${s.notch} ${s.tr}`}></i>
            </div>

            {/* Ticket 6: Dark */}
            <div
              className={`${s.ticket} ${s.ticketDark}`}
              onClick={() => handleTicketClick("20% DISCOUNT")}
              role="button"
              tabIndex={0}
              title="Click to copy voucher"
            >
              <i className={`${s.notch} ${s.tl}`}></i>
              <i className={`${s.notch} ${s.bl}`}></i>
              <i className={`${s.notch} ${s.br}`}></i>
              <div className={s.ticketIcon}>
                <img src="/assets/chef-pot.png" alt="Chef pot icon" />
              </div>
              <div className={s.ticketBody}>
                <i className={`${s.notch} ${s.tl}`}></i>
                <i className={`${s.notch} ${s.bl}`}></i>
                <div className={s.tKicker}>DISCOUNT</div>
                <div className={s.tTitle}>Voucher</div>
                <div className={s.tDesc}>
                  <p>
                    Get a flat discount on your next order from any partner
                    kitchen near you.
                  </p>
                </div>
                <div className={s.tBig}>20%</div>
              </div>
              <div className={s.ticketStrip}>
                <span>VALID FROM 20 MAY – 20 JUNE 2026</span>
              </div>
              <i className={`${s.notch} ${s.tr}`}></i>
            </div>

            {/* Ticket 7: Light */}
            <div
              className={`${s.ticket} ${s.ticketLight}`}
              onClick={() => handleTicketClick("FREE MEAL VOUCHER")}
              role="button"
              tabIndex={0}
              title="Click to copy voucher"
            >
              <i className={`${s.notch} ${s.tl}`}></i>
              <i className={`${s.notch} ${s.bl}`}></i>
              <i className={`${s.notch} ${s.br}`}></i>
              <div className={s.ticketStrip}>
                <i className={`${s.notch} ${s.tr}`}></i>
                <i className={`${s.notch} ${s.br}`}></i>
                <span>VALID FROM 20 MAY – 20 JUNE 2026</span>
              </div>
              <div className={s.ticketBody}>
                <div className={s.tKicker}>DISCOUNT</div>
                <div className={s.tTitle}>Voucher</div>
                <div className={s.tDesc}>
                  <p>
                    Redeem free delivery on your next three orders — no minimum
                    order value.
                  </p>
                </div>
                <div className={`${s.tBig} ${s.tBigSans}`}>FREE MEAL</div>
              </div>
              <div className={s.ticketIcon}>
                <img src="/assets/chef-pot.png" alt="Chef pot icon" />
              </div>
              <i className={`${s.notch} ${s.tr}`}></i>
            </div>

            {/* Ticket 8: Light */}
            <div
              className={`${s.ticket} ${s.ticketLight}`}
              onClick={() => handleTicketClick("FREE MEAL VOUCHER")}
              role="button"
              tabIndex={0}
              title="Click to copy voucher"
            >
              <i className={`${s.notch} ${s.tl}`}></i>
              <i className={`${s.notch} ${s.bl}`}></i>
              <i className={`${s.notch} ${s.br}`}></i>
              <div className={s.ticketStrip}>
                <i className={`${s.notch} ${s.tr}`}></i>
                <i className={`${s.notch} ${s.br}`}></i>
                <span>VALID FROM 20 MAY – 20 JUNE 2026</span>
              </div>
              <div className={s.ticketBody}>
                <div className={s.tKicker}>DISCOUNT</div>
                <div className={s.tTitle}>Voucher</div>
                <div className={s.tDesc}>
                  <p>
                    Redeem free delivery on your next three orders — no minimum
                    order value.
                  </p>
                </div>
                <div className={`${s.tBig} ${s.tBigSans}`}>FREE MEAL</div>
              </div>
              <div className={s.ticketIcon}>
                <img src="/assets/chef-pot.png" alt="Chef pot icon" />
              </div>
              <i className={`${s.notch} ${s.tr}`}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Figma Spin & Win Modal */}
      <SpinModal
        isOpen={spinModalOpen}
        onClose={() => setSpinModalOpen(false)}
        onRewardClaimed={(prize) => {
          setToastMsg(`Claimed: ${prize.title}!`);
          setTimeout(() => setToastMsg(""), 3200);
        }}
      />
    </main>
  );
}
