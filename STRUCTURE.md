# Project Structure
```
personal-website/
├── [.github/](./.github)              → GitHub Actions setup  
├── node_modules/                      → Auto-generated dependencies  
├── [public/](./public)               → Static assets (images, icons, etc.)  
├── [src/](./src)
│   ├── [app/](./src/app)              → Entry point for all routes  
│   │   ├── [layout.js](./src/app/layout.js)     → Global layout wrapper  
│   │   ├── [page.js](./src/app/page.js)         → Homepage  
│   │   ├── [posts/](./src/app/posts)  
│   │   │   ├── [[id]/](./src/app/posts/[id])    → Dynamic route  
│   │   │   └── [page.js](./src/app/posts/page.js) → Possibly redundant  
│   │   └── [api/](./src/app/api)                → Internal API routes  
│   ├── [components/](./src/components)          → Reusable UI components  
│   │   ├── [PostCard.js](./src/components/PostCard.js)  
│   │   ├── [PostList.js](./src/components/PostList.js)  
│   │   ├── [LoadingSpinner.js](./src/components/LoadingSpinner.js)  
│   │   └── [CategorySelector.js](./src/components/CategorySelector.js)  
│   ├── [hooks/](./src/hooks)                    → Custom React hooks  
│   ├── [lib/](./src/lib)                        → Backend helpers  
│   ├── [globals.css](./src/globals.css)         → Global styles  
├── [jsconfig.json](./jsconfig.json)            → Path alias config (@/)
```