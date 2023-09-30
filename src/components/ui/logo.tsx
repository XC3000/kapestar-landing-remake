import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

type Props = LucideProps & {
  showText: boolean;
};

// LucideProps &  showText: boolean

export const Logo = ({ showText, className, ...props }: Props) => {
  return (
    <svg
      viewBox={showText ? "0 0 1836 335" : "0 0 580 335"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={cn(
        "h-[35px] w-full text-[#18181B] dark:text-[#fff]",
        className
      )}
    >
      <path
        d="M96.9429 167.165H193.472L96.9429 334.324H0.414062L96.9429 167.165Z"
        fill="currentColor"
      />
      <path
        d="M290 167.16H386.529L290 334.319H193.471L290 167.16Z"
        fill="#2563EB"
      />
      <path
        d="M483.058 167.16H579.587L483.058 334.319H386.529L483.058 167.16Z"
        fill="#2563EB"
      />
      <path
        d="M483.058 167.16H579.587L483.058 0H386.529L483.058 167.16Z"
        fill="#2563EB"
      />
      <path
        d="M278.228 251.917H480.703V334.319H278.228V251.917Z"
        fill="#2563EB"
      />
      <path d="M99.2969 0H480.703V82.4026H146.384L99.2969 0Z" fill="#2563EB" />

      {showText ? (
        <path
          d="M716.73 226.662V133.095H679.831V111.351H780.317V133.095H743.417V226.662H716.73ZM794.675 226.662V111.351H844.589C854.912 111.351 863.807 113.053 871.275 116.457C878.743 119.752 884.508 124.529 888.572 130.789C892.635 137.049 894.667 144.516 894.667 153.192C894.667 161.758 892.635 169.171 888.572 175.431C884.508 181.581 878.743 186.303 871.275 189.598C863.807 192.892 854.912 194.54 844.589 194.54H809.501L821.361 182.844V226.662H794.675ZM867.98 226.662L839.152 184.821H867.651L896.808 226.662H867.98ZM821.361 185.809L809.501 173.289H843.106C851.342 173.289 857.492 171.532 861.556 168.018C865.619 164.394 867.651 159.452 867.651 153.192C867.651 146.823 865.619 141.881 861.556 138.366C857.492 134.852 851.342 133.095 843.106 133.095H809.501L821.361 120.411V185.809ZM900.655 226.662L952.051 111.351H978.408L1029.97 226.662H1001.96L959.793 124.859H970.336L928 226.662H900.655ZM926.353 201.953L933.436 181.691H992.739L999.987 201.953H926.353ZM1041.93 226.662V111.351H1094.32C1106.84 111.351 1117.87 113.767 1127.43 118.599C1136.98 123.321 1144.45 129.965 1149.83 138.531C1155.21 147.097 1157.9 157.256 1157.9 169.006C1157.9 180.647 1155.21 190.806 1149.83 199.482C1144.45 208.048 1136.98 214.747 1127.43 219.579C1117.87 224.301 1106.84 226.662 1094.32 226.662H1041.93ZM1068.62 204.753H1093C1100.69 204.753 1107.33 203.325 1112.93 200.47C1118.64 197.505 1123.03 193.332 1126.11 187.95C1129.29 182.569 1130.89 176.255 1130.89 169.006C1130.89 161.648 1129.29 155.334 1126.11 150.062C1123.03 144.681 1118.64 140.563 1112.93 137.708C1107.33 134.742 1100.69 133.26 1093 133.26H1068.62V204.753ZM1202.57 157.805H1258.09V178.561H1202.57V157.805ZM1204.55 205.247H1267.31V226.662H1178.03V111.351H1265.17V132.766H1204.55V205.247ZM1335.2 226.662V111.351H1387.58C1400.1 111.351 1411.14 113.767 1420.69 118.599C1430.25 123.321 1437.72 129.965 1443.1 138.531C1448.48 147.097 1451.17 157.256 1451.17 169.006C1451.17 180.647 1448.48 190.806 1443.1 199.482C1437.72 208.048 1430.25 214.747 1420.69 219.579C1411.14 224.301 1400.1 226.662 1387.58 226.662H1335.2ZM1361.88 204.753H1386.26C1393.95 204.753 1400.6 203.325 1406.2 200.47C1411.91 197.505 1416.3 193.332 1419.38 187.95C1422.56 182.569 1424.15 176.255 1424.15 169.006C1424.15 161.648 1422.56 155.334 1419.38 150.062C1416.3 144.681 1411.91 140.563 1406.2 137.708C1400.6 134.742 1393.95 133.26 1386.26 133.26H1361.88V204.753ZM1527.3 228.639C1518.19 228.639 1509.73 227.156 1501.93 224.191C1494.25 221.226 1487.55 217.053 1481.84 211.672C1476.24 206.29 1471.84 199.976 1468.66 192.728C1465.58 185.479 1464.05 177.572 1464.05 169.006C1464.05 160.44 1465.58 152.533 1468.66 145.285C1471.84 138.037 1476.29 131.722 1482 126.341C1487.71 120.96 1494.41 116.787 1502.1 113.822C1509.79 110.856 1518.13 109.374 1527.14 109.374C1536.25 109.374 1544.6 110.856 1552.18 113.822C1559.86 116.787 1566.51 120.96 1572.11 126.341C1577.82 131.722 1582.27 138.037 1585.45 145.285C1588.64 152.423 1590.23 160.331 1590.23 169.006C1590.23 177.572 1588.64 185.534 1585.45 192.892C1582.27 200.14 1577.82 206.455 1572.11 211.836C1566.51 217.108 1559.86 221.226 1552.18 224.191C1544.6 227.156 1536.31 228.639 1527.3 228.639ZM1527.14 205.906C1532.3 205.906 1537.02 205.027 1541.3 203.27C1545.7 201.513 1549.54 198.987 1552.84 195.693C1556.13 192.398 1558.66 188.499 1560.41 183.997C1562.28 179.494 1563.21 174.497 1563.21 169.006C1563.21 163.515 1562.28 158.519 1560.41 154.016C1558.66 149.513 1556.13 145.615 1552.84 142.32C1549.65 139.025 1545.86 136.499 1541.47 134.742C1537.08 132.985 1532.3 132.107 1527.14 132.107C1521.98 132.107 1517.2 132.985 1512.81 134.742C1508.52 136.499 1504.73 139.025 1501.44 142.32C1498.14 145.615 1495.56 149.513 1493.7 154.016C1491.94 158.519 1491.06 163.515 1491.06 169.006C1491.06 174.388 1491.94 179.384 1493.7 183.997C1495.56 188.499 1498.09 192.398 1501.27 195.693C1504.57 198.987 1508.41 201.513 1512.81 203.27C1517.2 205.027 1521.98 205.906 1527.14 205.906ZM1610.29 226.662V111.351H1632.36L1700.39 194.375H1689.69V111.351H1716.04V226.662H1694.13L1625.93 143.638H1636.64V226.662H1610.29ZM1781.21 228.639C1771.99 228.639 1763.15 227.431 1754.69 225.015C1746.23 222.489 1739.43 219.249 1734.26 215.296L1743.32 195.199C1748.27 198.713 1754.09 201.623 1760.79 203.929C1767.59 206.126 1774.46 207.224 1781.38 207.224C1786.65 207.224 1790.88 206.73 1794.06 205.741C1797.36 204.643 1799.77 203.161 1801.31 201.294C1802.85 199.427 1803.62 197.285 1803.62 194.869C1803.62 191.794 1802.41 189.378 1799.99 187.621C1797.58 185.754 1794.39 184.271 1790.44 183.173C1786.48 181.965 1782.09 180.867 1777.26 179.879C1772.54 178.78 1767.76 177.463 1762.93 175.925C1758.21 174.388 1753.87 172.411 1749.91 169.995C1745.96 167.579 1742.72 164.394 1740.19 160.44C1737.78 156.487 1736.57 151.435 1736.57 145.285C1736.57 138.696 1738.33 132.711 1741.84 127.329C1745.47 121.838 1750.85 117.501 1757.99 114.316C1765.23 111.021 1774.29 109.374 1785.17 109.374C1792.41 109.374 1799.55 110.252 1806.58 112.01C1813.61 113.657 1819.81 116.183 1825.2 119.587L1816.96 139.849C1811.58 136.774 1806.2 134.523 1800.82 133.095C1795.43 131.558 1790.16 130.789 1785 130.789C1779.84 130.789 1775.61 131.393 1772.32 132.601C1769.02 133.809 1766.66 135.401 1765.23 137.378C1763.81 139.245 1763.09 141.441 1763.09 143.967C1763.09 146.932 1764.3 149.348 1766.72 151.215C1769.13 152.973 1772.32 154.4 1776.27 155.498C1780.22 156.597 1784.56 157.695 1789.28 158.793C1794.12 159.891 1798.89 161.154 1803.62 162.582C1808.45 164.01 1812.84 165.931 1816.79 168.347C1820.75 170.763 1823.93 173.948 1826.35 177.902C1828.87 181.855 1830.14 186.852 1830.14 192.892C1830.14 199.372 1828.33 205.302 1824.7 210.683C1821.08 216.064 1815.64 220.402 1808.39 223.697C1801.25 226.992 1792.19 228.639 1781.21 228.639Z"
          fill="currentColor"
        />
      ) : null}
    </svg>
  );
};

Logo.displayName = "Logo";