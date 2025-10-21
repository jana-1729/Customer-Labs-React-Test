# Segment Saving Application

A React TypeScript application for creating and saving audience segments with dynamic schema selection. Built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ Save segment with custom name
- ✅ Dynamic schema dropdown selection
- ✅ Add multiple schemas to build queries
- ✅ Visual indicators for User Traits (green) and Group Traits (red)
- ✅ Change selected schemas on the fly
- ✅ Remove schemas from selection
- ✅ Smart filtering - only shows unselected options
- ✅ Sends data to webhook endpoint
- ✅ Modern, responsive UI with Tailwind CSS

## Schema Options

The application supports the following schema options:

**User Traits (Green indicator):**
- First Name (`first_name`)
- Last Name (`last_name`)
- Gender (`gender`)
- Age (`age`)
- City (`city`)
- State (`state`)

**Group Traits (Red indicator):**
- Account Name (`account_name`)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd segment-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure webhook URL:
   - Go to [https://webhook.site/](https://webhook.site/)
   - Copy your unique webhook URL
   - Open `src/constants.ts` and replace the `WEBHOOK_URL` with your URL:
   ```typescript
   export const WEBHOOK_URL = 'https://webhook.site/your-unique-id';
   ```

## Running the Application

Start the development server:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

Create a production build:

```bash
npm run build
```

The build files will be in the `build` directory.

## Usage

1. Click the "Save segment" button on the main page
2. Enter a segment name in the text field
3. Select a schema from the "Add schema to segment" dropdown
4. Click "+ Add new schema" to add it to the blue box
5. Repeat steps 3-4 to add more schemas
6. You can change or remove added schemas using the dropdowns and minus buttons
7. Click "Save the Segment" to send the data to the webhook
8. Check your webhook.site URL to see the received data

## Data Format

The application sends data in the following format:

```json
{
  "segment_name": "example_segment",
  "schema": [
    {"first_name": "First Name"},
    {"last_name": "Last Name"}
  ]
}
```

## Project Structure

```
segment-app/
├── src/
│   ├── components/
│   │   ├── Modal.tsx           # Reusable modal component
│   │   └── SegmentPopup.tsx    # Main segment saving component
│   ├── types.ts                # TypeScript type definitions
│   ├── constants.ts            # Schema options and configuration
│   ├── App.tsx                 # Main application component
│   ├── index.tsx               # Application entry point
│   └── index.css               # Global styles with Tailwind
├── public/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Create React App** - Project setup and build tooling

## Key Implementation Details

### Dynamic Schema Management
- Schemas can be added dynamically
- Only unselected options are shown in dropdowns
- Each added schema can be modified or removed
- The "Add schema to segment" dropdown resets after adding

### State Management
- Uses React hooks (`useState`) for state management
- Efficient filtering of available options
- Unique IDs for each selected schema

### UI/UX Features
- Color-coded trait indicators (green for user, red for group)
- Responsive modal popup
- Form validation before submission
- Loading state during save operation
- Clean, modern design following the provided mockup

## Testing the Webhook

1. Visit [https://webhook.site/](https://webhook.site/)
2. Copy your unique URL
3. Update the URL in `src/constants.ts`
4. Run the application and save a segment
5. Return to webhook.site to see the POST request with your data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Created for CustomerLabs assignment
