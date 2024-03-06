This project is use for studying PLU (Price look-up) codes, which are a system of numbers that uniquely identify bulk produce sold in retail locations, through quiz. By knowing the PLU codes, we can check the prices of fruits and vegetables by using their PLU codes.

## Getting Started
Create Project
```bash
nvm current
v20.11.0

npx create-next-app@latest --user-yarn
```

Convert Data
```
python internal/csv_to_json.py -i='internal/plu_data.csv' -o='src/data/pluData.ts' -v='PLU_DATA'
```

install
```bash
yarn install
```

Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file.


build and server static:
```
yarn run build
npx serve@latest out
```

## Github Action setting
- pass github page base path (i.e. `/plu-quiz`) to environment vaiable `WEB_BASE_PATH` in `production` enviorment settings
- pass github page url (i.e. `https://kayouwu.github.io/plu-quiz`) to environment vaiable `WEB_URL` in `production` enviorment settings

## Dependencies
- [Tailwind CSS](https://tailwindcss.com/) as css style
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load a custom Google Font.

## Learn More
Src Folder structure:
- /app: Contains all the routes, components, and logic for application.
- /lib: Contains functions used in your application, such as reusable utility functions.
- /ui: Contains static style files.
- /components : Contains all the UI components for application
- /data: Contains data for application
- /public: Contains all the static assets for application, such as images.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Static export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [CSS](https://nextjs.org/docs/pages/building-your-application/styling)
- [Font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- /app/layout.tsx: root layout - UI you add to the root layout will be shared across all pages in your application. You can use the root layout to modify your <html> and <body> tags, and add metadata.
- By having a special name for `page.tsx` files, Next.js allows you to colocate UI components, test files, and other related code with your routes. Only the content inside the page file will be publicly accessible. 
- In Next.js, you can use a special `layout.tsx` file to create UI that is shared between multiple pages.
- `loading.tsx` is a special Next.js file built on top of Suspense, it allows you to create fallback UI to show as a replacement while page content loads.
- `error.tsx` file can be used to define a UI boundary for a route segment. It serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users.
- Links use <a> elements -> There's a full page refresh on each page navigation. In Next.js, <Link> allows you to do [client-side navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works) with JavaScript.
- [Images config](https://nextjs.org/docs/app/api-reference/next-config-js/images)
- [Export with Image Optimization API] (https://nextjs.org/docs/messages/export-image-api)
- [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
