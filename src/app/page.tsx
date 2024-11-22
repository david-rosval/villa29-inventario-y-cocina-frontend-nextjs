
import Hero from "@/components/landing-page/Hero";
import About from "@/components/landing-page/About";
import MostRequested from "@/components/landing-page/MostRequested";
import Promotions from "@/components/landing-page/Promotions";
import Ubication from "@/components/landing-page/Ubication";
import Footer from "@/components/landing-page/Footer";
import Menu from "@/components/landing-page/Menu";

export default function Home() {
  return (
    <div className="landing-page-body">
      <Hero/>
      <About/>
      <MostRequested/>
      <Promotions/>
      <Ubication/>
      <Menu/>
      <Footer/>
    </div>
  );
}