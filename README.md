# Next.js App - Local Development Setup

This guide will help you set up and run the Next.js application locally using the App Router feature.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (Recommended: LTS version)
- **npm** or **yarn** (Package manager)

Check your installations by running:

```sh
node -v   # Should return a valid Node.js version
npm -v    # Should return a valid npm version
yarn -v   # (If using yarn)
```

## Clone the Repository

Clone the project from the repository:

```sh
git clone <repository-url>
cd <project-folder>
```

## Install Dependencies

Run the following command to install all required dependencies:

```sh
npm install
# OR
yarn install
```

## Run the Development Server

Start the Next.js development server:

```sh
npm run dev
# OR
yarn dev
```

The application should now be running at:

```
http://localhost:3000
```

## Build and Run Locally (Production Mode)

To test a production build locally:

```sh
npm run build
npm start
# OR
yarn build
yarn start
```

## Additional Commands

- **Lint the code**: `npm run lint` or `yarn lint`
- **Check TypeScript types**: `npm run type-check`

## Troubleshooting

If you encounter issues:

- Check if you are using the correct Node.js version.
- Ensure all dependencies are installed properly.
- Check the logs in the terminal for errors.


## License

This project is licensed under [MIT License](LICENSE).


