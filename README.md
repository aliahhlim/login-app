This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

Next, run backend:

```bash
nodemon server.js
# or
node server.js
```

Open [http://localhost:4000/user](http://localhost:4000/user) or other URL (based on server.js) with your Postman/ThunderClient extension on vscode to test backend routes and API handling.

In the root of the folder, there's server.js where the API endpoints, post/get methods are and middleware.ts file where middleware are used for protected route purpose.

Next, in the app folder, you can see a page.tsx file which is the initial sign-up page, .env.local file, followed by a few other folders:-

1. Folder 'components'
   - This folder holds the carousel and tables used in other pages (exported to page.tsx for signup, login and homepage).
2. Folder 'users'
   - This folder holds page.tsx file which is the log-in page to access the homepage.
3. Folder 'homepage'
   - This folder have a page.tsx file for the homepage and two subfolders named 'form' containing the application form page.tsx file. Another subfolder named 'view' containing the view page.tsx file. to view selected company details table.
4. Folder 'backend'
   - only contains .env file.
5. Folder 'api'
   - there's a subfolder named 'auth' containing another folder named '[...nextauth]' which contains route.ts file for nextAuth authentication purposes.
