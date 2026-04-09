# User Guide - Dream Tourist

## Getting Started

### First Time Setup

1. **Open the Application**
   - After running `npm run dev`, open `http://localhost:5173` in your browser
   - The application will load with the main Places page

2. **Choose Your Role**
   - Use the dropdown in the top-right corner to switch between Tourist and Admin modes
   - Tourist mode is selected by default

## Tourist Mode Features

### Browsing Places

1. **View All Places**
   - The main page displays all available places in card format
   - Each card shows:
     - Place image
     - Name and category
     - Brief description
     - Opening hours
     - Distance from home
     - Estimated visit duration

2. **Filter by Category**
   - Click on category buttons (Religious, Nature, Heritage, Cultural, Adventure, Beach)
   - Click "All" to see all places again
   - The results counter updates to show how many places match your filter

3. **Switch Views**
   - **List View**: Shows places as cards in a grid
   - **Map View**: Shows all places on an interactive map with colored markers

### Viewing Place Details

1. Click **"View Details"** on any place card
2. A modal window will open showing:
   - Full-size image
   - Complete description
   - Opening and closing times
   - Estimated visit duration
   - Distance from your home location
   - Travel tips and recommendations
3. Click **"Add to Visit Plan"** to add the place to your itinerary
4. Click the **×** or outside the modal to close it

### Using the Map

1. Click **"Map View"** to see all places on a map
2. **Color-coded markers** indicate different categories:
   - 🔴 Red: Religious
   - 🟢 Green: Nature
   - 🟠 Orange: Heritage
   - 🟣 Purple: Cultural
   - 🟠 Orange-Red: Adventure
   - 🔵 Blue: Beach
3. Click any marker to see place information
4. Use the legend in the bottom-right to identify categories
5. Zoom and pan the map using mouse or touch gestures

### Creating a Visit Plan

1. **Add Places to Your Plan**
   - Click the **+** button or "Add to Visit Plan" on any place
   - A badge on the "My Visit Plan" nav link shows how many places you've added

2. **Review Your Plan**
   - Click **"My Visit Plan"** in the navigation
   - See all selected places in order
   - View summary statistics:
     - Total number of places
     - Total duration (hours)
     - Total distance (km)

3. **Manage Your Itinerary**
   - Places are numbered in sequence
   - Each place shows full details and travel tips
   - Click the trash icon to remove a place
   - Click **"Clear All"** to start over

4. **Save Your Plan**
   - Click **"Save Plan"** button
   - Enter a name for your plan (e.g., "Weekend Trip")
   - Click **"Save"** to store it
   - Your plan is saved to browser storage

5. **Important Notes**
   - ⚠️ If your total duration exceeds 12 hours, you'll see a warning
   - Consider reducing places for a more comfortable day trip
   - Travel time between locations is NOT included in calculations

## Admin Mode Features

### Accessing Admin Panel

1. Click the role dropdown in the top-right corner
2. Select **"Admin"**
3. Click **"Admin"** in the navigation menu

### Admin Dashboard

The admin panel shows:
- Total number of places
- Count by category
- Complete table of all places

### Adding a New Place

1. Click **"Add New Place"** button
2. Fill in all required fields:
   - **Name**: Official name of the place
   - **Category**: Select from dropdown
   - **Description**: Detailed description (min 50 characters recommended)
   - **Opening Time**: 24-hour format (e.g., 09:00)
   - **Closing Time**: 24-hour format (e.g., 17:00)
   - **Distance from Home**: In kilometers (max 25km)
   - **Estimated Visit Duration**: In hours (0.5 to 8)
   - **Latitude**: GPS coordinate
   - **Longitude**: GPS coordinate
   - **Image URL**: Direct link to an image (optional)
   - **Travel Tips**: Helpful advice for visitors
3. Click **"Add Place"** to save
4. The new place appears immediately in the list

### Editing a Place

1. Find the place in the admin table
2. Click the **pencil icon** (Edit button)
3. Modify any fields you want to change
4. Click **"Update Place"** to save changes

### Deleting a Place

1. Find the place in the admin table
2. Click the **trash icon** (Delete button)
3. Confirm the deletion in the popup
4. The place is removed from the system

### Admin Best Practices

- ✅ Use accurate GPS coordinates (you can get these from Google Maps)
- ✅ Provide clear, tourist-friendly descriptions
- ✅ Include practical travel tips
- ✅ Use high-quality image URLs
- ✅ Set realistic visit durations
- ✅ Double-check opening hours
- ⚠️ Ensure all places are within 25km radius

## Tips for Best Experience

### For Planning

1. **Start Early**: Begin your day with places that open early
2. **Group by Location**: Visit nearby places together to save travel time
3. **Consider Duration**: Mix short and long visits for variety
4. **Check Opening Hours**: Make sure places will be open when you visit
5. **Read Travel Tips**: Important information about dress code, entry fees, etc.

### For Mobile Users

- The app is fully responsive and works on phones and tablets
- Map interactions work with touch gestures
- All features are accessible on smaller screens

### Data Persistence

- Your visit plans are saved in browser storage
- Admin changes are saved immediately
- Data persists even after closing the browser
- Clearing browser data will reset everything

## Troubleshooting

### Map Not Loading
- Check your internet connection (map tiles load from OpenStreetMap)
- Try refreshing the page
- Ensure JavaScript is enabled

### Places Not Appearing
- Check if a category filter is active
- Click "All" to see all places
- If in admin mode, verify places were saved correctly

### Visit Plan Not Saving
- Make sure you enter a plan name
- Check browser storage is not full
- Try using a different browser

## Keyboard Shortcuts

- **Tab**: Navigate between interactive elements
- **Enter**: Activate buttons and links
- **Escape**: Close modals and dialogs
- **Arrow Keys**: Navigate map when focused

## Privacy & Data

- All data is stored locally in your browser
- No data is sent to external servers
- You can clear data using browser settings
- No personal information is collected

## Support

For issues or questions:
1. Check this user guide
2. Review the project README
3. Contact the project maintainer
4. Report bugs through the project repository

---

**Enjoy planning your Sri Lankan adventure! 🏝️**
