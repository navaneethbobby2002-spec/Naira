import { loadNairaConfig } from "../lib/loadConfig.js";

export default function handler(req, res) {
  try {
    const config = loadNairaConfig();

    res.status(200).json({
      ok: true,
      identity: config.identity,
      features: config.features,
      commandCount: config.commands.commands.length,
      mode: config.permissions.defaultMode
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
