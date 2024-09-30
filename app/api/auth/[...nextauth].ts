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
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            server: process.env.DB_SERVER,
            database: process.env.DB_NAME,
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

  pages: {
    signIn: "/users", // Your custom login page
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user ID in the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // Include user ID in the session
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // Use the secret from .env.local
});


// import Password from "antd/es/input/Password";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// const sql = require("mssql");

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Enter your email" },
//         password: { label: "Password", type: "password", placeholder: "Enter your password" }
//       },

//       async authorize(credentials) {
//         // Extract email and password from credentials
//         const { email, password } = credentials;
      
//         // SQL logic
//         const user = await new sql.Request()
//           .input("Email", sql.NVarChar(100), email)
//           .input("Password", sql.NVarChar(255), password)
//           .query(`SELECT Email, [Password] FROM userInfo WHERE Email = 'aliahhlim5@gmail.com' AND [Password] = 'ALIAHHLIM5'`);
      
//         if (user.recordset.length > 0) {
//             return user;
//             //return user.recordset[0]; // Return the user record
//         } else {
//           return null;
//         }
//       }
      
//      /* async authorize(credentials) {
//         try {
//           const res = await fetch("http://localhost:4000/api/user/login", {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password
//             })
//           });
          
//           if (!res.ok) {
//             throw new Error('Invalid credentials');
//           }
      
//           const user = await res.json();
      
//           if (user) {
//             return user;
//           } else {
//             return null;
//           }
//         } catch (error) {
//           console.error('Authorization error:', error);
//           return null;
//         }
//       }*/
      
//     })
//   ],
//   debug: true,
//   pages: {
//     signIn: '/users',
//     //error: '/api/auth/error',  // This is the page shown on error
//     //signIn: '/signin' // Redirect to your custom login page
//   },

//   /*
//   callbacks: {
//     async signIn({user, account, profile}) {
//        console.log(user, account, profile); // Check the returned user, account, and profile
//        return true;
//     },
//     async jwt({token, user}) {
//        if (user) {
//           token.id = user.id as string;
//        }
//        return token;
//     },
//     async session({session, token}) {
//        session.user.id = token.id as string;
//        return session;
//     }
//  },*/
   
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       console.log("Session callback:", session, token)
//       session.user.id = token.id as string;
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     }
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Add this to .env.local
// });