"use client";

import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { dashboardNav } from "@/config/dashboardNav";
import { Logo } from "../ui/logo";

const triggerStyles: string =
  "text-sm capitalize font-semibold dark:text-white";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6 dark:text-white" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0 dark:bg-zinc-800">
        <div className="px-7 pl-3">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Logo showText={false} />
          </Link>
        </div>

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-3">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full">
              {dashboardNav.map((e, index) => (
                <AccordionItem key={index} value={e.heading}>
                  <AccordionTrigger className={triggerStyles}>
                    {e.heading}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {e.links.map((item, subindex) => (
                        <Link
                          href={item.href}
                          key={subindex}
                          className="my-1 block text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          onClick={() => setIsOpen}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
