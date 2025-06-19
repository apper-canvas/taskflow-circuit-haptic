import Tasks from '@/components/pages/Tasks'
import Categories from '@/components/pages/Categories'
import Completed from '@/components/pages/Completed'

export const routes = {
  tasks: {
    id: 'tasks',
    label: 'Tasks',
    path: '/tasks',
    icon: 'CheckSquare',
    component: Tasks
  },
  categories: {
    id: 'categories',
    label: 'Categories',
    path: '/categories',
    icon: 'FolderOpen',
    component: Categories
  },
  completed: {
    id: 'completed',
    label: 'Completed',
    path: '/completed',
    icon: 'CheckCircle',
    component: Completed
  }
}

export const routeArray = Object.values(routes)
export default routes