import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      {/* 背景デザイン */}
      <div className="fruit-bg" aria-hidden="true">
        <svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#f6fff6"/>
              <stop offset="100%" stop-color="#fffaf2"/>
            </linearGradient>
            <filter id="drop" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000" flood-opacity="0.1"/>
            </filter>
          </defs>

          <rect width="390" height="844" fill="url(#bg)" />

          <g transform="translate(60,120)" filter="url(#drop)">
            <circle r="28" fill="red" />
            <rect x="-2" y="-34" width="4" height="10" rx="1.5" fill="#2f7a28"/>
          </g>
          1

          <g transform="translate(310,240)" filter="url(#drop)">
            <circle r="26" fill="#ffa94d" />
            <circle cx="-8" cy="-4" r="5" fill="#fff3d4" opacity="0.3"/>
            <path d="M-8 -28 L0 -36 L8 -28 Z" fill="#58b457"/>
          </g>

          <g transform="translate(80,620)" filter="url(#drop)">
            <path d="M0 -26 C16 -22, 22 10, 0 28 C-22 10, -16 -22, 0 -26 Z" fill="#ff4b6b"/>
            <circle cx="0" cy="0" r="4" fill="#fff" opacity="0.7"/>
            <path d="M-8 -28 L0 -36 L8 -28 Z" fill="#58b457"/>
          </g>

          <g transform="translate(310,700)" filter="url(#drop)">
            <ellipse rx="28" ry="30" fill="#fff475" />
            <path d="M-8 -28 L0 -36 L8 -28 Z" fill="#58b457"/>
          </g>
          <g transform="translate(320,80)" filter="url(#drop)">
            <circle cx="0" cy="0" r="10" fill="#b388eb"/>
            <circle cx="12" cy="12" r="10" fill="#a06be4"/>
            <circle cx="-12" cy="12" r="10" fill="#bb8cf0"/>
            <path d="M-8 -28 L0 -36 L8 -28 Z" fill="#58b457"/>
          </g>
        </svg>
        </div>
        {/* コンテンツ */}
        <div className="content">
          <h1>DIIアプリ</h1>
          <p className="catchphrase">あなたの健康をサポートするアプリです</p>
          <h3>久留米工業大学　作</h3>
          <Link
            href="/survey"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            アンケートを開始する
          </Link>
        </div>
  </div>
  );
}
