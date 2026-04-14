# 🚀 Microblog Platform (Twitter-like Backend)

A scalable microblogging backend system built with Node.js, Express, MongoDB, Redis, and BullMQ. This project demonstrates real-world backend engineering concepts such as caching, background job processing, and feed optimization.

---

## 📌 Features

- 🔐 JWT Authentication (Signup/Login)
- 📝 Create & Manage Posts
- 👥 Follow / Unfollow Users
- 📰 Timeline Feed System
- ⚡ Redis Caching for fast responses
- 🔄 Background Job Processing using BullMQ
- 📦 Dockerized Redis setup
- 🚀 Pagination for scalable feed loading

---

## 🧠 System Design

### 🔥 Feed Generation (Fan-out on Write)

- When a user creates a post:
  - A job is added to BullMQ queue
  - Worker fetches followers
  - Pushes post into each follower's Redis feed

- When a user requests timeline:
  - Data is served directly from Redis (fast ⚡)
  - Fallback to MongoDB if needed

---

## 🏗️ Tech Stack

- Backend: Node.js, Express
- Database: MongoDB
- Cache: Redis
- Queue: BullMQ
- Containerization: Docker
- Testing: Postman

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/microblog-backend.git
cd microblog-backend
