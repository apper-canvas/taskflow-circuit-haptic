import taskData from '../mockData/tasks.json'

// Helper function to add delay for realistic API simulation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let tasks = [...taskData]

const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(task => task.Id === parseInt(id, 10))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(300)
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      completed: false
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(250)
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id, 10))
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updateData,
      Id: tasks[taskIndex].Id // Preserve ID
    }
    
    tasks[taskIndex] = updatedTask
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(200)
    const taskIndex = tasks.findIndex(task => task.Id === parseInt(id, 10))
    if (taskIndex === -1) {
      throw new Error('Task not found')
    }
    
    tasks.splice(taskIndex, 1)
    return true
  },

  async getByCategory(categoryId) {
    await delay(250)
    return tasks.filter(task => task.categoryId === categoryId).map(task => ({ ...task }))
  },

  async getCompleted() {
    await delay(250)
    return tasks.filter(task => task.completed).map(task => ({ ...task }))
  },

  async getPending() {
    await delay(250)
    return tasks.filter(task => !task.completed).map(task => ({ ...task }))
  },

  async search(query) {
    await delay(200)
    const lowercaseQuery = query.toLowerCase()
    return tasks
      .filter(task => 
        task.title.toLowerCase().includes(lowercaseQuery) ||
        (task.notes && task.notes.toLowerCase().includes(lowercaseQuery))
      )
      .map(task => ({ ...task }))
  }
}

export default taskService