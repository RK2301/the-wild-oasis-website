'use client'

import Link from "next/link"

function MobileNavigation({ pathname, links, session }) {
    return (
        <div
            className="md:hidden fixed bottom-8 -translate-x-1/2 left-1/2 z-50
                       rounded-full border-none py-2 px-3
                       bg-primary-600/50 text-primary-100
                       flex items-center gap-2"
            style={{
                backdropFilter: 'blur(7px)'
            }}
        >
            {links.map(link => {
                const routeSelected = pathname.includes(link.href)
                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={`
                        py-2 px-3 rounded-full transition-all
                        flex items-center gap-2
                        ${routeSelected ? 'bg-accent-600' : ''}
                        ${routeSelected ? 'text-primary-100' : ''}`}
                    >
                        {routeSelected && link.icon && <link.icon className='w-6 h-6' />}

                        {
                            routeSelected && link.avatar &&
                            <div className="w-6 h-6">
                                <img
                                    src={link.avatar}
                                    alt="User avatar"
                                    className=" object-cover rounded-full" />
                            </div>

                        }

                        <span> {link.label} </span>
                    </Link>
                )
            })}
        </div>
    )
}

export default MobileNavigation
