# Dream Tourist - Day-Visit Planner and Information System

A comprehensive web-based system designed to help tourists plan one-day visits to places of interest within a 25km radius. This project focuses on Sri Lankan tourist destinations near Colombo.

## 🎯 Project Objective

To practice requirements analysis, system design, implementation, and presentation by developing a realistic tourism information and visit-planning web application.

## ✨ Features

### For Tourists
- **Browse Places**: View a comprehensive list of 12+ places of interest
- **Filter by Category**: Filter places by Religious, Nature, Heritage, Cultural, Adventure, and Beach categories
- **Detailed Information**: View descriptions, opening hours, distance, travel tips, and estimated visit duration
- **Interactive Map**: View all locations on an interactive map with custom markers for each category
- **Visit Planning**: Create a one-day visit plan by selecting multiple places
- **Smart Planning**: Get automatic calculations of total duration and distance
- **Save Plans**: Save your custom visit plans for future reference

### For Administrators
- **Add Places**: Add new places of interest with complete details
- **Edit Places**: Update existing place information
- **Delete Places**: Remove outdated or incorrect places
- **View Statistics**: See summary statistics for all places and categories
- **Data Management**: Full CRUD operations for place management

## 🏛️ Places Included

The system includes 12 carefully selected places within 25km:

1. **Gangaramaya Temple** (Religious) - 5km
2. **Viharamahadevi Park** (Nature) - 6km
3. **Independence Memorial Hall** (Heritage) - 7km
4. **National Museum of Colombo** (Cultural) - 7.5km
5. **Galle Face Green** (Nature) - 4km
6. **Kelaniya Raja Maha Vihara** (Religious) - 10km
7. **Diyatha Uyana** (Cultural) - 8km
8. **Beddagana Wetland Park** (Nature) - 12km
9. **Old Parliament Building** (Heritage) - 4.5km
10. **Mount Lavinia Beach** (Beach) - 15km
11. **Colombo Dutch Museum** (Heritage) - 5.5km
12. **Talangama Wetland** (Nature) - 13km

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 7.3
- **Routing**: React Router DOM
- **Mapping**: Leaflet & React-Leaflet
- **Icons**: Lucide React
- **Styling**: Custom CSS with modern design
- **State Management**: React Context API
- **Data Persistence**: LocalStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd map
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
map/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── PlaceCard.tsx   # Place display card
│   │   └── MapView.tsx     # Interactive map component
│   ├── pages/              # Page components
│   │   ├── PlacesList.tsx  # Main places listing page
│   │   ├── VisitPlan.tsx   # Visit planning page
│   │   └── Admin.tsx       # Admin management page
│   ├── context/            # React Context
│   │   └── AppContext.tsx  # Global state management
│   ├── data/               # Data files
│   │   └── places.ts       # Initial places data
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Type definitions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   ├── App.css             # Component styles
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── vite.config.ts          # Vite config
```

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient backgrounds
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Map**: Color-coded markers for different place categories
- **User-Friendly**: Intuitive navigation and clear information hierarchy
- **Visual Feedback**: Smooth transitions and hover effects
- **Accessibility**: Semantic HTML and keyboard navigation support

## 💾 Data Management

- Data is stored in browser's LocalStorage
- Initial dataset includes 12 places
- Admin can add, edit, or delete places
- Changes persist across browser sessions
- Visit plans are saved locally

## 🔐 User Roles

### Tourist Mode (Default)
- Browse and filter places
- View place details
- Create visit plans
- View saved plans

### Admin Mode
- All tourist features
- Add new places
- Edit existing places
- Delete places
- View statistics dashboard

## 📱 Key User Flows

### Planning a Visit
1. Browse places on the main page
2. Filter by category if needed
3. Click "View Details" to see full information
4. Click "Add to Visit Plan" for places you want to visit
5. Navigate to "My Visit Plan" to review selections
6. Review total duration and distance
7. Save your plan with a custom name

### Managing Places (Admin)
1. Switch to Admin role using the dropdown
2. Navigate to Admin panel
3. Click "Add New Place" to create new entry
4. Fill in all required information
5. Edit existing places using the Edit button
6. Delete places if needed

## 🌟 Future Enhancements

- User authentication and profiles
- Route optimization for visit plans
- Weather integration
- Real-time traffic updates
- Photo galleries
- User reviews and ratings
- Social sharing
- Mobile app version
- Integration with booking systems

## 👥 Stakeholder Validation

This project was developed with input from stakeholders to ensure:
- Real user needs are addressed
- Information is accurate and useful
- Interface is intuitive and accessible
- Features are practical and relevant

## 📝 Requirements Met

✅ Minimum 10 places of interest (12 included)  
✅ Multiple categories (6 categories)  
✅ Places within 25km radius  
✅ Filter by category  
✅ Essential details displayed  
✅ Map view with locations  
✅ One-day visit planning  
✅ Admin CRUD operations  
✅ Modern technology stack  
✅ Professional UI/UX  

## 📄 License

This project is developed as an educational project.

## 🤝 Contributing

This is an individual project developed for academic purposes. Stakeholder feedback and suggestions are welcome.

## 📧 Contact

For questions or feedback about this project, please contact the developer.

---

**Note**: This project focuses on the Colombo area of Sri Lanka. The home location and places can be customized in `src/data/places.ts` to represent any locality within Sri Lanka or elsewhere.
