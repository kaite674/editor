const fs = require('fs');
const path = require('path');

// 区域面板
const zonePanelPath = path.join(__dirname, 'packages/editor/src/components/ui/sidebar/panels/zone-panel/index.tsx');
const zonePanelContent = fs.readFileSync(zonePanelPath, 'utf8');

const zonePanelTranslations = [
  { old: 'title="Camera snapshot"', new: 'title="相机快照"' },
  { old: 'View snapshot', new: '查看快照' },
  { old: 'Update snapshot', new: '更新快照' },
  { old: 'Take snapshot', new: '拍摄快照' },
  { old: 'Clear snapshot', new: '清除快照' },
  { old: 'Select a level to view and create zones', new: '选择一个楼层以查看和创建区域' },
  { old: 'No zones on this level.', new: '此楼层没有区域。' },
  { old: 'Add one', new: '添加一个' }
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
  { old: 'title="Material"', new: 'title="材质"' },
  { old: 'title="Custom Material"', new: 'title="自定义材质"' },
  { old: '              Color', new: '              颜色' },
  { old: '                Roughness', new: '                粗糙度' },
  { old: '                Metalness', new: '                金属度' },
  { old: '                Opacity', new: '                不透明度' },
  { old: '              Transparent', new: '              透明' },
  { old: '              Backface culling', new: '              背面剔除' },
  { old: '                Side', new: '                面' }
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
  { old: "return 'Uncalibrated'", new: "return '未校准'" },
  { old: "return `${scaleReferenceVisible ? 'Scaled' : 'Scaled (hidden)'} · ${reference.label}`", new: "return `${scaleReferenceVisible ? '已缩放' : '已缩放（已隐藏）'} · ${reference.label}`" },
  { old: 'title={node.name || (isScan ? "3D Scan" : "Guide Image")}', new: 'title={node.name || (isScan ? "3D扫描" : "参考图片")}' },
  { old: 'title="Image"', new: 'title="图片"' },
  { old: 'label={isReplacing ? "Replacing..." : "Replace"}', new: 'label={isReplacing ? "正在替换..." : "替换"}' },
  { old: 'label="Delete"', new: 'label="删除"' },
  { old: 'label={node.visible === false ? "Show" : "Hide"}', new: 'label={node.visible === false ? "显示" : "隐藏"}' },
  { old: 'label={guideLocked ? "Unlock" : "Lock"}', new: 'label={guideLocked ? "解锁" : "锁定"}' },
  { old: "setReplaceError('Choose a PNG, JPEG, or WebP image.')", new: "setReplaceError('请选择 PNG、JPEG 或 WebP 图片。')" },
  { old: "setReplaceError('Could not replace that image.')", new: "setReplaceError('无法替换该图片。')" },
  { old: 'title="Reference Scale"', new: 'title="参考缩放"' },
  { old: 'label={node.scaleReference ? "Edit Scale" : "Set Scale"}', new: 'label={node.scaleReference ? "编辑缩放" : "设置缩放"}' },
  { old: 'label="Cancel"', new: 'label="取消"' },
  { old: 'title="Quick Actions"', new: 'title="快速操作"' },
  { old: 'label="Center"', new: 'label="居中"' },
  { old: 'label="Reset Rotation"', new: 'label="重置旋转"' },
  { old: 'label="Reset Image Scale"', new: 'label="重置图片缩放"' },
  { old: 'title="Position"', new: 'title="位置"' },
  { old: 'Overlay image unavailable. Replace the image to restore it.', new: '覆盖图不可用。请替换图片以恢复它。' }
];

let newReferencePanel = referencePanelContent;
for (const t of referencePanelTranslations) {
  newReferencePanel = newReferencePanel.replaceAll(t.old, t.new);
}
fs.writeFileSync(referencePanelPath, newReferencePanel);
console.log('✅ 参考图面板翻译完成');

// 场景树面板
const sitePanelPath = path.join(__dirname, 'packages/editor/src/components/ui/sidebar/panels/site-panel/index.tsx');
const sitePanelContent = fs.readFileSync(sitePanelPath, 'utf8');

const sitePanelTranslations = [
  { old: '<span className="font-medium text-sm">Property Line</span>', new: '<span className="font-medium text-sm">用地边界</span>' },
  { old: '          Area: <span className="text-foreground">{area.toFixed(1)} m²</span>', new: '          面积：<span className="text-foreground">{area.toFixed(1)} m²</span>' },
  { old: '          Perimeter: <span className="text-foreground">{perimeter.toFixed(1)} m</span>', new: '          周长：<span className="text-foreground">{perimeter.toFixed(1)} m</span>' },
  { old: '            Add point', new: '            添加点' }
];

let newSitePanel = sitePanelContent;
for (const t of sitePanelTranslations) {
  newSitePanel = newSitePanel.replaceAll(t.old, t.new);
}
fs.writeFileSync(sitePanelPath, newSitePanel);
console.log('✅ 场景树面板翻译完成');
