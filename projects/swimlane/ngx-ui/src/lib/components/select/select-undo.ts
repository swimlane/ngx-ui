/**
 * Snapshot of the inline-tagging state at a point in time.
 * Used by {@link SelectUndoManager} to support token-level undo/redo.
 */
export interface SelectUndoSnapshot {
  readonly selected: readonly unknown[];
  readonly inputInsertIndex: number;
}

const MAX_UNDO_DEPTH = 50;

/**
 * Lightweight, per-component-instance undo/redo manager for inline-tagging
 * chip mutations (add, edit, delete).
 *
 * The stack stores full state snapshots.  `record()` pushes the new state
 * after a mutation; `undo()` / `redo()` traverse the stack and return the
 * target state for the caller to apply.
 *
 * The stack is reset when the user blurs the component so that each editing
 * session starts fresh.
 */
export class SelectUndoManager {
  private stack: SelectUndoSnapshot[] = [];
  private pointer = -1;

  /**
   * Record a state snapshot.  Call once for the initial state (before any
   * edits) and once after each mutation.
   */
  record(snapshot: SelectUndoSnapshot): void {
    this.stack.length = this.pointer + 1;
    this.stack.push({
      selected: [...snapshot.selected],
      inputInsertIndex: snapshot.inputInsertIndex
    });
    if (this.stack.length > MAX_UNDO_DEPTH) {
      this.stack.shift();
    }
    this.pointer = this.stack.length - 1;
  }

  canUndo(): boolean {
    return this.pointer > 0;
  }

  canRedo(): boolean {
    return this.pointer < this.stack.length - 1;
  }

  undo(): SelectUndoSnapshot | null {
    if (!this.canUndo()) return null;
    this.pointer--;
    return this.cloneAt(this.pointer);
  }

  redo(): SelectUndoSnapshot | null {
    if (!this.canRedo()) return null;
    this.pointer++;
    return this.cloneAt(this.pointer);
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  /** Clear the history.  Call on blur so each editing session starts fresh. */
  reset(): void {
    this.stack.length = 0;
    this.pointer = -1;
  }

  private cloneAt(index: number): SelectUndoSnapshot {
    const s = this.stack[index];
    return { selected: [...s.selected], inputInsertIndex: s.inputInsertIndex };
  }
}
