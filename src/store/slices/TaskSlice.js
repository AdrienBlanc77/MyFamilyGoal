
import { createSlice } from '@reduxjs/toolkit';


const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTask);
    },
    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});
  
export const { addTask, toggleTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;