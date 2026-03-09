# DigitalNerdHQ Blog

A production-ready Next.js 14 blog powered by [Hashnode](https://hashnode.com) as a headless CMS via GraphQL.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/brightafam45/digitalnerdhq-blog&env=HASHNODE_API_KEY,HASHNODE_HOST,NEXT_PUBLIC_SITE_URL&envDescription=See%20.env.example%20for%20required%20variables)

**GitHub:** [brightafam45/digitalnerdhq-blog](https://github.com/brightafam45/digitalnerdhq-blog)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **CMS:** Hashnode (headless via GraphQL)
- **Styling:** Tailwind CSS
- **Fonts:** Inter (Google Fonts)
- **Deployment:** Vercel

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/brightafam45/digitalnerdhq-blog.git
cd digitalnerdhq-blog
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
HASHNODE_API_KEY=your_hashnode_api_key_here
HASHNODE_HOST=yourpublication.hashnode.dev
NEXT_PUBLIC_SITE_URL=https://your-blog-domain.com
```

> **Note:** Never commit `.env.local` to version control. It is listed in `.gitignore`.

Get your Hashnode API key from: [hashnode.com/settings/developer](https://hashnode.com/settings/developer)

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
digitalnerdhq-blog/
├── app/
│   ├── layout.tsx          # Root layout (Header, Footer, NewsletterPopup)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles + article content styles
│   ├── blog/
│   │   ├── page.tsx        # All articles listing
│   │   └── [slug]/
│   │       └── page.tsx    # Single article page
│   └── tags/
│       ├── page.tsx        # All topics index
│       └── [slug]/
│           └── page.tsx    # Tag archive page
├── components/
│   ├── Header.tsx          # Sticky header with mobile nav
│   ├── Footer.tsx          # Footer with newsletter
│   ├── FeaturedPost.tsx    # Hero featured post
│   ├── PostCard.tsx        # Post card (default, large, compact)
│   ├── TagBadge.tsx        # Tag pill badge
│   ├── NewsletterPopup.tsx # Exit-intent newsletter popup
│   ├── NewsletterInline.tsx # Inline newsletter section
│   ├── ArticleContent.tsx  # Safe HTML renderer for articles
│   ├── ReadingProgress.tsx # Scroll-based reading progress bar
│   └── ShareButtons.tsx    # Twitter, LinkedIn, Copy Link
├── lib/
│   └── hashnode.ts         # Hashnode GraphQL client + queries
├── types/
│   └── index.ts            # TypeScript types
├── .env.example            # Example environment variables
├── .env.local              # Your secrets (not committed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository
3. Add environment variables in the Vercel dashboard:
   - `HASHNODE_API_KEY`
   - `HASHNODE_HOST`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

Or use the one-click deploy button at the top of this README.

---

## Newsletter Integration

The newsletter popup and inline forms currently use a simulated submit. To connect a real email provider:

1. Open `components/NewsletterPopup.tsx` and `components/NewsletterInline.tsx`
2. Replace the simulated delay with a real API call:

```ts
// Example with Resend / ConvertKit / Mailchimp
await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
})
```

3. Create `app/api/subscribe/route.ts` with your email provider's SDK.

---

## License

MIT — feel free to use this as a starter for your own Hashnode-powered blog.
