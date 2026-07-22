# Task 7 Report: GitHub Actions 自动部署

## Status: DONE

## Commits Created
- `c1018df` — [Phase 0] ci(deploy): GitHub Actions 自动部署到 Pages

## Files Created
- `.github/workflows/deploy.yml` — GitHub Actions workflow that:
  - Triggers on push to `main` and `workflow_dispatch`
  - Builds the Next.js static export with `NEXT_PUBLIC_BASE_PATH=/CRAtlas`
  - Downloads GeoJSON data before build
  - Deploys the `./out` directory to GitHub Pages

## Concerns
None.
