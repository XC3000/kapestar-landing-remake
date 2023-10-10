import AdvantageCard from "@/components/app/AdvantageCard";
import InfoCard from "@/components/landing-page/CardInfo";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl overflow-x-hidden px-3">
        <section className="relative mt-4 overflow-hidden rounded-xl bg-stone-600 px-4  pb-12">
          <Image
            src="/assets/landing-page/bg/bg.png"
            fill
            alt="bg"
            objectFit="cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50" />
          <div className="relative z-10 max-w-lg py-24 text-start text-white">
            <h1 className="max-w-6xl text-[28px]  font-bold capitalize sm:text-[32px]">
              We are looking to enhance your appearance
            </h1>
            <p className="mt-4 max-w-lg  text-xs text-white/60 sm:text-base">
              You will leave feeling confident and poised, ready to take on the
              challenges of the world with ease and grace.
            </p>
            <Button className="mt-4 bg-white py-2 text-xs font-bold text-black hover:bg-white/90 sm:text-sm">
              Explore
            </Button>
          </div>
        </section>
        <section className="m-auto mt-24  max-w-6xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-8">
            <InfoCard
              heading="Explore Spas"
              desc="Explore best in class spas near you and book your slot from home."
              src="/assets/landing-page/spa.png"
            />
            <InfoCard
              heading="Book Salon Seat"
              desc="Explore best in class Salons near you and book your slot from home."
              src="/assets/landing-page/salon.png"
            />
            <InfoCard
              heading="Invite Stylists at Doorstep"
              desc="Stay home and invite hair stylists to your doorstep"
              src="/assets/landing-page/doorstep.png"
            />
          </div>
        </section>

        <section className="mb-12 mt-24  grid-cols-2 gap-8 md:grid">
          <Image
            src="/assets/landing-page/misson.png"
            width={500}
            height={500}
            className="mx-auto mb-8 md:mb-0"
            alt="our misson"
          />
          <div className="text-sm">
            <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Our mission is to put an electric vehicle charge
            </h3>
            <p className="mt-4 text-zinc-600">
              Charge your electric vehicle at home using one of our smart home
              char ge solutions or gain access to over 3,000 public charging.
            </p>
            <div className="mt-4 grid grid-cols-2 items-center  gap-4">
              <p>Zero contact travel</p>
              <p>No Driving License</p>
            </div>
            <div className="my-6 grid grid-cols-2 items-center  gap-4">
              <p>We love our customers and we love the way they come.</p>
              <p>We love our customers and we love the way they come.</p>
            </div>

            <ul className=" my-6 ml-4 list-disc">
              <li>Detachable battery, take home and charge in 3 hours.</li>
              <li>Enjoy a hassle-free ride by charging just for 3 hours.</li>
            </ul>
            <Button className="px-8">Login</Button>
          </div>
        </section>

        <section className="my-16 flex items-center justify-around gap-4 ">
          <div className="text-center">
            <h3 className="text-2xl font-semibold">650M</h3>
            <p className="max-w-xs">
              Check charge status remotely through Ether app
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">650M</h3>
            <p className="max-w-xs">
              Check charge status remotely through Ether app
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">650M</h3>
            <p className="max-w-xs">
              Check charge status remotely through Ether app
            </p>
          </div>
        </section>

        <section className="relative h-96 overflow-hidden rounded-3xl">
          <Image
            src="/assets/landing-page/bg/bg.png"
            fill
            alt="bg"
            objectFit="cover"
          />
        </section>

        <section className="my-16 items-center justify-between gap-3 sm:flex md:my-24">
          <div className="flex flex-col gap-4 ">
            <AdvantageCard
              src="/assets/landing-page/advantage/orange.png"
              heading="Recoverable Energy"
              desc="Charge Your Electric Vehicle At Home Using One Of Our Smart"
              imgSide="left"
            />
            <AdvantageCard
              src="/assets/landing-page/advantage/yellow.png"
              heading="Recoverable Energy"
              desc="Charge Your Electric Vehicle At Home Using One Of Our Smart"
              imgSide="left"
            />
            <AdvantageCard
              src="/assets/landing-page/advantage/green.png"
              heading="Recoverable Energy"
              desc="Charge Your Electric Vehicle At Home Using One Of Our Smart"
              imgSide="left"
            />
          </div>

          <div className="hidden px-4 lg:block">
            <Image
              src="/assets/landing-page/bg/bg.png"
              width={400}
              height={400}
              alt="bg"
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <AdvantageCard
              src="/assets/landing-page/advantage/lightgreen.png"
              heading="Recoverable Energy"
              desc="Charge Your Electric Vehicle At Home Using One Of Our Smart"
              imgSide="right"
            />
            <AdvantageCard
              src="/assets/landing-page/advantage/orange.png"
              heading="Recoverable Energy"
              desc="Charge Your Electric Vehicle At Home Using One Of Our Smart"
              imgSide="right"
            />
            <AdvantageCard
              src="/assets/landing-page/advantage/yellow.png"
              heading="Recoverable Energy"
              desc="Charge Your Electric Vehicle At Home Using One Of Our Smart"
              imgSide="right"
            />
          </div>
        </section>

        <section className="my-16 grid-cols-2 items-center gap-4 md:my-24 md:grid">
          <div>
            <Image
              src="/assets/landing-page/phone.png"
              alt="app"
              width={400}
              height={500}
              className="m-auto"
            />
          </div>
          <div className="mx-auto mt-5 max-w-md text-center md:mt-0">
            <h3 className="text-3xl font-semibold">Get the Kapestar app</h3>
            <p className="mt-6 max-w-sm text-center text-sm text-black/60">
              Charge your electric vehicle at home using one of our smart home
              char ge solutions or gain access to over 3,000 public charging.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/">
                <Image
                  src="/assets/landing-page/gplay.png"
                  alt="app"
                  width={200}
                  height={500}
                  className=""
                />
              </Link>
              <Link href="/">
                <Image
                  src="/assets/landing-page/appstore.png"
                  alt="app"
                  width={200}
                  height={500}
                  className=""
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
