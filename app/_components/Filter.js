'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation"

const filterButtons = [
    {
        label: 'All cabins',
        filter: 'all'
    },
    {
        label: '1-3 guests',
        filter: 'small'
    },
    {
        label: '4-7 guests',
        filter: 'medium'
    },
    {
        label: '8-12 guests',
        filter: 'large'
    }
]

function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const currentFilter = searchParams.get('capacity') || 'all'

    const handleFilter = (filter) => {
        //URLSearchParams is web API to work with search params
        const params = new URLSearchParams(searchParams)
        params.set('capacity', filter)

        //router is a hook for programmic naviagtion
        //like useNavigate in React
        //here we need to specify full path to nav for

        //scroll set to false to prevent scroll to the top of the page when the
        //user change the filter by value
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div
            className="flex justify-end mb-4 flex-wrap"
        >
            <div
                className="flex 
             border-primary-800 border "
            >
                {
                    filterButtons.map(button =>
                        <Button
                            key={button.filter}
                            active={currentFilter === button.filter}
                            onClick={() => handleFilter(button.filter)}
                        >
                            {button.label}
                        </Button>
                    )
                }

            </div>
        </div>
    )
}

const Button = ({ active, children, onClick }) => {
    return (
        <button
            className={`px-5 py-2 hover:bg-primary-700
                                ${active ? 'bg-primary-700 text-primary-50' : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Filter
