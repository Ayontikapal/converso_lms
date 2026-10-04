import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";
interface CompanionSessionPageProps{
    params: Promise<{id:string}>;
}  //using params since we are using dynamic route [id] in the path

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const user = await currentUser();
    if (!user) redirect('/sign-in');

    const companion = await getCompanion(id);
    if (!companion) redirect('/companions');

    const { name, subject, topic, duration } = companion;

    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                <div className="flex items-center gap-2">
                    <div className="size-18 flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(companion.subject) }}>
                        <Image src={`/icons/${subject?.toLowerCase()}.svg`} alt={subject || 'subject'} width={35} height={35} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-2xl">
                                {name}
                            </p>
                            <div className="subject-badge max-sm:hidden">
                                {subject}
                            </div>
                        </div>
                        <p className="text-lg">{topic}</p>
                    </div>
                </div>
                <div className="flex items-start text-2xl max-md:hidden">
                    {duration} mins
                </div>
            </article>
            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName || user.username || 'User'}
                userImage={user.imageUrl || '/icons/check.svg'}
            />
        </main>
    )
}

export default CompanionSession