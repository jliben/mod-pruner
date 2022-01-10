interface IPruneOptions {
    force: boolean;
    cwd: string;
    patterns: string[];
}
interface IPruneResult {
    prunedFiles: string[];
    prunedDiskSize: number;
    prunedFolders: string[];
}
export declare function prune(options: IPruneOptions): Promise<IPruneResult>;
export {};
