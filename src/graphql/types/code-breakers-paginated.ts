import type { CodeBreaker } from './code-breaker';
import type { CodeBreakerOrder } from './code-breaker-order';

export type CodeBreakersPaginated = {
	Items?: CodeBreaker[];
	OrderBy?: CodeBreakerOrder;
	Skip?: number;
	Take?: number;
	Count?: number;
};
