import type { GridPoint } from './grid-point';
import type { Navy } from './navy';
import type { ShipType } from './ship-type';
import type { Target } from './target';

export type SeaBattleTurn = {
	Id?: number;
	Navy?: Navy;
	Target?: Target;
	ShipType?: ShipType;

	GridPoint?: GridPoint;
};
