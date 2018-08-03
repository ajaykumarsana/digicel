export interface IOrderPreview {
    recurringInterval: string;
    base: {
        setup: string;
        recurring: string;
    };
    lines: {
        units: number | string;
        unitCost: {
            setup: string,
            recurring: string
        };
        setup: string;
        recurring: string;
    };
    analogLines: {
        units: number | string;
        unitCost: {
            setup: string;
            recurring: string;
        };
        setup: string;
        recurring: string;
    };
    taxes: {
        setup: string;
        recurring: string;
    };
    fees: {
        setup: string;
        recurring: string;
    };
    total: {
        setup: string;
        recurring: string;
    };
}
