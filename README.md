<<<<<<< HEAD
# pointoftravel
=======
# pointoftravel

#794d98
#6b4487
#5e3b76
#503365
#432b55
#362244
#281a33
#1b1122
#0d0811
#000000

#6A1B9A
>>>>>>> master



✅ Logout functionality

✅ Route protection

✅ File/image uploads

✅ Admin dashboard charts or tables


install recharts


File Type	Needs Editing?	Why
Global Layouts	✅ Yes	Affects all views
Pages (e.g. Home.tsx)	✅ Yes	Layout & content
Header/Footer	✅ Yes	Usually fixed, needs mobile fallback
Buttons/Forms	✅ Maybe	If they have fixed sizes
Low-impact Utility Files	❌ No	Files like context, utils, or backend PHP don’t need it








✅ Step 3: Show Contact Form Submissions in Messages
📤 Send:

backend/api/contact.php

Any file where you're storing messages (e.g., contact_log.txt or a DB insert file)

src/components/admin/AdminDashboard.tsx (for display area)





✅ Step 4: Logout Admin on Refresh
📤 Send:

src/context/AdminAuthContext.tsx

src/components/Header.tsx or wherever auth check is triggered on page load



✅ Step 5: Redirect Admin to Dashboard on Login
📤 Send:

backend/api/admin/login.php

src/pages/AdminLogin.tsx or AdminLoginForm.tsx