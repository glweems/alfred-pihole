import { ScriptFilterItem } from "alfy";
import { wfHost } from "./index";

// console.log("wfHost: ", wfHost);x
const dashboardLinks: ScriptFilterItem[] = [
  {
    title: "Dashboard",
    subtitle: "Dashboard",
    arg: wfHost,
    variables: { action: "browser" },
  },
  {
    title: "Query Log",
    subtitle: "Query Log",
    arg: `${wfHost}/queries`,
    variables: { action: "browser" },
  },
  {
    title: "Whitelist",
    subtitle: "Whitelist",
    arg: `${wfHost}/groups-domains.php?type=white`,

    variables: { action: "browser" },
  },
  {
    title: "Blacklist",
    subtitle: "Blacklist",
    arg: "/groups-domains.php?type=black",
    variables: { action: "browser" },
  },
  {
    title: "Settings",
    subtitle: "Settings",
    arg: "/settings",
  },
];

export default dashboardLinks;

exports;
