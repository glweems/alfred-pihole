import alfy from "alfy";
alfy.debug = true;
const output = [];

const baseUrl = "http://pi.hole/admin";

const piholeUrl = (path) => `${baseUrl}/${path}`;

const createPiholeLink = (title, subtitle, arg, icon) => ({
  title: title,
  subtitle: subtitle,
  arg: piholeUrl(arg),
  icon: {
    path: `icons/${icon}.png`,
  },
  variables: {
    action: "browser",
  },
});

const dashboard = createPiholeLink(
  "Dashboard",
  "Open Pi-Hole Dashboard",
  "",
  "home"
);

const links = [dashboard];

links.forEach((links) => output.push(links));

alfy.output(output);
