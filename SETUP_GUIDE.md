# Setup Guide for Segment Saving Application

## Quick Start Guide

### Step 1: Prerequisites Check
Ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Git

Check your versions:
```bash
node --version
npm --version
git --version
```

### Step 2: Clone or Download the Repository

If you have git access:
```bash
git clone <repository-url>
cd segment-app
```

Or download and extract the ZIP file, then navigate to the folder.

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- React 18
- TypeScript
- Tailwind CSS
- All necessary dependencies

### Step 4: Configure Webhook URL

1. Open your browser and visit: [https://webhook.site/](https://webhook.site/)
2. You'll see a unique URL like: `https://webhook.site/abc-123-def-456`
3. Copy this URL
4. Open the file `src/constants.ts` in your code editor
5. Replace the placeholder URL with your webhook URL:

```typescript
export const WEBHOOK_URL = 'https://webhook.site/your-unique-id-here';
```

### Step 5: Start the Development Server

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, open your browser and navigate to `http://localhost:3000`

### Step 6: Test the Application

1. You should see a page with "View Audience" title and a "Save segment" button
2. Click the "Save segment" button
3. A popup will appear titled "Saving Segment"
4. Enter a segment name (e.g., "Test Segment")
5. Select a schema from the "Add schema to segment" dropdown
6. Click "+ Add new schema" to add it to the blue box
7. Add more schemas if needed
8. Click "Save the Segment" button
9. Go back to your webhook.site tab to see the received data

## Troubleshooting

### Issue: `npm install` fails
**Solution:** 
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Issue: Port 3000 is already in use
**Solution:** 
- Either stop the application using port 3000
- Or set a different port:
  ```bash
  PORT=3001 npm start
  ```

### Issue: Tailwind CSS styles not loading
**Solution:** 
- Make sure `tailwind.config.js` and `postcss.config.js` are in the root directory
- Restart the development server

### Issue: TypeScript errors
**Solution:** 
- Make sure all `.ts` and `.tsx` files are properly saved
- Restart your code editor
- Restart the development server

## Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Verification Checklist

Before submitting, verify:
- ✅ Application starts without errors
- ✅ "Save segment" button opens modal
- ✅ Can enter segment name
- ✅ Can select and add schemas
- ✅ Green dot shows for User Traits
- ✅ Red dot shows for Account Name (Group Trait)
- ✅ Can change selected schemas
- ✅ Can remove schemas
- ✅ Only unselected options appear in dropdowns
- ✅ Data is sent to webhook correctly
- ✅ Webhook receives data in correct format

## Data Format Example

The application sends data in this format:

```json
{
  "segment_name": "example_segment",
  "schema": [
    {"first_name": "First Name"},
    {"last_name": "Last Name"},
    {"age": "Age"}
  ]
}
```

## Support

If you encounter any issues:
1. Check this guide again
2. Review the main README.md
3. Check the browser console for errors (Press F12)
4. Verify webhook URL is correctly configured

## Additional Commands

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests (if configured)
- `npm run eject` - Eject from Create React App (irreversible)

---

**Note:** Make sure to keep your webhook.site tab open while testing to see the incoming requests.

