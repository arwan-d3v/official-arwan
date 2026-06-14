# Arwan Personal OS — Deployment & Simulation Guide for Jules/Antigravity

## 1. Arsitektur Komponen (Modular Monolith)
Platform ini dirancang dengan satu **Global App Shell** yang membungkus 4 modul vertikal. Setiap modul memiliki "Vibe" atau estetika yang berbeda namun menggunakan sistem token yang sama.

| Modul | Vibe / Estetika | Target Utama |
| :--- | :--- | :--- |
| **M1: Obsidian Nexus** | Professional & Elegant | CV/Portfolio Builder |
| **M2: Quant Enterprise** | High-Frequency Terminal | Algo-Trading Dashboard |
| **M3: Tech Academy** | Calm "Library" Gray | Immersive Learning |
| **M4: Utility Vault** | Utilitarian Bento Box | Micro-Tools & GDrive |

## 2. Global Shell & Navigation
- **Shell**: Sidebar tetap (M1, M3, M4) atau Status Bar tipis (M2).
- **Command Palette (MPC)**: `Ctrl+K` sebagai penghubung antar modul. Ini adalah "teleportasi" konteks.
- **God Mode**: Pintu masuk tersembunyi untuk akses Admin/MRR.

## 3. Strategi Monetisasi (Blur-to-Desire)
Setiap modul menggunakan pola UI yang sama untuk konversi:
- **Locked State**: Komponen premium dirender secara visual tetapi di-*blur* atau dikunci dengan ikon gembok.
- **Upsell Nudge**: Klik pada fitur terkunci akan membuka Drawer/Modal penawaran sesuai dengan Tier (Student/Pro/Company).

## 4. State Machine (Micro-Interactions)
Pastikan setiap interaksi mengikuti matriks ini untuk standar "Enterprise-Grade":
- `isLoading`: Skeleton pulse.
- `isSuccess`: Emerald glow + checkmark.
- `isUpdated`: Blue border flash (0.8s).
- `isError`: Crimson shake interaction.

## 5. Instruksi Simulasi
Untuk memahami platform secara utuh tanpa membangun semuanya sekaligus, tim dapat memfokuskan pada:
1. **Grand Entry Landing Page**: Pintu masuk utama.
2. **Global App Shell**: Bagaimana navigasi berpindah antar M1 ke M2.
3. **One Vertical Slice**: Pilih Modul 1 (Obsidian Nexus) sebagai referensi standar komponen.

---
**Status**: Architecture Visualized. Ready for implementation.
**Prepared by**: Stitch AI Assistant.