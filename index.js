import alfy from "alfy";

const url = "http://pi.hole/admin/api.php";

const output = [];

const enabled = await alfy.fetch(`${url}?status`).then((data) => {
  // output.push({ title: `Pi-Hole is ${data.status}` });
  return data.status == "enabled" ? true : false;
});

if (enabled) {
  output.push({
    title: "Disable Pi-Hole",
    arg: "set disable",
  });
}

const commands = [
  {
    title: "Enable",
    subtitle: "Enable pihole dns filter",
    arg: "status",
    autocomplete: "enable",
  },
  {
    title: "Enable",
    subtitle: "Enable pihole dns filter",
    arg: "status enable",
    autocomplete: "enable",
  },
];

commands.push(alfy.inputMatches(commands, "arg"));
// alfy.debug();

alfy.output(output);
