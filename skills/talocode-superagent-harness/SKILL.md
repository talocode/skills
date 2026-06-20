# talocode-superagent-harness

Patterns for designing long-horizon agent systems with subagents, memory, sandboxes, skills, and message gateways.

## When to Use

Use this skill when:

- Building multi-step agent workflows
- Designing task decomposition systems
- Implementing sub-agent architectures
- Creating sandboxed execution environments
- Building long-running task systems
- Designing memory and context management
- Creating tool and skill routing systems
- Building message gateways for agent orchestration

## Core Architecture Patterns

### 1. Lead Agent + Sub-Agent Architecture

The lead agent orchestrates sub-agents for complex tasks.

**Pattern:**
```
Lead Agent
    ↓ (task decomposition)
Sub-Agent 1  Sub-Agent 2  Sub-Agent 3
    ↓            ↓            ↓
Results      Results      Results
    ↓            ↓            ↓
Lead Agent (synthesis)
```

**When to use:**
- Tasks that take multiple steps
- Tasks requiring parallel exploration
- Tasks with multiple independent components
- Long-running research or analysis

**Implementation:**
- Lead agent breaks task into subtasks
- Sub-agents run in parallel when possible
- Each sub-agent has scoped context
- Lead agent synthesizes results
- Structured handoff reports between agents

### 2. Sandboxed Execution

Each task gets its own isolated execution environment.

**Pattern:**
```
/mnt/user-data/
├── uploads/          ← user files
├── workspace/        ← agent working directory
└── outputs/          ← final deliverables
```

**When to use:**
- File operations (read, write, edit)
- Shell command execution
- Code compilation and testing
- Data processing
- Asset generation

**Security rules:**
- Isolate execution per task
- Restrict host access by default
- Use read-only filesystems where possible
- Log all file operations
- Require approval for destructive actions

### 3. Memory Design

Persistent memory across sessions for user context.

**Memory types:**
- **Profile memory**: User preferences, writing style, tech stack
- **Session memory**: Current conversation context
- **Task memory**: Completed subtask results
- **Knowledge memory**: Accumulated facts and learnings

**Memory rules:**
- Store locally (never upload without consent)
- Deduplicate facts at write time
- Summarize completed subtasks
- Compress old context
- Keep recent context fresh

### 4. Tool Routing

Route requests to appropriate tools based on intent.

**Tool categories:**
- **File tools**: read, write, edit, list, search
- **Shell tools**: execute, run, compile
- **Web tools**: search, fetch, scrape
- **Data tools**: query, transform, visualize
- **Communication tools**: notify, report, export

**Routing rules:**
- Analyze user intent
- Select appropriate tool(s)
- Execute with proper context
- Return structured results
- Log all operations

### 5. Skill Routing

Load skills on-demand based on task requirements.

**Skill loading pattern:**
```
User request → Intent analysis → Skill selection → Context loading → Execution
```

**Skill management:**
- Skills are Markdown files with workflows
- Load only when needed (progressive loading)
- Support slash activation (`/skill-name`)
- Allow custom skills per project
- Cache frequently used skills

### 6. Message Gateway

Central hub for agent communication and orchestration.

**Gateway responsibilities:**
- Route messages between agents
- Manage conversation state
- Handle streaming responses
- Coordinate parallel execution
- Track token usage

**Gateway patterns:**
- Request routing
- Response aggregation
- Error handling
- Progress tracking
- Cancellation support

### 7. Task Decomposition

Break complex tasks into manageable subtasks.

**Decomposition rules:**
- One clear goal per subtask
- Defined input/output for each
- Dependency mapping between tasks
- Parallel execution when possible
- Rollback capability

**Task structure:**
```json
{
  "task_id": "uuid",
  "parent_id": "parent-uuid",
  "goal": "What this task achieves",
  "inputs": ["required inputs"],
  "outputs": ["expected outputs"],
  "dependencies": ["task-ids"],
  "status": "pending|running|completed|failed",
  "agent": "agent-identifier"
}
```

### 8. Long-Running Task State

Manage tasks that run for minutes or hours.

**State management:**
- Persistent task state in database
- Checkpoint intermediate results
- Support cancellation and resumption
- Track progress and completion
- Handle failures gracefully

**State machine:**
```
pending → running → completed
                  → failed → retry
                  → cancelled
```

### 9. Verification Loops

Verify task completion before proceeding.

**Verification patterns:**
- Output validation
- Test execution
- Quality checks
- Peer review
- Human approval

**Loop structure:**
```
Execute → Verify → Pass? → Done
                → Fail? → Fix → Re-verify
```

### 10. Human Approval Checkpoints

Require human approval for critical actions.

**Approval triggers:**
- File deletion
- Database changes
- External API calls
- Cost exceeding threshold
- Security-sensitive operations

**Approval flow:**
```
Action proposed → Notification → Human review → Approve/Deny → Execute/Abort
```

### 11. Safety Boundaries

Define what agents can and cannot do.

**Safety rules:**
- Restrict filesystem access
- Limit network access
- Block dangerous commands
- Require explicit consent
- Log all operations
- Audit trail for compliance

### 12. Handoff Reports

Structured reports for task completion.

**Report format:**
```json
{
  "task_id": "uuid",
  "status": "completed",
  "summary": "What was accomplished",
  "outputs": ["file paths", "data"],
  "metrics": {
    "duration": "time taken",
    "tokens_used": "model usage"
  },
  "next_steps": ["recommended actions"]
}
```

## Implementation Roadmap

### Phase 1: Task Plans + Sub-Agent Abstraction
- Define task structure
- Implement sub-agent spawning
- Add basic task state management

### Phase 2: Sandboxed Worker Execution
- Create isolated execution environments
- Implement file system isolation
- Add shell command restrictions

### Phase 3: Memory + Context Engineering
- Implement session memory
- Add context summarization
- Create knowledge persistence

### Phase 4: Message Gateway
- Build message routing system
- Add conversation state management
- Implement streaming responses

### Phase 5: Full Orchestration
- Complete task decomposition
- Add verification loops
- Implement human approval checkpoints
- Create handoff reports

## External Reference

DeerFlow by ByteDance is an external open-source long-horizon SuperAgent harness. Talocode agents may study its architecture and patterns, but must preserve license/attribution and must not claim it as Talocode-owned.

**Repository:** https://github.com/bytedance/deer-flow
**License:** MIT
**Attribution:** "DeerFlow by ByteDance" must be preserved when referencing patterns.

## Security Considerations

- Never execute untrusted code without sandboxing
- Always require approval for destructive actions
- Log all file operations
- Restrict network access by default
- Use read-only filesystems where possible
- Implement rate limiting
- Audit all agent actions

## Integration with Talocode

This skill works alongside:

- **Codra Code**: Task execution and file operations
- **Codra Canvas**: Visual orchestration
- **WorkLane**: Team-based agent coordination
- **Talocode Skills**: Skill routing and management

## Notes

- This skill provides patterns, not implementations
- Adapt patterns to your specific use case
- Always test thoroughly before production use
- Keep security as a primary concern
