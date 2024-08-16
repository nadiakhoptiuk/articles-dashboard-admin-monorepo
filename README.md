# A website which parsed rss chanel with Ukrainian News

[Скріншот сайту](/apps/web/public/meta/ogp-image.jpg)

This is a monorepo containing both the backend and frontend components of the application.

_General Users:_

Can view news articles.
Can filter articles by categories.
Can sort articles by date.

_Registered and authorized Users:_

Can manage articles. Has full control over articles, including creating, editing, and deleting any article in the database.

## Utilities

- Turborepo
- Next.js
- Next-Auth
- Express
- Joi
- MongoDB
- Mongoose
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- TailwindCSS

## How to run

Install all packages from the root directory by run:

```bash
npm install
```

Add ENV to every app folder.

Run:

```bash
npm run dev
```
