import useMarketStatus from "@/hooks/useMarketStatus";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

function FoiSwitch() {
  const [historical, setHistorical] = useState(false);
  const marketStatus = useMarketStatus();
  const handleSwitch = () => {
    if (marketStatus === "closed") {
      toast("Market Closed");
    } else {
      toast(`Switched to ${historical ? "Live Data" : "Historical Data"}`);
      setHistorical(!historical);
    }
  };

  useEffect(() => {
    if (marketStatus === "closed") {
      setHistorical(true);
      toast("Market Closed ");
    }
  }, [marketStatus]);
  return (
    <div className="flex items-center gap-3 text-sm dark:text-neutral-400">
      <span>Live Data</span>
      <Switch checked={historical} onClick={handleSwitch} />
      <span>Historical Data</span>
    </div>
  );
}

export default FoiSwitch;
