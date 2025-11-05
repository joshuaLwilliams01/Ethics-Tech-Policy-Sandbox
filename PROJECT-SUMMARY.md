# Ethics-Tech-Policy Decisions Sandbox - Project Summary

## 🎉 Project Status: LIVE AND DEPLOYED

**Live Website**: https://ethics-tech-policy-decisions-sandbo.vercel.app  
**GitHub Repository**: https://github.com/joshuaLwilliams01/Ethics-Tech-Policy-Sandbox  
**Deployment Platform**: Vercel

---

## 📋 Project Overview

A web-based simulator for ethical tradeoffs in tech and policy, created by Joshua Williams as part of the Stanford Ethics+Tech Public Policy Practitioner Course. The application teaches ethical decision-making using the Stanford Ethics Toolkit and the People + Planet + Parity (P³) Governance Framework.

---

## ✨ Key Features Implemented

### 1. **Game Structure**
- 7 levels with 5 scenarios each (35 total scenarios)
- Levels: Moral Foundations, Algorithmic Fairness, Child Safety, Political Economy, Privacy & Liberty, Future of Work, Moral Imagination
- Individual play mode with interactive scenario cards

### 2. **Progress Tracking System**
- Individualized per player (unique player IDs)
- Auto-save functionality
- Auto-load when returning to levels
- "Continue Journey" option for levels with saved progress
- Test progress page at `/test-progress`

### 3. **Certificate Generation**
- PDF certificate generation using `pdf-lib`
- Customizable with player name
- Download functionality
- Social media sharing integration

### 4. **Social Sharing**
- LinkedIn, Twitter, and Facebook integration
- Automatic certificate generation and download when sharing
- Pre-filled share text
- Direct platform links

### 5. **Audio System**
- Background music toggle
- Sound effects for button clicks
- Global sound state management
- LocalStorage persistence for sound preferences

### 6. **User Interface**
- Stanford University-inspired color scheme (Cardinal Red, Palo Alto Green)
- Responsive design with Tailwind CSS
- Animations and visual effects
- Modal pop-ups for results and instructions
- "Cheat Code" button for toolkit cues and references

### 7. **Completion Page**
- Hidden page accessible only after completing all 7 levels
- Certificate generation with player name
- Social sharing options
- Test mode for easy review (`/completion?test=true`)

---

## 🛠️ Technical Stack

- **Framework**: Next.js 14.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **PDF Generation**: pdf-lib
- **State Management**: React Hooks, Context API
- **Storage**: localStorage, sessionStorage
- **Deployment**: Vercel

---

## 📁 Project Structure

```
ethics-lab-p3/
├── app/
│   ├── layout.tsx              # Root layout with header and disclaimer
│   ├── page.tsx                # Homepage with level selection
│   ├── about/page.tsx          # About page
│   ├── play/page.tsx            # Play entry page
│   ├── play/individual/[id]/    # Individual level runner
│   ├── results/[runId]/        # Results page
│   ├── completion/page.tsx      # Completion page
│   └── test-progress/page.tsx   # Progress testing page
├── components/
│   ├── ScenarioCard.tsx        # Main scenario display
│   ├── ToolkitCard.tsx         # Toolkit prompts and actions
│   ├── ResultsModal.tsx        # Results pop-up modal
│   ├── AudioToggle.tsx         # Audio control
│   └── HowToPlayModal.tsx      # Instructions modal
├── lib/
│   ├── save.ts                 # Progress saving/loading
│   ├── player.ts               # Player identification
│   ├── content.ts              # Content loading with Zod validation
│   ├── results.ts              # Result generation
│   ├── scoring.ts              # Scoring algorithm
│   └── completion.ts           # Completion status checking
├── data/
│   └── levels/                 # 7 level JSON files (35 scenarios)
├── public/
│   └── background-music.mp3    # Background audio file
└── scripts/
    └── validate-content.mjs    # Content validation script
```

---

## 🎯 Key Functionality

### Content Management
- Zod schema validation for all scenario data
- Choice-specific quick actions
- Toolkit references and cues
- P3 (People + Planet + Parity) framework integration

### User Experience
- Individualized progress per player
- Auto-resume from saved progress
- Visual feedback and animations
- Responsive design for all devices
- Accessibility considerations

### Results & Scoring
- Detailed choice-specific results
- Benefits and harms display
- Modal pop-up for results
- Certificate generation with completion date

---

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `.gitignore` - Git ignore rules
- `.vercelignore` - Vercel ignore rules

---

## 📝 Documentation Files

- `README.md` - Project overview and quick start
- `DEPLOYMENT.md` - Detailed deployment instructions
- `QUICK-DEPLOY.md` - Quick deployment guide
- `DEPLOYMENT-CHECKLIST.md` - Pre-deployment verification
- `DEPLOYMENT-FIX.md` - Deployment troubleshooting

---

## 🚀 Deployment

### Platform: Vercel
- **URL**: https://ethics-tech-policy-decisions-sandbo.vercel.app
- **Status**: ✅ Live and functional
- **Auto-deployments**: Enabled (on git push to main)

### Build Process
- Build command: `npm run build`
- Output directory: `.next`
- Framework: Next.js (auto-detected)

---

## ✅ Completed Features Checklist

- [x] 7 levels with 35 scenarios
- [x] Individual play mode
- [x] Progress saving (individualized per player)
- [x] Auto-load saved progress
- [x] "Continue Journey" feature
- [x] Certificate generation
- [x] Social sharing (LinkedIn, Twitter, Facebook)
- [x] Audio toggle with background music
- [x] Sound effects
- [x] Results modal with benefits/harms
- [x] Completion page
- [x] Test mode pages
- [x] Stanford branding and colors
- [x] Responsive design
- [x] Content validation
- [x] TypeScript type safety
- [x] Error handling
- [x] Deployment configuration

---

## 🎓 Educational Content

### Stanford Ethics Toolkit Integration
- Toolkit cues for each scenario
- Toolkit references
- T1-T5 tool flow
- Choice-specific potential action steps

### People + Planet + Parity Framework
- P3 cues for each scenario
- Framework integration in decision-making
- Visual representation in results

---

## 📊 Statistics

- **Total Levels**: 7
- **Total Scenarios**: 35 (5 per level)
- **Total Choices**: 105 (3 per scenario)
- **Content Files**: 7 level JSON files
- **Components**: 10+ React components
- **Utility Functions**: 6+ library modules

---

## 🔐 Security & Privacy

- No backend required (all client-side)
- Progress stored in browser localStorage (isolated per player)
- No personal data collection
- No external API calls required
- All content is static JSON files

---

## 🎨 Design System

### Colors
- **Stanford Cardinal Red**: #8C1515
- **Palo Alto Green**: #175E54
- **Stone**: #2E2D29
- **Cool Gray**: #53565A

### Typography
- Headers: Bold, Cardinal Red
- Body: Medium weight, Stone/Gray
- Links: Cardinal Red with hover effects

### Animations
- Bounce animations for interactive elements
- Slide-in animations for cards
- Pulse glow effects
- Shimmer loading states

---

## 📚 Resources & Credits

### Creator
- **Joshua Williams** - [LinkedIn](https://www.linkedin.com/in/joshua-williams-4847944/)

### Course
- **Stanford Ethics, Technology + Public Policy for Practitioners** (SOE-XETECH0001)
- [Course Link](https://online.stanford.edu/courses/soe-xetech0001-ethics-technology-public-policy-practitioners)

### Framework
- **Stanford's Ethics Toolkit** - [Link](https://ethicsinsociety.stanford.edu/tech-ethics/ethics-toolkit)
- **Toolkit Authors**: Manuela Travaglianti, PhD, and Thomas Both

### Disclaimer
This is an independent capstone project by Joshua Williams for the Ethics+Tech Public Policy Practitioner Course; not associated with the Stanford McCoy Family Center for Ethics in Society or its staff.

---

## 🐛 Known Issues & Solutions

### Issue: Hydration Errors
- **Solution**: Fixed by using `useEffect` for client-side only checks
- **Status**: ✅ Resolved

### Issue: TypeScript Build Errors
- **Solution**: Fixed type annotations and Blob type casts
- **Status**: ✅ Resolved

### Issue: Progress Not Loading
- **Solution**: Added auto-load functionality on level page mount
- **Status**: ✅ Resolved

---

## 🔄 Version History

### Latest Version (Deployed)
- All 7 levels complete
- Individualized progress tracking
- Certificate generation
- Social sharing
- Audio system
- All features implemented and tested

### Previous Versions
- Bootstrap phase (replaced with full implementation)
- Individual feature implementations
- UI/UX refinements

---

## 📞 Support & Maintenance

### Testing
- Test progress page: `/test-progress`
- Test completion page: `/completion?test=true`
- Local development: `npm run dev`

### Validation
- Content validation: `npm run validate:content`
- Type checking: `npm run typecheck`
- Build verification: `npm run build`

---

## 🎯 Future Enhancements (Potential)

- [ ] Group play mode
- [ ] Lecture mode with live stats
- [ ] Database integration for analytics
- [ ] User accounts and progress sync
- [ ] Additional levels
- [ ] Multi-language support

---

## 📄 License

This is an independent capstone project. See disclaimer above.

---

## 🙏 Acknowledgments

Thank you for the collaborative development process that brought this project to life. The Ethics-Tech-Policy Decisions Sandbox is now ready for players to explore ethical decision-making in technology and policy.

**Project Status**: ✅ **COMPLETE AND DEPLOYED**

---

*Last Updated: $(date)*
*Deployed: Live on Vercel*
*Version: 1.0.0*

