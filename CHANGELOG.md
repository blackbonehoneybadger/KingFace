# Changelog

All notable changes to KingFace project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Cursor Agents configuration for automated development workflow
- Global rules for code quality and consistency (`.cursor/rules.md`)
- Task template for structured agent interactions
- Architecture documentation for frontend and backend
- Agent roles: Architect, Implementer, QA & Tests, Docs/Changelog

### Changed
- Project structure documentation with detailed tech stack
- Development workflow with 4-agent system

### Technical Debt
- Need to implement proper CI/CD pipeline
- Missing test coverage setup
- API client structure needs standardization

## [0.1.0] - 2024-01-XX (Initial Release)

### Added
- Basic project structure with Next.js frontend and FastAPI backend
- Tailwind CSS configuration with custom "гравюра/sepia" theme
- Initial Solana integration setup
- Basic API endpoints structure

### Infrastructure
- Frontend: Next.js 14 with App Router
- Backend: FastAPI with Python
- Database: PostgreSQL (planned)
- Blockchain: Solana devnet integration