# SmartReno Marketplace — Customer ↔ Contractor Bidding Platform
 
**Scope:** MVP for customer-to-contractor bidding with SmartReno (Estimator/Admin) in between.

## 1) Problem & Goals
Homeowners want affordable, trustworthy renovation services. Contractors want steady project pipelines. Current options lack transparency and fairness.  
**Goals:**  
- Enable customers to post projects (photos, descriptions, budgets).  
- Allow contractors to bid competitively.  
- Ensure SmartReno (Estimator) validates projects and enforces fair play.  
- Build trust with clear bidding, notifications, and dispute resolution.

## 2) Users & Use Cases
- **Customer:** Post project (photos, description, budget range, ZIP). Review bids. Accept bid.  
- **Contractor:** Browse projects. Place competitive bids. Manage awarded jobs.  
- **SmartReno (Estimator/Admin):** Validate projects, moderate bids, resolve disputes, ensure compliance.

## 3) Assumptions
- Customers can set their own price range.  
- Contractors must bid ≥ customer min and ≤ customer max.  
- SmartReno validates all projects before publishing.  
- Notifications: Email/SMS/push for project postings, bid updates, bid acceptance.  
- Payments (future): Escrow model for security.

## 4) End-to-End Flow
1. **Customer:** Upload photos → Add job description → Set price range → Enter ZIP → Submit project.  
2. **SmartReno:** Validate content → Publish project.  
3. **Contractor:** Browse projects by ZIP → Submit bid (amount, ETA, notes).  
4. **SmartReno:** Monitor bids for fairness.  
5. **Customer:** Review bids → Accept bid → Contractor notified.  
6. **Future:** Payment escrow, in-app chat, rating system.

## 5) Data Model
- **Project:** id, customer_id, photos[], description, price_min, price_max, zip, status.  
- **Bid:** id, project_id, contractor_id, amount, eta, notes, status (SUBMITTED/WON/LOST).  
- **Contractor:** id, profile, licenses, ratings, zip_coverage[].  
- **Customer:** id, profile, address, projects[].

## 6) APIs (Examples)
- `POST /projects` → create project.  
- `GET /projects?zip=75001` → list available projects.  
- `POST /bids` → place bid.  
- `GET /bids?project_id=123` → list bids for project.  
- `POST /bids/<built-in function id>/accept` → customer accepts bid.  

## 7) Notifications
- Customer notified when bids arrive.  
- Contractor notified when their bid is accepted/rejected.  
- Admin notified of suspicious activity.

## 8) Error Handling
- Invalid price range (min > max) → error.  
- Invalid ZIP → reject project.  
- Contractor bidding outside range → block.  
- No bids → notify customer, allow repost.

## 9) Privacy & Security
- Photo storage encrypted.  
- Escrow payments (phase 2).  
- Verified contractor profiles (licenses, reviews).

## 10) Acceptance Criteria (MVP)
- AC1: Customer can post project with min/max price.  
- AC2: Contractors can see projects and bid within range.  
- AC3: Customer can review and accept one bid.  
- AC4: Notifications fire on every status change.  
- AC5: Admin can flag/remove bad bids.  

## 11) Analytics
- # Projects posted per week.  
- Avg. # bids per project.  
- Bid acceptance rate.  
- Median time to win a bid.  
- Drop-off at bid submission step.

## 12) Tech Stack (MVP)
- **Frontend:** React (Customer/Contractor portals).  
- **Backend:** Node.js or Python (FastAPI).  
- **DB:** Postgres (Projects, Bids, Users).  
- **Storage:** S3 for photos.  
- **Notifications:** Twilio/SendGrid/FCM.  
- **Infra:** Docker + Kubernetes.  

## 13) Timeline (MVP ~6 weeks)
- Week 1: Wireframes + Spec finalization.  
- Week 2–3: Customer portal.  
- Week 3–4: Contractor portal + bidding.  
- Week 5: Admin portal (SmartReno Estimator).  
- Week 6: QA, analytics, launch.

## 14) Open Questions
1. How to enforce contractor verification (manual vs automated)?  
2. Should customers see contractor profiles before accepting?  
3. Should SmartReno charge commission per project?  
4. What’s the policy on bid withdrawals?  
5. Do we allow contractors to counteroffer outside range?

