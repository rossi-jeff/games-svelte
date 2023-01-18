import type { GridPoint } from './grid-point';
import type { Navy } from './navy';
import type { ShipType } from './ship-type';

export type SeaBattleShip = {
	Id?: number;
	Type?: ShipType;
	Navy?: Navy;
	Size?: number;
	Sunk?: boolean;

	GridPoints?: GridPoint[];
	Hits?: GridPoint[];
};
