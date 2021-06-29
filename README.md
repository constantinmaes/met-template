#MET template (Mongo, Express, Typescript template)

This is a boilerplate project setting up the following:

- MongoDB Docker container
- Redis Docker container
- `express` application written in Typescript
- `mongoose` ORM
- `passport` JWT-based authentication flow
- Dependency injection with `typedi`

## Installation

- Run `npm install`
- Copy `.env.local` to `.env` and set up your environment variables

## Run

- development: `npm run dev` (automatically monitors changes in `src` directory)
- production: `npm run build`