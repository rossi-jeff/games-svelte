import type { Yacht } from './yacht';

export type YachtResult = {
	Items?: Yacht[];
	Skip?: number;
	Take?: number;
	Count?: number;
};
