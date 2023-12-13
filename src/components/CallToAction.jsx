import { AppStoreLink } from '@/components/AppStoreLink'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-800 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Get valuable information in an instant.
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            You have free access to data and providing data is as easy as signing in with your Facebook or Google account. The more OD participation, the more compensation transparency in our industry.
          </p>
          {/* <div className="mt-8 flex justify-center">
            <AppStoreLink color="white" />
          </div> */}
        </div>
      </Container>
    </section>
  )
}
