import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || "localhost",
        port: Number(process.env.EMAIL_SERVER_PORT) || 25,
        auth: {
          user: process.env.EMAIL_SERVER_USER || "",
          pass: process.env.EMAIL_SERVER_PASSWORD || "",
        },
      },
      from: process.env.EMAIL_FROM || "SmartBuy <noreply@smartbuy.app>",
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        if (process.env.NODE_ENV !== "production") {
          console.log(`\n🔗 Magic link for ${identifier}:\n${url}\n`);
          return;
        }
        // Production: swap for Resend/SendGrid via SMTP env vars
        const { createTransport } = await import("nodemailer");
        const transport = createTransport(provider.server as any);
        await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: "Sign in to SmartBuy",
          text: `Sign in to SmartBuy: ${url}`,
          html: `<p>Sign in to SmartBuy: <a href="${url}">${url}</a></p>`,
        });
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
};
