# Export Data - User Guide

## Quick Start

### How to Export User Data

1. **Navigate to Admin Dashboard**

   - Log in as admin
   - Go to `/admin-dashboard`

2. **Locate the Export Button**

   - Find the green "Export Data" button in the User Management section
   - It's located in the top-right corner of the user table

3. **Choose Export Format**

   - Click the "Export Data" button
   - A dropdown menu will appear with three options:
     - Export as CSV
     - Export as JSON
     - Export as Excel

4. **View Export Info**

   - The dropdown shows how many users will be exported
   - Example: "Exporting 15 filtered users" or "Exporting all 50 users"

5. **Download Your File**
   - Click your preferred format
   - The file will download automatically
   - A success notification will appear

## Export Formats Explained

### CSV (Comma-Separated Values)

**Best for:**

- Opening in Excel or Google Sheets
- Data analysis
- Importing into other systems

**Example:**

```
"ID","First Name","Last Name","Email","Status","Login Time","Logout Time","Created At"
"abc123","John","Doe","john@example.com","Active","10/17/2025, 10:30:00 AM","-","10/1/2025"
```

### JSON (JavaScript Object Notation)

**Best for:**

- Developers and programmers
- API integrations
- Data processing with code
- Backup purposes

**Example:**

```json
{
  "exportDate": "2025-10-17T10:30:00.000Z",
  "totalUsers": 50,
  "users": [
    {
      "id": "abc123",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "status": "Active",
      "loginTime": "2025-10-17T10:30:00.000Z",
      "logoutTime": null,
      "createdAt": "2025-10-01T00:00:00.000Z"
    }
  ]
}
```

### Excel (.xls)

**Best for:**

- Microsoft Excel users
- Professional reports
- Formatted tables with colors
- Print-ready documents

**Features:**

- Pre-styled headers with green background
- Bordered cells for easy reading
- Opens directly in Excel

## Smart Filtering

### Export Filtered Results

1. Use the search bar to find specific users
2. Apply status filters (Active/Inactive)
3. Click Export
4. **Only the filtered users will be exported**

Example:

- Search: "john"
- Filter: "Active"
- Export: Only active users with "john" in their name

### Export All Users

1. Clear all filters
2. Clear search field
3. Click Export
4. **All users will be exported**

## Tips & Tricks

### 💡 Quick Export

- Use keyboard shortcuts: Click button, then press 1/2/3 for CSV/JSON/Excel

### 📅 Date-Stamped Files

- Files are automatically named with the current date
- Format: `users_export_2025-10-17.csv`
- Never worry about overwriting old exports

### 🔔 Success Notification

- Green notification appears after export
- Shows format and number of users exported
- Automatically disappears after 3 seconds
- Click X to dismiss immediately

### 🌓 Dark Mode Support

- Export menu adapts to your theme preference
- Works perfectly in both light and dark modes

### 🚀 Large Exports

- No limit on number of users
- Works efficiently with hundreds or thousands of users
- Browser handles the download automatically

## Troubleshooting

### Export button not working?

- Make sure you're logged in as admin
- Check browser console for errors
- Try refreshing the page

### File not downloading?

- Check browser's download settings
- Allow downloads from the site
- Try a different browser

### Wrong users exported?

- Check your active filters
- Clear filters to export all users
- Verify search terms

### Need a different format?

- CSV can be opened in any text editor
- JSON can be converted to other formats using online tools
- Excel files can be saved as different formats in Excel

## Data Privacy

### What data is exported?

- User ID
- Names (first and last)
- Email addresses
- Login/logout timestamps
- Account creation dates

### What data is NOT exported?

- Passwords (never exported)
- Admin accounts (automatically excluded)
- Sensitive authentication data

### Best Practices

- Only export when necessary
- Store exported files securely
- Delete exports after use
- Don't share files via unsecured channels

## Questions?

For technical support or feature requests, contact your system administrator.
