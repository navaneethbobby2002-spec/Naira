import { loadNairaConfig } from "../lib/loadConfig.js";
import { validateUpgradeRequest } from "../lib/rules.js";
import { hasGithubConfig } from "../lib/github.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
  }

  try {
    const { targetPath, risk, requestedBy, summary } = req.body || {};
    const config = loadNairaConfig();

    const validation = validateUpgradeRequest(
      { targetPath, risk },
      config.permissions
    );

    if (!validation.ok) {
      return res.status(400).json({
        ok: false,
        stage: "validation",
        error: validation.reason
      });
    }

    res.status(200).json({
      ok: true,
      stage: "prepared",
      requestedBy: requestedBy || "unknown",
      summary: summary || "",
      targetPath,
      risk,
      approvalRequired: validation.rule.requiresApproval,
      githubReady: hasGithubConfig(),
      nextStep: "Create approval flow, then connect GitHub file read/write"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
        }
