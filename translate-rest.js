const fs = require('fs');
const path = require('path');

// 场景树面板
const sitePanelPath = path.join(__dirname, 'packages/editor/src/components/ui/sidebar/panels/site-panel/index.tsx');
const sitePanelContent = fs.readFileSync(sitePanelPath, 'utf8');

const sitePanelTranslations = [
  { old: "Property Line", new: "用地边界" },
  { old: "Area:", new: "面积：" },
  { old: "Perimeter:", new: "周长：" },
  { old: "Add point", new: "添加点" }
];

let newSitePanel = sitePanelContent;
for (const t of sitePanelTranslations) {
  newSitePanel = newSitePanel.replaceAll(t.old, t.new);
}
fs.writeFileSync(sitePanelPath, newSitePanel);
console.log('✅ 场景树面板翻译完成');

// 楼层复制对话框
const levelDialogPath = path.join(__dirname, 'packages/editor/src/components/ui/level-duplicate-dialog.tsx');
const levelDialogContent = fs.readFileSync(levelDialogPath, 'utf8');

const levelDialogTranslations = [
  { old: "Everything", new: "全部" },
  { old: "Structure, materials, furniture, and references.", new: "结构、材质、家具和参考图。" },
  { old: "Structure only", new: "仅结构" },
  { old: "Walls, slabs, roofs, stairs, windows, and doors without finishes.", new: "墙体、楼板、屋顶、楼梯、窗户和门（不含饰面）。" },
  { old: "Structure + materials", new: "结构+材质" },
  { old: "Structure with the current material and finish assignments.", new: "带有当前材质和饰面的结构。" },
  { old: "Structure + furniture", new: "结构+家具" },
  { old: "Structure, finishes, and placed items, without guide references.", new: "结构、饰面和放置的物品（不含参考图）。" },
  { old: "this level", new: "此楼层" },
  { old: "Level ", new: "楼层 " },
  { old: "Duplicate Level", new: "复制楼层" },
  { old: "Choose what to copy from", new: "选择要复制的内容，来自" },
  { old: "Cancel", new: "取消" },
  { old: "Duplicate", new: "复制" }
];

let newLevelDialog = levelDialogContent;
for (const t of levelDialogTranslations) {
  newLevelDialog = newLevelDialog.replaceAll(t.old, t.new);
}
fs.writeFileSync(levelDialogPath, newLevelDialog);
console.log('✅ 楼层复制对话框翻译完成');

// 快捷键对话框
const shortcutsDialogPath = path.join(__dirname, 'packages/editor/src/components/ui/sidebar/panels/settings-panel/keyboard-shortcuts-dialog.tsx');
const shortcutsDialogContent = fs.readFileSync(shortcutsDialogPath, 'utf8');

const shortcutsDialogTranslations = [
  { old: "Editor Navigation", new: "编辑器导航" },
  { old: "Switch to Site phase", new: "切换到场地阶段" },
  { old: "Switch to Structure phase", new: "切换到结构阶段" },
  { old: "Switch to Furnish phase", new: "切换到陈设阶段" },
  { old: "Switch to Structure layer", new: "切换到结构图层" },
  { old: "Switch to Furnish layer", new: "切换到陈设图层" },
  { old: "Switch to Zones layer", new: "切换到区域图层" },
  { old: "Select next level in the active building", new: "在活动建筑中选择下一楼层" },
  { old: "Select previous level in the active building", new: "在活动建筑中选择上一楼层" },
  { old: "Toggle sidebar", new: "切换侧边栏" },
  { old: "Modes & History", new: "模式与历史" },
  { old: "Switch to Select mode", new: "切换到选择模式" },
  { old: "Switch to Build mode", new: "切换到建造模式" },
  { old: "Cancel the active tool and return to Select mode", new: "取消活动工具并返回选择模式" },
  { old: "Delete selected objects", new: "删除选中对象" },
  { old: "Undo", new: "撤销" },
  { old: "Redo", new: "重做" },
  { old: "Selection", new: "选择" },
  { old: "Add or remove an object from multi-selection", new: "向多选添加或移除对象" },
  { old: "Works while in Select mode.", new: "在选择模式下工作。" },
  { old: "Drawing Tools", new: "绘制工具" },
  { old: "Temporarily disable angle snapping while drawing walls, slabs, and ceilings", new: "绘制墙体、楼板和天花板时临时禁用角度捕捉" },
  { old: "Hold while drawing.", new: "绘制时按住。" },
  { old: "Item Placement", new: "物品放置" },
  { old: "Rotate item clockwise, or toggle selected door open/closed", new: "顺时针旋转物品，或切换所选门的打开/关闭" },
  { old: "Rotate item counter-clockwise, or close selected door", new: "逆时针旋转物品，或关闭所选门" },
  { old: "Temporarily bypass placement validation constraints", new: "临时绕过放置验证约束" },
  { old: "Hold while placing.", new: "放置时按住。" },
  { old: "Camera", new: "相机" },
  { old: "Pan camera", new: "平移相机" },
  { old: "Drag with the middle mouse button, or hold Space while dragging with the left mouse button.", new: "用鼠标中键拖动，或按住空格键的同时用鼠标左键拖动。" },
  { old: "Orbit camera", new: "环绕相机" },
  { old: "Drag with the right mouse button.", new: "用鼠标右键拖动。" },
  { old: "Keyboard Shortcuts", new: "键盘快捷键" },
  { old: "Shortcuts are context-aware and depend on the current phase or tool.", new: "快捷键是上下文感知的，取决于当前阶段或工具。" }
];

let newShortcutsDialog = shortcutsDialogContent;
for (const t of shortcutsDialogTranslations) {
  newShortcutsDialog = newShortcutsDialog.replaceAll(t.old, t.new);
}
fs.writeFileSync(shortcutsDialogPath, newShortcutsDialog);
console.log('✅ 快捷键对话框翻译完成');
