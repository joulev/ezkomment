// Correct as of trianglify@4.1.1. Will I submit this to DefinitelyTyped/DefinitelyTyped? Probably not

declare module "trianglify" {
    type BuiltInPalettes =
        | "YlGn"
        | "YlGnBu"
        | "GnBu"
        | "BuGn"
        | "PuBuGn"
        | "PuBu"
        | "BuPu"
        | "RdPu"
        | "PuRd"
        | "OrRd"
        | "YlOrRd"
        | "YlOrBr"
        | "Purples"
        | "Blues"
        | "Greens"
        | "Oranges"
        | "Reds"
        | "Greys"
        | "PuOr"
        | "BrBG"
        | "PRGn"
        | "PiYG"
        | "RdBu"
        | "RdGy"
        | "RdYlBu"
        | "Spectral"
        | "RdYlGn";

    export type Options = {
        width: number;
        height: number;
        cellSize: number;
        variance: number;
        seed: string | null;
        xColors: false | string[] | "random" | BuiltInPalettes;
        yColors: false | string[] | "match" | BuiltInPalettes;
        palette: BuiltInPalettes;
        colorSpace: "rgb" | "hsv" | "hsl" | "hsi" | "lab" | "hcl";
        colorFunction: any;
        fill: boolean;
        strokeWidth: number;
        points: [number, number][] | null;
    };

    export type SVGOptions = Partial<{
        includeNamespace: boolean;
        coordinateDecimals: number;
    }>;

    export type CanvasOptions = Partial<{
        scaling: false | "auto" | number;
        applyCssScaling: boolean;
    }>;

    type SVGInNode = {
        toString: () => string;
    };

    export type Pattern = {
        opts: Options;
        points: [number, number][];
        polys: {
            centroid: { x: number; y: number };
            vertexIndices: [number, number, number];
            color: any;
        }[];
        toSVG: (destSVG?: SVGSVGElement, svgOpts?: SVGOptions) => SVGSVGElement | SVGInNode;
        toSVGTree: (svgOpts?: SVGOptions) => SVGSVGElement | SVGInNode;
        toCanvas: (canvas?: HTMLCanvasElement, canvasOpts?: CanvasOptions) => any;
    };

    export default function trianglify(opts: Partial<Options>): Pattern;
}
