'use client'

import type { AnyNodeId } from '@pascal-app/core'
import { LevelNode, use场景 } from '@pascal-app/core'
import { use视图er } from '@pascal-app/viewer'
import {
  AppWindow,
  ArrowRight,
  Box,
  Building2,
  Camera,
  Copy,
  DoorOpen,
  Eye,
  EyeOff,
  FileJson,
  Grid3X3,
  Hexagon,
  Layers,
  Map,
  Maximize2,
  Minimize2,
  Moon,
  MousePointer2,
  Package,
  PaintBucket,
  PencilLine,
  Plus,
  重做2,
  Square,
  SquareStack,
  Sun,
  Trash2,
  撤销2,
  Video,
} from 'lucide-react'
import { useEffect } from 'react'
import { run重做, run撤销 } from '../../../lib/history'
import { deleteLevelWithFallbackSelection } from '../../../lib/level-selection'
import { useCommandRegistry } from '../../../store/use-command-registry'
import type { StructureTool } from '../../../store/use-editor'
import useEditor from '../../../store/use-editor'
import { useCommandPalette } from './index'

export function EditorCommands() {
  const register = useCommandRegistry((s) => s.register)
  const { navigateTo, setInputValue, setOpen } = useCommandPalette()

  const setPhase = useEditor((s) => s.setPhase)
  const setMode = useEditor((s) => s.setMode)
  const setTool = useEditor((s) => s.setTool)
  const setStructureLayer = useEditor((s) => s.setStructureLayer)
  const primeMaterialPaintFromSelection = useEditor((s) => s.primeMaterialPaintFromSelection)
  const isPreviewMode = useEditor((s) => s.isPreviewMode)
  const setPreviewMode = useEditor((s) => s.setPreviewMode)

  const export场景 = use视图er((s) => s.export场景)

  // Re-register when export场景 availability changes (it's a conditional action)
  useEffect(() => {
    const run = (fn: () => void) => {
      fn()
      setOpen(false)
    }

    const activateTool = (tool: StructureTool) => {
      run(() => {
        setPhase('structure')
        setMode('build')
        if (tool === 'zone') setStructureLayer('zones')
        setTool(tool)
      })
    }

    return register([
      // ── 场景 ────────────────────────────────────────────────────────────
      {
        id: 'editor.tool.wall',
        label: '墙体工具',
        group: '场景',
        icon: <Square className="h-4 w-4" />,
        keywords: ['draw', 'build', 'structure'],
        execute: () => activateTool('wall'),
      },
      {
        id: 'editor.tool.slab',
        label: '楼板工具',
        group: '场景',
        icon: <Layers className="h-4 w-4" />,
        keywords: ['floor', 'build'],
        execute: () => activateTool('slab'),
      },
      {
        id: 'editor.tool.ceiling',
        label: '天花板工具',
        group: '场景',
        icon: <Grid3X3 className="h-4 w-4" />,
        keywords: ['top', 'build'],
        execute: () => activateTool('ceiling'),
      },
      {
        id: 'editor.tool.door',
        label: '门工具',
        group: '场景',
        icon: <DoorOpen className="h-4 w-4" />,
        keywords: ['opening', 'entrance'],
        execute: () => activateTool('door'),
      },
      {
        id: 'editor.tool.window',
        label: '窗户工具',
        group: '场景',
        icon: <AppWindow className="h-4 w-4" />,
        keywords: ['opening', 'glass'],
        execute: () => activateTool('window'),
      },
      {
        id: 'editor.tool.item',
        label: '物品工具',
        group: '场景',
        icon: <Package className="h-4 w-4" />,
        keywords: ['furniture', 'object', 'asset', 'furnish'],
        execute: () => activateTool('item'),
      },
      {
        id: 'editor.tool.stair',
        label: '楼梯工具',
        group: '场景',
        icon: <ArrowRight className="h-4 w-4" />,
        keywords: ['stairs', 'staircase', 'flight', 'landing', 'steps'],
        execute: () => activateTool('stair'),
      },
      {
        id: 'editor.tool.zone',
        label: '区域工具',
        group: '场景',
        icon: <Hexagon className="h-4 w-4" />,
        keywords: ['area', 'room', 'space'],
        execute: () => activateTool('zone'),
      },
      {
        id: 'editor.delete-selection',
        label: '删除选中',
        group: '场景',
        icon: <Trash2 className="h-4 w-4" />,
        keywords: ['remove', 'erase'],
        shortcut: ['⌫'],
        when: () => use视图er.getState().selection.selectedIds.length > 0,
        execute: () =>
          run(() => {
            const { selectedIds } = use视图er.getState().selection
            use场景.getState().deleteNodes(selectedIds as any[])
          }),
      },
      {
        id: 'editor.mode.material-paint',
        label: '材质绘制',
        group: '场景',
        icon: <PaintBucket className="h-4 w-4" />,
        keywords: ['paint', 'material', 'texture', 'bucket', 'surface'],
        shortcut: ['P'],
        execute: () =>
          run(() => {
            primeMaterialPaintFromSelection()
            setPhase('structure')
            setStructureLayer('elements')
            setMode('material-paint')
          }),
      },

      // ── 楼层 ───────────────────────────────────────────────────────────
      {
        id: 'editor.level.goto',
        label: '前往楼层',
        group: '楼层',
        icon: <ArrowRight className="h-4 w-4" />,
        keywords: ['level', 'floor', 'go', 'navigate', 'switch', 'select'],
        navigate: true,
        when: () => Object.values(use场景.getState().nodes).some((n) => n.type === 'level'),
        execute: () => navigateTo('goto-level'),
      },
      {
        id: 'editor.level.add',
        label: '添加楼层',
        group: '楼层',
        icon: <Plus className="h-4 w-4" />,
        keywords: ['level', 'floor', 'add', 'create', 'new'],
        execute: () =>
          run(() => {
            const { nodes } = use场景.getState()
            const building = Object.values(nodes).find((n) => n.type === 'building')
            if (!building) return
            const levelCount = building.children.filter(
              (childId) => nodes[childId as keyof typeof nodes]?.type === 'level',
            ).length
            const newLevel = LevelNode.parse({
              level: levelCount,
              children: [],
              parentId: building.id,
            })
            use场景.getState().createNode(newLevel, building.id)
            use视图er.getState().setSelection({ levelId: newLevel.id })
          }),
      },
      {
        id: 'editor.level.rename',
        label: '重命名楼层',
        group: '楼层',
        icon: <PencilLine className="h-4 w-4" />,
        keywords: ['level', 'floor', 'rename', 'name'],
        navigate: true,
        when: () => !!use视图er.getState().selection.levelId,
        execute: () => {
          const activeLevelId = use视图er.getState().selection.levelId
          if (!activeLevelId) return
          const level = use场景.getState().nodes[activeLevelId as AnyNodeId] as LevelNode
          setInputValue(level?.name ?? '')
          navigateTo('rename-level')
        },
      },
      {
        id: 'editor.level.delete',
        label: '删除楼层',
        group: '楼层',
        icon: <Trash2 className="h-4 w-4" />,
        keywords: ['level', 'floor', 'delete', 'remove'],
        when: () => {
          const levelId = use视图er.getState().selection.levelId
          if (!levelId) return false
          const node = use场景.getState().nodes[levelId as AnyNodeId] as LevelNode
          return node?.type === 'level' && node.level !== 0
        },
        execute: () =>
          run(() => {
            const activeLevelId = use视图er.getState().selection.levelId
            if (!activeLevelId) return
            deleteLevelWithFallbackSelection(activeLevelId as AnyNodeId)
          }),
      },

      // ── 视图控制 ──────────────────────────────────────────────────
      {
        id: 'editor.viewer.wall-mode',
        label: '墙体模式',
        group: '视图控制',
        icon: <Layers className="h-4 w-4" />,
        keywords: ['wall', 'cutaway', 'up', 'down', 'view'],
        badge: () => {
          const mode = use视图er.getState().wallMode
          return { cutaway: '剖切', up: 'Up', down: 'Down' }[mode]
        },
        navigate: true,
        execute: () => navigateTo('wall-mode'),
      },
      {
        id: 'editor.viewer.level-mode',
        label: '楼层模式',
        group: '视图控制',
        icon: <SquareStack className="h-4 w-4" />,
        keywords: ['level', 'floor', 'exploded', 'stacked', 'solo'],
        badge: () => {
          const mode = use视图er.getState().levelMode
          return { manual: '手动', stacked: '堆叠', exploded: '展开', solo: '单独' }[mode]
        },
        navigate: true,
        execute: () => navigateTo('level-mode'),
      },
      {
        id: 'editor.viewer.camera-mode',
        label: () => {
          const mode = use视图er.getState().cameraMode
          return `相机: 切换到 ${mode === 'perspective' ? '正交视图' : '透视视图'}`
        },
        group: '视图控制',
        icon: <Video className="h-4 w-4" />,
        keywords: ['camera', 'ortho', 'perspective', '2d', '3d', 'view'],
        execute: () =>
          run(() => {
            const { cameraMode, setCameraMode } = use视图er.getState()
            setCameraMode(cameraMode === 'perspective' ? 'orthographic' : 'perspective')
          }),
      },
      {
        id: 'editor.viewer.theme',
        label: () => {
          const theme = use视图er.getState().theme
          return theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'
        },
        group: '视图控制',
        icon: <Sun className="h-4 w-4" />, // icon is static; label conveys the action
        keywords: ['theme', 'dark', 'light', 'appearance', 'color'],
        execute: () =>
          run(() => {
            const { theme, setTheme } = use视图er.getState()
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }),
      },
      {
        id: 'editor.viewer.camera-snapshot',
        label: '截图',
        group: '视图控制',
        icon: <Camera className="h-4 w-4" />,
        keywords: ['camera', 'snapshot', 'capture', 'save', 'view', 'bookmark'],
        execute: () => {
          setOpen(false)
          useEditor.getState().setCaptureMode(true)
        },
      },

      // ── 视图 ─────────────────────────────────────────────────────────────
      {
        id: 'editor.view.preview',
        label: () => (isPreviewMode ? '退出预览' : '进入预览'),
        group: '视图',
        icon: isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />,
        keywords: ['preview', 'view', 'read-only', 'present'],
        execute: () => run(() => setPreviewMode(!isPreviewMode)),
      },
      {
        id: 'editor.view.fullscreen',
        label: '切换全屏',
        group: '视图',
        icon: <Maximize2 className="h-4 w-4" />,
        keywords: ['fullscreen', 'maximize', 'expand', 'window'],
        execute: () =>
          run(() => {
            if (document.fullscreenElement) document.exitFullscreen()
            else document.documentElement.requestFullscreen()
          }),
      },

      // ── 历史 ──────────────────────────────────────────────────────────
      {
        id: 'editor.history.undo',
        label: '撤销',
        group: '历史',
        icon: <撤销2 className="h-4 w-4" />,
        keywords: ['undo', 'revert', 'back'],
        execute: () => run(() => run撤销()),
      },
      {
        id: 'editor.history.redo',
        label: '重做',
        group: '历史',
        icon: <重做2 className="h-4 w-4" />,
        keywords: ['redo', 'forward', 'repeat'],
        execute: () => run(() => run重做()),
      },

      // ── Export & Share ───────────────────────────────────────────────────
      {
        id: 'editor.export.json',
        label: 'Export 场景 (JSON)',
        group: 'Export & Share',
        icon: <FileJson className="h-4 w-4" />,
        keywords: ['export', 'download', 'json', 'save', 'data'],
        execute: () =>
          run(() => {
            const { nodes, rootNodeIds } = use场景.getState()
            const blob = new Blob([JSON.stringify({ nodes, rootNodeIds }, null, 2)], {
              type: 'application/json',
            })
            const url = URL.createObjectURL(blob)
            Object.assign(document.createElement('a'), {
              href: url,
              download: `scene_${new Date().toISOString().split('T')[0]}.json`,
            }).click()
            URL.revokeObjectURL(url)
          }),
      },
      ...(export场景
        ? [
            {
              id: 'editor.export.glb',
              label: 'Export 3D Model (GLB)',
              group: 'Export & Share',
              icon: <Box className="h-4 w-4" />,
              keywords: ['export', 'glb', 'gltf', '3d', 'model', 'download'],
              execute: () => run(() => export场景()),
            },
          ]
        : []),
      {
        id: 'editor.export.share-link',
        label: 'Copy Share Link',
        group: 'Export & Share',
        icon: <Copy className="h-4 w-4" />,
        keywords: ['share', 'copy', 'url', 'link'],
        execute: () => run(() => navigator.clipboard.writeText(window.location.href)),
      },
      {
        id: 'editor.export.screenshot',
        label: 'Take Screenshot',
        group: 'Export & Share',
        icon: <Camera className="h-4 w-4" />,
        keywords: ['screenshot', 'capture', 'image', 'photo', 'png'],
        execute: () =>
          run(() => {
            const canvas = document.querySelector('canvas')
            if (!canvas) return
            Object.assign(document.createElement('a'), {
              href: canvas.toDataURL('image/png'),
              download: `screenshot_${new Date().toISOString().split('T')[0]}.png`,
            }).click()
          }),
      },
    ])
  }, [
    register,
    navigateTo,
    setInputValue,
    setOpen,
    setPhase,
    setMode,
    setTool,
    setStructureLayer,
    isPreviewMode,
    setPreviewMode,
    export场景,
  ])

  return null
}
