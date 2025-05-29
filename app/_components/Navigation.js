'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavigation from "./MobileNavigation";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineInfoCircle } from 'react-icons/ai';





export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const links = [
    {
      label: 'About',
      href: '/about',
      icon: AiOutlineInfoCircle
    },
    {
      label: 'Cabins',
      href: '/cabins',
      icon: HiHomeModern
    },
    {
      label: 'Account',
      href: '/account',
      avatar: session ? session.user?.image : undefined
    }
  ]


  return (
    <>
      <nav className="hidden md:block z-10 text-xl">
        <ul className="flex gap-16 items-center">
          {
            links.map(link => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 hover:text-accent-400 transition-colors ${pathname.includes(link.href) ? 'text-accent-400' : ''}`}
                >
                  {link.avatar ?
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-9 rounded-full"
                      referrerPolicy='no-referrer'
                    />
                    :
                    <></>
                  }
                  {link.label}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>

      <MobileNavigation links={links} pathname={pathname} session={session} />
    </>
  );
}


/* <li>
          <Link
            href="/cabins"
            className={`hover:text-accent-400 transition-colors ${pathname === '/cabins' ? 'text-accent-400' : ''}`}>
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>
        </li> */