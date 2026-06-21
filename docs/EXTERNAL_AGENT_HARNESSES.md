# External Agent Harnesses

Reference documentation for external agent systems that Talocode can learn from.

## DeerFlow by ByteDance

**Repository:** https://github.com/bytedance/deer-flow
**License:** MIT
**Site:** https://deerflow.tech

### What It Is

DeerFlow is an open-source super agent harness that orchestrates sub-agents, memory, and sandboxes to do almost anything — powered by extensible skills.

### Key Features

- **Skills & Tools**: Extensible skill system with progressive loading
- **Sub-Agents**: Task decomposition with parallel execution
- **Sandbox & File System**: Isolated execution environments
- **Context Engineering**: Aggressive context management
- **Long-Term Memory**: Persistent memory across sessions
- **Message Gateway**: Central orchestration hub

### Architecture Lessons

#### 1. Lead Agent + Sub-Agent Pattern
DeerFlow decomposes complex tasks into subtasks that run in parallel. This is a proven pattern for long-running tasks.

#### 2. Progressive Skill Loading
Skills are loaded only when needed, keeping context windows lean. This is important for token-sensitive models.

#### 3. Sandboxed Execution
Each task gets its own isolated filesystem and execution environment. This prevents cross-task contamination.

#### 4. Memory Management
DeerFlow builds persistent memory across sessions, summarizing completed tasks and compressing old context.

#### 5. Strict Tool-Call Recovery
DeerFlow handles provider interruptions gracefully, ensuring tool-call sequences remain valid.

### What Talocode Should Learn

1. **Task decomposition**: Break complex tasks into manageable subtasks
2. **Parallel execution**: Run independent tasks simultaneously
3. **Context isolation**: Keep sub-agent contexts separate
4. **Memory persistence**: Remember user preferences across sessions
5. **Tool routing**: Select appropriate tools based on intent
6. **Skill loading**: Load skills on-demand, not all at once

### What Talocode Should Not Copy

1. **ByteDance-specific integrations**: Volcengine, Doubao models
2. **InfoQuest**: ByteDance's search tool
3. **Internal deployment**: Docker-specific configurations
4. **Proprietary features**: Any non-MIT features

### Installation

```bash
# Clone the repository
git clone https://github.com/bytedance/deer-flow

# Install dependencies
cd deer-flow
make install

# Run
make run
```

### Attribution

When referencing DeerFlow patterns:
- Credit "DeerFlow by ByteDance"
- Link to https://github.com/bytedance/deer-flow
- Note that it is MIT licensed
- Do not claim it as Talocode-owned

## Other Agent Systems to Study

### LangChain
- Agent orchestration
- Tool integration
- Memory systems

### CrewAI
- Multi-agent collaboration
- Task decomposition
- Role-based agents

## Notes

- These are external references, not Talocode-owned
- Study patterns, don't copy code
- Preserve attribution when referencing
- Adapt patterns to Talocode ecosystem
