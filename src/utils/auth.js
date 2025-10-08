export const USERS_KEY = 'users';
export const AUTH_KEY = 'authUser';

function safelyParseJson(jsonString, fallback) {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed ?? fallback;
  } catch (_) {
    return fallback;
  }
}

export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  // console.log(' Retrieving users from localStorage:', raw);
  const users = safelyParseJson(raw, []);
 // Handle different cases
  if (Array.isArray(users)) {
    console.log(" Users retrieved (array):", users);
    return users;
  }

  if (users && typeof users === "object") {
    console.log(" Users retrieved (wrapped single object):", users);
    return [users]; // wrap single object inside array
  }

  console.log(" No users found, returning empty array");
  return [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users; //  return updated array for convenience
}

export function registerUser({ firstName, lastName, email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();

  const existingUsers = getUsers();
  const alreadyExists = existingUsers.some(
    (u) => String(u.email).toLowerCase() === normalizedEmail
  );

  if (alreadyExists) {
    return { success: false, message: 'Email already registered' };
  }

  const newUser = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email: normalizedEmail,
    password,
  };

  const updatedUsers = saveUsers([...existingUsers, newUser]);

  console.log(' User registered successfully:', newUser);
  console.log(' All users after registration:', updatedUsers);

  return { success: true, message: 'Registered successfully', user: newUser };
}


export function loginUser(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const users = getUsers();
  console.log(' Attempting login for:',users)  ;

  const found = users.find(
    u => String(u.email).toLowerCase() === normalizedEmail && u.password === password
  );
  
   


  if (!found) return { success: false, message: 'Invalid email or password' };

  // Keep password also
  const userWithLoginTime = {
    ...found,
    loginTime: new Date().toISOString()
  };
  

  // Store full user object in both places
  localStorage.setItem(USERS_KEY, JSON.stringify(users));  // keep list of all users
  localStorage.setItem(AUTH_KEY, JSON.stringify(userWithLoginTime)); // currently logged in user

  return { success: true, message: 'Logged in', user: userWithLoginTime };
}



export function logoutUser() {
  const userData = getCurrentUser();

  if (userData) {
    console.log('👋 Logging out user:', userData.email);
    
    // If it's a regular user (not admin), update their logout time in the users list
    if (userData.role !== 'admin') {
      const users = getUsers();
      const userIndex = users.findIndex(u => u.id === userData.id);
      
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          logoutTime: new Date().toISOString()
        };
        saveUsers(users);
      }
    }
  }

  // Remove authenticated user
  localStorage.removeItem(AUTH_KEY);
  console.log('✅ User logged out successfully');
}


export function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  return safelyParseJson(raw, null);
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export function isAdmin() {
  const user = getCurrentUser();
  return user && (user.role === 'admin' || user.isAdmin === true);
}

export function resetPassword(email, newPassword) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const users = getUsers();
  
  // Find user with matching email
  const userIndex = users.findIndex(
    u => String(u.email).toLowerCase() === normalizedEmail
  );
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  
  // Update user's password
  const updatedUsers = [...users];
  updatedUsers[userIndex] = {
    ...updatedUsers[userIndex],
    password: newPassword,
    passwordResetTime: new Date().toISOString()
  };
  
  // Save updated users
  saveUsers(updatedUsers);
  
  console.log('✅ Password reset successfully for:', normalizedEmail);
  
  return { success: true, message: 'Password reset successfully' };
}




// new file: src/utils/auth.js

// const USERS_KEY = "users"; // storage key for all registered users

// // Utility: safely parse JSON
// function safelyParseJson(str, fallback) {
//   try {
//     return JSON.parse(str) ?? fallback;
//   } catch {
//     return fallback;
//   }
// }

// // Get all users (always returns an array)
// export function getUsers() {
//   const raw = localStorage.getItem(USERS_KEY);
//   const users = safelyParseJson(raw, []);
//   return Array.isArray(users) ? users : [];
// }

// // Save all users back to localStorage
// export function saveUsers(users) {
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
//   return users;
// }

// // Register new user
// export function registerUser({ firstName, lastName, email, password }) {
//   const normalizedEmail = String(email || "").trim().toLowerCase();

//   const existingUsers = getUsers();

//   // Check if email already exists
//   const alreadyExists = existingUsers.some(
//     (u) => String(u.email).toLowerCase() === normalizedEmail
//   );

//   if (alreadyExists) {
//     return { success: false, message: "Email already registered" };
//   }

//   // New user object
//   const newUser = {
//     id: crypto.randomUUID(),
//     firstName,
//     lastName,
//     email: normalizedEmail,
//     password, // ⚠️ stored in plain text (okay for demo, but insecure in real apps)
//     createdAt: new Date().toISOString(),
//   };

//   // Save updated users array
//   const updatedUsers = saveUsers([...existingUsers, newUser]);

//   console.log("✅ User registered:", newUser);
//   console.log("📂 All users:", updatedUsers);

//   return { success: true, message: "Registered successfully", user: newUser };
// }


// // Login user
// export function loginUser(email, password) {
//   const normalizedEmail = String(email || "").trim().toLowerCase();
//   const users = getUsers();

//   // Find user with matching email + password
//   const found = users.find(
//     (u) =>
//       String(u.email).toLowerCase() === normalizedEmail &&
//       u.password === password
//   );

//   if (!found) {
//     return { success: false, message: "Invalid email or password" };
//   }

//   // Add loginTime to current user
//   const loggedInUser = {
//     ...found,
//     loginTime: new Date().toISOString(),
//   };

//   // Store logged-in user separately in AUTH_KEY
//   localStorage.setItem(AUTH_KEY, JSON.stringify(loggedInUser));

//   console.log(" Logged in user:", loggedInUser);

//   return { success: true, message: "Logged in", user: loggedInUser };
// }


// // Logout user
// export function logoutUser() {
//   const current = getCurrentUser();
//   if (current) {
//     const loggedOutUser = {
//       ...current,
//       logoutTime: new Date().toISOString(),
//     };
//     localStorage.setItem(AUTH_KEY, JSON.stringify(loggedOutUser));
//     console.log("👋 User logged out:", loggedOutUser);
//   }
//   localStorage.removeItem(AUTH_KEY);
// }