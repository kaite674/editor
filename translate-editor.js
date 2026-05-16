const fs = require('fs');
const path = require('path');

// 设置面板翻译
const settingsFile = path.join(__dirname, 'packages/editor/src/components/ui/sidebar/panels/settings-panel/index.tsx');
let settingsContent = fs.readFileSync(settingsFile, 'utf8');

const settingsTranslations = [
  { from: 'Visibility', to: '可见性' },
  { from: 'Public', to: '公开' },
  { from: 'Only you', to: '仅您可见' },
  { from: 'Anyone', to: '任何人' },
  { from: 'can view', to: '可查看' },
  { from: 'Show 3D Scans', to: '显示 3D 扫描' },
  { from: 'Visible to public viewers', to: '对公开查看者可见' },
  { from: 'Show Floorplans', to: '显示平面图' },
  { from: 'Show Grid', to: '显示网格' },
  { from: 'Visible only in the editor', to: '仅在编辑器中可见' },
  { from: 'Export', to: '导出' },
  { from: 'Export GLB', to: '导出 GLB' },
  { from: 'Export STL', to: '导出 STL' },
  { from: 'Export OBJ', to: '导出 OBJ' },
  { from: 'Thumbnail', to: '缩略图' },
  { from: 'Generating...', to: '生成中...' },
  { from: 'Generate Thumbnail', to: '生成缩略图' },
  { from: 'Save & Load', to: '保存与加载' },
  { from: 'Save Build', to: '保存场景' },
  { from: 'Load Build', to: '加载场景' },
  { from: 'Audio', to: '音频' },
  { from: 'Keyboard', to: '键盘' },
  { from: 'Scene Graph', to: '场景结构' },
];

settingsTranslations.forEach(({ from, to }) => {
  settingsContent = settingsContent.replace(new RegExp(from, 'g'), to);
});

fs.writeFileSync(settingsFile, settingsContent);
console.log('✅ 设置面板翻译完成');

// 命令面板翻译
const commandsFile = path.join(__dirname, 'packages/editor/src/components/ui/command-palette/editor-commands.tsx');
let commandsContent = fs.readFileSync(commandsFile, 'utf8');

const commandsTranslations = [
  { from: 'Wall Tool', to: '墙体工具' },
  { from: 'Scene', to: '场景' },
  { from: 'Slab Tool', to: '楼板工具' },
  { from: 'Ceiling Tool', to: '天花板工具' },
  { from: 'Door Tool', to: '门工具' },
  { from: 'Window Tool', to: '窗户工具' },
  { from: 'Item Tool', to: '物品工具' },
  { from: 'Stair Tool', to: '楼梯工具' },
  { from: 'Zone Tool', to: '区域工具' },
  { from: 'Delete Selection', to: '删除选中' },
  { from: 'Material Paint', to: '材质绘制' },
  { from: 'Levels', to: '楼层' },
  { from: 'Go to Level', to: '前往楼层' },
  { from: 'Add Level', to: '添加楼层' },
  { from: 'Rename Level', to: '重命名楼层' },
  { from: 'Delete Level', to: '删除楼层' },
  { from: 'Viewer Controls', to: '视图控制' },
  { from: 'Wall Mode', to: '墙体模式' },
  { from: 'Cutaway', to: '剖切' },
  { from: 'Level Mode', to: '楼层模式' },
  { from: 'Manual', to: '手动' },
  { from: 'Stacked', to: '堆叠' },
  { from: 'Exploded', to: '展开' },
  { from: 'Solo', to: '单独' },
  { from: 'Camera: Switch to', to: '相机: 切换到' },
  { from: 'Orthographic', to: '正交视图' },
  { from: 'Perspective', to: '透视视图' },
  { from: 'Switch to Light Theme', to: '切换到浅色主题' },
  { from: 'Switch to Dark Theme', to: '切换到深色主题' },
  { from: 'Take Snapshot', to: '截图' },
  { from: 'View', to: '视图' },
  { from: 'Exit Preview', to: '退出预览' },
  { from: 'Enter Preview', to: '进入预览' },
  { from: 'Toggle Fullscreen', to: '切换全屏' },
  { from: 'History', to: '历史' },
  { from: 'Undo', to: '撤销' },
  { from: 'Redo', to: '重做' },
];

commandsTranslations.forEach(({ from, to }) => {
  commandsContent = commandsContent.replace(new RegExp(from, 'g'), to);
});

fs.writeFileSync(commandsFile, commandsContent);
console.log('✅ 命令面板翻译完成');