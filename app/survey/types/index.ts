// types.ts
export interface FoodItem {
  食品: string;
  // 他のプロパティがあれば追加
}

export interface FrequencyOption {
  value: string;
  label: string;
}

export const FREQUENCIES: FrequencyOption[] = [
  { value: 'daily', label: '毎日' },
  { value: 'week5-6', label: '週5-6' },
  { value: 'week2-4', label: '週2-4' },
  { value: 'week1', label: '週1' },
  { value: 'month1-3', label: '月1-3' },
  { value: 'none', label: '無' }
];

export const MULTIPLIER_MAP: Record<string, number> = {
  daily: 1,
  'week5-6': 5.5 / 7,
  'week2-4': 3 / 7,
  week1: 1 / 7,
  'month1-3': 1 / 15,
  none: 0
};

export interface FoodFormData {
  frequency: string;
  intake: number;
}

export interface RiceSelection {
  白米?: boolean;
  麦ご飯?: boolean;
  玄米?: boolean;
}

export interface SurveyFormData {
  riceTypes?: RiceSelection;
  foods: Record<string, FoodFormData>;
}

export interface AllFoodsData {
  foodsOne: FoodItem[];
  foodsTwo: FoodItem[];
  foodsThree: FoodItem[];
  foodsFour: FoodItem[];
  foodsFive: FoodItem[];
  rice: FoodItem[];
}