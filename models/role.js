const mongoose = require('mongoose');

// Role schema for Admin roles (SuperAdmin, SubAdmin)
const RoleSchema = new mongoose.Schema({
  
  role: {
    type: String,
    enum: ['superadmin', 'subadmin'], // Only superadmin and subadmin roles
    required: true,
  },
  // Permissions for admin users
  permissions: {
    canCreateAdmin: { type: Boolean, default: false },
    canDeleteAdmin: { type: Boolean, default: false },
    canManageBrokers: { type: Boolean, default: false },
    canManageProperties: { type: Boolean, default: false },
    canViewReports: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Role', RoleSchema);
