const fs = require('fs');
const path = require('path');

// 区域面板
const zonePanelPath = path.join(__dirname, 'packages/editor/src/components/ui/sidebar/panels/zone-panel/index.tsx');
const zonePanelContent = fs.readFileSync(zonePanelPath, 'utf8');

const zonePanelTranslations = [
  { old: "Camera snapshot", new: "相机快照" },
  { old: "View snapshot", new: "查看快照" },
  { old: "Update snapshot", new: "更新快照" },
  { old: "Take snapshot", new: "拍摄快照" },
  { old: "Clear snapshot", new: "清除快照" }
];

let newZonePanel = zonePanelContent;
for (const t of zonePanelTranslations) {
  newZonePanel = newZonePanel.replaceAll(t.old, t.new);
}
fs.writeFileSync(zonePanelPath, newZonePanel);
console.log('✅ 区域面板翻译完成');

// 材质面板
const paintPanelPath = path.join(__dirname, 'packages/editor/src/components/ui/panels/paint-panel.tsx');
const paintPanelContent = fs.readFileSync(paintPanelPath, 'utf8');

const paintPanelTranslations = [
  { old: "Material", new: "材质" },
  { old: "Custom Material", new: "自定义材质" },
  { old: "Color", new: "颜色" },
  { old: "Roughness", new: "粗糙度" },
  { old: "Metalness", new: "金属度" },
  { old: "Opacity", new: "不透明度" },
  { old: "Transparent", new: "透明" },
  { old: "Backface culling", new: "背面剔除" },
  { old: "Side", new: "面" }
];

let newPaintPanel = paintPanelContent;
for (const t of paintPanelTranslations) {
  newPaintPanel = newPaintPanel.replaceAll(t.old, t.new);
}
fs.writeFileSync(paintPanelPath, newPaintPanel);
console.log('✅ 材质面板翻译完成');

// 参考图面板
const referencePanelPath = path.join(__dirname, 'packages/editor/src/components/ui/panels/reference-panel.tsx');
const referencePanelContent = fs.readFileSync(referencePanelPath, 'utf8');

const referencePanelTranslations = [
  { old: "Uncalibrated", new: "未校准" },
  { old: "Scaled (hidden)", new: "已缩放（已隐藏）" },
  { old: "Scaled", new: "已缩放" },
  { old: "Reference", new: "参考图" },
  { old: "Hide reference", new: "隐藏参考图" },
  { old: "Show reference", new: "显示参考图" },
  { old: "Lock", new: "锁定" },
  { old: "Unlock", new: "解锁" },
  { old: "Scale", new: "缩放" },
  { old: "Rotation", new: "旋转" },
  { old: "Delete", new: "删除" },
  { old: "Scale reference", new: "缩放参考" },
  { old: "Visible", new: "可见" },
  { old: "Show", new: "显示" },
  { old: "Hide", new: "隐藏" },
  { old: "Replace file", new: "替换文件" },
  { old: "Choose a PNG, JPEG, or WebP image.", new: "请选择 PNG、JPEG 或 WebP 图片。" },
  { old: "Scale axis", new: "缩放轴" },
  { old: "Start", new: "开始" },
  { old: "Length", new: "长度" },
  { old: "Reset scale", new: "重置缩放" },
  { old: "Locate", new: "定位" },
  { old: "Locate and focus on the reference in the 3D view.", new: "在3D视图中定位并聚焦到参考图。" }
];

let newReferencePanel = referencePanelContent;
for (const t of referencePanelTranslations) {
  newReferencePanel = newReferencePanel.replaceAll(t.old, t.new);
}
fs.writeFileSync(referencePanelPath, newReferencePanel);
console.log('✅ 参考图面板翻译完成');
