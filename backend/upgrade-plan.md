# NAIRA Upgrade Plan

## Goal
Allow NAIRA to update approved project files through a controlled backend flow.

## First writable files
- shared/commands.json
- shared/features.json
- config/identity.json
- config/permissions.json

## Flow
1. Receive upgrade request
2. Classify request by risk
3. Check path allowlist
4. Create rollback snapshot
5. Create updated content
6. Ask owner approval if required
7. Write change through GitHub API
8. Save audit log
9. Return result

## Rules
- Never write secrets files
- Never write blocked paths
- High-risk changes require manual owner approval
- Every successful write must create an audit log entry
