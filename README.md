# Ethics-Tech-Policy Decisions Sandbox

A web-based simulator for ethical tradeoffs in tech and policy, created by Joshua Williams as part of the Stanford Ethics+Tech Public Policy Practitioner Course.

## 🎮 Features

- **7 Levels** of ethical decision-making scenarios
- **Individual Progress Tracking** - Each player has their own saved progress
- **Certificate Generation** - Downloadable PDF certificates upon completion
- **Social Sharing** - Share achievements on LinkedIn, Twitter, and Facebook
- **Stanford Ethics Toolkit Integration** - Based on official Stanford resources
- **Interactive Learning** - Explore tradeoffs and justify decisions

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📋 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types
- `npm run validate:content` - Validate scenario JSON files

## 🎯 Test Mode

Access test features:
- **Completion Page**: `/completion?test=true`
- **Progress Tracking**: `/test-progress`

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── play/              # Game pages
│   ├── completion/        # Completion page
│   └── test-progress/     # Progress testing page
├── components/            # React components
│   ├── ScenarioCard.tsx  # Main scenario display
│   ├── ToolkitCard.tsx   # Toolkit prompts and actions
│   └── ResultsModal.tsx  # Results display
├── lib/                   # Utility functions
│   ├── save.ts           # Progress saving/loading
│   ├── player.ts         # Player identification
│   └── results.ts        # Result generation
├── data/                  # Scenario data
│   └── levels/           # Level JSON files
└── public/               # Static assets
```

## 🔧 Configuration

No environment variables required. All features work client-side.

## 📝 License

This is an independent capstone project; not associated with the Stanford McCoy Family Center for Ethics in Society or its staff.

## 🙏 Credits

- **Creator**: Joshua Williams
- **Course**: Stanford Ethics, Technology + Public Policy for Practitioners (SOE-XETECH0001)
- **Framework**: Stanford's Ethics Toolkit
- **Toolkit Authors**: Manuela Travaglianti, PhD, and Thomas Both

---

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
