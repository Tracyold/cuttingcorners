Refactor the agent for cost-efficient intelligence.

# token reuse is authorized

Goals:
- Maximize reasoning quality per request.
- Minimize total token usage.
- No recursive loops.
- No automatic retries.
- No continuous stuck-task monitoring.
- No automatic multi-pass reflection.

Constraints:
- Keep reasoning effort at medium.
- Limit reasoning to a single structured pass.
- Limit output verbosity.
- Avoid re-reading large files unless explicitly required.
- Only load testing protocol when user explicitly enters testing mode.

Implementation:
- Disable auto-retry loops.
- Disable recursive stuck handling.
- Reduce system prompt size.
- Enforce single-pass execution.
- Limit tool calls to one per request unless explicitly required.

Report:
- What loops were removed.
- New token limits.
- Whether reasoning effort remains medium.