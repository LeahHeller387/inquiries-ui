# Inquiries-UI (Angular)
אפליקציית Angular לטופס פניות + דף דוח חודש ( מבוסס Stored Procedure )  
בנויה ב־Standalone Components, Angular Material  ניווט עם Router  וקריאות HTTP ל־API  קיים.  
________________________________________

## תקציר&  מיפוי דרישות, מימוש

| מימוש בפרויקט | דרישה |
|---|---|
| `features/inquiries/pages/inquiry-form` – Reactive Forms, Material, | טופס פניות עם שדות: שם, טלפון, אימייל, מחלקה[ ], תיאור, ושליחה |
| `features/reports/pages/monthly-report` – טבלת Material עם סינון שנה/חודש וטעינה/שגיאה/מצב־ריק. | דף המציג תוצאת Stored Procedure של דוח חודשי |
|  Grid + SCSS; השדות נערמים במובייל, שדה טלפון נשאר בשורה אחת (קידומת+מספר). | רספונסיביות לניידים ומסכים שונים |
| שימוש ב־ Angular Material | בונוס UI (Material / Kendo / PrimeNG) |
________________________________________

## רכיבים עיקריים

### טופס פנייה-  `InquiryFormComponent`
- Reactive Forms + Material.  
- טלפון: בחירת קידומת מתוך `[050, 052, 053, 054, 055, 058]`  + **7 ספרות** (Regex).  
- מחלקות `mat-select` :מרובה.  
- הצגת הודעות שגיאה מתחת לשדות.  
- שליחה ל־API → `SnackBar` הצלחה/תקלה.  
- טעינה עצלה של התבנית: `@defer (on idle)`.

### דוח חודשי  `MonthlyReportComponent`
- קלטים  שנה וחודש (ברירת מחדל- נוכחיים)  
- קריאה ל־`/reports/monthly?year=&month=`.  
- מצבי טעינה/שגיאה/אין נתונים.  
- טבלת Material: `Department | Current | Prev | SameMonthLastYear`.  
- Signals + `effect()` ל־refetch; `@defer (on viewport)` לתוכן הטבלה.
________________________________________

## הגדרות סביבה

**דבאלופמנט** בניתוב הבא: `src/environments/environment.development.ts`
```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5005/api'
};
```

בניתוב הבא: `src/environments/environment.ts`
```ts
export const environment = {
  production: false,
  apiBaseUrl: '/api'
};
```
________________________________________

## התקנה והרצה מקומית
```
Git clone לכתובת הבאה: https://github.com/LeahHeller387/inquiries-api.git
npm install
הוספת קבצי ENV ראה "הגדרות סביבה"
npm start
כתובת ברירת מחדל http://localhost:4200
```
________________________________________

## Build & Deployment
```bash
ng build --configuration=production
```
- הפלט ייווצר תחת `dist/…` – ניתן לפריסה בכל שרת סטטי (S3/CloudFront, Netlify, Vercel, IIS, Nginx).  
- **SPA rewrite**:  יש להפנות 404 ל־`index.html`.  
- אם הדומיין שונה מזה של ה־API יש לאפשר  **CORS** בצד השרת עבור דומיין ה־UI
________________________________________

## שיקולי תכנון (בחירת גרסה/טכנולוגיות)
- אנגולר 19 - עדכניות ותמיכה לטווח ארוך, -  **Standalone Components + loadComponent**  פחות Boilerplate ו-lazy פשוט.  
- **Angular Material**  - זמינות רכיבים עשירה RTL ,מובנה, עקביות ונגישות.  
- **Signals** ( `signal`, `effect`, `toSignal` ) - ניהול מצב צפוי, אינטגרציה נקייה עם RxJS.  
- `@defer` בתבניות - טעינה עצלה של UI משני (טופס/טבלה) לשיפור TTI.
________________________________________

## אתגרים ופתרונות
- ולידציה לטלפון: פיצול לקידומת/מספר, Regex ל־7 ספרות, הודעות שגיאה נקודתיות.  
- מיפוי דוח חודשי: טיפוס `MonthlyReportItem`, טבלת Material, אינדיקציית טעינה/שגיאה/אין־נתונים.  
- שגיאות רשת/404: טיפול מרוכז ב־`SnackBar`, התאמת `apiBaseUrl` בסביבות, אופציית Proxy בעת פיתוח.  
- רספונסיביות: Grid + SCSS; פריסת מובייל עמודתית, שמירה ששדה הטלפון נשאר בשורה אחת.
________________________________________

## ניווט
- `/` – טופס פנייה.  
- `/report` – דוח חודשי  
(הפניות מוגדרות ב־ `app.routes.ts` עם טעינה עצלה של הקומפוננטות).
________________________________________

## שיפורים עתידיים (Nice to Have)
- סיכומים (סה״כ/ממוצע) בשורת Footer של הטבלה.  
- יצוא CSV/Excel לדוח.  
-  Paging/Virtual Scrolling לדוחות גדולים.  
- דף ניהול פניות (קריאה/עדכון/מחיקה) על בסיס המתודות שכבר קיימות בשירות.
________________________________________
