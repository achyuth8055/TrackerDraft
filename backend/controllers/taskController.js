const Task = require('../models/Task');

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
exports.getTasks = async (req, res, next) => {
  try {
    // Find tasks that belong to the logged-in user
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new task for the logged-in user
// @route   POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    // Add the user's ID to the request body before creating the task
    req.body.userId = req.user.id;
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update a task for the logged-in user
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Make sure the user owns the task
    if (task.userId.toString() !== req.user.id) {
        return res.status(401).json({ success: false, error: 'Not authorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete a task for the logged-in user
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Make sure the user owns the task
    if (task.userId.toString() !== req.user.id) {
        return res.status(401).json({ success: false, error: 'Not authorized to delete this task' });
    }

    await task.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};