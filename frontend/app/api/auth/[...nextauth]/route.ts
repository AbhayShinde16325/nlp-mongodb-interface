import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

if (!googleClientId || !googleClientSecret) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET. Set them in frontend/.env.local."
  )
}

const handler = NextAuth({
  debug: process.env.NODE_ENV !== "production",
  logger: {
    error(code, metadata) {
      console.error("[NEXTAUTH][ERROR]", code, metadata)
    },
    warn(code) {
      console.warn("[NEXTAUTH][WARN]", code)
    },
  },
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
})

export { handler as GET, handler as POST }
