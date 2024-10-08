//login-app/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import { JWT } from "next-auth/jwt";
//import { Session } from "next-auth";
const sql = require("mssql");

// Extend JWT and Session types to include user ID
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Connect to the MSSQL database
          await sql.connect({
            user: 'sa',
            password: 'dockerStrongPwd123',
            server: 'localhost',
            database: 'userLogin',
            options: {
              encrypt: true,
              trustServerCertificate: true, // use this if on a local dev environment
            },
          });

          // Query the database to find the user
          const request = new sql.Request();
          const query = `
            SELECT Email, [Password], Name, ID
            FROM userInfo
            WHERE Email = @Email AND [Password] = @Password
          `;
          const user = await request
            .input("Email", sql.NVarChar(100), credentials.email)
            .input("Password", sql.NVarChar(255), credentials.password)
            .query(query);

          if (user.recordset.length > 0) {
            const foundUser = user.recordset[0];
            return {
              id: foundUser.ID,
              name: foundUser.Name,
              email: foundUser.Email,
            };
          } else {
            return null; // No user found
          }
        } catch (error) {
          console.error("SQL error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/users", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user ID in the token
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // Include user ID in the session
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || 'V9LvBRPf7UEdmsnxTGopWPAucYoG3fCMmS3eSLsdtaU', // Use the secret from environment variables
};

// Export handler for NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
