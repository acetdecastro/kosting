export const ROUTES = {
  root: "/",
  app: {
    root: "/app",
    dashboard: "/app/dashboard",
    products: {
      root: "/app/products",
      overview: "/app/products/overview",
      costings: "/app/products/costings",
      versions: "/app/products/versions",
      tags: "/app/products/tags",
    },
    suppliers: {
      root: "/app/suppliers",
      overview: "/app/suppliers/overview",
      details: "/app/suppliers/details",
    },
  },
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    emailConfirmed: "/auth/email-confirmed",
    signUpSuccess: "/auth/sign-up-success",
    error: "/auth/error",
  },
};
