interface NavLink {
  name: string;
  desc: string;
  href: string;
}

interface NavSection {
  heading: string;
  links: NavLink[];
}

type DashboardNav = NavSection[];

export const dashboardNav: DashboardNav = [
  {
    heading: "Futures",
    links: [
      {
        name: "Future open interest",
        desc: "The latest industry news, updates and info.",
        href: "/futures/open-interest",
      },
      {
        name: "Futures Spurtz",
        desc: "Learn how our customers are making big changes.",
        href: "/coming-soon",
      },
      {
        name: "Futures OI Buzz",
        desc: "Get up and running on new features and techniques.",
        href: "/coming-soon",
      },
      {
        name: "Intraday Movers",
        desc: "Get up and running on new features and techniques.",
        href: "/coming-soon",
      },
      {
        name: "Futures Data End Of Day (EOD)",
        desc: "Get up and running on new features and techniques.",
        href: "/coming-soon",
      },
    ],
  },

  {
    heading: "Charts",
    links: [
      {
        name: "Advanced Chart",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
    ],
  },
  {
    heading: "Options",
    links: [
      {
        name: "Options - Strike Price Wise",
        desc: "The latest industry news, updates and info.",
        href: "/options/strike-price-wise",
      },
      {
        name: "Option Chain",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
      {
        name: "Options Spurtz",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
      {
        name: "Premium",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
      {
        name: "Trend Finder",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
      {
        name: "Implied Volatility",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
      {
        name: "Head Office Data",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
      {
        name: "Expert Opinion",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
    ],
  },
  {
    heading: "Features",
    links: [
      {
        name: "Pre Opening Market",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
      {
        name: "Plans",
        desc: "The latest industry news, updates and info.",
        href: "/coming-soon",
      },
    ],
  },
];
