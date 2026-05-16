'use client'

import useEditor from '../../../store/use-editor'
import { PanelSection } from '../controls/panel-section'
import { Input } from '../primitives/input'
import { PanelWrapper } from './panel-wrapper'

function buildDefaultCustom材质() {
  return {
    preset: 'custom' as const,
    properties: {
      color: '#ffffff',
      roughness: 0.5,
      metalness: 0,
      opacity: 1,
      transparent: false,
      side: 'front' as const,
    },
  }
}

export function PaintPanel() {
  const activePaint材质 = useEditor((state) => state.activePaint材质)
  const activePaintTarget = useEditor((state) => state.activePaintTarget)
  const setActivePaint材质 = useEditor((state) => state.setActivePaint材质)
  const setPaintPanelOpen = useEditor((state) => state.setPaintPanelOpen)

  const custom材质 =
    activePaint材质?.material?.properties && !activePaint材质.materialPreset
      ? activePaint材质.material
      : null

  if (!custom材质) return null

  const currentProps = custom材质.properties ?? buildDefaultCustom材质().properties

  const updateCustom材质 = (
    updates: Partial<typeof currentProps>,
    next透明 = currentProps.transparent,
  ) => {
    setActivePaint材质({
      material: {
        preset: 'custom',
        properties: {
          ...currentProps,
          ...updates,
          transparent: next透明,
        },
      },
      sourceTarget: activePaint材质?.sourceTarget ?? activePaintTarget,
    })
  }

  return (
    <PanelWrapper onClose={() => setPaintPanelOpen(false)} title="材质" width={320}>
      <PanelSection title="Custom 材质">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="block font-medium text-muted-foreground text-xs uppercase tracking-[0.12em]">
              颜色
            </label>
            <div className="flex items-center gap-2">
              <input
                className="h-10 w-14 cursor-pointer rounded-md border border-input bg-transparent"
                onChange={(e) => updateCustom材质({ color: e.target.value })}
                type="color"
                value={currentProps.color}
              />
              <Input
                onChange={(e) => updateCustom材质({ color: e.target.value })}
                value={currentProps.color}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-muted-foreground text-xs uppercase tracking-[0.12em]">
                粗糙度
              </label>
              <span className="font-mono text-muted-foreground text-xs">
                {currentProps.roughness.toFixed(2)}
              </span>
            </div>
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-accent"
              max={1}
              min={0}
              onChange={(e) =>
                updateCustom材质({ roughness: Number.parseFloat(e.target.value) })
              }
              step={0.01}
              type="range"
              value={currentProps.roughness}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-muted-foreground text-xs uppercase tracking-[0.12em]">
                金属度
              </label>
              <span className="font-mono text-muted-foreground text-xs">
                {currentProps.metalness.toFixed(2)}
              </span>
            </div>
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-accent"
              max={1}
              min={0}
              onChange={(e) =>
                updateCustom材质({ metalness: Number.parseFloat(e.target.value) })
              }
              step={0.01}
              type="range"
              value={currentProps.metalness}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-medium text-muted-foreground text-xs uppercase tracking-[0.12em]">
                不透明度
              </label>
              <span className="font-mono text-muted-foreground text-xs">
                {currentProps.opacity.toFixed(2)}
              </span>
            </div>
            <input
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-accent"
              max={1}
              min={0}
              onChange={(e) => {
                const opacity = Number.parseFloat(e.target.value)
                updateCustom材质({ opacity }, opacity < 1 || currentProps.transparent)
              }}
              step={0.01}
              type="range"
              value={currentProps.opacity}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-muted-foreground text-xs uppercase tracking-[0.12em]">
              面
            </label>
            <select
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30"
              onChange={(e) =>
                updateCustom材质({ side: e.target.value as 'front' | 'back' | 'double' })
              }
              value={currentProps.side}
            >
              <option value="front">Front</option>
              <option value="back">Back</option>
              <option value="double">Double</option>
            </select>
          </div>
        </div>
      </PanelSection>
    </PanelWrapper>
  )
}
