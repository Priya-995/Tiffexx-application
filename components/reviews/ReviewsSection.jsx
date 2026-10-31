"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import ProfileLayout from "@/components/profile/ProfileLayout";
import s from "./ReviewsSection.module.css";

const INITIAL_PENDING = [
  {
    id: "p1",
    name: "Paneer Thali",
    kitchen: "Amma’s Kitchen",
    date: "Delivered 28 Oct 2026",
    orderId: "TX-10501",
    rating: 5,
    text: "",
  },
  {
    id: "p2",
    name: "Kadhi Chawal Box",
    kitchen: "Shree Rasoi",
    date: "Delivered 26 Oct 2026",
    orderId: "TX-10463",
    rating: 4,
    text: "",
  },
];

const INITIAL_SUBMITTED = [
  {
    id: "r1",
    name: "Home-style Veg Thali",
    kitchen: "Amma’s Kitchen",
    date: "Reviewed 26 Oct 2026",
    rating: 5,
    quote:
      "The phulkas were piping hot and soft! The dal tadka tasted just like home. Perfect lunch combo for weekdays.",
  },
  {
    id: "r2",
    name: "Dal Tadka Combo",
    kitchen: "Mom’s Flavour",
    date: "Reviewed 20 Oct 2026",
    rating: 4,
    quote:
      "Good portion size and less oily, which I appreciate. Jeera rice was fragrant. Arrived 5 minutes ahead of schedule.",
  },
  {
    id: "r3",
    name: "Rajma Chawal Box",
    kitchen: "Punjabi Rasoi",
    date: "Reviewed 12 Oct 2026",
    rating: 3,
    quote:
      "Rajma was well cooked, but the spice level was slightly higher than expected. Packaging was neat and spill-proof.",
  },
];

export default function ReviewsSection() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [pendingReviews, setPendingReviews] = useState(INITIAL_PENDING);
  const [submittedReviews, setSubmittedReviews] = useState(INITIAL_SUBMITTED);
  const [toastMessage, setToastMessage] = useState("");

  // Editing state for submitted review
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const displayName = user?.name || "Ananya Rao";
  const displayPhone = user?.phone || "+91 98XXX XXX10";

  const getInitials = (name) => {
    if (!name) return "AR";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Banner stats
  const totalReviewsCount = submittedReviews.length;
  const toReviewCount = pendingReviews.length;
  const avgRating =
    totalReviewsCount > 0
      ? (
          submittedReviews.reduce((acc, curr) => acc + curr.rating, 0) /
          totalReviewsCount
        ).toFixed(1)
      : "0.0";

  // Pending rating change
  const handlePendingRatingChange = (id, newRating) => {
    setPendingReviews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating: newRating } : item))
    );
  };

  // Pending text change
  const handlePendingTextChange = (id, newText) => {
    setPendingReviews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  };

  // Submit pending review
  const handleSubmitPending = (e, item) => {
    e.preventDefault();
    const newSubmitted = {
      id: `r-${Date.now()}`,
      name: item.name,
      kitchen: item.kitchen,
      date: `Reviewed Just now`,
      rating: item.rating || 5,
      quote:
        item.text.trim() ||
        "Delicious homemade meal! Fresh ingredients and authentic spices. Highly recommended.",
    };

    setSubmittedReviews((prev) => [newSubmitted, ...prev]);
    setPendingReviews((prev) => prev.filter((p) => p.id !== item.id));
    showToast(`Thank you! Your review for "${item.name}" was submitted.`);
  };

  // Edit existing review
  const startEdit = (review) => {
    setEditingId(review.id);
    setEditText(review.quote);
    setEditRating(review.rating);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (id) => {
    if (!editText.trim()) {
      showToast("Review text cannot be empty.");
      return;
    }
    setSubmittedReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, quote: editText.trim(), rating: editRating } : r
      )
    );
    setEditingId(null);
    showToast("Review updated successfully!");
  };

  // Delete review
  const handleDelete = (id, name) => {
    setSubmittedReviews((prev) => prev.filter((r) => r.id !== id));
    showToast(`Review for "${name}" has been removed.`);
  };

  const handleSignOut = () => {
    if (logout) logout();
    router.push("/signin");
  };

  return (
    <ProfileLayout>
      {/* Main */}
      <div className={s.main}>
        <div className={s.mainInner}>
          <button
            type="button"
            className={s.back}
            onClick={() => router.back()}
            aria-label="Back"
          >
            <img src="/assets/icon-back.svg" alt="" width="24" height="24" />
          </button>

          <h1 className={s.pageTitle}>MY REVIEWS</h1>

          {/* Banner */}
          <section className={s.banner}>
            <div className={s.bannerCopy}>
              <p className={s.bannerEyebrow}>Your feedback helps kitchens</p>
              <h2 className={s.bannerTitle}>Rate your meals</h2>
              <p className={s.bannerSub}>Tell other customers what’s worth ordering.</p>
            </div>
            <div className={s.bannerStats}>
              <div className={s.stat}>
                <p className={s.statValue}>{totalReviewsCount}</p>
                <p className={s.statLabel}>Reviews</p>
              </div>
              <div className={s.stat}>
                <p className={s.statValue}>{avgRating}</p>
                <p className={s.statLabel}>Avg. rating given</p>
              </div>
              <div className={s.stat}>
                <p className={s.statValue}>{toReviewCount}</p>
                <p className={s.statLabel}>To review</p>
              </div>
            </div>
          </section>

          {/* Waiting for review */}
          <section className={s.card}>
            <header className={s.cardHeader}>
              <h2 className={s.cardTitle}>Waiting for Your Review</h2>
            </header>

            {pendingReviews.length === 0 ? (
              <div className={s.emptyState}>
                <p>You’re all caught up! No meals waiting for review.</p>
              </div>
            ) : (
              <div className={s.pendingGrid}>
                {pendingReviews.map((item) => (
                  <article className={s.reviewCard} key={item.id}>
                    <div className={s.item}>
                      <div className={s.itemIcon}>
                        <img
                          src="/assets/icon-meal.svg"
                          alt=""
                          width="32"
                          height="32"
                        />
                      </div>
                      <div className={s.itemText}>
                        <p className={s.itemName}>{item.name}</p>
                        <p className={s.itemMeta}>
                          {item.kitchen} · {item.date} · Order #{item.orderId}
                        </p>
                      </div>
                    </div>

                    <form
                      className={s.reviewForm}
                      onSubmit={(e) => handleSubmitPending(e, item)}
                    >
                      <fieldset className={s.rating}>
                        <legend className={s.fieldLabel}>Your rating</legend>
                        <div className={s.ratingStars}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              className={`${s.starBtn} ${
                                star <= (item.rating || 5) ? s.starActive : ""
                              }`}
                              onClick={() => handlePendingRatingChange(item.id, star)}
                              aria-label={`${star} star`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <label className={s.field}>
                        <span className={s.fieldLabel}>Write your review (optional)</span>
                        <textarea
                          className={s.textarea}
                          rows={3}
                          placeholder="How was the food, portion and delivery?"
                          value={item.text}
                          onChange={(e) => handlePendingTextChange(item.id, e.target.value)}
                        />
                      </label>

                      <div className={s.formActions}>
                        <button className={`${s.btn} ${s.btnPrimary}`} type="submit">
                          Submit Review
                        </button>
                      </div>
                    </form>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Your reviews */}
          <section className={s.card}>
            <header className={`${s.cardHeader} ${s.cardHeaderSplit}`}>
              <h2 className={s.cardTitle}>Your Reviews</h2>
              <Link className={s.linkSmall} href="/orders">
                Go to My Orders ›
              </Link>
            </header>

            {submittedReviews.length === 0 ? (
              <div className={s.emptyState}>
                <p>You haven’t submitted any reviews yet.</p>
              </div>
            ) : (
              <div className={s.reviewList}>
                {submittedReviews.map((rev) => (
                  <article className={s.reviewCard} key={rev.id}>
                    <div className={s.reviewCardTop}>
                      <div className={s.item}>
                        <div className={s.itemIcon}>
                          <img
                            src="/assets/icon-meal.svg"
                            alt=""
                            width="32"
                            height="32"
                          />
                        </div>
                        <div className={s.itemText}>
                          <p className={s.itemName}>{rev.name}</p>
                          <p className={s.itemMeta}>
                            {rev.kitchen} · {rev.date}
                          </p>
                        </div>
                      </div>
                      <p
                        className={s.stars}
                        role="img"
                        aria-label={`${rev.rating} out of 5 stars`}
                      >
                        {"★".repeat(rev.rating)}
                        <span className={s.starsOff}>
                          {"★".repeat(Math.max(0, 5 - rev.rating))}
                        </span>
                      </p>
                    </div>

                    {editingId === rev.id ? (
                      <div className={s.editBox}>
                        <div className={s.ratingStars}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              className={`${s.starBtn} ${
                                star <= editRating ? s.starActive : ""
                              }`}
                              onClick={() => setEditRating(star)}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <textarea
                          className={s.textarea}
                          rows={3}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className={s.editActions}>
                          <button
                            type="button"
                            className={`${s.btnSmall} ${s.btnSmallCancel}`}
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className={`${s.btnSmall} ${s.btnSmallSave}`}
                            onClick={() => saveEdit(rev.id)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <blockquote className={s.quote}>&ldquo;{rev.quote}&rdquo;</blockquote>
                    )}

                    <div className={s.reviewActions}>
                      <button
                        className={s.btnText}
                        type="button"
                        onClick={() => startEdit(rev)}
                      >
                        Edit
                      </button>
                      <button
                        className={`${s.btnText} ${s.btnTextDanger}`}
                        type="button"
                        onClick={() => handleDelete(rev.id, rev.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && <div className={s.toast}>{toastMessage}</div>}
    </ProfileLayout>
  );
}

