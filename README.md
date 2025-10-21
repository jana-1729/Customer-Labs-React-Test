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