import React, { useEffect, useState } from "react";
import "./App.css";

const NEWS_API = "https://inshortsapi.vercel.app/news?category=technology"; // Free tech news API

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for reviews
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(NEWS_API);
      const data = await res.json();
      setArticles(data.data || []);
    } catch {
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000); // Auto-update every minute
    return () => clearInterval(interval);
  }, []);

  // Handle comment submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setReviews([
      { name: name.trim(), comment: comment.trim(), date: new Date().toLocaleString() },
      ...reviews,
    ]);
    setName("");
    setComment("");
  };

  return (
    <div className="container">
      <header>
        <h1>TECHPLUS</h1>
        <div className="subtitle">Your Source for the Latest Tech News</div>
      </header>
      <main>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : articles.length === 0 ? (
          <div>No news at the moment.</div>
        ) : (
          <div className="news-list">
            {articles.map((article, i) => (
              <a
                key={i}
                className="news-card"
                href={article.readMoreUrl || article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={article.imageUrl} alt={article.title} />
                <div className="news-content">
                  <h2>{article.title}</h2>
                  <p>{article.content}</p>
                  <div className="meta">{article.author} — {article.date}</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
      <footer>
        &copy; {new Date().getFullYear()} TECHPLUS &middot; Auto-Updating Technology Headlines
      </footer>
      <section className="contact-section">
        <h3>Contact</h3>
        <p>
          Phone:&nbsp;
          <a href="tel:0591929279">0591929279</a>
          <br />
          Email:&nbsp;
          <a href="mailto:godfredabakah563@gmail.com">
            godfredabakah563@gmail.com
          </a>
        </p>

        <div className="reviews-area">
          <h4>Comments &amp; Reviews</h4>
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              maxLength={32}
              required
            />
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Leave a comment or review"
              maxLength={240}
              required
            ></textarea>
            <button type="submit">Post</button>
          </form>
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <div className="no-reviews">No comments yet. Be the first to review!</div>
            ) : (
              reviews.map((r, idx) => (
                <div className="review" key={idx}>
                  <strong>{r.name}</strong> <span className="review-date">{r.date}</span>
                  <div className="review-body">{r.comment}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;