export interface ListDto<ItemType = any> {
  items: ItemType[];
  count: number;
}
