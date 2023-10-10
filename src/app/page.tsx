import Card from "@/components/landing-page/Card";
import ContactForm from "@/components/landing-page/ContactForm";
import Footer from "@/components/landing-page/Footer";
import Header from "@/components/landing-page/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl overflow-x-hidden px-3">
        <section className="relative mx-auto mt-4 flex max-w-7xl items-center justify-center overflow-hidden  rounded-xl bg-stone-600 px-3 pb-16 text-center">
          <Image
            src="/assets/landing-page/bg/bg.png"
            fill
            alt="bg"
            objectFit="cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50" />
          <div className="relative z-10 py-24 text-white">
            <h1 className="m-auto max-w-6xl text-[28px] font-bold capitalize sm:text-[36px] md:text-[48px] lg:text-[72px]">
              We are looking to enhance your appearance
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-xs text-white/60 sm:text-base">
              You will leave feeling confident and poised, ready to take on the
              challenges of the world with ease and grace.
            </p>
            <Button className="mt-4 bg-white py-2 text-xs font-bold text-black hover:bg-white/90 sm:text-sm">
              Login
            </Button>
          </div>
          <div className="absolute bottom-4 right-0 rounded-l-xl bg-white p-4 text-start text-sm font-semibold text-black">
            <p>Haryana Gurugram Road</p>
            <p>Near Metro Station</p>
            <p>Everyday 10:00 AM - 10:00 PM</p>
          </div>
        </section>
        <section className="m-auto mt-24  max-w-6xl">
          <h3 className="mb-6 text-3xl font-bold">Our Stylists</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-8">
            <Card
              heading="Arjun Aarya"
              location="Haryana"
              role="Hair Stylist"
              src="/assets/landing-page/stylists/1.png"
            />
            <Card
              heading="Arjun"
              location="Haryana"
              role="Neck Breaker"
              src="/assets/landing-page/stylists/2.png"
            />
            <Card
              heading="Arjun"
              location="Haryana"
              role="Massage Specialist"
              src="/assets/landing-page/stylists/3.png"
            />
            <Card
              heading="Arjun"
              location="Haryana"
              role="Hello"
              src="/assets/landing-page/stylists/3.png"
            />
            <Card
              heading="Arjun"
              location="Haryana"
              role="Hello"
              src="/assets/landing-page/stylists/1.png"
            />
            <Card
              heading="Arjun"
              location="Haryana"
              role="Hello"
              src="/assets/landing-page/stylists/2.png"
            />
          </div>
        </section>

        <section className="mb-12 mt-24">
          <div className=" w-10/12 rounded-r-3xl bg-zinc-900 px-4 pt-8 text-zinc-50 lg:w-1/2">
            <p className="text-2xl font-bold uppercase sm:text-3xl">
              GET A 30% DISCOUNT
            </p>
            <p className="my-3 text-[13px] uppercase sm:text-sm">
              For Every 3rd HairCut
            </p>
            <div className="flex items-start justify-between">
              <Button className="bg-white font-semibold text-zinc-800 hover:bg-white/90 ">
                Book Now
              </Button>
              <p className="m:text-[72px] text-end text-[60px] font-bold">
                30%
              </p>
            </div>
          </div>
          <div className="ml-auto mt-6 w-10/12 rounded-l-3xl bg-zinc-900 px-4 pt-8 text-end text-zinc-50 lg:w-1/2">
            <p className="text-2xl font-bold uppercase sm:text-3xl">
              GET A 20% DISCOUNT
            </p>
            <p className="my-3 text-[13px] uppercase sm:text-sm">
              For Every 3rd HairCut
            </p>
            <div className="flex items-start justify-between">
              <p className="m:text-[72px] text-start text-[60px] font-bold">
                20%
              </p>
              <Button className="bg-white font-semibold text-zinc-800 hover:bg-white/90 ">
                Book Now
              </Button>
            </div>
          </div>
        </section>

        <section className="m-auto my-16 grid-cols-2 items-center gap-8 rounded-2xl bg-zinc-900 px-8 py-16  md:grid">
          <ContactForm />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d261230.12711099468!2d88.02360125517862!3d22.523316931113865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1696927526859!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="hidden h-full w-full rounded-2xl md:block"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
