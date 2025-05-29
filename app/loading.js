import Spinner from "@/app/_components/Spinner"


function loading() {
    return (
        <div className="h-full flex justify-center items-center">
            <Spinner />
        </div>
    )
}

export default loading
