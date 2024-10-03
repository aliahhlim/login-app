import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
const sql = require("mssql");

//include user id for jwt
declare module "next-auth/jwt" {
    interface JWT {
      id: string;
    }
  }
  //include user id for session
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

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null; // return null if credentials are missing
        }
        const { email, password } = credentials;

        try {
          // establish SQL connection (assuming you have configured a SQL server connection)
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
            SELECT Email, [Password]
            FROM userInfo
            WHERE Email = @Email AND [Password] = @Password
          `;
          const user = await request
            .input("Email", sql.NVarChar(100), email)
            .input("Password", sql.NVarChar(255), password)
            .query(query);

          if (user.recordset.length > 0) {
            return user.recordset[0]; // Return the user if found
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
  session:{
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  jwt: {
    secret: 'V9LvBRPf7UEdmsnxTGopWPAucYoG3fCMmS3eSLsdtaU', // Add your secret here
  },
  // cookies: {
  //   sessionToken: {
  //     name: "token",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "strict",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },

  pages: {
    signIn: "/users", // Your custom login page
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback - user:", user);
        token.id = user.id; // Add user ID to the token
      }
      console.log("JWT callback - token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - token:", token);
      if (session.user) {
        session.user.id = token.id; // Add user ID to the session
      }
      console.log("Session callback - session:", session);
      return session;
    },
    
    // async redirect({ url, baseUrl }) {
    //   //return url.startsWith(baseUrl) ? url : baseUrl;
    //   if (url.startsWith('/')) {
    //     return `${baseUrl}${url}`
    //   } else if (url.startsWith(baseUrl)) {
    //     return url
    //   }
    //   return baseUrl
    // },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  //secret: 'V9LvBRPf7UEdmsnxTGopWPAucYoG3fCMmS3eSLsdtaU=', // Use the secret from .env.local
});
