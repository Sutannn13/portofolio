import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AwardWinningWork from "@/components/AwardWinningWork";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import Services from "@/components/Services";
import Awards from "@/components/Awards";
import CredentialFolders from "@/components/CredentialFolders";
import GitHubActivityTrigger from "@/components/GitHubActivityTrigger";
import ClientLogos from "@/components/ClientLogos";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <Hero />
      <AwardWinningWork />
      <WhyWorkWithMe />
      <Services />
      <Awards />
      <CredentialFolders />
      <GitHubActivityTrigger />
      <ClientLogos />
      <Faq />
      <Footer />
    </>
  );
}
