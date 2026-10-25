# 링크나무 Next.js 프로젝트 초기 설정 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize a Next.js 14 project with core components (profile display, link cards, dark mode toggle) and MongoDB integration for click tracking.

**Architecture:** Next.js 14 App Router structure with Tailwind CSS for styling. Public profile page at `/[username]` serves user's links. Click events POST to API route which logs to MongoDB. Dark mode state managed via React Context and localStorage.

**Tech Stack:** Next.js 14, React 19, Tailwind CSS, MongoDB Atlas, TypeScript

**Spec:** `PRD.md`

## Global Constraints

- Use TypeScript throughout
- Mobile-first responsive design (Tailwind CSS)
- Components in `src/components/`
- Environment variables in `.env.local` (never committed)
- Dark mode support via system preference + user toggle
- Click tracking requires MongoDB connection string

## Review Focus

1. **Missing user data:** Profile page displays undefined/empty data if user not found in DB
2. **Click tracking race condition:** Multiple rapid clicks might not all be recorded if DB write is async
3. **Dark mode persistence:** User's theme preference lost on page reload if localStorage not initialized
4. **Responsive layout:** Mobile view may break if link cards not properly constrained
5. **MongoDB connection errors:** Silent failures if connection string invalid or DB unreachable

---

## File Structure

```
linknamu/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with dark mode provider
│   │   ├── page.tsx            # Home/landing page (redirect or info)
│   │   ├── [username]/
│   │   │   └── page.tsx        # Public profile page
│   │   └── api/
│   │       └── clicks/
│   │           └── route.ts    # POST endpoint for tracking clicks
│   ├── components/
│   │   ├── ProfileCard.tsx     # Displays name, bio, photo
│   │   ├── LinkCard.tsx        # Individual link card
│   │   ├── DarkModeToggle.tsx  # Theme toggle button
│   │   └── LinkCardList.tsx    # List of link cards
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark mode state management
│   ├── lib/
│   │   └── mongodb.ts          # MongoDB connection utility
│   └── types/
│       └── index.ts            # TypeScript types
├── public/
├── .env.local                  # Local environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Initialize Next.js 14 Project and Install Dependencies

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

**Interfaces:**
- Produces: Node project with Next.js 14, React 19, TypeScript, Tailwind CSS ready to use

- [ ] **Step 1: Initialize Next.js 14 project in current directory**

Run: `cd /Users/shinhwankim/linknamu && npx create-next-app@latest . --typescript --tailwind --app --no-git --import-alias '@/*'`

Choose options: TypeScript (Yes), ESLint (Yes), Tailwind (Yes), src/ directory (Yes), App Router (Yes)

- [ ] **Step 2: Verify project structure**

Run: `ls -la /Users/shinhwankim/linknamu/src/app/`

Expected: Shows `layout.tsx`, `page.tsx`

- [ ] **Step 3: Install MongoDB driver**

Run: `cd /Users/shinhwankim/linknamu && npm install mongodb dotenv`

- [ ] **Step 4: Create .env.local file with placeholder**

Create `.env.local` with:
```
MONGODB_URI=your_mongodb_connection_string_here
```

- [ ] **Step 5: Verify installations**

Run: `npm list next react tailwindcss mongodb`

Expected: All packages installed with correct versions

- [ ] **Step 6: Commit**

```bash
cd /Users/shinhwankim/linknamu
git init
git add .gitignore next.config.ts tsconfig.json tailwind.config.ts postcss.config.mjs package.json package-lock.json
git commit -m "chore: initialize Next.js 14 project with Tailwind CSS and MongoDB"
```

---

## Task 2: Set Up Dark Mode Context and Theme Provider

**Files:**
- Create: `src/context/ThemeContext.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `ThemeProvider` component and `useTheme()` hook for accessing `isDark: boolean` state
- Produces: `useTheme()` returns `{ isDark, toggleTheme }`

- [ ] **Step 1: Create ThemeContext.tsx**

Create `src/context/ThemeContext.tsx` with:
- React Context for theme state (`isDark: boolean`)
- `useTheme()` hook to access context
- `ThemeProvider` component that:
  - Reads localStorage for saved theme preference
  - Falls back to system preference via `prefers-color-scheme`
  - Provides `isDark` state and `toggleTheme()` function
  - Updates `<html>` class to "dark" when `isDark === true`

- [ ] **Step 2: Write test for ThemeContext**

Create `src/context/__tests__/ThemeContext.test.tsx` with:
```typescript
test("ThemeProvider initializes with system preference", () => {
  // Should set isDark based on prefers-color-scheme
})

test("toggleTheme updates isDark and localStorage", () => {
  // Should toggle isDark and persist to localStorage
})
```

- [ ] **Step 3: Update root layout to use ThemeProvider**

Modify `src/app/layout.tsx`:
- Import `ThemeProvider`
- Wrap children with `<ThemeProvider>`
- Add `<html className="..." dir="ltr">` to apply dark class

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: Tests pass

- [ ] **Step 5: Commit**

```bash
git add src/context/ThemeContext.tsx src/context/__tests__/ThemeContext.test.tsx src/app/layout.tsx
git commit -m "feat: add dark mode context and theme provider"
```

---

## Task 3: Create Core Component Types and Utilities

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/mongodb.ts`

**Interfaces:**
- Produces: TypeScript types: `UserProfile`, `LinkItem`, `ClickRecord`
- Produces: `getMongoClient()` async function returning MongoDB client

- [ ] **Step 1: Define TypeScript types**

Create `src/types/index.ts`:
```typescript
export interface UserProfile {
  username: string;
  name: string;
  bio: string;
  photoUrl: string;
  links: LinkItem[];
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  clickCount: number;
}

export interface ClickRecord {
  linkId: string;
  username: string;
  timestamp: Date;
}
```

- [ ] **Step 2: Create MongoDB utility**

Create `src/lib/mongodb.ts`:
- Export `getMongoClient()` that creates/reuses MongoDB client
- Should use connection string from `process.env.MONGODB_URI`
- Throw clear error if MONGODB_URI not set

- [ ] **Step 3: Verify types are importable**

Run: `npx tsc --noEmit` to verify TypeScript compilation

Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/types/index.ts src/lib/mongodb.ts
git commit -m "feat: add TypeScript types and MongoDB utility"
```

---

## Task 4: Create Reusable UI Components

**Files:**
- Create: `src/components/ProfileCard.tsx`
- Create: `src/components/LinkCard.tsx`
- Create: `src/components/DarkModeToggle.tsx`
- Create: `src/components/LinkCardList.tsx`

**Interfaces:**
- `ProfileCard`: accepts `{ name: string, bio: string, photoUrl: string }`
- `LinkCard`: accepts `{ title: string, url: string, clickCount: number, onClickTracked: () => void }`
- `DarkModeToggle`: no props, uses `useTheme()` hook
- `LinkCardList`: accepts `{ links: LinkItem[] }`

- [ ] **Step 1: Create ProfileCard component**

Create `src/components/ProfileCard.tsx`:
- Display user profile with photo, name, and bio
- Responsive: mobile-first with Tailwind
- Use `next/image` for photo with proper sizing

- [ ] **Step 2: Create LinkCard component**

Create `src/components/LinkCard.tsx`:
- Display single link as clickable card
- Show title and click count
- On click, POST to `/api/clicks` with link info, then navigate to URL
- Display loading state during POST

- [ ] **Step 3: Create DarkModeToggle component**

Create `src/components/DarkModeToggle.tsx`:
- Button that uses `useTheme()` hook
- Show sun/moon icon based on current theme
- Call `toggleTheme()` on click

- [ ] **Step 4: Create LinkCardList component**

Create `src/components/LinkCardList.tsx`:
- Accepts array of `LinkItem[]`
- Maps to `<LinkCard>` components
- Pass `onClickTracked` callback to each card

- [ ] **Step 5: Verify components compile**

Run: `npx tsc --noEmit`

Expected: No type errors

- [ ] **Step 6: Commit**

```bash
git add src/components/ProfileCard.tsx src/components/LinkCard.tsx src/components/DarkModeToggle.tsx src/components/LinkCardList.tsx
git commit -m "feat: add core UI components (ProfileCard, LinkCard, DarkModeToggle, LinkCardList)"
```

---

## Task 5: Create Click Tracking API Route

**Files:**
- Create: `src/app/api/clicks/route.ts`

**Interfaces:**
- Consumes: POST request with JSON `{ username: string, linkId: string }`
- Produces: JSON response `{ success: boolean, message: string }`

- [ ] **Step 1: Create clicks API route**

Create `src/app/api/clicks/route.ts`:
- Handle POST requests
- Extract `username` and `linkId` from request body
- Insert click record into MongoDB `clicks` collection
- Increment click count for that link in user's profile
- Return `{ success: true, message: "Click recorded" }`
- Return 400 if username or linkId missing
- Return 500 if MongoDB write fails

- [ ] **Step 2: Write test for click tracking**

Create test that:
- POSTs to `/api/clicks` with valid data
- Verifies MongoDB insert was called
- Verifies response is `{ success: true }`

- [ ] **Step 3: Test the API route locally**

Run: `npm run dev` and use curl/Postman to POST to `/api/clicks`

Expected: Returns success response

- [ ] **Step 4: Commit**

```bash
git add src/app/api/clicks/route.ts
git commit -m "feat: add click tracking API endpoint"
```

---

## Task 6: Create Public Profile Page

**Files:**
- Create: `src/app/[username]/page.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `username` from URL params
- Fetches: User profile from MongoDB
- Produces: Rendered page with ProfileCard and LinkCardList

- [ ] **Step 1: Create [username]/page.tsx**

Create `src/app/[username]/page.tsx`:
- Extract `username` from params
- Fetch user profile from MongoDB
- If not found, return 404 page
- Render `<ProfileCard>` with user data
- Render `<DarkModeToggle>` in header
- Render `<LinkCardList>` with user's links
- Apply Tailwind styling: dark mode support, responsive layout

- [ ] **Step 2: Handle missing user gracefully**

Add 404 fallback UI:
- Display "User not found" message
- Suggest checking the URL

- [ ] **Step 3: Update root page.tsx**

Modify `src/app/page.tsx`:
- Display info about the 링크나무 service
- Link to example profile (or instructions)
- Call-to-action: "Share your links in one place"

- [ ] **Step 4: Test profile page locally**

Run: `npm run dev`

Expected: Homepage loads, profile page displays with placeholder data (or 404 if user doesn't exist)

- [ ] **Step 5: Commit**

```bash
git add src/app/\[username\]/page.tsx src/app/page.tsx
git commit -m "feat: create public profile page and landing page"
```

---

## Task 7: Add Tailwind Dark Mode Styling and Responsive Design

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/ProfileCard.tsx`
- Modify: `src/components/LinkCard.tsx`
- Modify: `src/components/DarkModeToggle.tsx`
- Modify: `src/app/[username]/page.tsx`

**Interfaces:**
- No new interfaces; refines existing component styling

- [ ] **Step 1: Configure Tailwind for dark mode**

Modify `tailwind.config.ts`:
- Set `darkMode: 'class'` to enable manual dark mode
- Define custom color scheme (optional, use Tailwind defaults for MVP)

- [ ] **Step 2: Add dark mode styles to ProfileCard**

Update `src/components/ProfileCard.tsx`:
- Add `dark:bg-gray-900 dark:text-white` classes
- Ensure photo has proper contrast in both modes
- Mobile-first: stack layout on small screens

- [ ] **Step 3: Add dark mode styles to LinkCard**

Update `src/components/LinkCard.tsx`:
- Background: `bg-white dark:bg-gray-800`
- Text: `text-gray-900 dark:text-white`
- Border: `border-gray-200 dark:border-gray-700`
- Hover: `hover:shadow-lg dark:hover:shadow-gray-700/50`
- Responsive padding and sizing

- [ ] **Step 4: Style DarkModeToggle**

Update `src/components/DarkModeToggle.tsx`:
- Position in header (sticky or fixed)
- Icon colors: yellow sun in light mode, white moon in dark mode
- Smooth transition between icons

- [ ] **Step 5: Update profile page layout**

Update `src/app/[username]/page.tsx`:
- Header with DarkModeToggle, user name
- Profile section with photo, bio
- Links section with LinkCardList
- Footer (optional)
- Responsive: 1 column mobile, potentially wider on desktop

- [ ] **Step 6: Test responsive design**

Run: `npm run dev` and check at mobile (375px), tablet (768px), desktop (1024px) widths

Expected: Layout adapts properly, dark mode works

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.ts src/components/ProfileCard.tsx src/components/LinkCard.tsx src/components/DarkModeToggle.tsx src/app/\[username\]/page.tsx
git commit -m "style: add dark mode and responsive design with Tailwind CSS"
```

---

## Task 8: Create Example Seed Data and Test Locally

**Files:**
- Create: `scripts/seed.ts` (optional)
- Create or update: `.env.local`

**Interfaces:**
- Produces: Test user profile in MongoDB for local testing

- [ ] **Step 1: Create seed script**

Create `scripts/seed.ts`:
- Connect to MongoDB
- Insert sample user profile with test links:
  ```
  {
    username: "demo",
    name: "Demo User",
    bio: "This is a demo",
    photoUrl: "https://via.placeholder.com/150",
    links: [
      { id: "1", title: "Portfolio", url: "https://example.com", clickCount: 0 },
      { id: "2", title: "GitHub", url: "https://github.com", clickCount: 0 }
    ]
  }
  ```

- [ ] **Step 2: Run seed script**

Run: `npx ts-node scripts/seed.ts`

Expected: Sample data inserted into MongoDB

- [ ] **Step 3: Test profile page locally**

Run: `npm run dev` and navigate to `http://localhost:3000/demo`

Expected: Profile page displays with sample data

- [ ] **Step 4: Test dark mode toggle**

Click toggle button; page should switch between light and dark modes, persisting on reload

Expected: Theme persists after page refresh

- [ ] **Step 5: Test click tracking**

Click a link; should POST to `/api/clicks` and navigate to URL

Check MongoDB: click count should increase

- [ ] **Step 6: Commit**

```bash
git add scripts/seed.ts
git commit -m "test: add seed script for local testing"
```

---

## Task 9: Add Basic Metadata and SEO

**Files:**
- Modify: `src/app/[username]/page.tsx`
- Modify: `next.config.ts`

**Interfaces:**
- Produces: Proper page title, description, and Open Graph metadata per user

- [ ] **Step 1: Add metadata generation function**

Update `src/app/[username]/page.tsx`:
- Export `generateMetadata` function
- Set title to user's name
- Set description to user's bio
- Add Open Graph image (user's photo)

- [ ] **Step 2: Update root layout metadata**

Update `src/app/layout.tsx`:
- Add default metadata: title "링크나무", description from PRD

- [ ] **Step 3: Verify metadata renders**

Run: `npm run dev` and check page source

Expected: `<title>`, `<meta name="description">`, Open Graph tags present

- [ ] **Step 4: Commit**

```bash
git add src/app/\[username\]/page.tsx src/app/layout.tsx
git commit -m "feat: add SEO metadata and Open Graph tags"
```

---

## Task 10: Write Documentation and Final Setup

**Files:**
- Create or update: `README.md`
- Create: `.env.example`

**Interfaces:**
- Produces: Setup instructions for running the project locally and deploying to Vercel

- [ ] **Step 1: Create .env.example**

Create `.env.example`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

- [ ] **Step 2: Write README.md**

Create/update `README.md`:
- Project overview (from PRD)
- Setup instructions: `npm install`, configure `.env.local`
- Running locally: `npm run dev`
- Running tests: `npm test`
- Deployment to Vercel (with env vars setup)
- File structure overview
- Tech stack

- [ ] **Step 3: Review git history**

Run: `git log --oneline`

Expected: Clean commit history with clear messages

- [ ] **Step 4: Final verification**

Run full test suite:
```bash
npm run dev
npm run build
```

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add README.md .env.example
git commit -m "docs: add setup instructions and environment configuration"
```

---

## Decisions Made (for you to review)

1. **Scope:** Public profile view only—no admin dashboard yet. Can be added as follow-up feature.
2. **Dark mode:** Managed via React Context with localStorage persistence and system preference fallback.
3. **Click tracking:** Synchronous POST to API route (not queued). If this becomes a bottleneck, can switch to async.
4. **Database schema:** Denormalized—click count stored on LinkItem for easy display.
5. **No authentication:** This MVP assumes public profiles only.

---

## Next Steps

Plan complete and saved to `docs/superpowers/plans/2026-10-24-nextjs-project-initialization.md`. 

**Which execution approach would you prefer?**

- **Subagent-driven** — A fresh subagent implements each task, then a reviewer checks it before the next one starts. Most thorough, but slower.
- **Native** — I implement all tasks myself in this session, then we review the whole branch at the end. Fastest.

**I recommend Native** because the tasks are sequential with clear interfaces, and you can iterate quickly if anything needs adjustment. Does the plan capture what you want?