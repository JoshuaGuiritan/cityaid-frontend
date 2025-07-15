# 📍 CityAid

**Your City, Your Hospitals, One Click**

CityAid is a smart, location-based hospital directory built for the **LITMIN project**. With just a single button click, it detects the user's **city, region, and country** using **GeoJS**, then fetches local hospitals from **OpenStreetMap** using the **Overpass API**.

Designed with emergencies in mind, it instantly displays nearby **hospital names** and **contact numbers**—making healthcare access just one click away.

---

## 🖼️ Link

http://cityaid-frontend.vercel.app

## 🚀 Features

- 🌍 **Location Detection** via [GeoJS](https://www.geojs.io)
- 🏥 **Nearby Hospital Search** using [Overpass API (OpenStreetMap)](https://overpass-api.de/)
- 📞 **Contact Numbers** listed beside hospital names
- 🔁 **Redetect Button** to refresh location and data
- 🌑 **Dark UI** with smooth, modern styling
- 🧠 Built for accessibility, speed, and emergency use

---

## 🛠️ Tech Stack

### 🔧 Frontend:
- ⚛️ **React** (via Vite)
- 🎨 **Tailwind CSS** for styling
- 🌍 **GeoJS API** for city/region/country detection
- 🏥 **Overpass API** for real-time hospital data

### 🔧 Backend:
- 🚀 **Node.js** + **Express.js**
- 🌐 Deployed on **Vercel Serverless Functions**

### 🚀 Deployment:
- **Frontend**: [Vercel](https://vercel.com)
- **Backend/API**: Vercel Serverless (Express API routes)
