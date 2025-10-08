import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../components/language-selector";
import { getCurrentUser, logoutUser } from "../utils/auth";
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Activity, 
  Search, 
  Filter,
  Download,
  LogOut,
  Settings,
  BarChart3,
  Trash2,
  AlertTriangle
} from "lucide-react";

function getUsersFromLocalStorage() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function getLoggedInUser() {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDark, setIsDark] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const allUsers = getUsersFromLocalStorage();
    // Remove any admin users from the users list to prevent them from appearing
    const regularUsers = allUsers.filter(user => 
      user.id !== 'admin' && !user.isAdmin && user.role !== 'admin'
    );
    
    // If we found admin users in the list, clean them up
    if (allUsers.length !== regularUsers.length) {
      localStorage.setItem("users", JSON.stringify(regularUsers));
    }
    
    setUsers(regularUsers);
    setLoggedInUser(getLoggedInUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleDeleteUser = (user) => {
    // Prevent admin from deleting themselves or other admins
    if (user.id === 'admin' || user.isAdmin || user.role === 'admin') {
      alert('Cannot delete admin users');
      return;
    }
    
    setUserToDelete(user);
    setShowDeleteConfirm(true);
    setEditingUserId(null); // Exit edit mode when deleting
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      // Double-check protection against admin deletion
      if (userToDelete.id === 'admin' || userToDelete.isAdmin || userToDelete.role === 'admin') {
        alert('Cannot delete admin users');
        setShowDeleteConfirm(false);
        setUserToDelete(null);
        return;
      }
      
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const cancelDeleteUser = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(user => {
    // Exclude admin users from the list
    if (user.id === 'admin' || user.isAdmin || user.role === 'admin') {
      return false;
    }
    
    const matchesSearch = user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "active" && user.loginTime) ||
                         (filterStatus === "inactive" && !user.loginTime);
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalUsers: users.filter(u => u.id !== 'admin' && !u.isAdmin && u.role !== 'admin').length,
    activeUsers: users.filter(u => u.loginTime && u.id !== 'admin' && !u.isAdmin && u.role !== 'admin').length,
    newRegistrations: users.filter(u => {
      const regDate = new Date(u.createdAt || Date.now());
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return regDate > weekAgo && u.id !== 'admin' && !u.isAdmin && u.role !== 'admin';
    }).length
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'
          : 'bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50'
      }`}
    >
      {/* Header - Updated */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Right side - Language selector and user menu */}
            <div className="flex items-center space-x-4">
              <LanguageSelector variant="default" />
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title={t('nav.logout')}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav.logout')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            {t('admin.welcome')}
          </h2>
          <p className="text-green-600">
            {t('admin.overview')}
          </p>
          
          {/* Admin Info Section */}
          {loggedInUser && (loggedInUser.role === 'admin' || loggedInUser.isAdmin) && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-green-800">Admin Account</h3>
                  <p className="text-sm text-green-600">
                    Logged in as: {loggedInUser.firstName} {loggedInUser.lastName} ({loggedInUser.email})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {t('admin.totalUsers')}
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {t('admin.activeUsers')}
                </p>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats.activeUsers}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {t('admin.newRegistrations')}
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.newRegistrations}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-slate-200/60 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {t('admin.userManagement')}
                </h3>
                <p className="text-sm text-slate-600">
                  {t('admin.users')}
                </p>
              </div>
              
              <button className="btn-animate-strong flex items-center space-x-2 rounded-lg px-4 py-2 font-medium text-sm transition-all duration-300 text-white shadow-md hover:shadow-lg" style={{ backgroundColor: '#4CAF50' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                <Download className="h-3 w-3" />
                <span>{t('admin.actions.export')}</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-slate-200/60 bg-white">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('admin.filters.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">{t('admin.filters.all')}</option>
                  <option value="active">{t('admin.filters.active')}</option>
                  <option value="inactive">{t('admin.filters.inactive')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('admin.userDetails.id')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('admin.userDetails.name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('admin.userDetails.email')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('admin.userDetails.loginTime')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('admin.userDetails.logoutTime')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('admin.userDetails.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t('admin.userDetails.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600">
                      {user.id?.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {user.loginTime ? new Date(user.loginTime).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {user.logoutTime ? new Date(user.logoutTime).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.loginTime 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {user.loginTime ? t('admin.filters.active') : t('admin.filters.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {editingUserId === user.id ? (
                          // Edit mode - show delete button and cancel
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleDeleteUser(user)}
                              className="text-red-600 hover:text-red-900 flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>{t('admin.actions.delete')}</span>
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className="text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors"
                            >
                              {t('admin.editMode.cancel')}
                            </button>
                          </div>
                        ) : (
                          // Normal mode - show edit button
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors"
                          >
                            {t('admin.actions.edit')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-medium text-slate-900">
                {searchTerm || filterStatus !== 'all' ? 'No users found' : 'No users yet'}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Users will appear here once they register.'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {t('admin.deleteConfirm.title')}
              </h3>
            </div>
            
            <p className="text-slate-600 mb-6">
              {t('admin.deleteConfirm.message', { 
                name: userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : '' 
              })}
            </p>
            
            <div className="flex space-x-3 justify-end">
              <button
                onClick={cancelDeleteUser}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {t('admin.deleteConfirm.cancel')}
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {t('admin.deleteConfirm.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}