import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

export default function About() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5002/api/about")
      .then((res) => setData(res.data))
      .catch((e) => setErr(e?.message || "Failed to load"));
  }, []);

  if (err) return <div className="about-page">Error: {err}</div>;
  if (!data) return <div className="about-page">Loading...</div>;

  return (
    <div className="about-page">
      <div className="about-card">
        <div className="about-header">
          <h1 className="about-title">{data.title}</h1>
          <div className="about-subtitle">Loaded from backend JSON ✅</div>
        </div>

        <div className="about-body">
          <div className="about-photo-wrap">
            <img className="about-photo" src={data.imageUrl} alt={data.imageAlt} />
          </div>

          <div className="about-text">
            {data.paragraphs?.map((p, idx) => (
              <p key={idx} className="about-paragraph">
                {p}
              </p>
            ))}

            <div className="about-badges">
              <span className="badge">React</span>
              <span className="badge">Express</span>
              <span className="badge">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
