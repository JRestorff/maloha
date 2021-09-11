import { Command, flags } from "@oclif/command";

import main from "./main";

class Maloha extends Command {
  static description = "convert and optionally compress and resize images";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),

    size: flags.integer({
      char: "s",
      description: "target size in kb",
    }),
    width: flags.integer({ char: "w", description: "maximum width in pixels" }),
  };

  static args = [{ name: "folder" }];

  async run() {
    const { args, flags } = this.parse(Maloha);
    const path = args.folder || process.cwd();
    let targetSize = flags.size ? flags.size * 1000 : undefined;
    await main(path, targetSize, flags.width);
  }
}

export = Maloha;
