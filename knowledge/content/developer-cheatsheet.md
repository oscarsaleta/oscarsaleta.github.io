# Developer CLI & Git Cheatsheet

A distilled personal quick-reference for Git diagnostics, shell productivity, and macOS terminal commands.

---

## Git Essentials & Surgical History

### Clean Log View
```bash
# Pretty compact graph
git log --graph --oneline --decorate --all -n 20

# Search commit history for changes containing string
git log -S "target_function_name" --source --all
```

### Undo & Surgery Without Fear
```bash
# Soft undo last commit (keeps changes staged)
git reset --soft HEAD~1

# Discard all unstaged changes cleanly
git restore .

# Interactive stash with prompt
git stash -p
```

### Worktrees (Multi-Branch Development)
```bash
# Create a parallel workspace for hotfixes or feature branches
git worktree add ../feature-branch feature-branch

# List active worktrees
git worktree list

# Remove when completed
git worktree remove ../feature-branch
```

---

## Modern macOS Terminal Productivity

### Quick Local Static Server
```bash
# Python 3 built-in server on port 8000
python3 -m http.server 8000

# Open directly in default browser
open http://localhost:8000
```

### Process & Port Inspection
```bash
# Find what process is running on port 8000
lsof -i :8000

# Kill process by PID
kill -9 <PID>
```

### File Search & Ripgrep
```bash
# Fast pattern match across repository, ignoring gitignored files
rg "TODO|FIXME" -g '!node_modules/'

# Fast file finder
fd -e html -e js
```
