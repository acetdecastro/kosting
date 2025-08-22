export const ROUTES = {
  root: "/",
  app: {
    root: "/app",
    dashboard: "/app/dashboard",
    costings: {
      root: "/app/costings",
      suppliers: "/app/costings/suppliers",
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
