# Bazar Dor

Bazar Dor is a modern web application for tracking the prices of essential daily goods in Bangladesh. Users can explore product prices by category, compare recent price changes, view market-based information, and access detailed product information.

The application also includes secure authentication using BetterAuth with Email/Password, Google, and GitHub login.

## Live Website

Live URL will be added after Vercel deployment.

## Project Purpose

The purpose of Bazar Dor is to make daily essential-goods price information easier to understand and access in one place.

Users can quickly check current prices, previous prices, price changes, category-based products, and market-specific price information.

## Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- BetterAuth
- MongoDB Atlas
- Google OAuth
- GitHub OAuth
- React Hot Toast
- Lucide React
- Vercel

## Main Features

- Browse essential Bangladeshi products and their latest prices.
- View products by category such as rice, lentils, oil, vegetables, fish, meat, eggs, and spices.
- Sort category products by price from low to high or high to low.
- View detailed product information including current price, previous prices, average price, minimum price, and maximum price.
- View market-based price information for individual products.
- Protected product details route for authenticated users.
- Email and password authentication using BetterAuth.
- Google social login.
- GitHub social login.
- User profile page with profile information update functionality.
- Dynamic authentication-based navbar.
- Loading state for route transitions.
- Custom 404 page for invalid routes.
- Toast notifications for authentication and profile actions.
- Responsive layout for desktop, tablet, and mobile devices.

## Authentication

Bazar Dor supports:

- Email and Password Sign Up
- Email and Password Sign In
- Google Sign In
- GitHub Sign In
- Sign Out
- Protected Routes
- User Profile Update

Authentication data and sessions are managed using BetterAuth and MongoDB Atlas.

## API

Product information is loaded from the Bazar Dor API:

```text
https://api.abcz.workers.dev/api/bazardor/products