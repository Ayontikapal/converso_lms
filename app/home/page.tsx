import CompanionCard from '@/components/CompanionCard'; 
import CompanionsList from '@/components/CompanionsList';
import Cta from '@/components/CTA';
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions';
import { getSubjectColor } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const Page = async() => {

  const companions= await getAllCompanions({limit:3});
  const recentSessionsCompanions =await getRecentSessions(5);
  return (
    <main className="mb-15">
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        {companions && companions.length > 0 ? (
          companions.map((companion)=>(
            <CompanionCard key={companion.id} {...companion}
            color={getSubjectColor(companion.subject)}/>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No companions available.</p>
        )}
      </section>
      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
          />
        <Cta/>
      </section>
    </main> 
  )
}

export default Page