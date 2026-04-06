# Sri Lanka Day Planner - Viva Presentation Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Q&A Section](#qa-section)
3. [System Architecture](#system-architecture)
4. [User Flow & Instructions](#user-flow--instructions)
5. [Database Schema](#database-schema)
6. [Features & Implementation](#features--implementation)
7. [Installation & Setup Guide](#installation--setup-guide)

---

## 🎯 Project Overview

**Project Name**: Sri Lanka Day Planner  
**Type**: Full-stack Travel Planning Web Application  
**Tech Stack**: React (Frontend) + Express.js + MongoDB (Backend)  
**Purpose**: Help tourists plan one-day itineraries for exploring Sri Lanka attractions

### Key Features:
- ✅ Role-based authentication (Tourist & Admin)
- ✅ Place management system
- ✅ Visit plan creation & saving
- ✅ Interactive map view
- ✅ Category-based filtering
- ✅ Admin dashboard for place management

---

## ❓ Q&A Section

### **Q1: What is the purpose of this application?**
**A**: The Sri Lanka Day Planner is a web application designed to help tourists create and manage one-day itineraries by exploring and selecting attractions within 25km of Colombo. It also allows administrators to manage place information.

---

### **Q2: What are the different user roles in the system?**
**A**: 
- **Tourist**: Can browse places, add to visit plans, save itineraries, view maps
- **Admin**: Can add, edit, delete places; manage attraction database; view statistics
- **Guest**: Can browse public places but must login to save plans

---

### **Q3: What technologies are used in the frontend?**
**A**: 
- React 19.2 with TypeScript
- React Router v7 for navigation
- Vite as build tool
- Leaflet & React-Leaflet for interactive maps
- Lucide React for icons
- CSS3 with flexbox/grid for responsive design

---

### **Q4: What backend technologies are used?**
**A**:
- Node.js with Express.js server
- MongoDB for database
- Mongoose for ODM (Object Data Modeling)
- JWT for authentication
- bcryptjs for password hashing

---

### **Q5: How does authentication work?**
**A**: 
- Frontend uses localStorage for session persistence (development)
- Backend implements JWT tokens for API authentication
- Passwords are hashed using bcryptjs (10 rounds)
- Default admin is seeded on app startup
- Tourists can register new accounts

---

### **Q6: What is the folder structure of the project?**
**A**:
```
map/
├── src/                  # Frontend source
│   ├── components/       # Reusable components (Navbar, PlaceCard, MapView)
│   ├── pages/            # Page components (Login, Register, Dashboard, Admin)
│   ├── context/          # AppContext for state management
│   ├── types/            # TypeScript interfaces
│   ├── data/             # Initial data (places.ts)
│   ├── App.tsx          # Main app with routes
│   └── index.css        # Global styles
├── server/              # Backend source
│   ├── models/          # Mongoose schemas (User, Place, VisitPlan)
│   ├── index.js         # Express server
│   └── .env             # Environment variables
└── package.json         # Dependencies
```

---

### **Q7: How is the visit plan feature implemented?**
**A**: 
- Users can add places to current visit plan while browsing
- Plan displays total duration, distance, and number of places
- Users must be logged in to save plans
- Saved plans are stored in database with owner reference
- Plans can include up to 12+ hours worth of activities

---

### **Q8: What are the place categories?**
**A**:
1. Religious - Temples, shrines
2. Nature - Parks, gardens
3. Heritage - Historical sites
4. Cultural - Museums, cultural centers
5. Adventure - Active activities
6. Beach - Coastal attractions

---

### **Q9: How does the admin dashboard differ from tourist dashboard?**
**A**:
| Feature | Admin | Tourist |
|---------|-------|---------|
| View Places | ✅ Yes | ✅ Yes |
| Add Places | ✅ Yes | ❌ No |
| Edit Places | ✅ Yes | ❌ No |
| Delete Places | ✅ Yes | ❌ No |
| Save Plans | ❌ No | ✅ Yes |
| View Statistics | ✅ Yes | ✅ Limited |

---

### **Q10: What is the default admin login?**
**A**: 
- Email: `admin@srilanka.com`
- Password: No password for localStorage version (auto-seeded)
- For production with real backend: Use 'admin123'

---

### **Q11: How are places filtered?**
**A**:
- By Category (All, Religious, Nature, Heritage, Cultural, Adventure, Beach)
- By Distance (automatically calculated from home location)
- By Opening/Closing Hours
- Custom search capability

---

### **Q12: How is the map functionality implemented?**
**A**:
- Uses Leaflet.js library with React-Leaflet wrapper
- Interactive markers for each place
- Color-coded by category
- Popup information on marker click
- Zoom and pan capabilities
- Home location reference point at 6.9271°N, 79.8612°E (Colombo center)

---

### **Q13: What data is required to store a place?**
**A**:
```json
{
  "id": "string",
  "name": "string",
  "category": "enum(Religious|Nature|Heritage|Cultural|Adventure|Beach)",
  "description": "string",
  "openingTime": "HH:MM",
  "closingTime": "HH:MM",
  "travelTips": "string",
  "distanceFromHome": "number (km)",
  "latitude": "number",
  "longitude": "number",
  "imageUrl": "string (optional)",
  "estimatedVisitDuration": "number (hours)",
  "rating": "number (0-5)",
  "tags": ["string"]
}
```

---

### **Q14: What happens when user tries to save a plan without logging in?**
**A**: The app displays an error message: "Please login to save your plan." and prompts the user to log in first.

---

### **Q15: How is state management handled?**
**A**: 
- React Context API for global state
- Custom hook `useApp()` for accessing context
- localStorage for persistence
- Real-time updates across all components

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Frontend (SPA)                     │   │
│  │  - Home (Public Places List)                         │   │
│  │  - Login/Register Pages                              │   │
│  │  - Tourist Dashboard & Profile                       │   │
│  │  - Admin Panel                                       │   │
│  │  - Visit Plan Page                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│            ↕ HTTP/HTTPS (Fetch/Axios)                       │
└─────────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────────────────────┐
        │   Express.js Server (Port 5000)  │
        │  ┌─────────────────────────────┐ │
        │  │ Authentication Routes        │ │
        │  │ /api/auth/login              │ │
        │  │ /api/auth/register           │ │
        │  └─────────────────────────────┘ │
        │  ┌─────────────────────────────┐ │
        │  │ Place Management Routes      │ │
        │  │ GET/POST/PUT/DELETE /places  │ │
        │  └─────────────────────────────┘ │
        │  ┌─────────────────────────────┐ │
        │  │ Visit Plan Routes            │ │
        │  │ GET/POST /visit-plans        │ │
        │  └─────────────────────────────┘ │
        └─────────────────────────────────┘
                          ↓
        ┌─────────────────────────────────┐
        │   MongoDB Database              │
        │  ┌─────────────────────────────┐ │
        │  │ Collection: Users            │ │
        │  │ - id, name, email, role      │ │
        │  └─────────────────────────────┘ │
        │  ┌─────────────────────────────┐ │
        │  │ Collection: Places           │ │
        │  │ - id, name, category, etc    │ │
        │  └─────────────────────────────┘ │
        │  ┌─────────────────────────────┐ │
        │  │ Collection: VisitPlans       │ │
        │  │ - id, ownerId, places, name  │ │
        │  └─────────────────────────────┘ │
        └─────────────────────────────────┘
```

---

## 📊 User Flow & Instructions

### **Complete User Journey Flow**

```mermaid
graph TD
    A[User Visits App] --> B{Logged In?}
    B -->|No| C[Guest/Public View]
    B -->|Yes| D{User Role?}
    
    C --> E["Browse Places<br/>(Limited Features)"]
    E --> F{"Want to<br/>Save Plan?"}
    F -->|Yes| G["Redirect to Login"]
    G --> H["Enter Email & Password"]
    H --> I{Valid?}
    I -->|No| J["Show Error"]
    I -->|Yes| K["Login Success"]
    
    D -->|Tourist| L["Tourist Dashboard"]
    D -->|Admin| M["Admin Dashboard"]
    
    L --> N["Browse All Places<br/>Search & Filter"]
    N --> O["Add Places to<br/>Visit Plan"]
    O --> P["View Itinerary<br/>Total Time & Distance"]
    P --> Q["Save Plan<br/>with Name"]
    Q --> R["Plan Saved<br/>to Database"]
    
    M --> S["View Statistics<br/>Total Places by Category"]
    S --> T["Add New Place<br/>Form Modal"]
    T --> U["Edit Existing Place"]
    U --> V["Delete Place<br/>with Confirmation"]
    V --> W["Database Updated"]
    
    K --> L
    
    style A fill:#e1f5ff
    style C fill:#fff9c4
    style L fill:#c8e6c9
    style M fill:#ffccbc
    style R fill:#c8e6c9
    style W fill:#ffccbc
```

---

### **Login Flow - Detailed**

```mermaid
sequenceDiagram
    participant User as User/Browser
    participant Frontend as React App
    participant LocalStorage as Browser Storage
    participant Backend as Express Server
    participant DB as MongoDB

    User->>Frontend: Click Login
    Frontend-->>User: Show Login Form
    User->>Frontend: Enter Email & Password
    Frontend->>LocalStorage: Check stored users
    alt User Found
        LocalStorage-->>Frontend: User data
        Frontend->>Frontend: Set currentUser state
        Frontend-->>User: Redirect to Dashboard
    else User Not Found
        LocalStorage-->>Frontend: null
        Frontend-->>User: Show "Invalid Credentials"
    end
```

---

### **Add Place to Visit Plan Flow**

```mermaid
graph LR
    A["User Browses<br/>Places"]
    B["Click + Icon<br/>on Place Card"]
    C{"Place Already<br/>in Plan?"}
    D["Add to<br/>currentVisitPlan"]
    E["Update UI<br/>Show in Itinerary"]
    F["Update Plan<br/>Summary Stats"]
    G["User Can<br/>Save Plan"]
    
    A -->B -->C
    C -->|No| D -->E -->F -->G
    C -->|Yes| H["Show Message<br/>Already Added"]
```

---

### **Step-by-Step Tourist Instructions**

#### **1. Browse Places (Guest)**
1. Open application
2. View all places in Colombo
3. Use filters by category
4. Switch between List & Map view
5. Click "View Details" for more info

#### **2. Register Account**
1. Click "Register" in navbar
2. Enter: Name, Email, Password
3. Select "Tourist" role
4. Click "Register"
5. Auto-login and redirect to dashboard

#### **3. Create Visit Plan**
1. Navigate to "Explore" tab
2. Browse and filter places
3. Click `+` icon to add places
4. View "My Itinerary" summary
5. Enter plan name
6. Click "Save Plan"
7. Plan saved successfully!

#### **4. Manage Itinerary**
1. Go to "My Itinerary"
2. View all added places with details
3. Remove places with trash icon
4. See total time and distance
5. Copy plan to create new variant

---

### **Step-by-Step Admin Instructions**

#### **1. Login as Admin**
1. Click "Sign In"
2. Email: `admin@srilanka.com`
3. Role: Select "Admin"
4. Click "Login"
5. Redirect to Admin Dashboard

#### **2. Add New Place**
1. Click "Add New Place" button
2. Fill in place details:
   - Name, Category, Description
   - Opening/Closing times
   - Distance, Latitude, Longitude
   - Image URL
   - Travel tips
3. Click "Add Place"
4. Refreshes place list

#### **3. Edit Existing Place**
1. Find place in admin table
2. Click edit (pencil icon)
3. Modify any field
4. Click "Update Place"
5. Changes saved immediately

#### **4. Delete Place**
1. Click delete (trash icon)
2. Confirm deletion
3. Place removed from database
4. Also removed from users' plans

---

## 💾 Database Schema

### **Users Collection**

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "role": "Enum: [tourist, admin]",
  "createdAt": "Date"
}
```

**Indexes**: `email` (unique), `role`

---

### **Places Collection**

```json
{
  "_id": "ObjectId",
  "name": "String",
  "category": "Enum: [Religious, Nature, Heritage, Cultural, Adventure, Beach]",
  "description": "String",
  "openingTime": "String (HH:MM)",
  "closingTime": "String (HH:MM)",
  "travelTips": "String",
  "rating": "Number (0-5), default: 4.5",
  "distanceFromHome": "Number",
  "latitude": "Number",
  "longitude": "Number",
  "imageUrl": "String (optional)",
  "estimatedVisitDuration": "Number (hours)",
  "tags": ["String"],
  "createdAt": "Date"
}
```

**Indexes**: `category`, `name`

---

### **VisitPlans Collection**

```json
{
  "_id": "ObjectId",
  "ownerId": "ObjectId (ref: User)",
  "name": "String",
  "places": ["ObjectId (ref: Place)"],
  "createdAt": "Date",
  "status": "Enum: [draft, confirmed, completed]"
}
```

**Indexes**: `ownerId`

---

### **Entity Relationship Diagram**

```mermaid
erDiagram
    USER ||--o{ VISITPLAN : owns
    USER ||--o{ REVIEW : writes
    PLACE ||--o{ REVIEW : "receives"
    PLACE ||--o{ VISITPLAN : contains

    USER {
        ObjectId _id
        String name
        String email
        String password
        String role
        Date createdAt
    }
    
    PLACE {
        ObjectId _id
        String name
        String category
        String description
        String openingTime
        String closingTime
        Number rating
        Number distanceFromHome
        Number latitude
        Number longitude
        Number estimatedVisitDuration
        Date createdAt
    }
    
    VISITPLAN {
        ObjectId _id
        ObjectId ownerId
        String name
        Array places
        String status
        Date createdAt
    }
    
    REVIEW {
        ObjectId _id
        ObjectId placeId
        ObjectId userId
        Number rating
        String comment
        Date createdAt
    }
```

---

## 🎨 Features & Implementation

### **1. Role-Based Navigation**

**Admin Navbar** (Dark Theme):
- Settings icon, Professional dark colors
- Links: Dashboard, View Places, Manage Attractions
- Shows admin avatar and name

**Tourist Navbar** (Purple Gradient):
- Compass icon, Vibrant colors
- Links: Explore, My Itinerary, Profile
- Shows welcome greeting
- Itinerary counter badge

**Guest Navbar** (Clean White):
- Map pin icon
- Links: Browse
- Buttons: Sign In, Register

---

### **2. Place Management System**

```mermaid
graph TD
    A["All Places Display"]
    B["Filter by<br/>Category"]
    C["Filter by<br/>Distance"]
    D["Search by<br/>Name"]
    E["View Details<br/>Modal"]
    F["Add to Plan<br/>Button"]
    G["Map View<br/>Interactive"]
    H["List View<br/>Cards"]
    
    A --> B & C & D
    B --> E
    E --> F
    A --> G & H
    G --> E
    H --> E
```

---

### **3. Visit Plan Creation**

```
User Selects Places → Current Plan Stored in State → Display Itinerary
                                    ↓
                            Summary Statistics
                                    ↓
                            Save Plan Dialog
                                    ↓
                            Enter Plan Name
                                    ↓
                      Save to localStorage/Database
                                    ↓
                            Show Success Message
                                    ↓
                            Clear Current Plan
```

---

### **4. Admin CRUD Operations**

| Operation | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| View Places | /api/places | GET | Public |
| Create Place | /api/places | POST | Admin JWT |
| Update Place | /api/places/:id | PUT | Admin JWT |
| Delete Place | /api/places/:id | DELETE | Admin JWT |
| View Plans | /api/visit-plans | GET | JWT (Owner only) |
| Save Plan | /api/visit-plans | POST | JWT (Tourist) |

---

## 📦 Installation & Setup Guide

### **System Requirements**
- Node.js 18+
- MongoDB 5+ (Local or Atlas)
- npm or yarn
- Modern web browser

### **Frontend Setup**

```bash
# Navigate to project root
cd map

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Frontend runs on**: http://localhost:5173+ (Vite auto-increments port)

---

### **Backend Setup**

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure MongoDB URI
# MONGO_URI=mongodb://localhost:27017/srilanka_day_planner
# PORT=5000

# Start development server
npm run dev

# Or start with Node directly
node index.js
```

**Backend runs on**: http://localhost:5000

---

### **MongoDB Setup Options**

#### **Option A: Local MongoDB (Windows)**
```bash
# Download from mongodb.com
# Create data directory
mkdir C:\data\db

# Start MongoDB Service (Admin CMD)
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
```

#### **Option B: MongoDB Atlas (Cloud)**
1. Go to mongodb.com/atlas
2. Create account and cluster
3. Get connection string
4. Update `.env`:
   ```
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/srilanka_day_planner
   ```

#### **Option C: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

### **Default Credentials**

**Admin Account** (Auto-seeded):
- Email: `admin@srilanka.com`
- Password: No password (localStorage) / `admin123` (with JWT)
- Role: Admin

**Tourist Account** (Register):
- Any email & password
- Role: Tourist

---

### **Environment Variables** (.env)

```env
# Backend
MONGO_URI=mongodb://localhost:27017/srilanka_day_planner
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend (if needed)
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Testing the Application

### **Test Case 1: Guest User Flow**
1. ✅ Open app without login
2. ✅ Browse places (white navbar visible)
3. ✅ Click "View Details" on a place
4. ✅ Try to save plan → "Please login" error

### **Test Case 2: Tourist Registration & Plan Creation**
1. ✅ Click "Register"
2. ✅ Fill form with test data
3. ✅ Select "Tourist" role
4. ✅ Register → auto-login
5. ✅ Purple navbar visible
6. ✅ Add 3 places to plan
7. ✅ Save plan with unique name
8. ✅ View saved plan in "Saved Itineraries"

### **Test Case 3: Admin Operations**
1. ✅ Login with admin@srilanka.com
2. ✅ Dark navbar visible
3. ✅ Click "Add New Place"
4. ✅ Fill form and submit
5. ✅ New place appears in table
6. ✅ Edit place details
7. ✅ Delete place with confirmation

### **Test Case 4: Map Functionality**
1. ✅ Switch to "Map View"
2. ✅ See markers for all places
3. ✅ Colors match categories
4. ✅ Click marker → popup
5. ✅ Add place from popup

---

## 🎓 Key Learning Outcomes

### **Frontend Development**
- ✅ React hooks & Context API
- ✅ React Router & client-side routing
- ✅ TypeScript type safety
- ✅ Leaflet maps integration
- ✅ Responsive CSS design

### **Backend Development**
- ✅ Express.js REST API
- ✅ MongoDB & Mongoose ODM
- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control

### **Full-Stack Concepts**
- ✅ Database design (Normalization)
- ✅ RESTful API principles
- ✅ State management
- ✅ Authentication & Authorization
- ✅ Error handling & validation

---

## ❓ Common Q&A for Viva

### **Q: What is the technology advantage of using React Context over Redux?**
**A**: React Context is lighter weight, comes built-in, and suits smaller projects. For this app's scale, Context + hooks is sufficient without Redux's additional complexity.

---

### **Q: How would you scale this to 100+ cities?**
**A**: 
- Parameterize location reference point
- Add city selection dropdown
- Create location-specific place collections
- Implement caching for frequently accessed cities

---

### **Q: What security measures are implemented?**
**A**:
- Password hashing (bcryptjs)
- JWT tokens with expiry
- Role-based access control
- Input validation on backend
- HTTPS recommended for production

---

### **Q: How would you add a reviews/ratings feature?**
**A**:
- Create Review schema: `placeId`, `userId`, `rating`, `comment`
- Endpoint: `POST /api/places/:id/reviews`
- Calculate average rating on place fetch
- Display reviews in place details modal

---

### **Q: What performance optimizations could be made?**
**A**:
- Lazy load place images
- Implement pagination for large datasets
- Cache API responses
- Optimize database queries with indexes
- Code splitting with React.lazy()

---

### **Q: How would you implement offline functionality?**
**A**:
- Use Service Workers
- Store visited places in IndexedDB
- Sync plans when connection restored
- Show offline indicator

---

## 📝 Deployment Checklist

- [ ] TypeScript strict mode enabled
- [ ] ESLint configured & passing
- [ ] Environment variables set securely
- [ ] Database backups scheduled
- [ ] HTTPS/SSL certificate configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Error monitoring (Sentry/DataDog)
- [ ] Performance monitoring enabled
- [ ] Load testing completed

---

## 🎬 Final Notes

This application demonstrates:
- **Clean Code Architecture**: Separation of concerns (UI, logic, data)
- **Modern Development**: TypeScript, hooks, functional components
- **Full-Stack Integration**: Frontend seamlessly communicates with backend
- **User Experience**: Role-based features, responsive design
- **Database Design**: Proper normalization and relationships

---

**Last Updated**: March 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready

