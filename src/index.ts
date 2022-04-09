import alfy, { ScriptFilterItem } from "alfy";
import data from "./data.json" assert { type: "json" };
import _ from "lodash";
import { Summery } from "./types";
import fuzzysort from "fuzzysort";

alfy.debug = true;
alfy.config.set("apikey", "appaYwKFsyvOAQqmh");
alfy.config.set("host", "http://pi.hole");

export const wfHost = alfy.config.get("host") as string;
const api = `${wfHost}/admin/api.php`;

const summeryKeys: Array<keyof Summery> = [
  "status",
  "domains_being_blocked",
  "dns_queries_today",
  "ads_blocked_today",
  "ads_percentage_today",
  "unique_domains",
  "queries_forwarded",
  "queries_cached",
  "clients_ever_seen",
  "unique_clients",
];

let output: ScriptFilterItem[] = [];
switch (alfy.input.trim()) {
  case "admin":
    data.web.forEach(({ arg, ...item }) => {
      const obj = { ...item, arg: `${wfHost}/admin/${arg}` };

      output.push(obj);
    });
    break;

  case "summery":
    await alfy.fetch(`${api}?summary`).then((res: Summery) => {
      Object.entries(res).forEach(([key, val]) => {
        if (summeryKeys.includes(key as any)) {
          output.push({
            title: _.capitalize(key.split("_").join(" ")) + `: ${val}`,
            subtitle: val,
          });
        }
      });
    });

    break;

  case "recentBlocked":
    await alfy.fetch(`${api}?recentBlocked`).then((res: string | []) => {
      typeof res === "string"
        ? output.push({ title: "Recent Blocked", subtitle: res })
        : output.push({
            title: "No Recently Blocked domains",
          });
    });

  default:
    const items = fuzzysort
      .go(alfy.input, data.menu, { key: "title" })
      .forEach((item) => output.push(item.obj));
    console.log(items);
  // output.push(...items);
}

alfy.output(output);

// const baseUrl = `${alfy.config.get("hostname")}`;

// const isEnabled = await alfy
//   .fetch(`${baseApiUrl}?summary`, { maxAge: 5000 })
//   .then((res) => {
//     alfy.cache.set("status", res.status);
//     return res.status === "enabled";
//   });
// await alfy.fetch(`${baseApiUrl}?summary`, { maxAge: 5000 }).then((res) => {
//   //
// });
// const createPiholeLink = (title, subtitle, arg, icon) => ({
//   title: title,
//   subtitle: subtitle,
//   arg: piholeUrl(arg),
//   icon: {
//     path: `icons/${icon}.png`,
//   },
//   variables: {
//     action: "browser",
//   },
// });

// output.push({
//   title: `Pi-hole: ${alfy.cache.get("status") ? "Enabled" : "Disabled"}`,
//   subtitle: isEnabled ? "Enabled" : "Disabled",
// });
