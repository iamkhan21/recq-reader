export enum Entities {
	DB_NAME = 'books'
}

export enum DBWorkTypes {
	GET_BOOKS = 'GET_BOOKS',
	SET_BOOKS = 'SET_BOOKS',
	ADD_BOOK = 'ADD_BOOK',
	FIND_BOOK = 'FIND_BOOK'
}

export enum BookWorkTypes {
	CREATE_BOOK = 'CREATE_BOOK',
	CONVERT_FILE = 'CONVERT_FILE'
}

export enum WorkerResponse {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}
