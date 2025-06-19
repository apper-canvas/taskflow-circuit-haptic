import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Textarea from '@/components/atoms/Textarea'
import { taskService } from '@/services'

const QuickAddModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    categoryId: 'work',
    dueDate: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ]

  const categoryOptions = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health' },
    { value: 'learning', label: 'Learning' },
    { value: 'projects', label: 'Projects' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    setLoading(true)
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      }
      
      await taskService.create(taskData)
      toast.success('Task created successfully!')
      
      // Reset form
      setFormData({
        title: '',
        priority: 'medium',
        categoryId: 'work',
        dueDate: '',
        notes: ''
      })
      
      onClose()
    } catch (error) {
      toast.error('Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-card shadow-card-hover max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-surface-900">
              Add New Task
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-100 rounded-button transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Task Title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What needs to be done?"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Priority"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                options={priorityOptions}
              />

              <Select
                label="Category"
                value={formData.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                options={categoryOptions}
              />
            </div>

            <Input
              label="Due Date"
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
            />

            <Textarea
              label="Notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Add any additional details..."
              rows={3}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
                icon="Plus"
              >
                Add Task
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default QuickAddModal