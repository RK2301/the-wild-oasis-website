import SideNavigation from "../_components/SideNavigation"

function layout({ children }) {
    return (
        <div
            className="flex flex-col gap-6
            md:grid md:grid-cols-[16rem_1fr] h-full md:gap-12"
        >
            <SideNavigation />

            <div>
                {children}
            </div>
        </div>
    )
}

export default layout
