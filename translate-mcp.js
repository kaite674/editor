const fs = require('fs');
const path = require('path');

// 读取文件
const filePath = path.join(__dirname, 'packages', 'mcp', 'src', 'tools', 'asset-catalog.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 物品名称翻译映射
const translations = {
  'Double Bed': '双人床',
  'Single Bed': '单人床',
  'Bedside Table': '床头柜',
  'Dresser': '梳妆台',
  'Closet': '衣柜',
  'Sofa': '沙发',
  'Livingroom Chair': '客厅椅',
  'Coffee Table': '茶几',
  'TV Stand': '电视柜',
  'Shelf': '书架',
  'Dining Table': '餐桌',
  'Dining Chair': '餐椅',
  'Kitchen': '厨房',
  'Kitchen Counter': '厨房台面',
  'Stove': '炉灶',
  'Fridge': '冰箱',
  'Toilet': '马桶',
  'Bathroom Sink': '浴室水槽',
  'Squared Shower': '方形淋浴',
  'Bathtub': '浴缸',
  'Washing Machine': '洗衣机',
  'Drying Rack': '晾衣架',
  'Coat Rack': '衣架'
};

// 替换物品名称
for (const [en, zh] of Object.entries(translations)) {
  content = content.replace(new RegExp(`name: '${en}'`, 'g'), `name: '${zh}'`);
}

// 写回文件
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ MCP 物品目录汉化完成');
