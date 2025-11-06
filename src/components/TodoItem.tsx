import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { Todo } from './TodoList'

interface TodoItemProps {
  todo: Todo
  onRemove: (id: string) => void
}

export default function TodoItem({ todo, onRemove }: TodoItemProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border hover:bg-secondary/80 transition-colors"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <Checkbox
        checked={false}
        onCheckedChange={() => onRemove(todo.id)}
        className="shrink-0"
      />
      <span className="flex-1 text-sm">{todo.text}</span>
    </div>
  )
}
