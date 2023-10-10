import { poppins } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons";

function Footer() {
  return (
    <footer
      id="footer"
      className={`${poppins.className} bg-zinc-900 text-white`}
    >
      <div className="m-auto max-w-[1400px] px-4 pt-24">
        <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
          <div className="flex flex-col items-center gap-y-1 sm:flex-row ">
            <Image
              src="/logo.png"
              className="invert"
              width={36}
              height={36}
              alt="logo"
            />
            <p className="ml-2 font-bold">KAPESTAR</p>
          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            <Link href="#footer">
              <Icons.youtube className="h-6 w-6" />
            </Link>
            <Link href="#footer">
              <Icons.facebook className="h-6 w-6" />
            </Link>
            <Link href="#footer">
              <Icons.linkedin className="h-6 w-6" />
            </Link>
            <Link href="#footer">
              <Icons.twitter className="h-6 w-6" />
            </Link>
            <Link href="#footer">
              <Icons.instagram className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-4 items-start justify-between  gap-y-12 border-y border-zinc-800 p-4 py-8 pb-12 dark:border-zinc-600">
          <div className="col-span-4 text-sm md:col-span-1">
            <h4 className="mb-4 text-lg font-semibold capitalize">
              Trade Dons Fintech Pvt Ltd
            </h4>
            <p>Gokul, Dattani Park,</p>
            <p className="my-1">Thakur Village Kandivali (East)</p>
            <p>Mumbai- 400101, INDIA</p>

            <h4 className="mb-2 mt-6 text-lg font-semibold capitalize">
              Customer Support
            </h4>
            <p>care@tradedons.com</p>
            <p className="mt-1">+91 9152023888 </p>
          </div>

          <div className="col-span-3 grid max-w-max grid-cols-2 gap-3 gap-y-6 text-sm md:col-span-2 md:mx-auto xl:grid-cols-4 ">
            <div className="flex flex-col gap-y-2">
              <h3 className="mb-2 text-sm font-semibold text-zinc-600 sm:text-base">
                Market Data
              </h3>
              <Link className="text-xs sm:text-sm" href="#footer">
                NSE & BSE
              </Link>
              <Link className="text-xs sm:text-sm" href="#footer">
                Forex
              </Link>
              <Link className="text-xs sm:text-sm" href="#footer">
                US Markets
              </Link>
              <Link className="text-xs sm:text-sm" href="#footer">
                Crypto
              </Link>
            </div>
            <div className="flex flex-col gap-y-2 ">
              <h3 className="mb-2 text-sm font-semibold text-zinc-600 sm:text-base">
                Products
              </h3>
              <Link className="text-xs sm:text-sm" href="#footer">
                Live Market Data
              </Link>
              <Link className="text-xs sm:text-sm" href="#footer">
                Sprint Trades
              </Link>
              <Link className="text-xs sm:text-sm" href="#footer">
                Education
              </Link>
            </div>
            <div className="flex flex-col gap-y-2 ">
              <h3 className="mb-2 text-sm font-semibold text-zinc-600 sm:text-base">
                Legal
              </h3>
              <Link className="text-xs sm:text-sm" href="/privacy-policy">
                Privacy Policy
              </Link>
              <Link className="text-xs sm:text-sm" href="/terms-and-conditions">
                Terms
              </Link>
              <Link className="text-xs sm:text-sm" href="/terms-and-conditions">
                Discalimer
              </Link>
              <Link className="text-xs sm:text-sm" href="/refund">
                Refund Policy
              </Link>
            </div>
            <div className="flex flex-col gap-y-2 ">
              <h3 className="mb-2 text-sm font-semibold text-zinc-600 sm:text-base">
                Why Choose Us
              </h3>
              <Link className="text-xs sm:text-sm" href="#footer">
                Our Story
              </Link>
              <Link className="text-xs sm:text-sm" href="#footer">
                Speed
              </Link>
              <Link className="text-xs sm:text-sm" href="#footer">
                Support
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 gap-y-1 lg:w-auto lg:flex-row">
            <Image
              src="/assets/landing-page/aw-1.png"
              width={100}
              height={100}
              alt="tradedons"
              className="m-auto"
            />
            <Image
              src="/assets/landing-page/aw-2.png"
              width={100}
              height={100}
              alt="tradedons"
              className="m-auto"
            />
            <Image
              src="/assets/landing-page/aw-3.png"
              width={100}
              height={100}
              alt="tradedons"
              className="m-auto"
            />
          </div>
        </div>

        <p className="mt-5 pb-8 text-sm">
          <span className="font-semibold">Risk disclaimer: </span>
          Future & Options are complex instruments and come with a high risk of
          losing money rapidly due to leverage. You should consider whether you
          understand how Future & Options work and whether you can afford to
          take the high risk of losing your money. Please see our risk warning
          policy and seek independent professional advice if you do not fully
          understand. This information is not directed or intended for
          distribution to or use by residents of certain countries/jurisdictions
          including, but not limited to, INDIA, USA & OFAC. The Company holds
          the right to alter the aforementioned list of countries at its own
          discretion. we are not sebi registered entity. we are not responsible
          for profit or looses while trading. we do not provide any buy/sell
          signals
        </p>
        <p className="pb-8 text-sm">
          ©2023 TRADE DONS Fintech Pvt Ltd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
