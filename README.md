# Recipe-Finding Web App

A recipe-finding and browsing web application to explore recipes with search, filters, trending recipes, user registration and profile management.
it is built using Remix js full-stack with typescript and tailwind css and uses a modern web tech-stack

---

## Features

- **Search**: Search recipes by name or ingredients.
- **Filters**: Filter recipes based on meal type, cuisine, and dietary restrictions.
- **Trending Recipes**: View popular recipes at the homepage.
- **Recipe Details**: View detailed information for individual recipes, including ingredients, instructions, and nutrition facts.
- **User Authentication**: Login, signup, and manage user profiles.
- **Responsive Design**: Fully responsive and mobile-friendly design.
- **Performance Optimized**: Virtualized recipe list for faster rendering of large datasets.

---

## Tech Stack

- **Frontend**:

  - [Remix JS v2](https://remix.run) (Server-Side Rendering, routing)
  - [TypeScript](https://www.typescriptlang.org) (For type checking)
  - [Tailwind CSS](https://tailwindcss.com) (Utility-first CSS framework)
  - [TanStack/React Query](https://tanstack.com/query) (API state management)
  - [TanStack/React Virtual](https://tanstack.com/virtual) (Virtualized list rendering)

- **Backend**:

  - [Prisma](https://www.prisma.io) (ORM for database interactions)
  - [PostgreSQL](https://www.postgresql.org) (Relational database)
  - [AWS RDS](https://aws.amazon.com/rds/) (Database hosting)
  - [Vitest](https://vitest.dev) (Testing framework)
  - [Remix Loaders/Actions](https://remix.run/docs/en/v2/loaders) (Server-side data fetching and mutation handling)

- **Deployment**:
  - [Vercel](https://vercel.com) (App deployment and hosting)
  - [AWS RDS](https://aws.amazon.com/rds/) (Database hosting)

---

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn (package manager)
- PostgreSQL database (with credentials)

### Steps to Set Up Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/hassanahmedk/recipe-mania.git
   cd recipe-mania
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```bash
   DATABASE_URL=your-database-url-here
   SESSION_SECRET=your-session-secret-here
   API_KEY=spoonacular-api-key
   VITE_API_KEY=spoonacular-api-key
   API_URL=spoonacular-api-url
   VITE_API_URL=spoonacular-api-url
   SECRET_KEY=your-jwt-secret
   ```

4. Set up the PostgreSQL database using Prisma:

   - Start your database (on AWS RDS or local).
   - Run the Prisma migration to set up your database schema:
     ```bash
     npx prisma migrate dev
     ```

5. Run the app locally:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open the app in your browser:
   - Navigate to [http://localhost:5173](http://localhost:5173).

---

## Features and Functionality

### Frontend

- **Search**: Users can search recipes by name or cuisine type.
- **Filters**: Multiple filters for meal type (e.g., breakfast, lunch), cuisine (e.g., Italian, Pakistani), and diet (e.g., vegetarian, gluten-free).
- **Trending Recipes**: Popular recipes are highlighted on the homepage.
- **Recipe Pages**: Displays ingredients, instructions, and nutritional information for each recipe.

### Backend

- **API Layer**: Handles data fetching via Remix loaders for SSR and React Query for client-side interactions.
- **Authentication**: User login, signup, and profile management.
- **Database**: Stores recipe data, user information, and preferences using Prisma with PostgreSQL.

### Performance

- **Virtualized Lists**: Large recipe lists are virtualized using TanStack/React Virtual for improved performance and reduced DOM load.

---

## Testing

This project uses **Vitest** for testing. To run tests, use the following command:

```bash
npm run test
# or
yarn test
```

---

## Deployment

### Vercel

The app is deployed on **Vercel**, which allows for fast, serverless deployment. When pushing to the GitHub's main branch, the app is automatically built and deployed.

---

## Future Enhancements

1. **Recipe Recommendations**: Personalize recipe recommendations based on user preferences.
2. **Save or Cook-list page**: Allow users to save recipes for future access.
3. **Recipe Upload Feature**: Enable users to submit their own recipes and rate existing ones.

---

## Challenges and Trade-offs

- **Learning Remix**: Remix was a new framework for me, so there was a little learning curve, but it provides better SSR and routing performance.
- **Deployment on AWS Amplify**: Remix deployment on AWS Amplify wasn’t straightforward due to lack of direct support. So I moved to Vercel for seamless deployment.
- **Virtualizing Large Lists**: To optimize performance, large recipe lists were virtualized as our app had infinite scrolling
- **SSR vs React Query**: Deciding when to use Remix's SSR vs. React Query for API state management was a challenge for us but we addressed it by using a hybrid approach.
