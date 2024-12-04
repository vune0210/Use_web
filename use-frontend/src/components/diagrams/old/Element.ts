export interface Element {
    id: string;
    hidden?: boolean;
}

export interface PositionElement extends Element {
    x: number;
    y: number;
}
