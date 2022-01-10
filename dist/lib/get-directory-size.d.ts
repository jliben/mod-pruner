interface IDirectorySizeResult {
    files: string[];
    size: number;
}
export declare function getDirectorySize(directory: string): Promise<IDirectorySizeResult>;
export {};
