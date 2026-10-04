import { Suspense } from "react";
import {getAllCompanions} from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const companions = await getAllCompanions({ subject, topic });

    return (
        <main className="mb-5">
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Companion Library</h1>
                <div className="flex gap-4">
                    <Suspense fallback={<div className="text-sm text-neutral-500">Loading search...</div>}>
                        <SearchInput />
                    </Suspense>
                    <Suspense fallback={<div className="text-sm text-neutral-500">Loading filters...</div>}>
                        <SubjectFilter/>
                    </Suspense>
                </div>
            </section>
            <section className="companions-grid">
                {companions && companions.length > 0 ? (
                    companions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            {...companion}
                            color={getSubjectColor(companion.subject)}
                        />
                    ))
                ) : (
                    <p className="text-muted-foreground text-sm col-span-full">No companions found.</p>
                )}
            </section>
        </main>
    )
}

export default CompanionsLibrary