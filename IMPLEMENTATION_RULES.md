# Implementation Rules

## Core Rules

- Use Python 3.12 or newer.
- Use FastAPI for the backend.
- Use React + Vite for the frontend.
- Use Manifest V3 for the browser extension.
- Use `.js` and `.jsx` file extensions explicitly.
- Follow clean architecture in the backend: `routes -> services -> models`.
- Use Python type hints throughout backend code.
- Add comments only for non-obvious code.
- Use environment variables for secrets.
- Write a README for every major milestone.
- Create a Git commit after each completed phase.

## Learning Rules

- The project is primarily for learning.
- Move step by step.
- Do not skip foundational explanations.
- Keep each milestone small enough to understand.
- Prefer readable code over advanced patterns.
- Avoid adding features before the current phase is working.
- Review what changed at the end of each phase.

## Backend Rules

- Keep API route handlers thin.
- Put application logic in services.
- Put request and response schemas in models.
- Do not hard-code secrets.
- Validate inputs with Pydantic models.
- Use clear function names and return types.

## Frontend Rules

- Use React components with explicit `.jsx` imports.
- Keep UI state understandable.
- Keep API calls separated from display logic when the app grows.
- Avoid building large UI sections before the backend workflow is clear.

## Extension Rules

- Use Manifest V3.
- Keep extension files explicit with `.js` extensions.
- Request only the permissions needed for the current milestone.
- Start with a small popup and content script before adding advanced behavior.

## Git Rules

- Commit after each completed milestone.
- Keep commit messages clear and milestone-focused.
- Do not mix unrelated changes in a milestone commit.

## Documentation Rules

- Keep the root README focused on running the whole project.
- Keep milestone READMEs focused on what was built and learned.
- Update documentation when setup steps change.

