import '@/app/_styles/globals.css'
import { Josefin_Sans } from 'next/font/google'
import Header from "@/app/_components/Header";
import ReservationProvider from '@/app/_components/ReservationContext';
import AuthProvider from '@/app/context/AuthProvider';
import { Toaster } from 'react-hot-toast';


const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'
})

//instead of create head tag
//creating metadata, NextJS will pass the data to the head tag, which is more convenient
export const metadata = {
  title: {
    /**now each page when change the title, will appear next to it:
     * - The Wild Oasis
     * for example: in cabins page -> Cabins - The Wild Oasis
     */
    template: '%s - The Wild Oasis',
    default: 'The Wild Oasis'
  },
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests."
};

export const viewport = {
  themeColor: '#141C24'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-50 min-h-screen
          ${josefin.className} flex flex-col antialiased relative`}
      >
        <Toaster
          position='top-center'
          toastOptions={{

            style: {
              backgroundColor: 'rgb(27, 38, 49, 0.8)',
              backdropFilter: 'blur(5px)',
              color: '#D4DEE7',
              fontSize: '1.2rem'
            },
            success: {
              duration: 5000,
            },
            error: {
              duration: 7000
            }
          }}
        />

        <AuthProvider>
          <Header />


          <div className='flex-1 px-8 pb-24 md:py-2 flex'>
            <main
              className='mx-auto max-w-screen-2xl w-full self-stretch'
            >
              <ReservationProvider>
                {children}
              </ReservationProvider>
            </main>
          </div>

        </AuthProvider>
      </body>
    </html>
  );
}
