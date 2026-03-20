---
description: Guided feature development with codebase understanding and architecture focus
argument-hint: Optional feature description
---

# Feature Development — OMNIPULSE

You are helping a developer implement a new feature in the OMNIPULSE monorepo. Follow a systematic approach: understand the codebase deeply, identify and ask about all underspecified details, design elegant architectures, then implement.

**Important:** Always respect the CLAUDE.md hierarchy (Root → apps/*/CLAUDE.md → Modules/*/CLAUDE.md) and follow project conventions strictly.

## Core Principles

- **Ask clarifying questions**: Identify all ambiguities, edge cases, and underspecified behaviors. Ask specific, concrete questions rather than making assumptions. Wait for user answers before proceeding with implementation. Ask questions early (after understanding the codebase, before designing architecture).
- **Understand before acting**: Read and comprehend existing code patterns first
- **Read files identified by agents**: When launching agents, ask them to return lists of the most important files to read. After agents complete, read those files to build detailed context before proceeding.
- **Simple and elegant**: Prioritize readable, maintainable, architecturally sound code
- **Use TodoWrite**: Track all progress throughout

---

## Phase 1: Discovery

**Goal**: Understand what needs to be built

Initial request: $ARGUMENTS

**Actions**:
1. Create todo list with all phases
2. If feature unclear, ask user for:
   - What problem are they solving?
   - What should the feature do?
   - Any constraints or requirements?
   - Which apps/modules are affected? (backend, web, mobile, or multiple)
3. Summarize understanding and confirm with user

---

## Phase 2: Research & Codebase Exploration

**Goal**: Understand relevant existing code, patterns, and current API documentation

**Actions**:

**2a. Context7 Research** (if applicable):
- If the feature involves new APIs, new packages, or version-uncertain patterns (Laravel 12, Filament v5, Next.js 16, Tailwind v4): use Context7 Plugin to pull current documentation
- Skip if the feature only uses well-known, established patterns

**2b. Codebase Exploration**:
1. Launch 2-3 code-explorer agents in parallel. Each agent should:
   - Trace through the code comprehensively and focus on getting a comprehensive understanding of abstractions, architecture and flow of control
   - Target a different aspect of the codebase (eg. similar features, high level understanding, architectural understanding, user experience, etc)
   - Include a list of 5-10 key files to read
   - Pay attention to the OMNIPULSE module structure in `apps/backend/app/Modules/`

   **Example agent prompts**:
   - "Find features similar to [feature] and trace through their implementation comprehensively"
   - "Map the architecture and abstractions for [feature area], tracing through the code comprehensively"
   - "Analyze the current implementation of [existing feature/area], tracing through the code comprehensively"
   - "Identify UI patterns, testing approaches, or extension points relevant to [feature]"

2. Once the agents return, read all files identified by agents to build deep understanding
3. Present comprehensive summary of findings and patterns discovered

---

## Phase 3: Clarifying Questions

**Goal**: Fill in gaps and resolve all ambiguities before designing

**CRITICAL**: This is one of the most important phases. DO NOT SKIP.

**Actions**:
1. Review the codebase findings and original feature request
2. Identify underspecified aspects: edge cases, error handling, integration points, scope boundaries, design preferences, backward compatibility, performance needs
3. For OMNIPULSE specifically consider:
   - Which module(s) does this belong to?
   - Does this need API endpoints? (→ `/api/v1/` namespace)
   - Does this need Filament admin UI?
   - Does this need web frontend (Next.js)?
   - Does this need mobile support (Expo)?
   - Are there Zod schemas needed in `packages/types/`?
   - Are there design token or brand considerations?
4. **Present all questions to the user in a clear, organized list**
5. **Wait for answers before proceeding to architecture design**

If the user says "whatever you think is best", provide your recommendation and get explicit confirmation.

---

## Phase 4: Architecture Design

**Goal**: Design multiple implementation approaches with different trade-offs

**Actions**:
1. Launch 2-3 code-architect agents in parallel with different focuses: minimal changes (smallest change, maximum reuse), clean architecture (maintainability, elegant abstractions), or pragmatic balance (speed + quality)
2. Review all approaches and form your opinion on which fits best for this specific task (consider: small fix vs large feature, urgency, complexity, team context)
3. Present to user: brief summary of each approach, trade-offs comparison, **your recommendation with reasoning**, concrete implementation differences
4. **Ask user which approach they prefer**

---

## Phase 5: Implementation

**Goal**: Build the feature

**DO NOT START WITHOUT USER APPROVAL**

**Actions**:
1. Wait for explicit user approval
2. Read all relevant files identified in previous phases
3. Implement following chosen architecture
4. Follow OMNIPULSE conventions strictly:
   - TypeScript strict, no `any`
   - Business logic in Services, not Controllers
   - Zod schemas in `packages/types/`
   - Tailwind + shadcn/ui for web UI
   - Design tokens from `packages/tokens/`
5. Update todos as you progress

---

## Phase 6: Verification & Quality Review

**Goal**: Ensure code works and meets quality standards

**Actions**:

**6a. Visual Verification** (if UI was changed):
- Use Playwright CLI to screenshot and verify UI changes
- Check for console errors, rendering issues, interaction problems

**6b. Code Review**:
1. Launch 3 code-reviewer agents in parallel with different focuses: simplicity/DRY/elegance, bugs/functional correctness, project conventions/OMNIPULSE patterns
2. Consolidate findings and identify highest severity issues that you recommend fixing
3. **Present findings to user and ask what they want to do** (fix now, fix later, or proceed as-is)
4. Address issues based on user decision

**6c. Iteration**:
- Fix any issues found
- Re-verify with Playwright if UI was affected
- Repeat until clean

---

## Phase 7: Summary

**Goal**: Document what was accomplished

**Actions**:
1. Mark all todos complete
2. Summarize:
   - What was built
   - Key decisions made
   - Files modified (grouped by app/module)
   - Suggested next steps
3. Propose commit message (Conventional Commits format)

---
