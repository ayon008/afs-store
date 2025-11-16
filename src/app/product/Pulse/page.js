import WakefoilSection from './sections/hero'
import Sec1 from './sections/sec1'   
import Sec2 from './sections/sec2'
import Sec3 from './sections/sec3'
import Sec4 from "./sections/sec4"
import Header from './sections/header'
export default function PulsePage() {
  return (
    <main className="relative min-h-screen bg-black w-full overflow-hidden">
      <div className="relative z-20 w-full">
        <Header />
        <WakefoilSection />
        <Sec1 />
        <Sec2 />
        <Sec3 />
        <Sec4 />
      </div>
    </main>
  )
}
