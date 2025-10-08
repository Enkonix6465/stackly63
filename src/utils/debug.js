// Debug utility to help troubleshoot routing issues
export function debugRoute(route) {
  console.log('🔍 Route Debug Info:');
  console.log('Current route:', route);
  console.log('Is authenticated:', localStorage.getItem('authUser') ? 'Yes' : 'No');
  console.log('Auth user data:', localStorage.getItem('authUser'));
  console.log('All users:', localStorage.getItem('users'));
  console.log('Current URL:', window.location.href);
  console.log('Pathname:', window.location.pathname);
  console.log('Search params:', window.location.search);
  console.log('Hash:', window.location.hash);
}

export function clearAuthData() {
  localStorage.removeItem('authUser');
  localStorage.removeItem('users');
  console.log('🧹 Auth data cleared');
}

export function clearAllData() {
  localStorage.clear();
  console.log('🧹 All localStorage data cleared');
}

export function setTestUser() {
  const testUser = {
    id: 'test-user',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'password123',
    loginTime: new Date().toISOString()
  };
  
  localStorage.setItem('authUser', JSON.stringify(testUser));
  localStorage.setItem('users', JSON.stringify([testUser]));
  console.log('👤 Test user set:', testUser);
}

export function setTestAdmin() {
  const adminUser = {
    id: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@enkonix.in',
    password: 'admin123',
    role: 'admin',
    loginTime: new Date().toISOString()
  };
  
  localStorage.setItem('authUser', JSON.stringify(adminUser));
  
  // Add admin to users list
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const adminExists = existingUsers.find(u => u.id === 'admin');
  
  if (!adminExists) {
    const updatedUsers = [...existingUsers, adminUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }
  
  console.log('👑 Test admin set:', adminUser);
}
