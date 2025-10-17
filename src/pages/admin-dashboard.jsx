import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../components/language-selector";
import { getCurrentUser, logoutUser } from "../utils/auth";
import { useTheme } from "../components/theme-provider";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
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
  AlertTriangle,
  Moon,
  Sun
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
  const { theme, toggleTheme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  
  const isDark = theme === "dark";

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

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showExportMenu && !event.target.closest('.relative')) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportMenu]);

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

  // Export functions
  const exportToCSV = (data, filename = 'users_export.csv') => {
    // Define CSV headers
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Status', 'Login Time', 'Logout Time', 'Created At'];
    
    // Convert data to CSV format
    const csvContent = [
      headers.join(','),
      ...data.map(user => [
        user.id,
        user.firstName || '',
        user.lastName || '',
        user.email || '',
        user.loginTime ? 'Active' : 'Inactive',
        user.loginTime ? new Date(user.loginTime).toLocaleString() : '-',
        user.logoutTime ? new Date(user.logoutTime).toLocaleString() : '-',
        user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = (data, filename = 'users_export.json') => {
    // Format data for JSON export
    const exportData = {
      exportDate: new Date().toISOString(),
      totalUsers: data.length,
      users: data.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.loginTime ? 'Active' : 'Inactive',
        loginTime: user.loginTime || null,
        logoutTime: user.logoutTime || null,
        createdAt: user.createdAt || null
      }))
    };

    // Create and download the file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = (data, filename = 'users_export.xls') => {
    // Create HTML table format that Excel can read
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Status', 'Login Time', 'Logout Time', 'Created At'];
    
    let excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <style>
          table { border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #4CAF50; color: white; font-weight: bold; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${data.map(user => `
              <tr>
                <td>${user.id}</td>
                <td>${user.firstName || ''}</td>
                <td>${user.lastName || ''}</td>
                <td>${user.email || ''}</td>
                <td>${user.loginTime ? 'Active' : 'Inactive'}</td>
                <td>${user.loginTime ? new Date(user.loginTime).toLocaleString() : '-'}</td>
                <td>${user.logoutTime ? new Date(user.logoutTime).toLocaleString() : '-'}</td>
                <td>${user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    // Create and download the file
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = (format) => {
    const dataToExport = filteredUsers.length > 0 ? filteredUsers : users;
    const timestamp = new Date().toISOString().split('T')[0];
    
    let formatName = '';
    switch(format) {
      case 'csv':
        exportToCSV(dataToExport, `users_export_${timestamp}.csv`);
        formatName = 'CSV';
        break;
      case 'json':
        exportToJSON(dataToExport, `users_export_${timestamp}.json`);
        formatName = 'JSON';
        break;
      case 'excel':
        exportToExcel(dataToExport, `users_export_${timestamp}.xls`);
        formatName = 'Excel';
        break;
      default:
        exportToCSV(dataToExport, `users_export_${timestamp}.csv`);
        formatName = 'CSV';
    }
    
    setShowExportMenu(false);
    setExportMessage(`Successfully exported ${dataToExport.length} users as ${formatName}`);
    setShowExportSuccess(true);
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setShowExportSuccess(false);
    }, 3000);
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
      <header className={`backdrop-blur-md border-b shadow-sm sticky top-0 z-50 ${
        isDark 
          ? 'bg-gray-800/90 border-gray-700' 
          : 'bg-white/80 border-slate-200/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img src="/Logo.jpg" alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Right side - Theme toggle, Language selector and user menu */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <LanguageSelector variant="default" />
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isDark
                      ? 'text-gray-300 hover:text-red-400 hover:bg-red-900/30'
                      : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                  }`}
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
          <h2 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-green-400' : 'text-green-600'
          }`}>
            {t('admin.welcome')}
          </h2>
          <p className={isDark ? 'text-green-400' : 'text-green-600'}>
            {t('admin.overview')}
          </p>
          
          {/* Admin Info Section */}
          {loggedInUser && (loggedInUser.role === 'admin' || loggedInUser.isAdmin) && (
            <div className={`mt-4 p-4 rounded-lg border ${
              isDark 
                ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-700' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  isDark ? 'bg-green-800' : 'bg-green-100'
                }`}>
                  <UserCheck className={`h-5 w-5 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${
                    isDark ? 'text-green-300' : 'text-green-800'
                  }`}>Admin Account</h3>
                  <p className={`text-sm ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>
                    Logged in as: {loggedInUser.firstName} {loggedInUser.lastName} ({loggedInUser.email})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-slate-200/60'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {t('admin.totalUsers')}
                </p>
                <p className={`text-3xl font-bold ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}>
                  {stats.totalUsers}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-green-900/30' : 'bg-green-100'
              }`}>
                <Users className={`h-6 w-6 ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`} />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-slate-200/60'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {t('admin.activeUsers')}
                </p>
                <p className={`text-3xl font-bold ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  {stats.activeUsers}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'
              }`}>
                <UserCheck className={`h-6 w-6 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`} />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-slate-200/60'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {t('admin.newRegistrations')}
                </p>
                <p className={`text-3xl font-bold ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}>
                  {stats.newRegistrations}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-green-900/30' : 'bg-green-100'
              }`}>
                <UserPlus className={`h-6 w-6 ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`} />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Status Distribution Pie Chart */}
          <div className={`rounded-xl shadow-sm border p-6 ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-slate-200/60'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className={`h-5 w-5 ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`} />
              <h3 className={`text-lg font-semibold ${
                isDark ? 'text-gray-100' : 'text-slate-800'
              }`}>
                User Status Distribution
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Active Users', value: stats.activeUsers },
                    { name: 'Inactive Users', value: stats.totalUsers - stats.activeUsers }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill={isDark ? '#4b5563' : '#94a3b8'} />
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e2e8f0'}`,
                    borderRadius: '0.5rem',
                    color: isDark ? '#f3f4f6' : '#1e293b'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    color: isDark ? '#d1d5db' : '#64748b'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* User Categories Pie Chart */}
          <div className={`rounded-xl shadow-sm border p-6 ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-slate-200/60'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <Activity className={`h-5 w-5 ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`} />
              <h3 className={`text-lg font-semibold ${
                isDark ? 'text-gray-100' : 'text-slate-800'
              }`}>
                User Categories
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'New Users (Last 7 days)', value: stats.newRegistrations },
                    { name: 'Active Users', value: stats.activeUsers },
                    { name: 'Total Users', value: stats.totalUsers }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#059669" />
                  <Cell fill="#34d399" />
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e2e8f0'}`,
                    borderRadius: '0.5rem',
                    color: isDark ? '#f3f4f6' : '#1e293b'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    color: isDark ? '#d1d5db' : '#64748b'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Management Section */}
        <div className={`rounded-xl shadow-sm border overflow-hidden ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-slate-200/60'
        }`}>
          {/* Section Header */}
          <div className={`px-6 py-4 border-b ${
            isDark 
              ? 'border-gray-700 bg-gray-800/50' 
              : 'border-slate-200/60 bg-slate-50/50'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className={`text-lg font-semibold ${
                  isDark ? 'text-gray-100' : 'text-slate-800'
                }`}>
                  {t('admin.userManagement')}
                </h3>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {t('admin.users')}
                </p>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="btn-animate-strong flex items-center space-x-2 rounded-lg px-4 py-2 font-medium text-sm transition-all duration-300 text-white shadow-md hover:shadow-lg" 
                  style={{ backgroundColor: '#4CAF50' }} 
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'} 
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                >
                  <span>{t('admin.actions.export')}</span>
                  <svg 
                    className={`h-4 w-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Export Format Dropdown */}
                {showExportMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-10 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="py-1">
                      <button
                        onClick={() => handleExport('csv')}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors ${
                          isDark 
                            ? 'text-gray-200 hover:bg-gray-700' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Download className="h-4 w-4" />
                        <span>Export as CSV</span>
                      </button>
                      <button
                        onClick={() => handleExport('json')}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors ${
                          isDark 
                            ? 'text-gray-200 hover:bg-gray-700' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Download className="h-4 w-4" />
                        <span>Export as JSON</span>
                      </button>
                      <button
                        onClick={() => handleExport('excel')}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors ${
                          isDark 
                            ? 'text-gray-200 hover:bg-gray-700' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Download className="h-4 w-4" />
                        <span>Export as Excel</span>
                      </button>
                      <div className={`border-t my-1 ${isDark ? 'border-gray-700' : 'border-slate-200'}`}></div>
                      <div className={`px-4 py-2 text-xs ${
                        isDark ? 'text-gray-400' : 'text-slate-500'
                      }`}>
                        {filteredUsers.length > 0 ? (
                          <span>Exporting {filteredUsers.length} filtered user{filteredUsers.length !== 1 ? 's' : ''}</span>
                        ) : (
                          <span>Exporting all {users.length} user{users.length !== 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={`px-6 py-4 border-b ${
            isDark 
              ? 'border-gray-700 bg-gray-800' 
              : 'border-slate-200/60 bg-white'
          }`}>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    isDark ? 'text-gray-500' : 'text-slate-400'
                  }`} />
                  <input
                    type="text"
                    placeholder={t('admin.filters.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className={`h-4 w-4 ${
                  isDark ? 'text-gray-500' : 'text-slate-400'
                }`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-200' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
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
            <table className={`min-w-full divide-y ${
              isDark ? 'divide-gray-700' : 'divide-slate-200'
            }`}>
              <thead className={isDark ? 'bg-gray-800/50' : 'bg-slate-50'}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    {t('admin.userDetails.id')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    {t('admin.userDetails.name')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    {t('admin.userDetails.email')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    {t('admin.userDetails.loginTime')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    {t('admin.userDetails.logoutTime')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    {t('admin.userDetails.status')}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-400' : 'text-slate-500'
                  }`}>
                    {t('admin.userDetails.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                isDark 
                  ? 'bg-gray-800 divide-gray-700' 
                  : 'bg-white divide-slate-200'
              }`}>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className={`transition-colors ${
                    isDark ? 'hover:bg-gray-700/50' : 'hover:bg-slate-50'
                  }`}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${
                      isDark ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      {user.id?.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        isDark ? 'text-gray-200' : 'text-slate-900'
                      }`}>
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDark ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      {user.email}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDark ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      {user.loginTime ? new Date(user.loginTime).toLocaleString() : '-'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      isDark ? 'text-gray-400' : 'text-slate-600'
                    }`}>
                      {user.logoutTime ? new Date(user.logoutTime).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.loginTime 
                          ? isDark 
                            ? 'bg-emerald-900/30 text-emerald-400' 
                            : 'bg-emerald-100 text-emerald-800'
                          : isDark
                            ? 'bg-gray-700 text-gray-300'
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
                              className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                                isDark
                                  ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30'
                                  : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                              }`}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>{t('admin.actions.delete')}</span>
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className={`px-2 py-1 rounded-md transition-colors ${
                                isDark
                                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                              }`}
                            >
                              {t('admin.editMode.cancel')}
                            </button>
                          </div>
                        ) : (
                          // Normal mode - show edit button
                          <button 
                            onClick={() => handleEditUser(user)}
                            className={`px-2 py-1 rounded-md transition-colors ${
                              isDark
                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
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
              <Users className={`mx-auto h-12 w-12 ${
                isDark ? 'text-gray-600' : 'text-slate-400'
              }`} />
              <h3 className={`mt-2 text-sm font-medium ${
                isDark ? 'text-gray-200' : 'text-slate-900'
              }`}>
                {searchTerm || filterStatus !== 'all' ? 'No users found' : 'No users yet'}
              </h3>
              <p className={`mt-1 text-sm ${
                isDark ? 'text-gray-400' : 'text-slate-500'
              }`}>
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
          <div className={`rounded-lg p-6 max-w-md w-full mx-4 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-full ${
                isDark ? 'bg-red-900/30' : 'bg-red-100'
              }`}>
                <AlertTriangle className={`h-6 w-6 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`} />
              </div>
              <h3 className={`text-lg font-semibold ${
                isDark ? 'text-gray-100' : 'text-slate-900'
              }`}>
                {t('admin.deleteConfirm.title')}
              </h3>
            </div>
            
            <p className={`mb-6 ${
              isDark ? 'text-gray-300' : 'text-slate-600'
            }`}>
              {t('admin.deleteConfirm.message', { 
                name: userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : '' 
              })}
            </p>
            
            <div className="flex space-x-3 justify-end">
              <button
                onClick={cancelDeleteUser}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDark
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                }`}
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

      {/* Export Success Notification */}
      {showExportSuccess && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
          <div className={`rounded-lg shadow-lg border px-6 py-4 flex items-center space-x-3 ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Download className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className={`font-medium ${
                isDark ? 'text-gray-100' : 'text-slate-900'
              }`}>
                Export Successful!
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-slate-600'
              }`}>
                {exportMessage}
              </p>
            </div>
            <button
              onClick={() => setShowExportSuccess(false)}
              className={`flex-shrink-0 rounded-lg p-1 transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-slate-100 text-slate-400'
              }`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}