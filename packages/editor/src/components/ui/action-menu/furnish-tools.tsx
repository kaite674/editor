import type { CatalogCategory } from './../../../store/use-editor'

export type FurnishToolConfig = {
  id: 'item'
  iconSrc: string
  label: string
  catalogCategory: CatalogCategory
}

export const furnishTools: FurnishToolConfig[] = [
  { id: 'item', iconSrc: '/icons/couch.png', label: '家具', catalogCategory: 'furniture' },
  { id: 'item', iconSrc: '/icons/appliance.png', label: '电器', catalogCategory: 'appliance' },
  { id: 'item', iconSrc: '/icons/kitchen.png', label: '厨房', catalogCategory: 'kitchen' },
  { id: 'item', iconSrc: '/icons/bathroom.png', label: '浴室', catalogCategory: 'bathroom' },
  { id: 'item', iconSrc: '/icons/tree.png', label: '户外', catalogCategory: 'outdoor' },
]
