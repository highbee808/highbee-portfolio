-- Supabase Migration Script
-- Run this in Supabase SQL Editor after creating the blog_posts table

-- First, create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  category TEXT DEFAULT 'General',
  category_color TEXT DEFAULT 'general',
  date TEXT NOT NULL,
  read_time TEXT DEFAULT '1 min read',
  cover_image TEXT,
  content TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  featured_on_homepage BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert existing blog posts
INSERT INTO blog_posts (slug, title, excerpt, category, category_color, date, read_time, cover_image, content, published, featured_on_homepage, created_at, updated_at) VALUES

-- Post 1: Building an AI Chat Widget
('building-an-ai-chat-widget-that-actually-converts-visitors',
'Building an AI Chat Widget That Actually Converts Visitors',
'I spent three weeks building a chat widget that would make visitors stay longer. Here''s what I learned about AI conversations that actually work.',
'AI Development',
'ai',
'January 8, 2026',
'6 min read',
NULL,
E'You know that feeling when someone lands on your portfolio and leaves in 10 seconds? Yeah, I was tired of it too.\n\nI''d been watching my analytics for months, seeing decent traffic but terrible engagement. People would hit my homepage and bounce faster than a bad date. Something had to change.\n\nThat''s when I decided to build an AI chat widget. Not one of those generic \"How can I help you?\" things that everyone ignores, but something that would actually start conversations about my work.\n\n## Why Most Chat Widgets Fail (And What I Did Differently)\n\nHere''s the thing about most portfolio chat widgets – they''re built backwards. They wait for visitors to ask questions instead of proactively engaging with what people actually want to know.\n\nI spent a week analyzing the emails and messages I get from potential clients. Turns out, 90% of them ask the same five questions:\n- What''s your experience with [specific technology]?\n- How long would a project like [their idea] take?\n- What''s your typical project process?\n- Can you show me similar work you''ve done?\n- What are your rates?\n\nSo instead of building a reactive chat bot, I built one that anticipates these questions and steers conversations toward them naturally.\n\n## The Technical Stack (Keep It Simple)\n\nI went with a surprisingly minimal setup:\n\n```typescript\n// Core dependencies\n{\n  \"@anthropic-ai/sdk\": \"^0.20.0\",\n  \"next\": \"^14.0.0\",\n  \"react\": \"^18.0.0\",\n  \"framer-motion\": \"^10.16.0\"\n}\n```\n\nYeah, that''s it. No complex state management, no fancy chat libraries. Just Claude''s API, Next.js for the backend route, and Framer Motion for smooth animations.\n\nThe widget itself is a floating button that expands into a chat interface. I''ve seen too many widgets that take over the entire screen – nobody wants that.\n\n## What I Learned About AI Conversations\n\nAfter three months of real conversations, here''s what actually works:\n\n**People want specific examples.** Generic responses kill engagement. When someone asks about React experience, the AI mentions specific projects from my portfolio with actual details.\n\n**Timing matters more than content.** The widget waits 30 seconds before showing a subtle pulse animation. Too early and it''s annoying, too late and people have already left.\n\n**Questions beat statements.** Instead of \"I can help you with your project,\" responses like \"What kind of app are you thinking of building?\" get much better engagement.\n\n**Admit limitations quickly.** When the AI doesn''t know something, it says so immediately and suggests contacting me directly. People respect honesty.\n\n## The Results (And Some Surprises)\n\nSince launching the chat widget:\n- Average session duration up 40%\n- Contact form submissions up 25%\n- But here''s the weird part – most people don''t actually send messages\n\nTurns out, just having an intelligent chat option makes the whole site feel more approachable. Even visitors who never open the widget seem to browse longer.\n\nI''ve had conversations turn into actual projects three times now. Not bad for a weekend side project that cost me $12 in API calls last month.\n\n## Quick Wins You Can Implement Today\n\n- Start with a simple floating button – don''t overthink the design\n- Write your system prompt in your own voice, then make it slightly more helpful\n- Log conversations to understand what people actually want to know\n- Set a reasonable token limit to keep responses focused\n- Test the timing – when does the widget appear and how does it get attention?\n- Make it mobile-friendly from day one (60% of my conversations happen on mobile)\n\nBuilding this chat widget taught me more about my potential clients than any analytics dashboard ever could. Sometimes the best way to understand your audience is just to start a conversation.\n\nWhat would you want to ask an AI about someone''s portfolio? I''m curious if your questions would be different from what I''m seeing.',
true,
true,
'2026-01-08T02:36:42.159Z',
'2026-01-08T02:43:05.470Z'),

-- Post 2: Dark Mode Implementation
('why-your-dark-mode-implementation-sucks-and-how-to-fix-it',
'Why Your Dark Mode Implementation Sucks (And How to Fix It)',
'Most dark modes are just inverted colors that hurt your eyes. Here''s how to build one that users actually want to keep enabled.',
'Design',
'design',
'January 8, 2026',
'5 min read',
'https://images.pexels.com/photos/35247198/pexels-photo-35247198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
E'You''ve seen it everywhere. That jarring flash of white when switching to dark mode. The washed-out grays that make text barely readable. The neon blues that feel like staring into a flashlight.\n\nI''ve shipped dark mode features for three different products over the past two years, and I learned the hard way that flipping colors isn''t enough. Users will enable your dark mode once, squint at the screen for thirty seconds, then switch back to light mode forever.\n\n## The Problem with \"Flip Everything Dark\"\n\nMost developers (myself included, initially) approach dark mode like this:\n\n```css\n/* The wrong way */\n[data-theme=\"dark\"] {\n  --background: #000000;\n  --text: #ffffff;\n  --border: #333333;\n}\n```\n\nThis creates what I call \"inverted color syndrome.\" Pure black backgrounds cause eye strain because of the extreme contrast. White text on pure black creates a halation effect where the text appears to glow and blur slightly.\n\n## Building a Proper Dark Palette\n\nHere''s the system I use now:\n\n```css\n:root {\n  /* Light mode */\n  --surface-1: #ffffff;\n  --surface-2: #f8f9fa;\n  --surface-3: #e9ecef;\n  --text-primary: #212529;\n  --text-secondary: #6c757d;\n}\n\n[data-theme=\"dark\"] {\n  /* Dark mode - notice these aren''t inversions */\n  --surface-1: #1a1a1a;\n  --surface-2: #2d2d2d;\n  --surface-3: #404040;\n  --text-primary: #e0e0e0;\n  --text-secondary: #a0a0a0;\n}\n```\n\nThe magic is in the relationships, not the individual colors. Your darkest background should never be pure black (#000000). I typically start with #1a1a1a or #121212.\n\nFor text, pure white (#ffffff) creates too much contrast. #e0e0e0 or #f0f0f0 gives you excellent readability without the eye strain.\n\nDark mode done right feels effortless - users don''t think about it, they just appreciate that their eyes don''t hurt during late-night coding sessions. That''s the implementation worth shipping.',
true,
true,
'2026-01-08T02:56:25.422Z',
'2026-01-08T02:58:32.205Z'),

-- Post 3: Side Projects
('side-projects-that-actually-help-your-career-not-just-your-github-stars',
'Side Projects That Actually Help Your Career (Not Just Your GitHub Stars)',
'Most side projects developers build are impressive technically but useless professionally. Here''s how to build projects that actually open doors.',
'General',
'general',
'January 8, 2026',
'6 min read',
'https://images.pexels.com/photos/5816307/pexels-photo-5816307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
E'Your side project has 1,247 GitHub stars, uses the latest React features, and has perfect TypeScript coverage. But when you mention it in interviews, you get polite nods and topic changes. Sound familiar?\n\nI''ve built plenty of \"impressive\" projects that went nowhere professionally. A real-time chat app that nobody used. A perfectly architected todo app (because the world needed another one). A blockchain voting system that solved problems nobody had.\n\nThen I started building different types of projects. Projects that led to freelance clients, job offers, and actual conversations with other developers. The difference wasn''t the tech stack—it was the approach.\n\n## Build Solutions, Not Showcases\n\nMost developers build projects to demonstrate technical skills. That''s backwards. The projects that help your career solve real problems for real people, even if the code isn''t perfect.\n\nLast year, I built a simple invoice generator for Nigerian freelancers. The code was straightforward—Next.js, a form, PDF generation. Nothing fancy. But it solved a specific pain point: most invoicing tools didn''t handle Nigerian tax requirements or support local payment methods.\n\nThat \"simple\" project led to three freelance contracts and a job interview where the CTO spent twenty minutes asking about the business decisions, not the technical implementation.\n\nThe lesson? Build something people actually want to use. Start with the problem, not the technology.\n\n## Practical Takeaways\n\n- Start with problems you actually have, not technologies you want to learn\n- Document your decision-making process as you build\n- Use boring, proven technology that companies recognize\n- Spend time on production concerns: error handling, security, performance\n- Write about what you learned, not just what you built\n- Choose projects that align with companies you want to work for\n- Make sure real people can actually use your project\n\nThe side projects that boost careers aren''t the most technically impressive ones. They''re the projects that show you can identify real problems, make thoughtful technical decisions, and build solutions that people actually use.\n\nWhat problem are you going to solve next?',
false,
false,
'2026-01-08T11:20:59.854Z',
'2026-01-08T11:23:26.277Z'),

-- Post 4: AI Streaming Costs
('the-hidden-cost-of-ai-streaming-why-your-real-time-features-are-bleeding-money',
'The Hidden Cost of AI Streaming: Why Your Real-Time Features Are Bleeding Money',
'That smooth AI chat experience? It''s probably costing you 3x more than you think. Here''s why streaming responses might be draining your budget.',
'AI Development',
'ai',
'January 8, 2026',
'5 min read',
'https://images.pexels.com/photos/12233685/pexels-photo-12233685.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
E'I learned this the hard way when my client''s AI chat feature racked up $847 in OpenAI costs in a single weekend. The culprit? A seemingly innocent streaming implementation that was burning through tokens like a Formula 1 car burns through fuel.\n\nStreaming AI responses feels magical – users see words appearing in real-time, creating that smooth ChatGPT-like experience we''ve all grown to love. But behind that polished interface lies a costly reality that most developers don''t discover until they get their first eye-watering bill.\n\n## The Token Math That Doesn''t Add Up\n\nHere''s what I wish someone had told me: streaming doesn''t just send you the new tokens. Most implementations resend context with every chunk, and that context multiplies fast.\n\nThe math gets brutal quickly:\n- Non-streaming: ~4,000 total tokens processed\n- Streaming: ~53,000 total tokens processed\n- Cost difference: 13x more expensive\n\n## Smart Alternatives That Actually Work\n\nAfter getting burned by streaming costs, I''ve developed a few strategies that give users great UX without the price tag:\n\n**Option 1: Fake streaming with chunked display**\n\nThis costs exactly what a non-streaming request costs, but still gives users that satisfying progressive disclosure.\n\n**Option 2: Hybrid approach for long responses**\n\nI use non-streaming for responses under 200 tokens (most interactions), and only stream for longer generations where users actually benefit from seeing progress.\n\nThe AI gold rush has made it easy to ignore costs while chasing the latest UX trends. But as these tools become core to our products, understanding the economics becomes crucial. Sometimes the best user experience is simply one that doesn''t bankrupt your startup.\n\nHave you noticed streaming costs creeping up in your projects? I''m curious how others are balancing UX with the realities of token economics.',
false,
false,
'2026-01-08T11:25:39.841Z',
'2026-01-08T11:26:03.439Z'),

-- Post 5: AI Agents in Production
('building-ai-agents-that-actually-work-in-production',
'Building AI Agents That Actually Work in Production',
'Most AI agents fail spectacularly in production. After shipping 12+ agent systems, here''s what separates the demos from the deployments.',
'AI Development',
'ai',
'January 8, 2026',
'5 min read',
'https://images.pexels.com/photos/7937744/pexels-photo-7937744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
E'Your AI agent works perfectly in your local environment. It responds intelligently, handles edge cases gracefully, and impresses everyone in demos. Then you deploy it to production and... it starts hallucinating prices, gets stuck in infinite loops, and somehow convinced three customers that your refund policy is \"just ask nicely.\"\n\nI''ve been there. Multiple times.\n\nAfter building and deploying over a dozen AI agent systems in the past year—from customer service bots to code review assistants—I''ve learned that production-ready agents require a completely different mindset than proof-of-concept demos. The difference isn''t just about scale; it''s about predictability, control, and graceful failure.\n\n## The Production Reality Check\n\nHere''s what nobody tells you about AI agents in production: they''re not autonomous systems that think for themselves. They''re sophisticated pattern-matching tools that need guardrails, monitoring, and fallback strategies for every possible failure mode.\n\nThe most successful agent I''ve deployed handles customer support for a SaaS platform. It resolves about 73% of tickets without human intervention. But here''s the key—it''s designed to fail gracefully the other 27% of the time. When it encounters something outside its training, it doesn''t guess. It escalates.\n\n## Constraint-Driven Development\n\nThe biggest shift in my thinking came when I stopped trying to make agents more intelligent and started making them more constrained. Production agents need boundaries—lots of them.\n\n## Making the Decision\n\nHere''s my framework for deciding when to use AI agents:\n\n- Define your constraints first, capabilities second\n- Implement confidence thresholds and escalation paths before building response generation\n- Create a monitoring dashboard that tracks intent accuracy, not just response times\n- Build your human-in-the-loop workflow from day one\n- Test with chaos inputs, not just happy path scenarios\n- Plan for failure modes—what happens when the LLM API is down?\n\nThe agents that succeed in production aren''t the smartest ones. They''re the most predictable, most monitored, and most willing to admit when they don''t know something. In a world of AI hype, that kind of humility is surprisingly powerful.\n\nWhat''s been your experience with AI agents in production? I''m always curious about the failure modes others have encountered—they''re often the best learning opportunities.',
true,
false,
'2026-01-08T11:34:06.432Z',
'2026-01-08T11:45:12.950Z'),

-- Post 6: React Server Components
('react-server-components-when-to-actually-use-them-and-when-to-skip-them',
'React Server Components: When to Actually Use Them (And When to Skip Them)',
'Server Components aren''t magic—they''re a specific tool for specific problems. Here''s when they actually make sense in your projects.',
'typescript',
'typescript',
'January 8, 2026',
'6 min read',
'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
E'Everyone''s talking about React Server Components like they''re the solution to every performance problem. But after implementing them in several production apps, I''ve learned they''re more like a specialized tool than a universal upgrade.\n\nThe hype is real, but so are the gotchas. Server Components fundamentally change how React works, and that comes with trade-offs most tutorials don''t mention.\n\n## What Server Components Actually Solve\n\nServer Components tackle one specific problem: reducing JavaScript bundle size while maintaining the component-based development experience we love. They render on the server and send HTML to the client, but unlike traditional SSR, they can fetch data and render without any client-side JavaScript.\n\nHere''s the key insight I''ve discovered: **Server Components shine when you have data-heavy UI that doesn''t need interactivity**. Think product listings, blog content, or dashboard summaries.\n\n## When Server Components Make Sense\n\nAfter shipping several projects with Server Components, here are the scenarios where I reach for them:\n\n**Heavy Data Display Pages** - Dashboards, reports, or any page that shows lots of data but has minimal interactivity.\n\n**SEO-Critical Content** - Blog posts, product pages, or marketing content where you need perfect SEO and fast initial page loads.\n\n**Progressive Enhancement Scenarios** - When you want the page to work without JavaScript but enhance with client-side features.\n\n## When to Skip Server Components\n\n**Highly Interactive UIs** - If your component needs lots of state management, event handlers, or real-time updates, Client Components are simpler.\n\n**Third-Party Library Heavy** - Many popular React libraries aren''t Server Component compatible yet.\n\n**Small Applications** - If your entire app is under 100KB of JavaScript, the complexity of managing Server/Client boundaries might outweigh the bundle size benefits.\n\n## Making the Decision\n\nHere''s my framework for deciding when to use Server Components:\n\n- Start with Client Components for interactive features—they''re simpler and more predictable\n- Use Server Components for data-heavy, mostly static content\n- Consider the team—Server Components require everyone to understand the mental model\n- Measure actual impact—bundle size and performance improvements should be measurable\n- Plan the architecture—design your Server/Client boundaries upfront, don''t retrofit\n\nServer Components aren''t a silver bullet, but they''re a valuable tool when applied thoughtfully. The key is understanding they''re an optimization for specific use cases, not a wholesale replacement for how React works.\n\nWhat''s your experience been with Server Components? I''m curious if you''ve hit similar architectural challenges or found different patterns that work well.',
false,
false,
'2026-01-08T12:56:35.690Z',
'2026-01-08T12:56:35.690Z');
