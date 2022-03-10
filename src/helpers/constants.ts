const getBoardsAPI = (boardId?: string) => boardId ? `boards/${boardId}` : "boards";
const getListsAPI = (boardId?: string) => boardId ? `boards/${boardId}/lists` : "lists";
const getTasksAPI = (boardId?: string) => boardId ? `boards/${boardId}/tasks` : "tasks";

export const routes = {
  getBoardsAPI,
  getListsAPI,
  getTasksAPI
};