const fs = require('fs');
const path = require('path');

// 区域面板 - 补充
const zonePanelPath = path.join(__dirname, 'packages/editor/src/components/ui/sidebar/panels/zone-panel/index.tsx');
const zonePanelContent = fs.readFileSync(zonePanelPath, 'utf8');

const zonePanelFinalTranslations = [
  { old: "Select a level to view and create zones", new: "选择一个楼层以查看和创建区域" },
  { old: "No zones on this level.", new: "此楼层没有区域。" },
  { old: "Add one", new: "添加一个" }
];

let newZonePanel = zonePanelContent;
for (const t of zonePanelFinalTranslations) {
  newZonePanel = newZonePanel.replaceAll(t.old, t.new);
}
fs.writeFileSync(zonePanelPath, newZonePanel);
console.log('✅ 区域面板补充翻译完成');

// 参考图面板 - 补充
const referencePanelPath = path.join(__dirname, 'packages/editor/src/components/ui/panels/reference-panel.tsx');
const referencePanelContent = fs.readFileSync(referencePanelPath, 'utf8');

const referencePanelFinalTranslations = [
  { old: "Could not replace that image.", new: "无法替换该图片。" },
  { old: "3D Scan", new: "3D扫描" },
  { old: "Guide Image", new: "参考图片" },
  { old: "Image", new: "图片" },
  { old: "Replacing...", new: "正在替换..." },
  { old: "Replace", new: "替换" },
  { old: "Reference Scale", new: "参考缩放" },
  { old: "Edit Scale", new: "编辑缩放" },
  { old: "Set Scale", new: "设置缩放" },
  { old: "Cancel", new: "取消" },
  { old: "Reset scale", new: "重置缩放" },
  { old: "Locate and focus on the reference in the 3D view.", new: "在3D视图中定位并聚焦到参考图。" },
  { old: "Overlay image unavailable. Replace the image to restore it.", new: "覆盖图不可用。请替换图片以恢复它。" }
];

let newReferencePanel = referencePanelContent;
for (const t of referencePanelFinalTranslations) {
  newReferencePanel = newReferencePanel.replaceAll(t.old, t.new);
}
fs.writeFileSync(referencePanelPath, newReferencePanel);
console.log('✅ 参考图面板补充翻译完成');
