'use client'

import type { LevelNode } from '@pascal-app/core'
import { useEffect, useState } from 'react'
import type { Level复制Preset } from '../../lib/level-duplication'
import { cn } from '../../lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './primitives/dialog'

const DUPLICATE_PRESETS: Array<{
  id: Level复制Preset
  label: string
  description: string
}> = [
  {
    id: 'everything',
    label: '全部',
    description: '结构、材质、家具和参考图。',
  },
  {
    id: 'structure',
    label: '仅结构',
    description: '墙体、楼板、屋顶、楼梯、窗户和门（不含饰面）。',
  },
  {
    id: 'structure-materials',
    label: '结构+材质',
    description: '带有当前材质和饰面的结构。',
  },
  {
    id: 'structure-furniture',
    label: '结构+家具',
    description: '结构、饰面和放置的物品（不含参考图）。',
  },
]

function getLevelLabel(level: LevelNode | null) {
  if (!level) return '此楼层'
  return level.name || `楼层 ${level.level}`
}

export function Level复制Dialog({
  open,
  level,
  onConfirm,
  onOpenChange,
}: {
  open: boolean
  level: LevelNode | null
  onConfirm: (preset: Level复制Preset) => void
  onOpenChange: (open: boolean) => void
}) {
  const [preset, setPreset] = useState<Level复制Preset>('everything')

  useEffect(() => {
    if (open) {
      setPreset('everything')
    }
  }, [open])

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>复制楼层</DialogTitle>
          <DialogDescription>选择要复制的内容，来自 {getLevelLabel(level)}.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          {DUPLICATE_PRESETS.map((option) => (
            <button
              className={cn(
                'cursor-pointer rounded-xl border px-3 py-3 text-left transition-colors',
                preset === option.id
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background hover:bg-accent/40',
              )}
              key={option.id}
              onClick={() => setPreset(option.id)}
              type="button"
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="mt-1 text-muted-foreground text-xs">{option.description}</div>
            </button>
          ))}
        </div>

        <DialogFooter>
          <button
            className="cursor-pointer rounded-md px-4 py-2 text-muted-foreground text-sm transition-colors hover:bg-accent"
            onClick={() => onOpenChange(false)}
            type="button"
          >
            取消
          </button>
          <button
            className="cursor-pointer rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm transition-opacity hover:opacity-90"
            onClick={() => onConfirm(preset)}
            type="button"
          >
            复制
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
