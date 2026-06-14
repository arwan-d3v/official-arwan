# Global State Machine Matrix — Arwan Personal OS

## 1. Visual Communication Language
Interaction states are communicated through a tripartite system: **Haptic Motion**, **Chromatic Signals**, and **Contextual Overlays**.

| State | Visual Trigger | Animation Pattern |
| :--- | :--- | :--- |
| `isLoading` | Skeleton Pulse (Gray-100/200) | `animate-pulse` (linear, 2s) |
| `isCreated` | Success Glow (Emerald) + Slide-in | `spring` overshoot (0.4s) |
| `isDeleted` | Redact & Collapse | `opacity: 0` + `height: 0` (0.3s) |
| `isUpdated` | Blue Border Flash | `border-primary` flash (0.8s) |
| `inProgress` | Indeterminate Progress Bar | `width: 0 -> 100%` (linear) |
| `isPending` | Amber Warning Pulse | `opacity: 0.5` + soft pulse |
| `isWarning` | Shake Interaction + Amber Border | `translateX(-4px, 4px)` (0.2s) |
| `isError` | Red Pulse + Explanatory Toast | `scale: 0.98` tactile bump |
| `isWaiting` | Spinning Loader (Subtle) | `animate-spin` (fast) |
| `isSuccess` | Checkmark Draw-in + Green Glow | `stroke-dashoffset` path anim |
| `isDone` | Content Fade-in | `y: 20 -> 0` + `opacity: 1` |

## 2. Notification Hierarchy (Toasts)
Toasts appear in the bottom-right of the viewport.
- **Persistent (Error/Warning)**: Require user dismissal.
- **Transient (Success/Info)**: Auto-dismiss after 3200ms.
- **Actionable (Update)**: Include a "Refresh" or "Undo" button.

# Signature "Arwan" Footer Architecture

## A. The Utility Vault / Dashboard Variant (M1, M4)
A multi-column, deep-link footer for maximum utility.
- **Col 1**: Arwan Personal OS Logo + Copyright 2024.
- **Col 2**: Ecosystem (Nexus, Quant, Academy, Vault).
- **Col 3**: Resources (API docs, Changelog, Status).
- **Col 4**: Social/Legal (GitHub, LinkedIn, Privacy, Terms).

## B. The Terminal / Pro Variant (M2)
A slim, fixed-height (h-10) status bar.
- **Left**: `System: Optimal` (pulsing green dot).
- **Center**: `© 2024 Arwan Engineering • Institutional Tier`.
- **Right**: Server Time (UTC) + Latency (ms).

## C. The Marketing / Landing Variant (Root)
An elegant, centered brand anchor.
- **Top**: "Designed & Engineered by Arwan".
- **Center**: Minimalist link list.
- **Bottom**: Large, subtle watermark: "ARWAN PERSONAL OS".
