import type { SeaBattle } from './sea-battle';

export type SeaBattleResult = {
	Items?: SeaBattle[];
	Skip?: number;
	Take?: number;
	Count?: number;
};
