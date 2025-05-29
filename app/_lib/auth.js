import NextAuth from "next-auth";
import Google from 'next-auth/providers/google'
import { createGuest, getGuest } from "@/app/_lib/data-service";

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks: {
        authorized({ auth, request }) {
            return !!auth?.user
        },
        //called after user login with credential or provider like google
        //and before redirect to the app (act like middleware)
        async signIn({ user, account, profile }) {
            try {
                const exsitsGuest = await getGuest(user.email)

                //create new guest if not exists
                if (!exsitsGuest)
                    await createGuest({
                        email: user.email,
                        fullName: user.name
                    })

                //direct user to the app
                return true
            } catch (err) {
                console.error(err);

                //don't direct user to the app
                return false
            }
        },
        //mutate session object and add guestId to the object
        //so later can fetch data based on the guest id
        async session({ session, user }) {
            const guest = await getGuest(session.user.email)

            session.user.guestId = guest.id
            return session
        }
    },
    pages: {
        signIn: '/login'
    }
}

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST }
} = NextAuth(authConfig);

