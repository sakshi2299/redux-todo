import { ADD_TODO } from "../actioncreators/actioncreators";
import { DELETE_TODO } from "../actioncreators/actioncreators";
import { TOGGLE_TODO } from "../actioncreators/actioncreators";
const initialState = {
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, done: !todo.done }
            : todo
        ),
      };
    default:
      return state;
  }
};

export default reducer;

