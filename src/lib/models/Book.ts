export type UID = string;

export interface BookMeta {
	cover: string;
	title: string;
}

export interface Book {
	uid: UID;
	meta: BookMeta;
	file: FileSystemHandle;
	updated: number;
	created: number;
}

export interface BookControls {
	next: () => void;
	prev: () => void;
	destroy: () => void;
}
