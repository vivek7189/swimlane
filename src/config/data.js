const initialData = {
  cards: {
    "card-1": {
      id: "card-1",
      title: "Update UI",
      description: "Update the user interface according to the latest design specs.",
      history: ["to-do"], 
      allowedLists: ["to-do", "in-progress","done"],
    },
    "card-2": {
      id: "card-2",
      title: "Task: Fix Bugs",
      description: "Fix the critical bugs reported by QA team.",
      history: ["to-do"],
      allowedLists: ["to-do", "in-progress","done"],
    },
    "card-3": {
      id: "card-3",
      title: "Code Refactoring",
      description: "Refactor the existing codebase to improve performance.",
      history: ["to-do"],
      allowedLists: ["to-do", "in-progress","done"],
    },
    "card-4": {
      id: "card-4",
      title: "Can not update this",
      description: "This task can't be update to next stage",
      history: ["to-do"],
      allowedLists: [],
    },
  },
  cardIdMaker: 4,
  lists: {
    "to-do": {
      id: "to-do",
      title: "To Do",
      cardIds: ["card-1", "card-2", "card-3","card-4"],
    },
    "in-progress": {
      id: "in-progress",
      title: "In Progress",
      cardIds: [],
    },
    "done": {
      id: "done",
      title: "Done",
      cardIds: [],
    },
  },
  listOrder: ["to-do", "in-progress", "done"],
};

export default initialData;
