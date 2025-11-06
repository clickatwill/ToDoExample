import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { Todo } from './TodoList'

interface TodoItemProps {
  todo: Todo
  index: number
  onRemove: (id: string) => void
  onToggleComplete: (id: string) => void
}

export default function TodoItem({ todo, index, onRemove, onToggleComplete }: TodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // Generate unique ID for accessibility
  const todoTextId = `todo-text-${todo.id}`

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
        isDragging
          ? 'border-2 border-primary bg-primary/10 shadow-lg'
          : 'border-2 border-gray-400'
      } ${
        index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing hover:bg-gray-200 rounded p-2 -m-2 transition-colors touch-manipulation"
        role="button"
        tabIndex={0}
        aria-label={`Reorder ${todo.text}`}
      >
        <GripVertical className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      </div>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggleComplete(todo.id)}
        className="shrink-0 w-5 h-5"
        aria-labelledby={todoTextId}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <span
        id={todoTextId}
        className={`flex-1 text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
      >
        {todo.text}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(todo.id)}
        aria-label={`Delete ${todo.text}`}
        className="shrink-0 h-9 w-9"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
