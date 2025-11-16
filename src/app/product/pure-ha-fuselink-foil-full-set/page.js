import Sec1 from "./sections/sec1";
import AspectRatioSection from "./sections/sec2";
import Sec3 from "./sections/sec3";
import Sec4 from "./sections/sec4";
import Sec5 from "./sections/sec5";
import Sec6 from "./sections/sec6";
import Sec7 from "./sections/sec7";
import Header from "./sections/header";
export default function Pure() {
  return (
    <main className="relative min-h-screen bg-black w-full overflow-hidden">
      <div className="relative z-20 w-full">
        <Header />

        <Sec1 />
        <AspectRatioSection />
        <Sec3 />
        <Sec4 /> 
        <Sec5 />   
        <Sec6 />
        <Sec7 />
      </div>
    </main>
  );
}
