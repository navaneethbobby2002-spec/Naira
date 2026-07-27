export function isPathBlocked(filePath, permissions) {
  return permissions.blockedWritablePaths.some((blocked) =>
    filePath === blocked || filePath.startsWith(blocked)
  );
}

export function isPathAllowed(filePath, permissions) {
  return permissions.allowedWritablePaths.includes(filePath);
}

export function getRiskRule(risk, permissions) {
  return permissions.riskLevels[risk] || null;
}

export function validateUpgradeRequest({ targetPath, risk }, permissions) {
  if (!targetPath || !risk) {
    return { ok: false, reason: "targetPath and risk are required" };
  }

  if (isPathBlocked(targetPath, permissions)) {
    return { ok: false, reason: "Target path is blocked" };
  }

  if (!isPathAllowed(targetPath, permissions)) {
    return { ok: false, reason: "Target path is not allowed" };
  }

  const rule = getRiskRule(risk, permissions);
  if (!rule) {
    return { ok: false, reason: "Unknown risk level" };
  }

  return {
    ok: true,
    rule
  };
}
