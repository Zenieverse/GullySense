# GullySense — The Local Street Intelligence AI

## Inspiration
Every city has invisible rules that only locals understand. GullySense was built to capture and preserve that street-level intelligence using AI.

## What it does
GullySense provides hyperlocal insights about:
- Street food safety
- Real traffic behavior
- Area-specific slang and cultural cues

## How we built it
- Used Kiro Agent with a custom `product.md` context file
- Encoded local heuristics instead of generic data
- Steered responses using strict context adherence
- Designed for explainable, human-like answers

## Challenges
- Translating human intuition into structured rules
- Preventing generic AI responses
- Balancing simplicity with realism

## Accomplishments
- Built a culturally-aware AI guide
- Demonstrated strong Agent Steering
- Created reusable city context architecture

## What we learned
- Custom context dramatically improves personalization
- AI feels smarter when it reasons like a human
- Constraints create better UX

## What’s next
- Multi-city support
- Community-contributed product.md files
- Real-time signals (weather, events)

## Repository Structure
/
├── .kiro/
│   └── product.md
├── app/
├── README.md

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GullySense - Local Intelligence</title>
    <link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Mukta:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        :root {
            --saffron: #FF6B2C;
            --turmeric: #E8A838;
            --night-blue: #1A1B2E;
            --street-dark: #0D0E1A;
            --chai-brown: #8B5A2B;
            --mint-fresh: #4ECDC4;
            --warning-red: #E74C3C;
            --text-primary: #F5F0E8;
            --text-secondary: #A8A4B8;
            --card-bg: rgba(26, 27, 46, 0.85);
            --card-border: rgba(255, 107, 44, 0.2);
            --glow: rgba(255, 107, 44, 0.4);
        }

        .light {
            --night-blue: #F5F0E8;
            --street-dark: #FFFFFF;
            --text-primary: #1A1B2E;
            --text-secondary: #5A5670;
            --card-bg: rgba(255, 255, 255, 0.9);
            --card-border: rgba(139, 90, 43, 0.3);
            --glow: rgba(232, 168, 56, 0.5);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Mukta', sans-serif;
            background: var(--street-dark);
            color: var(--text-primary);
            min-height: 100vh;
            overflow-x: hidden;
        }

        .bg-pattern {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
                radial-gradient(ellipse at 20% 0%, rgba(255, 107, 44, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 100%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 50px,
                    rgba(255, 107, 44, 0.02) 50px,
                    rgba(255, 107, 44, 0.02) 51px
                );
            pointer-events: none;
            z-index: 0;
        }

        .container {
            position: relative;
            z-index: 1;
            max-width: 480px;
            margin: 0 auto;
            padding: 16px;
            min-height: 100vh;
        }

        /* Header */
        header {
            text-align: center;
            padding: 24px 0 32px;
            animation: fadeSlideDown 0.6s ease-out;
        }

        @keyframes fadeSlideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .logo {
            font-family: 'Dela Gothic One', cursive;
            font-size: 2.5rem;
            background: linear-gradient(135deg, var(--saffron) 0%, var(--turmeric) 50%, var(--mint-fresh) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -1px;
            text-shadow: 0 0 60px var(--glow);
        }

        .tagline {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-top: 4px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        /* City Selector */
        .city-selector {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 16px;
            padding: 8px 16px;
            background: var(--card-bg);
            border-radius: 20px;
            border: 1px solid var(--card-border);
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .city-selector:hover {
            border-color: var(--saffron);
            box-shadow: 0 2px 12px rgba(255, 107, 44, 0.2);
        }

        .city-selector:active {
            transform: scale(0.98);
        }

        .city-selector i {
            color: var(--saffron);
        }

        .city-selector span {
            font-weight: 600;
            color: var(--text-primary);
        }

        /* Tab Navigation */
        .tab-nav {
            display: flex;
            gap: 8px;
            margin: 24px 0;
            background: var(--card-bg);
            padding: 6px;
            border-radius: 16px;
            border: 1px solid var(--card-border);
            animation: fadeSlideUp 0.6s ease-out 0.1s both;
        }

        @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .tab-btn {
            flex: 1;
            padding: 12px 8px;
            border: none;
            background: transparent;
            color: var(--text-secondary);
            font-family: 'Mukta', sans-serif;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            border-radius: 12px;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        }

        .tab-btn i {
            font-size: 1.2rem;
            transition: transform 0.3s ease;
        }

        .tab-btn:hover {
            color: var(--text-primary);
            background: rgba(255, 107, 44, 0.1);
        }

        .tab-btn:hover i {
            transform: scale(1.1);
        }

        .tab-btn:active {
            transform: scale(0.97);
        }

        .tab-btn.active {
            background: linear-gradient(135deg, var(--saffron), var(--turmeric));
            color: var(--street-dark);
            box-shadow: 0 4px 20px var(--glow);
        }

        .tab-btn.active i {
            transform: scale(1.1);
        }

        /* Tab Content */
        .tab-content {
            display: none;
            animation: fadeIn 0.4s ease-out;
        }

        .tab-content.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* Cards */
        .card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 16px;
            backdrop-filter: blur(10px);
            animation: fadeSlideUp 0.5s ease-out;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        .card-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            color: white;
        }

        .card-icon.food { background: linear-gradient(135deg, #FF6B2C, #FF8F5E); }
        .card-icon.traffic { background: linear-gradient(135deg, #4ECDC4, #7FDBDB); }
        .card-icon.slang { background: linear-gradient(135deg, #E8A838, #F4C56B); }

        .card-title {
            font-size: 1.1rem;
            font-weight: 700;
        }

        .card-subtitle {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }

        /* Quick Insight Cards */
        .insight-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 16px;
        }

        .insight-card {
            background: rgba(255, 107, 44, 0.08);
            border: 1px solid rgba(255, 107, 44, 0.15);
            border-radius: 14px;
            padding: 14px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            user-select: none;
        }

        .insight-card:hover {
            transform: translateY(-3px);
            border-color: var(--saffron);
            box-shadow: 0 6px 24px rgba(255, 107, 44, 0.25);
            background: rgba(255, 107, 44, 0.15);
        }

        .insight-card:active {
            transform: translateY(-1px) scale(0.98);
        }

        .insight-card .emoji {
            font-size: 1.8rem;
            margin-bottom: 6px;
            transition: transform 0.3s ease;
        }

        .insight-card:hover .emoji {
            transform: scale(1.15);
        }

        .insight-card .label {
            font-size: 0.75rem;
            color: var(--text-secondary);
            font-weight: 500;
        }

        .insight-card .value {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-top: 2px;
        }

        /* Input Area */
        .input-area {
            position: relative;
            margin-top: 16px;
        }

        .input-wrapper {
            display: flex;
            gap: 10px;
            align-items: flex-end;
        }

        .input-field {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid var(--card-border);
            border-radius: 16px;
            padding: 14px 18px;
            font-size: 16px;
            color: var(--text-primary);
            font-family: 'Mukta', sans-serif;
            resize: none;
            min-height: 52px;
            max-height: 120px;
            transition: all 0.3s ease;
        }

        .input-field::placeholder {
            color: var(--text-secondary);
        }

        .input-field:focus {
            outline: none;
            border-color: var(--saffron);
            box-shadow: 0 0 0 4px rgba(255, 107, 44, 0.15);
        }

        .send-btn {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            border: none;
            background: linear-gradient(135deg, var(--saffron), var(--turmeric));
            color: var(--street-dark);
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .send-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 20px var(--glow);
        }

        .send-btn:active {
            transform: scale(0.95);
        }

        .send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .send-btn i {
            transition: transform 0.3s ease;
        }

        .send-btn:hover i {
            transform: translateX(2px);
        }

        /* Response Area */
        .response-area {
            margin-top: 20px;
            display: none;
        }

        .response-area.visible {
            display: block;
            animation: fadeSlideUp 0.4s ease-out;
        }

        .response-card {
            background: linear-gradient(135deg, rgba(255, 107, 44, 0.05), rgba(78, 205, 196, 0.05));
            border: 1px solid var(--card-border);
            border-radius: 20px;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        .response-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--saffron), var(--mint-fresh));
        }

        .response-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
            font-weight: 600;
            color: var(--saffron);
        }

        .response-content {
            line-height: 1.7;
            font-size: 0.95rem;
        }

        .response-content h1, .response-content h2, .response-content h3 {
            color: var(--saffron);
            margin: 16px 0 8px;
        }

        .response-content h1:first-child, .response-content h2:first-child, .response-content h3:first-child {
            margin-top: 0;
        }

        .response-content h1 { font-size: 1.3rem; }
        .response-content h2 { font-size: 1.15rem; }
        .response-content h3 { font-size: 1rem; }

        .response-content p {
            margin-bottom: 12px;
        }

        .response-content ul, .response-content ol {
            margin-left: 20px;
            margin-bottom: 12px;
        }

        .response-content li {
            margin-bottom: 6px;
        }

        .response-content strong {
            color: var(--turmeric);
        }

        .response-content code {
            background: rgba(255, 107, 44, 0.15);
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.9em;
        }

        .response-content blockquote {
            border-left: 3px solid var(--saffron);
            margin: 12px 0;
            padding-left: 16px;
            color: var(--text-secondary);
            font-style: italic;
        }

        /* Loading State */
        .loading {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
        }

        .loading-dots {
            display: flex;
            gap: 4px;
        }

        .loading-dots span {
            width: 8px;
            height: 8px;
            background: var(--saffron);
            border-radius: 50%;
            animation: bounce 1.4s ease-in-out infinite;
        }

        .loading-dots span:nth-child(1) { animation-delay: 0s; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
        }

        /* Quick Actions */
        .quick-actions {
            margin-top: 16px;
        }

        .quick-actions-title {
            font-size: 0.75rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .quick-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .quick-chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--card-border);
            padding: 8px 14px;
            border-radius: 20px;
            font-size: 0.8rem;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
        }

        .quick-chip:hover {
            background: rgba(255, 107, 44, 0.15);
            border-color: var(--saffron);
            color: var(--text-primary);
            transform: translateY(-2px);
        }

        .quick-chip:active {
            transform: translateY(0) scale(0.97);
        }

        /* Slang Dictionary Cards */
        .slang-entry {
            background: rgba(232, 168, 56, 0.08);
            border: 1px solid rgba(232, 168, 56, 0.2);
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
        }

        .slang-entry:hover {
            background: rgba(232, 168, 56, 0.15);
            border-color: var(--turmeric);
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(232, 168, 56, 0.2);
        }

        .slang-entry:active {
            transform: translateY(0) scale(0.99);
        }

        .slang-word {
            font-family: 'Dela Gothic One', cursive;
            font-size: 1.1rem;
            color: var(--turmeric);
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .slang-word::after {
            content: '→';
            font-size: 0.9rem;
            opacity: 0;
            transform: translateX(-5px);
            transition: all 0.3s ease;
        }

        .slang-entry:hover .slang-word::after {
            opacity: 0.6;
            transform: translateX(0);
        }

        .slang-meaning {
            font-size: 0.9rem;
            margin-bottom: 8px;
        }

        .slang-context {
            font-size: 0.8rem;
            color: var(--text-secondary);
            font-style: italic;
            padding-left: 12px;
            border-left: 2px solid var(--turmeric);
        }

        /* Time/Weather Indicators */
        .status-bar {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
            flex-wrap: wrap;
        }

        .status-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85rem;
            color: var(--text-secondary);
            padding: 6px 12px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .status-item i {
            color: var(--mint-fresh);
        }

        .status-item.clickable {
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .status-item.clickable:hover {
            background: rgba(78, 205, 196, 0.1);
            border-color: rgba(78, 205, 196, 0.3);
        }

        .status-item.clickable:active {
            transform: scale(0.97);
        }

        /* Weather Toggle */
        .weather-toggle {
            display: flex;
            gap: 6px;
        }

        .weather-btn {
            padding: 4px 10px;
            border-radius: 12px;
            border: 1px solid var(--card-border);
            background: transparent;
            color: var(--text-secondary);
            font-size: 0.75rem;
            font-family: 'Mukta', sans-serif;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .weather-btn:hover {
            border-color: var(--saffron);
            color: var(--text-primary);
        }

        .weather-btn.active {
            background: var(--saffron);
            border-color: var(--saffron);
            color: var(--street-dark);
        }

        .weather-btn:active {
            transform: scale(0.95);
        }

        /* Error State */
        .error-message {
            background: rgba(231, 76, 60, 0.15);
            border: 1px solid rgba(231, 76, 60, 0.3);
            border-radius: 12px;
            padding: 14px;
            color: #E74C3C;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
        }

        /* Custom Modal */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .modal-overlay.visible {
            opacity: 1;
            visibility: visible;
        }

        .modal-content {
            background: var(--night-blue);
            border: 1px solid var(--card-border);
            border-radius: 20px;
            padding: 24px;
            max-width: 340px;
            width: 90%;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }

        .modal-overlay.visible .modal-content {
            transform: scale(1);
        }

        .modal-title {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .modal-title i {
            color: var(--saffron);
        }

        .modal-text {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .modal-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .modal-btn {
            padding: 10px 20px;
            border-radius: 10px;
            border: none;
            font-family: 'Mukta', sans-serif;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .modal-btn:active {
            transform: scale(0.97);
        }

        .modal-btn.secondary {
            background: transparent;
            color: var(--text-secondary);
            border: 1px solid var(--card-border);
        }

        .modal-btn.secondary:hover {
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-primary);
        }

        .modal-btn.primary {
            background: linear-gradient(135deg, var(--saffron), var(--turmeric));
            color: var(--street-dark);
        }

        .modal-btn.primary:hover {
            box-shadow: 0 4px 16px var(--glow);
        }

        /* Clear button */
        .clear-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-secondary);
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .clear-btn:hover {
            background: rgba(231, 76, 60, 0.2);
            color: var(--warning-red);
        }

        /* Responsive */
        @media (max-width: 360px) {
            .container { padding: 12px; }
            .logo { font-size: 2rem; }
            .tab-btn { padding: 10px 6px; font-size: 0.75rem; }
            .insight-grid { grid-template-columns: 1fr; }
        }

        /* Pulse animation for interactive hints */
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 107, 44, 0.4); }
            50% { box-shadow: 0 0 0 8px rgba(255, 107, 44, 0); }
        }

        .hint-pulse {
            animation: pulse 2s ease-in-out infinite;
        }
    </style>
</head>
<body>
    <div class="bg-pattern"></div>

    <div class="container">
        <header>
            <h1 class="logo">GullySense</h1>
            <p class="tagline">Powered by Kiro</p>
            <div class="city-selector" id="city-selector">
                <i class="fas fa-map-marker-alt"></i>
                <span id="city-name">Bengaluru</span>
                <i class="fas fa-chevron-down" style="font-size: 0.7rem; opacity: 0.6;"></i>
            </div>
        </header>

        <nav class="tab-nav">
            <button class="tab-btn active" data-tab="food">
                <i class="fas fa-utensils"></i>
                <span>Street Food</span>
            </button>
            <button class="tab-btn" data-tab="traffic">
                <i class="fas fa-route"></i>
                <span>Traffic</span>
            </button>
            <button class="tab-btn" data-tab="slang">
                <i class="fas fa-language"></i>
                <span>Slang</span>
            </button>
        </nav>

        <!-- Street Food Tab -->
        <div class="tab-content active" id="food-tab">
            <div class="card">
                <div class="card-header">
                    <div class="card-icon food">
                        <i class="fas fa-fire-flame-curved"></i>
                    </div>
                    <div>
                        <div class="card-title">Street Food Sense</div>
                        <div class="card-subtitle">Indiranagar + MG Road</div>
                    </div>
                </div>

                <div class="status-bar">
                    <div class="status-item">
                        <i class="fas fa-clock"></i>
                        <span id="current-time">--:--</span>
                    </div>
                    <div class="status-item clickable" id="weather-selector">
                        <i class="fas fa-cloud" id="weather-icon"></i>
                        <span id="weather-status">Clear</span>
                    </div>
                </div>

                <div class="insight-grid" id="food-insights">
                    <div class="insight-card" data-query="What stalls are safest right now?">
                        <div class="emoji">🍛</div>
                        <div class="label">Safe Stalls</div>
                        <div class="value">Right Now</div>
                    </div>
                    <div class="insight-card" data-query="What should I avoid eating at this hour?">
                        <div class="emoji">⚠️</div>
                        <div class="label">Avoid</div>
                        <div class="value">Late Night</div>
                    </div>
                    <div class="insight-card" data-query="Best rainy day street food options?">
                        <div class="emoji">🌧️</div>
                        <div class="label">Rain Mode</div>
                        <div class="value">Smart Picks</div>
                    </div>
                    <div class="insight-card" data-query="How to spot a hygienic stall?">
                        <div class="emoji">✅</div>
                        <div class="label">Hygiene</div>
                        <div class="value">Signals</div>
                    </div>
                </div>

                <div class="input-area">
                    <div class="input-wrapper">
                        <textarea class="input-field" id="food-input" placeholder="Ask Kiro about street food..." rows="1"></textarea>
                        <button class="send-btn" id="food-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

                <div class="quick-actions">
                    <div class="quick-actions-title">Quick Questions</div>
                    <div class="quick-chips" id="food-chips">
                        <span class="quick-chip" data-query="Is gobi safe to eat now?">Gobi safe now?</span>
                        <span class="quick-chip" data-query="Best pani puri stalls?">Pani puri spots</span>
                        <span class="quick-chip" data-query="Coconut chutney timing?">Chutney timing</span>
                    </div>
                </div>

                <div class="response-area" id="food-response">
                    <div class="response-card">
                        <button class="clear-btn" id="food-clear" title="Clear response">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="response-header">
                            <i class="fas fa-lightbulb"></i>
                            <span>Kiro Says</span>
                        </div>
                        <div class="response-content" id="food-response-content"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Traffic Tab -->
        <div class="tab-content" id="traffic-tab">
            <div class="card">
                <div class="card-header">
                    <div class="card-icon traffic">
                        <i class="fas fa-traffic-light"></i>
                    </div>
                    <div>
                        <div class="card-title">Traffic Reality Engine</div>
                        <div class="card-subtitle">Google Says vs Locals Know</div>
                    </div>
                </div>

                <div class="status-bar">
                    <div class="status-item">
                        <i class="fas fa-clock"></i>
                        <span id="traffic-time">--:--</span>
                    </div>
                    <div class="status-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span id="day-status">Weekday</span>
                    </div>
                    <div class="status-item clickable" id="traffic-weather-selector">
                        <i class="fas fa-cloud" id="traffic-weather-icon"></i>
                        <span id="traffic-weather-status">Clear</span>
                    </div>
                </div>

                <div class="insight-grid" id="traffic-insights">
                    <div class="insight-card" data-query="What is the real ETA from Indiranagar to MG Road right now?">
                        <div class="emoji">🚗</div>
                        <div class="label">Real ETA</div>
                        <div class="value">Local Truth</div>
                    </div>
                    <div class="insight-card" data-query="What are the current traffic hotspots to avoid?">
                        <div class="emoji">🚧</div>
                        <div class="label">Avoid</div>
                        <div class="value">Hotspots</div>
                    </div>
                    <div class="insight-card" data-query="Are there any temple or prayer-time traffic impacts now?">
                        <div class="emoji">🛕</div>
                        <div class="label">Temple</div>
                        <div class="value">Timings</div>
                    </div>
                    <div class="insight-card" data-query="Rain + metro construction impact on routes?">
                        <div class="emoji">🌧️</div>
                        <div class="label">Rain</div>
                        <div class="value">Impact</div>
                    </div>
                </div>

                <div class="input-area">
                    <div class="input-wrapper">
                        <textarea class="input-field" id="traffic-input" placeholder="Ask Kiro about traffic..." rows="1"></textarea>
                        <button class="send-btn" id="traffic-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

                <div class="quick-actions">
                    <div class="quick-actions-title">Common Routes</div>
                    <div class="quick-chips" id="traffic-chips">
                        <span class="quick-chip" data-query="Indiranagar to Koramangala ETA?">Indira → Koramangala</span>
                        <span class="quick-chip" data-query="MG Road to Whitefield ETA?">MG → Whitefield</span>
                        <span class="quick-chip" data-query="Best time to travel to Airport?">Airport timing</span>
                    </div>
                </div>

                <div class="response-area" id="traffic-response">
                    <div class="response-card">
                        <button class="clear-btn" id="traffic-clear" title="Clear response">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="response-header">
                            <i class="fas fa-route"></i>
                            <span>Kiro Says</span>
                        </div>
                        <div class="response-content" id="traffic-response-content"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slang Tab -->
        <div class="tab-content" id="slang-tab">
            <div class="card">
                <div class="card-header">
                    <div class="card-icon slang">
                        <i class="fas fa-comments"></i>
                    </div>
                    <div>
                        <div class="card-title">Slang Decoder</div>
                        <div class="card-subtitle">Kannada + Local English</div>
                    </div>
                </div>

                <div id="slang-entries">
                    <div class="slang-entry" data-query="Explain 'Scene illa' with all context, tone variations, and usage examples">
                        <div class="slang-word">"Scene illa"</div>
                        <div class="slang-meaning">Everything is fine / No problem</div>
                        <div class="slang-context">"How's the traffic?" — "Scene illa, boss"</div>
                    </div>

                    <div class="slang-entry" data-query="Explain 'Adjust maadi' with all context, tone variations, and usage examples">
                        <div class="slang-word">"Adjust maadi"</div>
                        <div class="slang-meaning">Please accept the inconvenience</div>
                        <div class="slang-context">"No change, adjust maadi" — at any shop</div>
                    </div>

                    <div class="slang-entry" data-query="Explain 'Full tight' with all context, tone variations, and usage examples. Include both meanings.">
                        <div class="slang-word">"Full tight"</div>
                        <div class="slang-meaning">Drunk OR situation is serious (context-dependent)</div>
                        <div class="slang-context">"Boss full tight aagidaane" — He's completely drunk</div>
                    </div>
                </div>

                <div class="input-area">
                    <div class="input-wrapper">
                        <textarea class="input-field" id="slang-input" placeholder="Ask Kiro to decode slang..." rows="1"></textarea>
                        <button class="send-btn" id="slang-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

                <div class="quick-actions">
                    <div class="quick-actions-title">Decode More</div>
                    <div class="quick-chips" id="slang-chips">
                        <span class="quick-chip" data-query="What does 'Swalpa adjust' mean?">Swalpa adjust</span>
                        <span class="quick-chip" data-query="What does 'Guru' mean in Bangalore slang?">Guru</span>
                        <span class="quick-chip" data-query="What does 'Yen guru' mean?">Yen guru</span>
                        <span class="quick-chip" data-query="What does 'First class' mean in Bangalore?">First class</span>
                        <span class="quick-chip" data-query="What does 'Thumba' mean?">Thumba</span>
                    </div>
                </div>

                <div class="response-area" id="slang-response">
                    <div class="response-card">
                        <button class="clear-btn" id="slang-clear" title="Clear response">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="response-header">
                            <i class="fas fa-book-open"></i>
                            <span>Kiro Says</span>
                        </div>
                        <div class="response-content" id="slang-response-content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Custom Modal -->
    <div class="modal-overlay" id="modal">
        <div class="modal-content">
            <div class="modal-title" id="modal-title">
                <i class="fas fa-info-circle"></i>
                <span id="modal-title-text">Alert</span>
            </div>
            <div class="modal-text" id="modal-text">Message here</div>
            <div class="modal-actions" id="modal-actions">
                <button class="modal-btn secondary" id="modal-close">Close</button>
            </div>
        </div>
    </div>

    <!-- Weather Modal -->
    <div class="modal-overlay" id="weather-modal">
        <div class="modal-content">
            <div class="modal-title">
                <i class="fas fa-cloud-sun"></i>
                <span>Set Weather Condition</span>
            </div>
            <div class="modal-text">How's the weather? This helps provide accurate recommendations.</div>
            <div class="weather-toggle" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                <button class="weather-btn active" data-weather="clear">☀️ Clear</button>
                <button class="weather-btn" data-weather="cloudy">⛅ Cloudy</button>
                <button class="weather-btn" data-weather="rain">🌧️ Rainy</button>
                <button class="weather-btn" data-weather="heavy-rain">⛈️ Heavy Rain</button>
            </div>
            <div class="modal-actions">
                <button class="modal-btn primary" id="weather-modal-close">Done</button>
            </div>
        </div>
    </div>

    <!-- City Modal -->
    <div class="modal-overlay" id="city-modal">
        <div class="modal-content">
            <div class="modal-title">
                <i class="fas fa-map-marker-alt"></i>
                <span>Select City</span>
            </div>
            <div class="modal-text">Currently, GullySense is optimized for Bengaluru. More cities coming soon!</div>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                <button class="weather-btn active" style="padding: 12px 16px; text-align: left;">🏙️ Bengaluru (Indiranagar + MG Road)</button>
                <button class="weather-btn" style="padding: 12px 16px; text-align: left; opacity: 0.5;" disabled>🏗️ Mumbai (Coming Soon)</button>
                <button class="weather-btn" style="padding: 12px 16px; text-align: left; opacity: 0.5;" disabled>🏗️ Delhi (Coming Soon)</button>
            </div>
            <div class="modal-actions">
                <button class="modal-btn primary" id="city-modal-close">Close</button>
            </div>
        </div>
    </div>

    <script>
        // =============================================
        // Local Knowledge Context (product.md content)
        // =============================================
        const LOCAL_CONTEXT = `
# Kiro's Local Intelligence Database (GullySense)
## City: Bengaluru (Indiranagar + MG Road)

> This knowledge base steers Kiro's personality and decisions. Kiro is a friendly, street-smart local guide who speaks with warmth and authenticity.

---

## STREET FOOD RULES

### Time-Based Safety
- Gobi (cauliflower) stalls are safest between 6:30–9:30 PM when turnover is highest
- Avoid coconut chutney after 10 PM — it's likely been sitting since evening
- Pani puri water quality degrades after 9 PM at most stalls
- Dosa batters are freshest before 8 PM; late-night dosas may use old batter
- Biryani stalls: safest at lunch (12-2 PM) and early dinner (7-8 PM)

### Hygiene Signals (Local Wisdom)
- If stall has >10 locals standing, hygiene risk is generally low
- Watch for: running water source, covered containers, hand-washing between orders
- Avoid stalls where oil is dark/thick — indicates reuse beyond safe limits
- Good sign: stall owner eating their own food
- Bad sign: stall with no queue while neighbors have lines

### Weather Adjustments
- During rain, prefer pakora, bhajji over pani-based food
- Avoid chaat, pani puri, golgappa when monsoon water quality is uncertain
- Wet weather = stick to freshly fried items
- Hot/dry days: lassi & juice stalls are generally safe if ice is made from RO water

### Area-Specific Notes
- Indiranagar 100 Feet Road: Premium stalls, generally safer, higher turnover
- MG Road: Tourist pricing, quality varies widely
- Church Street: Late-night stalls (after 11 PM) — proceed with caution
- Koramangala 5th Block: Student crowd ensures high turnover, good hygiene indicators

---

## TRAFFIC TRUTHS

### Time Pattern Multipliers
- 6–8 PM + rain = Double your ETA (100% increase)
- School hours (7:30-9 AM, 2-4 PM) near schools = Add 20-30 mins
- Aarti/prayer times near temples (6-7 PM) = Micro-jams not visible on maps
- Saturday evening MG Road = Add 45 mins to any estimate
- Sunday morning before 10 AM = Rare window of empty roads

### Construction & Infrastructure
- Metro construction zones add 15 mins even if road appears empty
- Silk Board junction: Always add 25-30 mins regardless of time
- ORR (Outer Ring Road) during IT peak (5-8 PM): Add 40-60 mins
- Indiranagar Double Road: Deceptively slow during 6-8 PM

### Google vs Reality Translation
- "Google says 10 mins" during peak = Locals know 35 mins
- "Google says 20 mins" with rain = Actually 50-60 mins
- "Google shows green" near Koramangala = Trust local knowledge, not the app
- Weekend evening estimates are generally underestimated by 50%

### Festival & Event Impacts
- Ganesh Chaturthi: Certain roads fully blocked, plan 2x ETA for entire week
- Diwali week: Early morning travel only, evening = chaos
- IPL match at Chinnaswamy: MG Road area adds 90+ mins
- Weekend concerts at Palace Grounds: Northern routes severely affected

### Secret Local Tips
- Take service roads during aarti times
- Parallel roads through residential areas often faster than main roads
- Metro + auto combination often beats cab during peak hours
- Airport: Leave 3.5 hours before domestic flights during peak times

---

## SLANG DICTIONARY

### Common Expressions

**"Scene illa"**
- Meaning: Everything is fine / No problem / Don't worry
- Tone: Casual, reassuring
- Context: Response to concern or question about situation
- Example: "Traffic hai?" → "Scene illa, 10 min mein aa jaunga"

**"Adjust maadi"**
- Meaning: Please accommodate / Accept this inconvenience
- Tone: Polite request but non-negotiable
- Context: When exact change isn't available, minor service issues
- Example: "No 10 rupees change, adjust maadi saar"

**"Full tight"**
- Meaning 1: Completely drunk
- Meaning 2: Situation is serious/tense (context-dependent)
- Tone Detection: If about person = drunk; if about situation = serious
- Example 1: "Last night full tight aagitten" (I got very drunk)
- Example 2: "Office mein full tight scene" (Things are very tense at office)

**"Swalpa"**
- Meaning: A little / Slightly / Somewhat
- Tone: Minimizing, often used to soften requests
- Usage: Universal modifier in Bangalore Kannada-English mix
- Example: "Swalpa adjust maadi" (Please adjust a little)

**"Guru"**
- Meaning: Friendly address, like "dude" or "brother"
- Tone: Familiar, respectful but casual
- Usage: Between friends, to vendors, auto drivers
- Example: "Yen guru, yelli hogthira?" (Hey bro, where are you going?)

**"Yen guru" / "Yenu guru"**
- Meaning: What's up? / What do you want? / What's the matter?
- Tone: Can be friendly greeting or mild confrontation depending on delivery
- Context: Greeting friends OR asking purpose of interaction

**"Bekagilla"**
- Meaning: Don't want / Not needed
- Tone: Firm refusal
- Usage: Declining offers from vendors
- Example: "Flowers bekagilla" (Don't need flowers)

**"Hodbi"**
- Meaning: Go away / Leave
- Tone: Dismissive, can be rude depending on context
- Warning: Use carefully, can cause offense

**"Thumba"**
- Meaning: Very much / A lot
- Tone: Emphatic
- Example: "Thumba thanks guru" (Thanks a lot, bro)

**"Solpa"**
- Meaning: Same as "Swalpa" — a little
- Note: Spelling/pronunciation variant, equally common

**"First class"**
- Meaning: Excellent / Perfect / Great
- Tone: Enthusiastic approval
- Example: "Food first class aagide" (Food is excellent)

**"Maja"**
- Meaning: Fun / Enjoyment / Cool
- Example: "Full maja banditu" (Had great fun)

---

## TONE DETECTION GUIDE

### Friendly Indicators
- "Guru/Boss" at end of sentence
- Rising intonation
- Accompanied by smile/head wobble
- "Saar/Madam" with respectful tone

### Warning Indicators
- "Hodbi" said sharply
- "Yen?" said aggressively (What?)
- Lack of honorifics in formal context
- Rapid-fire Kannada switching from English

### Context Clues
- Same phrase meaning changes based on:
  - Time of day (late night = more suspicious)
  - Location (tourist area = more aggressive sales)
  - Speaker's body language
  - Your appearance (tourist vs local)

---

## SEASONAL ADJUSTMENTS

### Monsoon (June-September)
- Street food: Stick to hot, freshly fried items
- Traffic: All estimates +50% minimum
- Avoid: Ground-level stalls, open chutneys

### Festival Season (September-November)
- Traffic: Unpredictable, check for procession routes
- Food: Stalls busier but quality varies
- Slang: More festive greetings in rotation

### Summer (March-May)
- Traffic: Slightly better due to vacations
- Food: Hydration stalls (nimbu pani, lassi) are safe bets
- Timing: Avoid 12-3 PM for any outdoor activity
`;

        // =============================================
        // State
        // =============================================
        let currentWeather = 'clear';
        const weatherIcons = {
            'clear': 'fa-sun',
            'cloudy': 'fa-cloud',
            'rain': 'fa-cloud-rain',
            'heavy-rain': 'fa-cloud-showers-heavy'
        };
        const weatherLabels = {
            'clear': 'Clear',
            'cloudy': 'Cloudy',
            'rain': 'Rainy',
            'heavy-rain': 'Heavy Rain'
        };

        // =============================================
        // DOM Ready
        // =============================================
        document.addEventListener('DOMContentLoaded', function() {
            initTabNavigation();
            initTimeUpdates();
            initTextareas();
            initInsightCards();
            initQuickChips();
            initSlangEntries();
            initSendButtons();
            initClearButtons();
            initModals();
            initWeatherSelector();
            initCitySelector();
            initDarkMode();
        });

        // =============================================
        // Tab Navigation
        // =============================================
        function initTabNavigation() {
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');

            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.dataset.tab;

                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));

                    this.classList.add('active');
                    document.getElementById(`${tabId}-tab`).classList.add('active');
                });
            });
        }

        // =============================================
        // Time Updates
        // =============================================
        function initTimeUpdates() {
            updateTime();
            setInterval(updateTime, 60000);
        }

        function updateTime() {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
            const dayStr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];

            const currentTimeEl = document.getElementById('current-time');
            const trafficTimeEl = document.getElementById('traffic-time');
            const dayStatusEl = document.getElementById('day-status');

            if (currentTimeEl) currentTimeEl.textContent = timeStr;
            if (trafficTimeEl) trafficTimeEl.textContent = timeStr;
            if (dayStatusEl) dayStatusEl.textContent = dayStr;
        }

        // =============================================
        // Textarea Auto-resize & Enter Handler
        // =============================================
        function initTextareas() {
            document.querySelectorAll('.input-field').forEach(textarea => {
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
                });

                textarea.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        const type = this.id.replace('-input', '');
                        sendQuery(type);
                    }
                });
            });
        }

        // =============================================
        // Insight Cards Click Handlers
        // =============================================
        function initInsightCards() {
            document.querySelectorAll('.insight-card').forEach(card => {
                card.addEventListener('click', function() {
                    const query = this.dataset.query;
                    const tab = this.closest('.tab-content');
                    const type = tab.id.replace('-tab', '');
                    askQuestion(type, query);
                });
            });
        }

        // =============================================
        // Quick Chips Click Handlers
        // =============================================
        function initQuickChips() {
            document.querySelectorAll('.quick-chip').forEach(chip => {
                chip.addEventListener('click', function() {
                    const query = this.dataset.query;
                    const tab = this.closest('.tab-content');
                    const type = tab.id.replace('-tab', '');
                    askQuestion(type, query);
                });
            });
        }

        // =============================================
        // Slang Entries Click Handlers
        // =============================================
        function initSlangEntries() {
            document.querySelectorAll('.slang-entry').forEach(entry => {
                entry.addEventListener('click', function() {
                    const query = this.dataset.query;
                    askQuestion('slang', query);
                });
            });
        }

        // =============================================
        // Send Buttons
        // =============================================
        function initSendButtons() {
            ['food', 'traffic', 'slang'].forEach(type => {
                const btn = document.getElementById(`${type}-send`);
                if (btn) {
                    btn.addEventListener('click', function() {
                        sendQuery(type);
                    });
                }
            });
        }

        // =============================================
        // Clear Buttons
        // =============================================
        function initClearButtons() {
            ['food', 'traffic', 'slang'].forEach(type => {
                const btn = document.getElementById(`${type}-clear`);
                if (btn) {
                    btn.addEventListener('click', function() {
                        const responseArea = document.getElementById(`${type}-response`);
                        responseArea.classList.remove('visible');
                    });
                }
            });
        }

        // =============================================
        // Modals
        // =============================================
        function initModals() {
            // Main modal close
            document.getElementById('modal-close').addEventListener('click', closeModal);
            document.getElementById('modal').addEventListener('click', function(e) {
                if (e.target === this) closeModal();
            });

            // Weather modal close
            document.getElementById('weather-modal-close').addEventListener('click', function() {
                document.getElementById('weather-modal').classList.remove('visible');
            });
            document.getElementById('weather-modal').addEventListener('click', function(e) {
                if (e.target === this) this.classList.remove('visible');
            });

            // City modal close
            document.getElementById('city-modal-close').addEventListener('click', function() {
                document.getElementById('city-modal').classList.remove('visible');
            });
            document.getElementById('city-modal').addEventListener('click', function(e) {
                if (e.target === this) this.classList.remove('visible');
            });

            // Weather buttons in modal
            document.querySelectorAll('#weather-modal .weather-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('#weather-modal .weather-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    setWeather(this.dataset.weather);
                });
            });
        }

        function showModal(title, text) {
            document.getElementById('modal-title-text').textContent = title;
            document.getElementById('modal-text').textContent = text;
            document.getElementById('modal').classList.add('visible');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('visible');
        }

        // =============================================
        // Weather Selector
        // =============================================
        function initWeatherSelector() {
            document.getElementById('weather-selector').addEventListener('click', function() {
                document.getElementById('weather-modal').classList.add('visible');
            });
            document.getElementById('traffic-weather-selector').addEventListener('click', function() {
                document.getElementById('weather-modal').classList.add('visible');
            });
        }

        function setWeather(weather) {
            currentWeather = weather;

            // Update all weather displays
            ['weather-icon', 'traffic-weather-icon'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.className = 'fas ' + weatherIcons[weather];
                }
            });

            ['weather-status', 'traffic-weather-status'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.textContent = weatherLabels[weather];
                }
            });
        }

        // =============================================
        // City Selector
        // =============================================
        function initCitySelector() {
            document.getElementById('city-selector').addEventListener('click', function() {
                document.getElementById('city-modal').classList.add('visible');
            });
        }

        // =============================================
        // Dark Mode
        // =============================================
        function initDarkMode() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                document.documentElement.classList.add('light');
            }
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
                if (event.matches) {
                    document.documentElement.classList.add('light');
                } else {
                    document.documentElement.classList.remove('light');
                }
            });
        }

        // =============================================
        // Query Functions
        // =============================================
        function askQuestion(type, question) {
            const input = document.getElementById(`${type}-input`);
            if (input) {
                input.value = question;
                sendQuery(type);
            }
        }

        // Register Response Handler
        window.Poe.registerHandler('gullysense-handler', (result, context) => {
            const responseArea = document.getElementById(`${context.type}-response`);
            const responseContent = document.getElementById(`${context.type}-response-content`);
            const sendBtn = document.getElementById(`${context.type}-send`);

            if (!result.responses || result.responses.length === 0) {
                responseContent.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>No response received. Please try again.</span>
                    </div>
                `;
                if (sendBtn) sendBtn.disabled = false;
                return;
            }

            const msg = result.responses[0];

            if (msg.status === 'error') {
                responseContent.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${msg.statusText || 'Something went wrong. Please try again.'}</span>
                    </div>
                `;
                if (sendBtn) sendBtn.disabled = false;
            } else if (msg.status === 'incomplete') {
                responseContent.innerHTML = marked.parse(msg.content || '');
            } else if (msg.status === 'complete') {
                responseContent.innerHTML = marked.parse(msg.content || 'No response received.');
                if (sendBtn) sendBtn.disabled = false;
            }
        });

        async function sendQuery(type) {
            const input = document.getElementById(`${type}-input`);
            const query = input ? input.value.trim() : '';

            if (!query) {
                showModal('Empty Query', 'Please enter a question first.');
                return;
            }

            const responseArea = document.getElementById(`${type}-response`);
            const responseContent = document.getElementById(`${type}-response-content`);
            const sendBtn = document.getElementById(`${type}-send`);

            // Show loading state
            responseArea.classList.add('visible');
            responseContent.innerHTML = `
                <div class="loading">
                    <span>Kiro is thinking</span>
                    <div class="loading-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            if (sendBtn) sendBtn.disabled = true;

            // Get current time context
            const now = new Date();
            const timeContext = `Current time: ${now.toLocaleTimeString('en-IN')} on ${now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}. Weather: ${weatherLabels[currentWeather]}.`;

            // Build prompt based on type
            let systemPrompt = '';
            if (type === 'food') {
                systemPrompt = `You are Kiro, the hyper-local street food advisor powering GullySense for Bengaluru. You speak like a friendly local who knows every gully (lane) and stall. Use the local knowledge database below to give practical, specific advice. Include time-based recommendations, hygiene signals to watch for, and area-specific tips. Be conversational but informative. Keep responses concise (3-5 key points max). Sign off casually as Kiro would.

${timeContext}`;
            } else if (type === 'traffic') {
                systemPrompt = `You are Kiro, the traffic reality advisor powering GullySense for Bengaluru. You know the difference between what maps show and what locals experience. Use the local knowledge database below to give realistic ETAs and route advice. Factor in current time, day of week, weather, and seasonal patterns. Always compare "Google says" vs "Reality is" when relevant. Be direct and practical. Sign off casually as Kiro would.

${timeContext}`;
            } else if (type === 'slang') {
                systemPrompt = `You are Kiro, the Bangalore slang decoder powering GullySense. Explain local slang with meanings, tones, and contextual usage examples. Indicate when the same phrase can have different meanings based on context, tone, or speaker. Include tips on when to use (or avoid) certain expressions. Be educational but fun. Sign off casually as Kiro would.

${timeContext}`;
            }

            const fullPrompt = `${systemPrompt}

## LOCAL KNOWLEDGE DATABASE:
${LOCAL_CONTEXT}

---

## USER QUERY:
${query}

Respond in a helpful, locally-informed way. Use markdown formatting for clarity.`;

            try {
                await window.Poe.sendUserMessage(`@GPT-5.1 ${fullPrompt}`, {
                    handler: 'gullysense-handler',
                    stream: true,
                    openChat: false,
                    handlerContext: { type }
                });

                if (input) {
                    input.value = '';
                    input.style.height = 'auto';
                }
            } catch (err) {
                responseContent.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${err.message || 'Failed to send query. Please try again.'}</span>
                    </div>
                `;
                if (sendBtn) sendBtn.disabled = false;
            }
        }

        // Configure marked for safe rendering
        marked.setOptions({
            breaks: true,
            gfm: true
        });
    </script>
</body>
</html>
