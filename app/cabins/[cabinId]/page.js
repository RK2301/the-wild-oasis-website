import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
    const cabinId = Number(params.cabinId)
    const { name } = await getCabin(cabinId)

    return {
        title: `Cabin ${name}`
    }
}

export async function generateStaticParams() {
    const cabins = await getCabins()
    return cabins.map(cabin => ({
        cabinId: String(cabin.id)
    }))
}

export default async function Page({ params }) {
    const cabinId = Number(params.cabinId)
    const cabin = await getCabin(cabinId)


    const { name } = cabin;

    return (
        <div className="max-w-6xl mx-auto mt-8 pb-6">
            <Cabin cabin={cabin} />

            <div>
                <h2 className="text-4xl font-semibold text-center mb-4">
                    Reserve {name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner />}>
                    <Reservation cabinId={cabinId} />
                </Suspense>

            </div>
        </div>
    );
}
